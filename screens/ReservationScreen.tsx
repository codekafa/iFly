import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
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
    View,
} from 'react-native';

type Flight = { id: string; from: string; to: string; date: string; time: string; price: string; };
type Service = { id: string; name: string; price: number; };

type ReservationRouteParams = {
    flights: Flight[];
    services: Service[];
    totalPrice: number;
};

// Dummy data to simulate route params for standalone development
const DUMMY_PARAMS: ReservationRouteParams = {
    flights: [
        { id: '1', from: 'Alanya', to: 'Kıbrıs', date: '2025-06-15', time: '10:30', price: '8900₺' },
        { id: '4', from: 'Kıbrıs', to: 'Alanya', date: '2025-06-17', time: '18:45', price: '9200₺' },
    ],
    services: [
        { id: '1', name: 'Ekstra Bagaj', price: 1000 },
        { id: '2', name: 'VIP Transfer', price: 1500 },
    ],
    totalPrice: 19600,
};

const parsePrice = (price: string): number => {
    return parseFloat(price.replace('₺', '').replace(/\./g, ''));
}

const formatPrice = (price: number): string => {
    return `${price.toLocaleString('tr-TR')}₺`;
}

export default function ReservationScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  
  // Favori uçuşlardan gelen parametreleri al
  const flightData = {
    from: params.from as string,
    to: params.to as string,
    passengers: parseInt(params.passengers as string),
    dateRange: params.dateRange as string,
    totalPrice: parseInt(params.totalPrice as string),
    flightType: params.flightType as string,
    duration: params.duration as string,
    description: params.description as string
  };
  
  // Eğer parametreler yoksa dummy data kullan
  const flights = flightData.from ? [
    { 
      id: '1', 
      from: flightData.from, 
      to: flightData.to, 
      date: flightData.dateRange, 
      time: '10:30', 
      price: `${flightData.totalPrice}€` 
    }
  ] : DUMMY_PARAMS.flights;
  
  const services = DUMMY_PARAMS.services;
  const totalPrice = flightData.totalPrice || DUMMY_PARAMS.totalPrice;

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);

  const validateEmail = (email: string) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  useEffect(() => {
    if (firstName && lastName && validateEmail(email) && phone.length > 5) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  }, [firstName, lastName, email, phone]);

  const handleReservation = () => {
    if (!isFormValid) {
        Alert.alert("Hata", "Lütfen tüm alanları doğru bir şekilde doldurun.");
        return;
    }
    const reservationData = {
        personalInfo: { firstName, lastName, email, phone },
        booking: { flights, services, totalPrice: formatPrice(totalPrice) }
    };
    console.log("Rezervasyon Tamamlandı:", JSON.stringify(reservationData, null, 2));
    Alert.alert("Başarılı", "Rezervasyonunuz başarıyla oluşturuldu!");
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"} 
        style={{ flex: 1 }}
      >
        <View style={styles.header}>
            <TouchableOpacity onPress={() => router.back()}>
                <Ionicons name="arrow-back" size={28} color="#0A2A43" />
            </TouchableOpacity>
            <Text style={styles.title}>Rezervasyonu Onayla</Text>
            <View style={{width: 28}} />
        </View>

        <ScrollView contentContainerStyle={styles.scrollContent}>
            <View style={styles.card}>
                <Text style={styles.sectionTitle}>Uçuş Özeti</Text>
                {flights.map((flight: Flight) => (
                    <View key={flight.id} style={styles.summaryItem}>
                        <Text style={styles.summaryText}>{flight.from} - {flight.to} ({flight.date})</Text>
                        <Text style={styles.summaryPrice}>{flight.price}</Text>
                    </View>
                ))}
            </View>

            <View style={styles.card}>
                <Text style={styles.sectionTitle}>Ek Hizmetler</Text>
                {services.length > 0 ? services.map((service: Service) => (
                    <View key={service.id} style={styles.summaryItem}>
                        <Text style={styles.summaryText}>{service.name}</Text>
                        <Text style={styles.summaryPrice}>{formatPrice(service.price)}</Text>
                    </View>
                )) : <Text style={styles.noServiceText}>Ek hizmet seçilmedi.</Text>}
            </View>

            <View style={styles.card}>
                <Text style={styles.sectionTitle}>Yolcu Bilgileri</Text>
                <TextInput style={styles.input} placeholder="Ad" value={firstName} onChangeText={setFirstName} />
                <TextInput style={styles.input} placeholder="Soyad" value={lastName} onChangeText={setLastName} />
                <TextInput style={styles.input} placeholder="E-posta" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />
                <TextInput style={styles.input} placeholder="Telefon" value={phone} onChangeText={setPhone} keyboardType="phone-pad" />
            </View>
        </ScrollView>

        <View style={styles.footer}>
            <View style={styles.totalContainer}>
                <Text style={styles.totalLabel}>Toplam Tutar</Text>
                <Text style={styles.totalPrice}>{formatPrice(totalPrice)}</Text>
            </View>
            <TouchableOpacity 
                style={[styles.continueButton, !isFormValid && styles.disabledButton]} 
                onPress={handleReservation}
                disabled={!isFormValid}
            >
                <Text style={styles.continueButtonText}>Rezervasyonu Tamamla</Text>
            </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f8ff',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        paddingVertical: 10,
        backgroundColor: 'white',
        borderBottomWidth: 1,
        borderBottomColor: '#e0f7fa',
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#0A2A43',
    },
    scrollContent: {
        padding: 20,
    },
    card: {
        backgroundColor: 'white',
        borderRadius: 15,
        padding: 20,
        marginBottom: 20,
        ...Platform.select({
            ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4 },
            android: { elevation: 3 },
        }),
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#0A2A43',
        marginBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#e0f7fa',
        paddingBottom: 10,
    },
    summaryItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 5,
    },
    summaryText: {
        fontSize: 16,
        color: '#0A2A43',
    },
    summaryPrice: {
        fontSize: 16,
        fontWeight: '500',
        color: '#1C7A8C',
    },
    noServiceText: {
        fontSize: 15,
        color: '#6c757d',
    },
    input: {
        backgroundColor: '#f8f9fa',
        borderRadius: 10,
        padding: 15,
        marginBottom: 15,
        fontSize: 16,
        borderWidth: 1,
        borderColor: '#e0f7fa',
        color: '#0A2A43',
    },
    footer: {
        backgroundColor: 'white',
        padding: 20,
        borderTopWidth: 1,
        borderTopColor: '#e0f7fa',
    },
    totalContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
    },
    totalLabel: {
        fontSize: 18,
        color: '#6c757d',
        fontWeight: '500'
    },
    totalPrice: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#0A2A43',
    },
    continueButton: {
        backgroundColor: '#38BDF8',
        borderRadius: 10,
        paddingVertical: 15,
        alignItems: 'center',
    },
    disabledButton: {
        backgroundColor: '#a0e0fa',
    },
    continueButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
}); 