import Ionicons from '@expo/vector-icons/Ionicons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    Alert,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { Calendar, DateData } from 'react-native-calendars';
import { MarkedDates } from 'react-native-calendars/src/types';
import Colors from '../constants/Colors';

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('tr-TR', { day: 'numeric', month: 'long' });
};

export default function FavoriteFlightDetailScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  
  // Uçuş bilgileri params'dan alınıyor
  const flight = {
    from: params.from as string,
    to: params.to as string,
    duration: params.duration as string,
    price: parseInt(params.price as string),
    type: params.type as string,
    description: params.description as string
  };

  const [passengers, setPassengers] = useState(1);
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDates, setSelectedDates] = useState<MarkedDates>({});
  const [dateRangeText, setDateRangeText] = useState('Tarih Seçiniz');

  const incrementPassengers = () => setPassengers((p) => Math.min(p + 1, 8));
  const decrementPassengers = () => setPassengers((p) => Math.max(p - 1, 1));

  const onDayPress = (day: DateData) => {
    const { dateString } = day;
    
    // Tek tarih seçimi (gidiş-dönüş için aynı tarih)
    const newDates = {
      [dateString]: { startingDay: true, endingDay: true, color: Colors.primary, textColor: 'white' },
    };
    setSelectedDates(newDates);
    setDateRangeText(formatDate(dateString));
    setTimeout(() => setShowCalendar(false), 300);
  };

  const calculateTotalPrice = () => {
    return flight.price; // Sabit fiyat, yolcu sayısına göre değişmez
  };

  const handleReservation = () => {
    console.log('Rezervasyon butonuna tıklandı');
    
    if (dateRangeText === 'Tarih Seçiniz') {
      Alert.alert('Hata', 'Lütfen tarih seçiniz.');
      return;
    }

    console.log('Tarih seçildi, rezervasyon bilgileri hazırlanıyor...');
    console.log('Flight data:', flight);

    // Unified reservation sayfasına yönlendir
    try {
      router.push({
        pathname: '/unified-reservation',
        params: {
          from: flight.from,
          to: flight.to,
          passengers: passengers.toString(),
          dateRange: dateRangeText,
          totalPrice: calculateTotalPrice().toString(),
          flightType: flight.type,
          duration: flight.duration,
          description: flight.description
        }
      });
      console.log('Yönlendirme başarılı');
    } catch (error) {
      console.error('Yönlendirme hatası:', error);
      Alert.alert('Hata', 'Yönlendirme yapılırken bir hata oluştu.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color={Colors.primary} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Uçuş Detayı</Text>
        </View>

        {/* Flight Card */}
        <View style={styles.flightCard}>
          <View style={styles.flightHeader}>
            <View style={styles.routeContainer}>
              <Text style={styles.fromText}>{flight.from}</Text>
              <Ionicons name="airplane" size={20} color={Colors.primary} style={styles.planeIcon} />
              <Text style={styles.toText}>{flight.to}</Text>
            </View>
            <View style={styles.typeBadge}>
              <Text style={styles.typeText}>
                {flight.type === 'roundtrip' ? 'Gidiş-Dönüş' : 
                 flight.type === 'trnc' ? 'KKTC' : 'VIP'}
              </Text>
            </View>
          </View>
          
          <Text style={styles.description}>{flight.description}</Text>
          
          <View style={styles.flightDetails}>
            <View style={styles.detailItem}>
              <Ionicons name="time-outline" size={16} color={Colors.textSoft} />
              <Text style={styles.detailText}>{flight.duration}</Text>
            </View>
            <View style={styles.detailItem}>
              <Ionicons name="cash-outline" size={16} color={Colors.textSoft} />
              <Text style={styles.detailText}>{flight.price.toLocaleString()} €</Text>
            </View>
          </View>
        </View>

        {/* Passenger Selection */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Yolcu Sayısı</Text>
          <View style={styles.passengerContainer}>
            <TouchableOpacity onPress={decrementPassengers} style={styles.passengerButton}>
              <Ionicons name="remove" size={20} color={Colors.primary} />
            </TouchableOpacity>
            <Text style={styles.passengerCount}>{passengers}</Text>
            <TouchableOpacity onPress={incrementPassengers} style={styles.passengerButton}>
              <Ionicons name="add" size={20} color={Colors.primary} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Date Selection */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Tarih Seçimi</Text>
          <TouchableOpacity 
            style={styles.dateButton} 
            onPress={() => setShowCalendar(true)}
          >
            <Ionicons name="calendar-outline" size={20} color={Colors.primary} />
            <Text style={styles.dateButtonText}>{dateRangeText}</Text>
            <Ionicons name="chevron-down" size={20} color={Colors.textSoft} />
          </TouchableOpacity>
        </View>

        {/* Calendar Modal */}
        {showCalendar && (
          <View style={styles.calendarOverlay}>
            <View style={styles.calendarContainer}>
              <View style={styles.calendarHeader}>
                <Text style={styles.calendarTitle}>Tarih Seçin</Text>
                <TouchableOpacity onPress={() => setShowCalendar(false)}>
                  <Ionicons name="close" size={24} color={Colors.text} />
                </TouchableOpacity>
              </View>
              <Calendar
                onDayPress={onDayPress}
                markedDates={selectedDates}
                theme={{
                  selectedDayBackgroundColor: Colors.primary,
                  selectedDayTextColor: 'white',
                  todayTextColor: Colors.primary,
                  dayTextColor: Colors.text,
                  textDisabledColor: Colors.textSoft,
                  arrowColor: Colors.primary,
                  monthTextColor: Colors.text,
                  indicatorColor: Colors.primary,
                }}
              />
            </View>
          </View>
        )}

        {/* Price Summary */}
        <View style={styles.priceSection}>
          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>Uçuş Fiyatı:</Text>
            <Text style={styles.priceValue}>{flight.price.toLocaleString()} €</Text>
          </View>
          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>Yolcu Sayısı:</Text>
            <Text style={styles.priceValue}>{passengers}</Text>
          </View>
          <View style={[styles.priceRow, styles.totalRow]}>
            <Text style={styles.totalLabel}>Toplam:</Text>
            <Text style={styles.totalValue}>{calculateTotalPrice().toLocaleString()} €</Text>
          </View>
        </View>

        {/* Reserve Button */}
        <TouchableOpacity 
          style={styles.reserveButton}
          onPress={() => {
            console.log('Butona tıklandı!');
            handleReservation();
          }}
        >
          <Text style={styles.reserveButtonText}>
            Rezervasyon Al
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollContainer: {
    padding: 20,
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.text,
    marginLeft: 12,
  },
  flightCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  flightHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  routeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  fromText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
  },
  planeIcon: {
    marginHorizontal: 12,
    transform: [{ rotate: '45deg' }],
  },
  toText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
  },
  typeBadge: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  typeText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: 'white',
  },
  description: {
    fontSize: 14,
    color: Colors.textSoft,
    marginBottom: 16,
    lineHeight: 20,
  },
  flightDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailText: {
    fontSize: 14,
    color: Colors.textSoft,
    marginLeft: 6,
  },
  section: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
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
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 16,
  },
  passengerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  passengerButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  passengerCount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
    marginHorizontal: 24,
    minWidth: 30,
    textAlign: 'center',
  },
  dateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: Colors.background,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  dateButtonText: {
    fontSize: 16,
    color: Colors.text,
    flex: 1,
    marginLeft: 12,
  },
  calendarOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  calendarContainer: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    margin: 20,
    maxHeight: '80%',
  },
  calendarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  calendarTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
  },
  priceSection: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  priceLabel: {
    fontSize: 16,
    color: Colors.textSoft,
  },
  priceValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.text,
  },
  totalRow: {
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    paddingTop: 12,
    marginTop: 8,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
  },
  totalValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.primary,
  },
  reserveButton: {
    backgroundColor: Colors.primary,
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  reserveButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
}); 