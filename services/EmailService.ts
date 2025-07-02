import emailjs from 'emailjs-com';

interface EmailData {
  flight: any;
  passengers: any[];
  contactInfo: {
    phone: string;
    email: string;
  };
}

// EmailJS ile gerçek email gönderme - Gmail servisi
export const sendReservationEmail = async (emailData: EmailData): Promise<boolean> => {
  try {
    console.log('EmailJS ile admin email gönderiliyor...');
    
    // EmailJS template parametreleri
    const templateParams = {
      to_email: 'tayfun.koc@windowslive.com',
      from_name: 'i-Fly Rezervasyon',
      from_email: 'tyfnkcgmail.com', // Gmail adresinizi buraya yazın
      subject: 'Yeni Uçuş Rezervasyon Talebi',
      flight_route: `${emailData.flight.from} → ${emailData.flight.to}`,
      flight_type: emailData.flight.tripType === 'oneway' ? 'Tek Yön' : 'Gidiş-Dönüş',
      flight_price: `${emailData.flight.price} €`,
      contact_phone: emailData.contactInfo.phone,
      contact_email: emailData.contactInfo.email,
      passengers_count: emailData.passengers.length,
      message: createEmailContent(emailData),
    };

    // EmailJS gönderme - Gmail servisi
    const result = await emailjs.send(
      'service_3l5lvwo', // Gmail Service ID
      'template_5852wjp', // Template ID - EmailJS'te oluşturmanız gerekiyor
      templateParams
    );

    console.log('Admin email başarıyla gönderildi:', result);
    return true;
  } catch (error) {
    console.error('Admin email gönderme hatası:', error);
    return false;
  }
};

// Kullanıcıya teşekkür ve rezervasyon detayları emaili gönder
export const sendUserConfirmationEmail = async (emailData: EmailData): Promise<boolean> => {
  try {
    console.log('EmailJS ile kullanıcı emaili gönderiliyor...');
    
    const userEmailContent = createUserEmailContent(emailData);
    
    // EmailJS template parametreleri - kullanıcıya
    const templateParams = {
      to_email: emailData.contactInfo.email,
      from_name: 'i-Fly',
      from_email: 'tyfnkcgmail.com', // Gmail adresinizi buraya yazın
      subject: 'Rezervasyon Talebiniz Alındı - i-Fly',
      message: userEmailContent,
      flight_route: `${emailData.flight.from} → ${emailData.flight.to}`,
      flight_type: emailData.flight.tripType === 'oneway' ? 'Tek Yön' : 'Gidiş-Dönüş',
      flight_price: `${emailData.flight.price} €`,
      reservation_id: `RES-${Date.now()}`,
    };

    // EmailJS gönderme - Gmail servisi
    const result = await emailjs.send(
      'service_3l5lvwo', // Gmail Service ID
      'template_5852wjp', // Template ID - EmailJS'te oluşturmanız gerekiyor
      templateParams
    );

    console.log('Kullanıcı emaili başarıyla gönderildi:', result);
    return true;
  } catch (error) {
    console.error('Kullanıcı emaili gönderme hatası:', error);
    return false;
  }
};

const createEmailContent = (emailData: EmailData): string => {
  const { flight, passengers, contactInfo } = emailData;
  
  let content = `
    <h2>Yeni Uçuş Rezervasyon Talebi</h2>
    
    <h3>Uçuş Bilgileri:</h3>
    <p><strong>Rota:</strong> ${flight.from} → ${flight.to}</p>
    <p><strong>Tip:</strong> ${flight.tripType === 'oneway' ? 'Tek Yön' : 'Gidiş-Dönüş'}</p>
    <p><strong>Fiyat:</strong> ${flight.price} €</p>
    <p><strong>Teknik Rota:</strong> ${flight.technicalRoute}</p>
    
    <h3>Yolcu Bilgileri:</h3>
  `;
  
  passengers.forEach((passenger, index) => {
    content += `
      <p><strong>Yolcu ${index + 1}:</strong></p>
      <ul>
        <li>Ad: ${passenger.name}</li>
        <li>Soyad: ${passenger.surname}</li>
        <li>TC: ${passenger.tc}</li>
      </ul>
    `;
  });
  
  content += `
    <h3>İletişim Bilgileri:</h3>
    <p><strong>Telefon:</strong> ${contactInfo.phone}</p>
    <p><strong>Email:</strong> ${contactInfo.email}</p>
    
    <p><em>Bu rezervasyon talebi i-Fly uygulamasından gönderilmiştir.</em></p>
  `;
  
  return content;
};

