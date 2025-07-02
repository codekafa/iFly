import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { FlatList, Platform, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { getAvailableFlights, getFlightDetails } from '../constants/FlightData';

type Flight = {
    id: string;
    from: string;
    to: string;
    date: string;
    duration: string;
    price: number;
    tripType: 'oneway' | 'roundtrip';
    passengers: number;
    technicalRoute: string;
};

const FlightCard = ({ flight, onReservation }: { flight: Flight, onReservation: (flight: Flight) => void }) => {
  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <View style={styles.locationContainer}>
          <Text style={styles.location}>{flight.from}</Text>
          <Ionicons name="airplane" size={24} color="#1C7A8C" style={styles.airplaneIcon} />
          <Text style={styles.location}>{flight.to}</Text>
        </View>
        <Text style={styles.price}>{flight.price} €</Text>
      </View>
      
      <View style={styles.technicalRoute}>
        <Ionicons name="information-circle-outline" size={16} color="#666" />
        <Text style={styles.technicalRouteText}>Teknik Rota: {flight.technicalRoute}</Text>
      </View>
      
      <View style={styles.separator} />
      <View style={styles.cardBody}>
        <View style={styles.infoRow}>
          <Ionicons name="calendar-outline" size={16} color="#666" />
          <Text style={styles.infoText}>{new Date(flight.date).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' })}</Text>
        </View>
        <View style={styles.infoRow}>
          <Ionicons name="timer-outline" size={16} color="#666" />
          <Text style={styles.infoText}>{flight.duration}</Text>
        </View>
        <View style={styles.infoRow}>
          <Ionicons name="people-outline" size={16} color="#666" />
          <Text style={styles.infoText}>{flight.passengers} Yolcu • {flight.tripType === 'oneway' ? 'Tek Yön' : 'Gidiş-Dönüş'}</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.reservationButton} onPress={() => onReservation(flight)}>
        <Text style={styles.reservationButtonText}>Rezervasyon</Text>
      </TouchableOpacity>
    </View>
  );
};

