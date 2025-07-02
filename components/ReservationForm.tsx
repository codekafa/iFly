import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { sendReservationEmailSimple, sendUserConfirmationEmailSimple } from '../services/EmailService';

interface Passenger {
  id: number;
  name: string;
  surname: string;
  tc: string;
}

interface ReservationFormProps {
  flight: any;
  onReservationComplete: () => void;
  onBack: () => void;
}

export const ReservationForm = ({ flight, onReservationComplete, onBack }: ReservationFormProps) => {
  const [passengers, setPassengers] = useState<Passenger[]>(
    Array.from({ length: flight.passengers }, (_, index) => ({
      id: index + 1,
      name: '',
      surname: '',
      tc: '',
    }))
  );
  const [contactInfo, setContactInfo] = useState({
    phone: '',
    email: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updatePassenger = (id: number, field: keyof Passenger, value: string) => {
    setPassengers(prev =>
      prev.map(passenger =>
        passenger.id === id ? { ...passenger, [field]: value } : passenger
      )
    );
  };

  const validateForm = (): boolean => {
    // Validate passengers
    for (const passenger of passengers) {
      if (!passenger.name.trim()) {
        Alert.alert('Hata', 'Tüm yolcuların adı doldurulmalıdır.');
        return false;
      }
      if (!passenger.surname.trim()) {
        Alert.alert('Hata', 'Tüm yolcuların soyadı doldurulmalıdır.');
        return false;
      }
      if (!passenger.tc.trim()) {
        Alert.alert('Hata', 'Tüm yolcuların TC kimlik numarası doldurulmalıdır.');
        return false;
      }
      if (passenger.tc.length !== 11 || !/^\d+$/.test(passenger.tc)) {
        Alert.alert('Hata', 'TC kimlik numarası 11 haneli olmalıdır.');
        return false;
      }
    }

    // Validate contact info
    if (!contactInfo.phone.trim()) {
      Alert.alert('Hata', 'Telefon numarası zorunludur.');
      return false;
    }

    if (!contactInfo.email.trim()) {
      Alert.alert('Hata', 'Email adresi zorunludur.');
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(contactInfo.email)) {
      Alert.alert('Hata', 'Geçerli bir email adresi giriniz.');
      return false;
    }

    const phoneRegex = /^[0-9]{10,11}$/;
    if (!phoneRegex.test(contactInfo.phone.replace(/\s/g, ''))) {
      Alert.alert('Hata', 'Geçerli bir telefon numarası giriniz.');
      return false;
    }

    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      const emailData = {
        flight: flight,
        passengers: passengers,
        contactInfo: contactInfo,
      };

      console.log('Rezervasyon gönderiliyor...', emailData);
      
      // Admin'e rezervasyon emaili gönder
      const adminSuccess = await sendReservationEmailSimple(emailData);
      
      // Kullanıcıya teşekkür emaili gönder
      const userSuccess = await sendUserConfirmationEmailSimple(emailData);
      
      console.log('Email gönderme sonuçları - Admin:', adminSuccess, 'User:', userSuccess);
      
      if (adminSuccess) {
        console.log('Teşekkür ekranına yönlendiriliyor...');
        onReservationComplete();
      } else {
        Alert.alert('Hata', 'Rezervasyon gönderilirken bir hata oluştu. Lütfen tekrar deneyin.');
      }
    } catch (error) {
      console.error('Rezervasyon hatası:', error);
      Alert.alert('Hata', 'Rezervasyon gönderilirken bir hata oluştu. Lütfen tekrar deneyin.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#0A2A43" />
        </TouchableOpacity>
        <Text style={styles.title}>Rezervasyon Formu</Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={styles.flightInfo}>
        <Text style={styles.flightRoute}>
          {flight.from} → {flight.to}
        </Text>
        <Text style={styles.flightDetails}>
          {flight.tripType === 'oneway' ? 'Tek Yön' : 'Gidiş-Dönüş'} • {flight.passengers} Yolcu
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Yolcu Bilgileri</Text>
        {passengers.map((passenger, index) => (
          <View key={passenger.id} style={styles.passengerCard}>
            <Text style={styles.passengerTitle}>Yolcu {index + 1}</Text>
            
            <View style={styles.inputRow}>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Ad *</Text>
                <TextInput
                  style={styles.input}
                  value={passenger.name}
                  onChangeText={(value) => updatePassenger(passenger.id, 'name', value)}
                />
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Soyad *</Text>
                <TextInput
                  style={styles.input}
                  value={passenger.surname}
                  onChangeText={(value) => updatePassenger(passenger.id, 'surname', value)}
                />
              </View>
            </View>
            
            <View style={styles.inputContainer}>
              <Text style={styles.label}>TC Kimlik No *</Text>
              <TextInput
                style={styles.input}
                value={passenger.tc}
                onChangeText={(value) => updatePassenger(passenger.id, 'tc', value)}
                keyboardType="numeric"
                maxLength={11}
              />
            </View>
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>İletişim Bilgileri</Text>
        
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Telefon Numarası *</Text>
          <TextInput
            style={styles.input}
            value={contactInfo.phone}
            onChangeText={(value) => setContactInfo(prev => ({ ...prev, phone: value }))}
            keyboardType="phone-pad"
          />
        </View>
        
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email Adresi *</Text>
          <TextInput
            style={styles.input}
            value={contactInfo.email}
            onChangeText={(value) => setContactInfo(prev => ({ ...prev, email: value }))}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>
      </View>

      <TouchableOpacity
        style={[styles.submitButton, isSubmitting && styles.submitButtonDisabled]}
        onPress={handleSubmit}
        disabled={isSubmitting}
      >
        <Text style={styles.submitButtonText}>
          {isSubmitting ? 'Gönderiliyor...' : 'Rezervasyon Oluştur'}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f8ff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  backButton: {
    padding: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0A2A43',
  },
  flightInfo: {
    backgroundColor: 'white',
    padding: 20,
    margin: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  flightRoute: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0A2A43',
    textAlign: 'center',
  },
  flightDetails: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginTop: 5,
  },
  section: {
    marginHorizontal: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0A2A43',
    marginBottom: 15,
  },
  passengerCard: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  passengerTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1C7A8C',
    marginBottom: 15,
  },
  inputRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  inputContainer: {
    flex: 1,
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0A2A43',
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    backgroundColor: 'white',
  },
  submitButton: {
    backgroundColor: '#1C7A8C',
    paddingVertical: 15,
    marginHorizontal: 20,
    marginBottom: 30,
    borderRadius: 12,
    alignItems: 'center',
  },
  submitButtonDisabled: {
    backgroundColor: '#ccc',
  },
  submitButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
}); 