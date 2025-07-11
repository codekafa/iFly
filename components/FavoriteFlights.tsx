import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Colors from '../constants/Colors';

interface FavoriteFlightsProps {
  onFlightSelect?: (flight: any) => void;
}

// Select 5 popular flights for display
const FAVORITE_FLIGHTS = [
  {
    id: 1,
    from: 'Antalya',
    to: 'Kıbrıs',
    duration: '01:15',
    price: 3200,
    type: 'roundtrip',
    tabIndex: 0, // Şehir İçi Tur tab
    description: 'Antalya - Kıbrıs Gidiş Dönüş',
    fromImage: require('../assets/images/destinatons/antalya.jpg'),
    toImage: require('../assets/images/destinatons/kıbrıs.jpg'),
    planeImage: require('../assets/images/planes/commercial.jpg')
  },
  {
    id: 2,
    from: 'Antalya',
    to: 'Dalaman',
    duration: '01:20',
    price: 3200,
    type: 'roundtrip',
    tabIndex: 0,
    description: 'Antalya - Dalaman Gidiş Dönüş',
    fromImage: require('../assets/images/destinatons/antalya.jpg'),
    toImage: require('../assets/images/destinatons/antalya.jpg'), // Dalaman için Antalya kullanıyoruz
    planeImage: require('../assets/images/planes/commercial.jpg')
  },
  {
    id: 3,
    from: 'Kıbrıs',
    to: 'Antalya',
    duration: '01:15',
    price: 6400,
    type: 'trnc',
    tabIndex: 1, // KKTC tab
    description: 'Kıbrıs - Antalya Tek Yön',
    fromImage: require('../assets/images/destinatons/kıbrıs.jpg'),
    toImage: require('../assets/images/destinatons/antalya.jpg'),
    planeImage: require('../assets/images/planes/commercial.jpg')
  },
  {
    id: 4,
    from: 'Antalya',
    to: 'Gazipaşa',
    duration: '00:45',
    price: 2400,
    type: 'vip',
    tabIndex: 2, // Özel Uçuş tab
    description: 'Antalya - Gazipaşa VIP',
    fromImage: require('../assets/images/destinatons/antalya.jpg'),
    toImage: require('../assets/images/destinatons/gazipasa.jpg'),
    planeImage: require('../assets/images/planes/vip-jet.jpg')
  },
  {
    id: 5,
    from: 'Bodrum',
    to: 'Kıbrıs',
    duration: '01:30',
    price: 7200,
    type: 'vip',
    tabIndex: 2,
    description: 'Bodrum - Kıbrıs Özel Uçuş',
    fromImage: require('../assets/images/destinatons/bodrum.jpg'),
    toImage: require('../assets/images/destinatons/kıbrıs.jpg'),
    planeImage: require('../assets/images/planes/vip-jet.jpg')
  }
];

export default function FavoriteFlights({ onFlightSelect }: FavoriteFlightsProps) {
  const router = useRouter();

  const handleFlightSelect = (flight: any) => {
    if (onFlightSelect) {
      onFlightSelect(flight);
    } else {
      // Yeni sayfaya yönlendir
      router.push({
        pathname: '/favorite-flight-detail',
        params: {
          from: flight.from,
          to: flight.to,
          duration: flight.duration,
          price: flight.price.toString(),
          type: flight.type,
          description: flight.description
        }
      });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="heart" size={20} color={Colors.primary} />
        <Text style={styles.title}>Favori Uçuşlar</Text>
      </View>
      <View style={styles.listContainer}>
        {FAVORITE_FLIGHTS.map((flight) => (
          <TouchableOpacity
            key={flight.id}
            style={styles.flightCard}
            onPress={() => handleFlightSelect(flight)}
            activeOpacity={0.7}
          >
            <View style={styles.flightHeader}>
              <View style={styles.routeContainer}>
                <View style={styles.locationContainer}>
                  <Image 
                    source={flight.fromImage} 
                    style={styles.locationImage}
                    resizeMode="cover"
                    fadeDuration={0}
                  />
                  <Text style={styles.fromText}>{flight.from}</Text>
                </View>
                <View style={styles.planeIconContainer}>
                  <Ionicons name="airplane" size={20} color={Colors.primary} style={styles.planeIcon} />
                </View>
                <View style={styles.locationContainer}>
                  <Image 
                    source={flight.toImage} 
                    style={styles.locationImage}
                    resizeMode="cover"
                    fadeDuration={0}
                  />
                  <Text style={styles.toText}>{flight.to}</Text>
                </View>
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
                <Ionicons name="time-outline" size={14} color={Colors.textSoft} />
                <Text style={styles.detailText}>{flight.duration}</Text>
              </View>
              <View style={styles.detailItem}>
                <Ionicons name="cash-outline" size={14} color={Colors.textSoft} />
                <Text style={styles.detailText}>{flight.price.toLocaleString()} €</Text>
              </View>
            </View>
            <View style={styles.selectButton}>
              <Text style={styles.selectButtonText}>Seç</Text>
              <Ionicons name="arrow-forward" size={14} color="white" />
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    marginBottom: 10,
    width: '100%',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    paddingHorizontal: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
    marginLeft: 8,
  },
  listContainer: {
    width: '100%',
    flexDirection: 'column',
    gap: 12,
  },
  flightCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    marginBottom: 8,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  flightHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  routeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  locationImage: {
    width: 40,
    height: 40,
    borderRadius: 8,
    marginRight: 8,
  },
  fromText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.text,
  },
  planeIconContainer: {
    marginHorizontal: 8,
  },
  planeIcon: {
    transform: [{ rotate: '45deg' }],
  },
  toText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.text,
  },
  typeBadge: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  typeText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: 'white',
  },
  description: {
    fontSize: 12,
    color: Colors.textSoft,
    marginBottom: 12,
    lineHeight: 16,
  },
  flightDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailText: {
    fontSize: 12,
    color: Colors.textSoft,
    marginLeft: 4,
  },
  selectButton: {
    backgroundColor: Colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    borderRadius: 8,
    marginTop: 4,
  },
  selectButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
    marginRight: 4,
  },
}); 