export default function FlightResultsScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const router = useRouter();
  const [flights, setFlights] = useState<Flight[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (route.params) {
      const { from, to, passengers, tripType, dateRange } = route.params as any;
      generateFlights(from, to, passengers, tripType, dateRange);
    }
  }, [route.params]);

  const generateFlights = (from: string, to: string, passengers: number, tripType: string, dateRange: string) => {
    setError(null);
    const generatedFlights: Flight[] = [];
    
    // Parse selected date from dateRange
    let selectedDate = new Date().toISOString().split('T')[0];
    if (dateRange && dateRange !== 'Tarih Aralığı') {
      // Extract first date from range (e.g., "15 Ocak - 20 Ocak" -> "15 Ocak")
      const firstDateStr = dateRange.split(' - ')[0];
      if (firstDateStr) {
        // Convert Turkish date format to ISO date
        const dateParts = firstDateStr.split(' ');
        const monthMap: { [key: string]: string } = {
          'Ocak': '01', 'Şubat': '02', 'Mart': '03', 'Nisan': '04',
          'Mayıs': '05', 'Haziran': '06', 'Temmuz': '07', 'Ağustos': '08',
          'Eylül': '09', 'Ekim': '10', 'Kasım': '11', 'Aralık': '12'
        };
        const day = dateParts[0];
        const month = monthMap[dateParts[1]];
        const year = new Date().getFullYear();
        if (day && month) {
          selectedDate = `${year}-${month}-${day.padStart(2, '0')}`;
        }
      }
    }
    
    // Check if it's a city tour (same location)
    if (from && to && from.toLowerCase() === to.toLowerCase()) {
      const isRoundTrip = tripType === 'roundtrip';
      const availableFlights = getAvailableFlights(from, to, isRoundTrip);
      
      if (availableFlights.length > 0) {
        // Use the actual flight data from FlightData.ts
        availableFlights.forEach((flightData, index) => {
          generatedFlights.push({
            id: `citytour-${index + 1}`,
            from: flightData.from.toUpperCase(),
            to: flightData.to.toUpperCase(),
            date: selectedDate,
            duration: flightData.duration,
            price: flightData.price,
            tripType: isRoundTrip ? 'roundtrip' : 'oneway',
            passengers: passengers,
            technicalRoute: `${flightData.from.toUpperCase()} → ${flightData.to.toUpperCase()} (Şehir Turu)`
          });
        });
      } else {
        // Fallback for city tour
        generatedFlights.push({
          id: 'citytour-1',
          from: from.toUpperCase(),
          to: to.toUpperCase(),
          date: selectedDate,
          duration: '01:00',
          price: from.toLowerCase() === 'antalya' ? 3200 : 6400,
          tripType: tripType as 'oneway' | 'roundtrip',
          passengers: passengers,
          technicalRoute: `${from.toUpperCase()} → ${to.toUpperCase()} (Şehir Turu)`
        });
      }
    } else {
      // Regular flights between different locations
      if (!from || !to) {
        setFlights([]);
        setError('Lütfen kalkış ve varış noktalarını seçin.');
        return;
      }
      
      const isRoundTrip = tripType === 'roundtrip';
      const availableFlights = getAvailableFlights(from, to, isRoundTrip);
      
      if (availableFlights.length > 0) {
        // Use the actual flight data from FlightData.ts
        availableFlights.forEach((flightData, index) => {
          generatedFlights.push({
            id: `flight-${index + 1}`,
            from: flightData.from.toUpperCase(),
            to: flightData.to.toUpperCase(),
            date: selectedDate,
            duration: flightData.duration,
            price: flightData.price,
            tripType: isRoundTrip ? 'roundtrip' : 'oneway',
            passengers: passengers,
            technicalRoute: `${flightData.from.toUpperCase()} → ${flightData.to.toUpperCase()}`
          });
        });
      } else {
        // Fallback: create sample flights if no exact route found
        const flightDetails = getFlightDetails(from, to, isRoundTrip);
        if (flightDetails) {
          const timeSlots = ['08:00', '12:00', '16:00', '20:00'];
          timeSlots.forEach((slot, index) => {
            generatedFlights.push({
              id: `flight-${index + 1}`,
              from: from.toUpperCase(),
              to: to.toUpperCase(),
              date: selectedDate,
              duration: flightDetails.duration,
              price: flightDetails.price,
              tripType: isRoundTrip ? 'roundtrip' : 'oneway',
              passengers: passengers,
              technicalRoute: `${from.toUpperCase()} → ${to.toUpperCase()}`
            });
          });
        } else {
          setFlights([]);
          setError('Seçtiğiniz rota için uçuş bulunamadı. Lütfen farklı bir rota deneyin.');
          return;
        }
      }
    }
    
    setFlights(generatedFlights);
  };
  
  const handleReservation = (flight: Flight) => {
    // Unified reservation sayfasına yönlendir
    const params = {
      from: flight.from,
      to: flight.to,
      passengers: flight.passengers.toString(),
      dateRange: new Date(flight.date).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' }),
      tripType: flight.tripType,
      totalPrice: flight.price.toString()
    };
    
    // Expo Router kullanarak yönlendirme
    router.push({
      pathname: '/unified-reservation',
      params: params
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
       <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={28} color="#0A2A43" />
        </TouchableOpacity>
        <Text style={styles.title}>Uçuş Sonuçları</Text>
        <View style={{ width: 28 }} /> 
      </View>
      {error ? (
        <View style={styles.emptyState}>
          <Ionicons name="alert-circle-outline" size={64} color="#FF6B6B" />
          <Text style={styles.emptyStateText}>{error}</Text>
        </View>
      ) : flights.length === 0 ? (
        <View style={styles.emptyState}>
          <Ionicons name="airplane-outline" size={64} color="#ccc" />
          <Text style={styles.emptyStateText}>Uçuş bulunamadı</Text>
        </View>
      ) : (
        <FlatList
          data={flights}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <FlightCard flight={item} onReservation={handleReservation} />}
          contentContainerStyle={styles.listContent}
        />
      )}
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
    ...Platform.select({
        ios: {
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 2,
        },
        android: {
          elevation: 4,
        },
      }),
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#0A2A43',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyStateText: {
    fontSize: 18,
    color: '#666',
    marginTop: 16,
  },
  listContent: {
    padding: 10,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    marginVertical: 10,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  location: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0A2A43',
  },
  airplaneIcon: {
    marginHorizontal: 10,
  },
  price: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1C7A8C',
  },
  technicalRoute: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
  },
  technicalRouteText: {
    marginLeft: 6,
    fontSize: 12,
    color: '#666',
    fontStyle: 'italic',
  },
  separator: {
    height: 1,
    backgroundColor: '#e9ecef',
    marginBottom: 15,
  },
  cardBody: {
    marginBottom: 20,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  infoText: {
    marginLeft: 8,
    fontSize: 16,
    color: '#555',
  },
  reservationButton: {
    backgroundColor: '#1C7A8C',
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
  },
  reservationButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
}); 