import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
    FlatList,
    Platform,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

// Types
type Flight = {
  id: string;
  from: string;
  to: string;
  date: string;
  time: string;
  price: string; // "8900₺" formatında
};

type ExtraService = {
  id: string;
  name: string;
  price: number;
};

// Dummy Data
const initialFlights: Flight[] = [
  {
    id: '1',
    from: 'Alanya',
    to: 'Kıbrıs',
    date: '2025-06-15',
    time: '10:30',
    price: '8900₺',
  },
  {
    id: '4',
    from: 'Kıbrıs',
    to: 'Alanya',
    date: '2025-06-17',
    time: '18:45',
    price: '9200₺',
  },
];

const extraServicesData: ExtraService[] = [
  { id: '1', name: 'Ekstra Bagaj', price: 1000 },
  { id: '2', name: 'VIP Transfer', price: 1500 },
  { id: '3', name: 'İçecek Servisi', price: 500 },
];

const parsePrice = (price: string): number => {
    return parseFloat(price.replace('₺', '').replace('.', ''));
}

const formatPrice = (price: number): string => {
    return `${price.toLocaleString('tr-TR')}₺`;
}


// Components
const CartItem = ({ item, onDelete }: { item: Flight, onDelete: (id: string) => void }) => (
  <View style={styles.card}>
    <View style={styles.cardContent}>
        <View style={styles.flightInfo}>
            <Text style={styles.flightRoute}>{item.from} - {item.to}</Text>
            <Text style={styles.flightDetails}>{new Date(item.date).toLocaleDateString('tr-TR')} - {item.time}</Text>
        </View>
        <Text style={styles.flightPrice}>{item.price}</Text>
    </View>
    <TouchableOpacity onPress={() => onDelete(item.id)} style={styles.deleteButton}>
        <Ionicons name="trash-outline" size={24} color="#FF6B6B" />
    </TouchableOpacity>
  </View>
);

const Checkbox = ({ label, price, isSelected, onToggle }: { label: string, price: string, isSelected: boolean, onToggle: () => void }) => (
    <TouchableOpacity style={styles.checkboxContainer} onPress={onToggle}>
        <View style={[styles.checkbox, isSelected && styles.checkboxSelected]}>
            {isSelected && <Ionicons name="checkmark" size={18} color="white" />}
        </View>
        <Text style={styles.checkboxLabel}>{label}</Text>
        <Text style={styles.checkboxPrice}>{price}</Text>
    </TouchableOpacity>
)

export default function CartScreen() {
  const route = useRoute();
  const router = useRouter();
  const navigation = useNavigation();
  
  // State
  const [flights, setFlights] = useState<Flight[]>(initialFlights);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);

  // Effects
  useEffect(() => {
    // Gerçek senaryoda: setFlights(route.params?.selectedFlights || []);
  }, [route.params]);

  useEffect(() => {
    const flightsTotal = flights.reduce((sum, flight) => sum + parsePrice(flight.price), 0);
    const servicesTotal = selectedServices.reduce((sum, serviceId) => {
        const service = extraServicesData.find(s => s.id === serviceId);
        return sum + (service ? service.price : 0);
    }, 0);
    setTotalPrice(flightsTotal + servicesTotal);
  }, [flights, selectedServices]);

  // Handlers
  const handleToggleService = (serviceId: string) => {
    setSelectedServices(prev => 
        prev.includes(serviceId) 
        ? prev.filter(id => id !== serviceId)
        : [...prev, serviceId]
    );
  };
  
  const handleDeleteFlight = (flightId: string) => {
    setFlights(prev => prev.filter(flight => flight.id !== flightId));
  };

  const handleContinue = () => {
    const selectedServiceDetails = extraServicesData.filter(service => selectedServices.includes(service.id));
    router.push({
        pathname: '/reservation' as any,
        params: {
            flights,
            services: selectedServiceDetails,
            totalPrice
        }
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
         <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={28} color="#0A2A43" />
        </TouchableOpacity>
        <Text style={styles.title}>Sepetim</Text>
        <View style={{width: 28}} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.sectionTitle}>Uçuşlarınız</Text>
        {flights.length > 0 ? (
            <FlatList
                data={flights}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => <CartItem item={item} onDelete={handleDeleteFlight} />}
                scrollEnabled={false} // to prevent nested scroll
            />
        ) : (
            <Text style={styles.emptyText}>Sepetinizde uçuş bulunmuyor.</Text>
        )}
        

        <Text style={styles.sectionTitle}>Ek Hizmetler</Text>
        <View style={styles.servicesContainer}>
            {extraServicesData.map(service => (
                <Checkbox 
                    key={service.id}
                    label={service.name}
                    price={formatPrice(service.price)}
                    isSelected={selectedServices.includes(service.id)}
                    onToggle={() => handleToggleService(service.id)}
                />
            ))}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <View style={styles.totalContainer}>
            <Text style={styles.totalLabel}>Toplam Tutar</Text>
            <Text style={styles.totalPrice}>{formatPrice(totalPrice)}</Text>
        </View>
        <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
            <Text style={styles.continueButtonText}>Devam Et</Text>
        </TouchableOpacity>
      </View>
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
        borderBottomColor: '#e9ecef',
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#0A2A43',
    },
    scrollContent: {
        padding: 20,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#0A2A43',
        marginBottom: 15,
    },
    emptyText: {
        textAlign: 'center',
        color: '#6c757d',
        marginTop: 20,
        marginBottom: 20,
        fontSize: 16,
    },
    card: {
        backgroundColor: 'white',
        borderRadius: 15,
        padding: 15,
        marginBottom: 15,
        flexDirection: 'row',
        alignItems: 'center',
        ...Platform.select({
            ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4 },
            android: { elevation: 3 },
        }),
    },
    cardContent: {
        flex: 1,
    },
    flightInfo: {
        marginBottom: 5,
    },
    flightRoute: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#0A2A43',
    },
    flightDetails: {
        fontSize: 14,
        color: '#555',
    },
    flightPrice: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#1C7A8C',
        marginTop: 5,
    },
    deleteButton: {
        padding: 10,
        marginLeft: 10,
    },
    servicesContainer: {
        backgroundColor: 'white',
        borderRadius: 15,
        padding: 15,
        marginBottom: 20,
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
    },
    checkbox: {
        width: 24,
        height: 24,
        borderRadius: 5,
        borderWidth: 2,
        borderColor: '#1C7A8C',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
    },
    checkboxSelected: {
        backgroundColor: '#1C7A8C',
    },
    checkboxLabel: {
        flex: 1,
        fontSize: 16,
        color: '#343a40',
    },
    checkboxPrice: {
        fontSize: 16,
        fontWeight: '500',
        color: '#0A2A43',
    },
    footer: {
        backgroundColor: 'white',
        padding: 20,
        borderTopWidth: 1,
        borderTopColor: '#e9ecef',
        ...Platform.select({
            ios: { shadowColor: '#000', shadowOffset: { width: 0, height: -2 }, shadowOpacity: 0.1, shadowRadius: 4 },
            android: { elevation: 10 },
        }),
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
    continueButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
}); 