const createUserEmailContent = (emailData: EmailData): string => {
  const { flight, passengers, contactInfo } = emailData;
  const reservationId = `RES-${Date.now()}`;
  
  let content = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: linear-gradient(135deg, #0A2A43, #1C7A8C); color: white; padding: 30px; text-align: center;">
        <h1 style="margin: 0; font-size: 28px;">i-Fly</h1>
        <p style="margin: 10px 0 0 0; font-size: 16px;">We fly, you relax</p>
      </div>
      
      <div style="padding: 30px; background: #f8f9fa;">
        <h2 style="color: #0A2A43; margin-bottom: 20px;">Rezervasyon Talebiniz Alınmıştır!</h2>
        
        <div style="background: white; padding: 20px; border-radius: 10px; margin-bottom: 20px;">
          <h3 style="color: #1C7A8C; margin-top: 0;">Rezervasyon Detayları</h3>
          <p><strong>Rezervasyon No:</strong> ${reservationId}</p>
          <p><strong>Uçuş Rota:</strong> ${flight.from} → ${flight.to}</p>
          <p><strong>Uçuş Tipi:</strong> ${flight.tripType === 'oneway' ? 'Tek Yön' : 'Gidiş-Dönüş'}</p>
          <p><strong>Toplam Fiyat:</strong> ${flight.price} €</p>
          <p><strong>Yolcu Sayısı:</strong> ${passengers.length}</p>
        </div>
        
        <div style="background: white; padding: 20px; border-radius: 10px; margin-bottom: 20px;">
          <h3 style="color: #1C7A8C; margin-top: 0;">Yolcu Bilgileri</h3>
  `;
  
  passengers.forEach((passenger, index) => {
    content += `
          <div style="border-bottom: 1px solid #eee; padding: 10px 0;">
            <p style="margin: 5px 0;"><strong>Yolcu ${index + 1}:</strong> ${passenger.name} ${passenger.surname}</p>
          </div>
    `;
  });
  
  content += `
        </div>
        
        <div style="background: white; padding: 20px; border-radius: 10px; margin-bottom: 20px;">
          <h3 style="color: #1C7A8C; margin-top: 0;">İletişim Bilgileri</h3>
          <p><strong>Telefon:</strong> ${contactInfo.phone}</p>
          <p><strong>Email:</strong> ${contactInfo.email}</p>
        </div>
        
        <div style="background: #e8f4fd; padding: 20px; border-radius: 10px; border-left: 4px solid #1C7A8C;">
          <h4 style="color: #0A2A43; margin-top: 0;">Sonraki Adımlar</h4>
          <p style="margin: 5px 0;">• Rezervasyon talebiniz incelenmektedir</p>
          <p style="margin: 5px 0;">• En kısa sürede size dönüş yapacağız</p>
          <p style="margin: 5px 0;">• Sorularınız için: tayfun.koc@windowslive.com</p>
        </div>
        
        <div style="text-align: center; margin-top: 30px; color: #666;">
          <p>Teşekkür ederiz!</p>
          <p><strong>i-Fly Ekibi</strong></p>
        </div>
      </div>
    </div>
  `;
  
  return content;
};

// Basit simülasyon - test için kullanın
export const sendReservationEmailSimple = async (emailData: EmailData): Promise<boolean> => {
  try {
    console.log('Admin email gönderiliyor (simülasyon):', {
      to: 'tayfun.koc@windowslive.com',
      subject: 'Yeni Uçuş Rezervasyon Talebi',
      data: emailData
    });
    
    // Simüle edilmiş gecikme
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    console.log('Admin email başarıyla gönderildi (simülasyon)');
    return true;
  } catch (error) {
    console.error('Admin email gönderme hatası:', error);
    return false;
  }
};

// Kullanıcıya email gönderme simülasyonu
export const sendUserConfirmationEmailSimple = async (emailData: EmailData): Promise<boolean> => {
  try {
    console.log('Kullanıcı emaili gönderiliyor (simülasyon):', {
      to: emailData.contactInfo.email,
      subject: 'Rezervasyon Talebiniz Alındı - i-Fly',
      data: emailData
    });
    
    // Simüle edilmiş gecikme
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    console.log('Kullanıcı emaili başarıyla gönderildi (simülasyon)');
    return true;
  } catch (error) {
    console.error('Kullanıcı emaili gönderme hatası:', error);
    return false;
  }
}; 