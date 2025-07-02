import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    Alert,
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import Colors from '../constants/Colors';
import { sendReservationEmailSimple, sendUserConfirmationEmailSimple } from '../services/EmailService';

interface Passenger {
  id: number;
  name: string;
  surname: string;
  tc: string;
}

export default function UnifiedReservationScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  
  // FlightResults'dan gelen parametreler
  const flightFromResults = {
    from: params.from as string,
    to: params.to as string,
    passengers: parseInt(params.passengers as string),
    dateRange: params.dateRange as string,
    tripType: params.tripType as string,
    totalPrice: parseInt(params.totalPrice as string)
  };
  
  // Favori uçuşlardan gelen parametreler
  const flightFromFavorite = {
    from: params.from as string,
    to: params.to as string,
    passengers: parseInt(params.passengers as string),
    dateRange: params.dateRange as string,
    totalPrice: parseInt(params.totalPrice as string),
    flightType: params.flightType as string,
    duration: params.duration as string,
    description: params.description as string
  };
  
  // Hangi kaynaktan geldiğini belirle
  const isFromFavorite = !!params.flightType;
  const flight = isFromFavorite ? flightFromFavorite : flightFromResults;
  
  const [passengers, setPassengers] = useState<Passenger[]>(
    Array.from({ length: flight.passengers || 1 }, (_, index) => ({
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
        flight: {
          ...flight,
          source: isFromFavorite ? 'favorite' : 'search'
        },
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
        // Teşekkür sayfasına yönlendir
        router.push({
          pathname: '/thank-you',
          params: {
            from: flight.from,
            to: flight.to,
            passengers: flight.passengers.toString(),
            dateRange: flight.dateRange,
            totalPrice: flight.totalPrice.toString(),
            source: isFromFavorite ? 'favorite' : 'search'
          }
        });
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
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"} 
        style={{ flex: 1 }}
      >
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color={Colors.primary} />
          </TouchableOpacity>
          <Text style={styles.title}>Rezervasyon Formu</Text>
          <View style={{ width: 24 }} />
        </View>

        <ScrollView style={styles.scrollContainer}>
          <View style={styles.flightInfo}>
            <Text style={styles.flightRoute}>
              {flight.from} → {flight.to}
            </Text>
            <Text style={styles.flightDetails}>
              {isFromFavorite ? 
                `${flight.flightType === 'roundtrip' ? 'Gidiş-Dönüş' : flight.flightType === 'trnc' ? 'KKTC' : 'VIP'}` : 
                `${flight.tripType === 'oneway' ? 'Tek Yön' : 'Gidiş-Dönüş'}`
              } • {flight.passengers} Yolcu • {flight.dateRange}
            </Text>
            {isFromFavorite && flight.duration && (
              <Text style={styles.flightDuration}>Süre: {flight.duration}</Text>
            )}
            <Text style={styles.flightPrice}>Fiyat: {flight.totalPrice.toLocaleString()} €</Text>
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
                      placeholder="Adınız"
                    />
                  </View>
                  <View style={styles.inputContainer}>
                    <Text style={styles.label}>Soyad *</Text>
                    <TextInput
                      style={styles.input}
                      value={passenger.surname}
                      onChangeText={(value) => updatePassenger(passenger.id, 'surname', value)}
                      placeholder="Soyadınız"
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
                    placeholder="11 haneli TC kimlik numarası"
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
                placeholder="05XX XXX XX XX"
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
                placeholder="ornek@email.com"
              />
            </View>
          </View>
        </ScrollView>

        <View style={styles.footer}>
          <TouchableOpacity 
            style={[styles.submitButton, isSubmitting && styles.submitButtonDisabled]}
            onPress={handleSubmit}
            disabled={isSubmitting}
          >
            <Text style={styles.submitButtonText}>
              {isSubmitting ? 'Rezervasyon Gönderiliyor...' : 'Rezervasyonu Tamamla'}
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  backButton: {
    padding: 4,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.text,
  },
  scrollContainer: {
    flex: 1,
    padding: 16,
  },
  flightInfo: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  flightRoute: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 4,
  },
  flightDetails: {
    fontSize: 14,
    color: Colors.textSoft,
    marginBottom: 4,
  },
  flightDuration: {
    fontSize: 14,
    color: Colors.textSoft,
    marginBottom: 4,
  },
  flightPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.primary,
  },
  section: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 16,
  },
  passengerCard: {
    backgroundColor: Colors.background,
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  passengerTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 12,
  },
  inputRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },
  inputContainer: {
    flex: 1,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.text,
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    backgroundColor: 'white',
  },
  footer: {
    padding: 16,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  submitButton: {
    backgroundColor: Colors.primary,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  submitButtonDisabled: {
    backgroundColor: Colors.textSoft,
  },
  submitButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
}); 