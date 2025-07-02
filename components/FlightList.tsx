import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { FLIGHT_ROUTES } from '../constants/FlightData';

const FlightList = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mevcut Uçuş Rotaları</Text>
      <Text style={styles.subtitle}>Antalya'dan Tek Yön Fiyatlar</Text>
      
      <ScrollView style={styles.scrollView}>
        {FLIGHT_ROUTES.map((route, index) => (
          <View key={index} style={styles.routeCard}>
            <View style={styles.routeHeader}>
              <View style={styles.routeInfo}>
                <Text style={styles.routeText}>
                  {route.from} - {route.to}
                </Text>
                <Text style={styles.durationText}>
                  {route.duration} • {route.time}
                </Text>
              </View>
              <View style={styles.priceContainer}>
                <Text style={styles.priceText}>{route.price} €</Text>
                <Text style={styles.priceLabel}>Tek Yön</Text>
              </View>
            </View>
            
            <View style={styles.technicalInfo}>
              <Ionicons name="information-circle-outline" size={14} color="#666" />
              <Text style={styles.technicalText}>
                Teknik kalkış: Antalya
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>
      
      <View style={styles.infoBox}>
        <Ionicons name="bulb-outline" size={20} color="#1C7A8C" />
        <Text style={styles.infoText}>
          • Gidiş-dönüş fiyatları tek yön fiyatının 2 katıdır{'\n'}
          • Antalya dışından kalkış durumunda çift tarife uygulanır{'\n'}
          • Tüm fiyatlar EUR cinsindendir
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f8ff',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0A2A43',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  scrollView: {
    flex: 1,
  },
  routeCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  routeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  routeInfo: {
    flex: 1,
  },
  routeText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0A2A43',
    marginBottom: 4,
  },
  durationText: {
    fontSize: 14,
    color: '#666',
  },
  priceContainer: {
    alignItems: 'flex-end',
  },
  priceText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1C7A8C',
  },
  priceLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  technicalInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  technicalText: {
    marginLeft: 6,
    fontSize: 12,
    color: '#666',
    fontStyle: 'italic',
  },
  infoBox: {
    backgroundColor: '#E8F4FD',
    borderRadius: 12,
    padding: 16,
    marginTop: 16,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  infoText: {
    marginLeft: 12,
    fontSize: 14,
    color: '#0A2A43',
    lineHeight: 20,
  },
});

export default FlightList; 