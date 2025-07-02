import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Modal, Platform, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Calendar, DateData } from 'react-native-calendars';
import { MarkedDates } from 'react-native-calendars/src/types';
import { calculateFlightPrice, FLIGHT_LOCATIONS, getAvailableDestinations } from '../../constants/FlightData';
import { CustomPicker } from './CustomPicker';

const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('tr-TR', { day: 'numeric', month: 'long' });
};

interface BaseFormProps {
  isRoundTrip?: boolean;
  fromFixed?: string;
  toFixed?: string;
  toOptional?: boolean;
  isRoundTripOnly?: boolean;
  initialFrom?: string;
  initialTo?: string;
  initialTripType?: 'oneway' | 'roundtrip';
}

export const BaseForm = ({ isRoundTrip = false, fromFixed, toFixed, toOptional, isRoundTripOnly = false, initialFrom, initialTo, initialTripType }: BaseFormProps) => {
  const router = useRouter();
  const [from, setFrom] = useState<string | null>(fromFixed || initialFrom || null);
  const [to, setTo] = useState<string | null>(toFixed || initialTo || null);
  const [passengers, setPassengers] = useState(1);
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDates, setSelectedDates] = useState<MarkedDates>({});
  const [dateRangeText, setDateRangeText] = useState('Tarih Aralığı');
  const [tripType, setTripType] = useState<'oneway' | 'roundtrip'>(initialTripType || 'oneway');
  const [availableDestinations, setAvailableDestinations] = useState(FLIGHT_LOCATIONS);

  // Update available destinations when departure location changes
  useEffect(() => {
    if (from) {
      const destinations = getAvailableDestinations(from);
      setAvailableDestinations(destinations);
      if (to && !destinations.find(d => d.value === to)) {
        setTo(null);
      }
    } else {
      setAvailableDestinations(FLIGHT_LOCATIONS);
    }
  }, [from, to]);

  // If fromFixed changes, update from
  useEffect(() => {
    if (fromFixed) setFrom(fromFixed);
  }, [fromFixed]);
  // If toFixed changes, update to
  useEffect(() => {
    if (toFixed) setTo(toFixed);
  }, [toFixed]);

  // For roundtrip only: when departure changes, automatically set destination to same location
  useEffect(() => {
    if (isRoundTripOnly && from) {
      setTo(from);
    }
  }, [from, isRoundTripOnly]);

  const onDayPress = (day: DateData) => {
    const { dateString } = day;
    const dates = Object.keys(selectedDates);
    
    // For one-way trips, select single date and close calendar
    if (tripType === 'oneway' || isRoundTripOnly) {
      const newDates = {
        [dateString]: { startingDay: true, endingDay: true, color: '#1C7A8C', textColor: 'white' },
      };
      setSelectedDates(newDates);
      setDateRangeText(formatDate(dateString));
      setTimeout(() => setShowCalendar(false), 300);
      return;
    }
    
    // For roundtrip trips, select date range
    if (dates.length === 0 || dates.length === 2) {
      const newDates = {
        [dateString]: { startingDay: true, color: '#1C7A8C', textColor: 'white' },
      };
      setSelectedDates(newDates);
      setDateRangeText(`${formatDate(dateString)} - ...`);
    } else {
      const startDateString = dates[0];
      const startDate = new Date(startDateString);
      const endDate = new Date(dateString);

      if (endDate < startDate) {
        const newDates = {
          [dateString]: { startingDay: true, color: '#1C7A8C', textColor: 'white' },
        };
        setSelectedDates(newDates);
        setDateRangeText(`${formatDate(dateString)} - ...`);
        return;
      }

      let newDates: MarkedDates = { ...selectedDates };
      let currentDate = new Date(startDate);

      while (currentDate <= endDate) {
        const dString = currentDate.toISOString().split('T')[0];
        newDates[dString] = {
          ...newDates[dString],
          color: '#1C7A8C',
          textColor: 'white',
          endingDay: dString === dateString,
        };
        currentDate.setDate(currentDate.getDate() + 1);
      }
      setSelectedDates(newDates);
      setDateRangeText(`${formatDate(startDateString)} - ${formatDate(dateString)}`);
      setTimeout(() => setShowCalendar(false), 300);
    }
  };

  const incrementPassengers = () => setPassengers((p) => Math.min(p + 1, 8));
  const decrementPassengers = () => setPassengers((p) => Math.max(p - 1, 1));

  // Calculate price for roundtrip only
  const calculateRoundTripPrice = (departure: string) => {
    if (departure === 'Antalya') {
      return 3200;
    } else {
      return 6200; // For non-Antalya departures
    }
  };

  const handleSearch = () => {
    // from/to validation
    if (!from) {
      alert('Lütfen kalkış noktasını seçiniz.');
      return;
    }
    if (!toFixed && !to && !toOptional && !isRoundTripOnly) {
      alert('Lütfen varış noktasını seçiniz.');
      return;
    }

    let totalPrice: number;
    let destination: string;

    if (isRoundTripOnly) {
      // For roundtrip only, destination is same as departure
      destination = from;
      totalPrice = calculateRoundTripPrice(from);
    } else {
      // Regular flight pricing
      destination = to || (toFixed || '');
      totalPrice = calculateFlightPrice(from, destination, tripType === 'roundtrip');
    }

    router.push({
        pathname: '/results' as any,
        params: { 
          from, 
          to: destination,
          passengers, 
          dateRange: dateRangeText,
          tripType: isRoundTripOnly ? 'roundtrip' : tripType,
          totalPrice: totalPrice.toString()
        }
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.card} keyboardShouldPersistTaps="handled">
      {/* Trip Type Selection - Hidden for roundtrip only */}
      {!isRoundTripOnly && (
        <View style={styles.tripTypeContainer}>
          <TouchableOpacity 
            style={[styles.tripTypeButton, tripType === 'oneway' && styles.tripTypeButtonActive]}
            onPress={() => setTripType('oneway')}
          >
            <Text style={[styles.tripTypeText, tripType === 'oneway' && styles.tripTypeTextActive]}>
              Tek Yön
            </Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.tripTypeButton, tripType === 'roundtrip' && styles.tripTypeButtonActive]}
            onPress={() => setTripType('roundtrip')}
          >
            <Text style={[styles.tripTypeText, tripType === 'roundtrip' && styles.tripTypeTextActive]}>
              Gidiş-Dönüş
            </Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Kalkış Noktası */}
      {!fromFixed && (
        <View style={styles.inputContainer}>
          <Ionicons name="location-outline" size={24} color="#1C7A8C" style={styles.inputIcon} />
          <CustomPicker
              placeholder={{ label: 'Nereden?', value: null }}
              items={FLIGHT_LOCATIONS}
              onValueChange={(value) => setFrom(value)}
              value={from}
          />
        </View>
      )}
      {fromFixed && (
        <View style={[styles.inputContainer, { backgroundColor: '#f5f5f5' }]}> 
          <Ionicons name="location-outline" size={24} color="#cccccc" style={styles.inputIcon} />
          <Text style={{ color: '#888', fontSize: 16 }}>Antalya</Text>
        </View>
      )}

      {/* Varış Noktası - Hidden for roundtrip only */}
      {!isRoundTripOnly && !toFixed && (
        <View style={styles.inputContainer}>
          <Ionicons name="location" size={24} color="#1C7A8C" style={styles.inputIcon} />
          <CustomPicker
              placeholder={{ label: 'Nereye?', value: null }}
              items={availableDestinations}
              onValueChange={(value) => setTo(value)}
              value={to}
          />
        </View>
      )}
      {!isRoundTripOnly && toFixed && (
        <View style={[styles.inputContainer, { backgroundColor: '#f5f5f5' }]}> 
          <Ionicons name="location" size={24} color="#cccccc" style={styles.inputIcon} />
          <Text style={{ color: '#888', fontSize: 16 }}>{FLIGHT_LOCATIONS.find(l => l.value === toFixed)?.label || 'Kıbrıs'}</Text>
        </View>
      )}

      {/* Show destination info for roundtrip only */}
      {isRoundTripOnly && from && (
        <View style={[styles.inputContainer, { backgroundColor: '#f5f5f5' }]}> 
          <Ionicons name="location" size={24} color="#cccccc" style={styles.inputIcon} />
          <Text style={{ color: '#888', fontSize: 16 }}>
            {FLIGHT_LOCATIONS.find(l => l.value === from)?.label} (Gidiş-Dönüş)
          </Text>
        </View>
      )}

      <TouchableOpacity style={styles.inputContainer} onPress={() => setShowCalendar(true)}>
        <Ionicons name="calendar-outline" size={24} color="#1C7A8C" style={styles.inputIcon} />
        <Text style={styles.inputText}>{dateRangeText}</Text>
        <Ionicons name="chevron-down" size={24} color="#1C7A8C" />
      </TouchableOpacity>
      
      <View style={styles.passengerContainer}>
        <Ionicons name="person-outline" size={24} color="#1C7A8C" style={styles.inputIcon} />
        <Text style={styles.passengerLabel}>Yolcu Sayısı</Text>
        <View style={styles.passengerControl}>
          <TouchableOpacity onPress={decrementPassengers} style={styles.passengerButton}>
            <Ionicons name="remove" size={20} color="white" />
          </TouchableOpacity>
          <Text style={styles.passengerCount}>{passengers}</Text>
          <TouchableOpacity onPress={incrementPassengers} style={styles.passengerButton}>
            <Ionicons name="add" size={20} color="white" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Price Preview */}
      {from && (to || toFixed || toOptional || isRoundTripOnly) && (
        <View style={styles.pricePreview}>
          <Text style={styles.pricePreviewText}>
            Tahmini Fiyat: {
              isRoundTripOnly 
                ? calculateRoundTripPrice(from)
                : calculateFlightPrice(from, to || (toFixed || ''), tripType === 'roundtrip')
            } €
          </Text>
          <Text style={styles.priceDetailText}>
            {isRoundTripOnly 
              ? `Gidiş-Dönüş (${from === 'Antalya' ? 'Antalya' : 'Diğer Şehir'})`
              : (tripType === 'oneway' ? 'Tek Yön' : 'Gidiş-Dönüş')
            }
          </Text>
        </View>
      )}

      <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
        <Text style={styles.searchButtonText}>Uçuşları Ara</Text>
      </TouchableOpacity>

      <Modal visible={showCalendar} animationType="slide">
        <SafeAreaView style={{ flex: 1, justifyContent: 'center' }}>
          <Calendar
            onDayPress={onDayPress}
            markedDates={selectedDates}
            markingType={'period'}
            current={new Date().toISOString().split('T')[0]}
            minDate={new Date().toISOString().split('T')[0]}
            theme={{
                backgroundColor: '#ffffff',
                calendarBackground: '#ffffff',
                textSectionTitleColor: '#b6c1cd',
                selectedDayBackgroundColor: '#1C7A8C',
                selectedDayTextColor: '#ffffff',
                todayTextColor: '#38BDF8',
                dayTextColor: '#2d4150',
                textDisabledColor: '#d9e1e8',
                arrowColor: '#1C7A8C',
                monthTextColor: '#1C7A8C',
                indicatorColor: '#1C7A8C',
                textDayFontWeight: '300',
                textMonthFontWeight: 'bold',
                textDayHeaderFontWeight: '300',
                textDayFontSize: 16,
                textMonthFontSize: 16,
                textDayHeaderFontSize: 16,
            }}
          />
          <TouchableOpacity style={styles.closeButton} onPress={() => setShowCalendar(false)}>
            <Text style={styles.closeButtonText}>Kapat</Text>
          </TouchableOpacity>
        </SafeAreaView>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
    card: {
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      borderRadius: 20,
      paddingHorizontal: 20,
      paddingVertical: 30,
      marginHorizontal: 20,
      ...Platform.select({
        ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.1, shadowRadius: 10, },
        android: { elevation: 5, },
      }),
    },
    tripTypeContainer: {
      flexDirection: 'row',
      marginBottom: 20,
      backgroundColor: '#f8f9fa',
      borderRadius: 15,
      padding: 4,
    },
    tripTypeButton: {
      flex: 1,
      paddingVertical: 12,
      paddingHorizontal: 16,
      borderRadius: 12,
      alignItems: 'center',
    },
    tripTypeButtonActive: {
      backgroundColor: '#1C7A8C',
    },
    tripTypeText: {
      fontSize: 16,
      fontWeight: '600',
      color: '#666',
    },
    tripTypeTextActive: {
      color: '#fff',
    },
    inputContainer: {
        backgroundColor: '#FFFFFF',
        borderRadius: 15,
        height: 55,
        marginBottom: 15,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 15,
        borderWidth: 1,
        borderColor: '#E0F7FA'
    },
    disabledInputContainer: {
        backgroundColor: '#f5f5f5',
    },
    inputIcon: {
        marginRight: 10,
    },
    inputText: {
        flex: 1,
        fontSize: 16,
        color: '#0A2A43',
    },
    passengerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 25,
        marginTop: 10,
        backgroundColor: '#FFFFFF',
        borderRadius: 15,
        height: 55,
        paddingHorizontal: 15,
        borderWidth: 1,
        borderColor: '#E0F7FA'
    },
    passengerLabel: {
        flex: 1,
        fontSize: 16,
        color: '#0A2A43',
    },
    passengerControl: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    passengerButton: {
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: '#1C7A8C',
        justifyContent: 'center',
        alignItems: 'center',
    },
    passengerCount: {
        fontSize: 18,
        fontWeight: 'bold',
        marginHorizontal: 15,
        color: '#0A2A43',
    },
    pricePreview: {
      backgroundColor: '#E8F4FD',
      borderRadius: 12,
      padding: 15,
      marginBottom: 20,
      alignItems: 'center',
    },
    pricePreviewText: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#1C7A8C',
      marginBottom: 4,
    },
    priceDetailText: {
      fontSize: 14,
      color: '#666',
    },
    searchButton: {
        backgroundColor: '#38BDF8',
        borderRadius: 15,
        paddingVertical: 15,
        alignItems: 'center',
        marginTop: 10,
    },
    searchButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    closeButton: {
        backgroundColor: '#FF6B6B',
        borderRadius: 10,
        padding: 15,
        margin: 20,
        alignItems: 'center',
    },
    closeButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
}); 