import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Alert,
  Image,
  Modal,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { Calendar, DateData } from 'react-native-calendars';
import { MarkedDates } from 'react-native-calendars/src/types';

import FavoriteFlights from '../components/FavoriteFlights';
import FlyingIconsSlider from '../components/FlyingIconsSlider';
import { BodyText2, Card } from '../components/ui/CommonComponents';
import Colors from '../constants/Colors';
import { FLIGHT_LOCATIONS, getAvailableDestinations } from '../constants/FlightData';
import { BorderRadius, Shadows, Spacing, Typography } from '../constants/Styles';

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('tr-TR', { day: 'numeric', month: 'long' });
};

export default function HomeScreen() {
  const router = useRouter();
  const [selectedTab, setSelectedTab] = useState<'city' | 'trnc' | 'vip'>('city');
  
  // Form state
  const [formData, setFormData] = useState({
    from: '',
    to: '',
    passengers: 1,
    dateRange: 'Tarih Seçiniz',
    tripType: 'oneway' as 'oneway' | 'roundtrip'
  });

  // Modal states
  const [showFromPicker, setShowFromPicker] = useState(false);
  const [showToPicker, setShowToPicker] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDates, setSelectedDates] = useState<MarkedDates>({});

  const tabs = [
    { key: 'city', title: 'Şehir İçi Tur', icon: 'location-outline' },
    { key: 'trnc', title: 'KKTC', icon: 'airplane-outline' },
    { key: 'vip', title: 'Özel Uçuş', icon: 'diamond-outline' },
  ];

  // Get available destinations based on selected departure
  const getAvailableToLocations = () => {
    if (!formData.from) return FLIGHT_LOCATIONS;
    return getAvailableDestinations(formData.from);
  };

  const handleFlightSelect = (flight: any) => {
    // Navigate to favorite flight detail page
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
  };

  const handleFromSelect = (location: string) => {
    setFormData(prev => ({
      ...prev,
      from: location,
      // Clear destination if it's no longer valid
      to: prev.to && getAvailableDestinations(location).find(d => d.value === prev.to) ? prev.to : ''
    }));
    setShowFromPicker(false);
  };

  const handleToSelect = (location: string) => {
    setFormData(prev => ({
      ...prev,
      to: location
    }));
    setShowToPicker(false);
  };

  const onDayPress = (day: DateData) => {
    const { dateString } = day;
    
    // For one-way trips or city tours, select single date
    if (formData.tripType === 'oneway' || selectedTab === 'city') {
      const newDates = {
        [dateString]: { startingDay: true, endingDay: true, color: Colors.primary, textColor: 'white' },
      };
      setSelectedDates(newDates);
      setFormData(prev => ({
        ...prev,
        dateRange: formatDate(dateString)
      }));
      setTimeout(() => setShowCalendar(false), 300);
      return;
    }
    
    // For roundtrip trips, select date range
    const dates = Object.keys(selectedDates);
    if (dates.length === 0 || dates.length === 2) {
      const newDates = {
        [dateString]: { startingDay: true, color: Colors.primary, textColor: 'white' },
      };
      setSelectedDates(newDates);
      setFormData(prev => ({
        ...prev,
        dateRange: `${formatDate(dateString)} - ...`
      }));
    } else {
      const startDateString = dates[0];
      const startDate = new Date(startDateString);
      const endDate = new Date(dateString);

      if (endDate < startDate) {
        const newDates = {
          [dateString]: { startingDay: true, color: Colors.primary, textColor: 'white' },
        };
        setSelectedDates(newDates);
        setFormData(prev => ({
          ...prev,
          dateRange: `${formatDate(dateString)} - ...`
        }));
        return;
      }

      let newDates: MarkedDates = { ...selectedDates };
      let currentDate = new Date(startDate);

      while (currentDate <= endDate) {
        const dString = currentDate.toISOString().split('T')[0];
        newDates[dString] = {
          ...newDates[dString],
          color: Colors.primary,
          textColor: 'white',
          endingDay: dString === dateString,
        };
        currentDate.setDate(currentDate.getDate() + 1);
      }
      setSelectedDates(newDates);
      setFormData(prev => ({
        ...prev,
        dateRange: `${formatDate(startDateString)} - ${formatDate(dateString)}`
      }));
      setTimeout(() => setShowCalendar(false), 300);
    }
  };

  const handleSearch = () => {
    if (!formData.from) {
      Alert.alert('Hata', 'Lütfen kalkış noktasını seçiniz.');
      return;
    }

    if (selectedTab !== 'city' && !formData.to) {
      Alert.alert('Hata', 'Lütfen varış noktasını seçiniz.');
      return;
    }

    if (formData.dateRange === 'Tarih Seçiniz') {
      Alert.alert('Hata', 'Lütfen tarih seçiniz.');
      return;
    }

    // Navigate to results with form data
    router.push({
      pathname: '/results',
      params: {
        from: formData.from,
        to: formData.to || formData.from, // For city tours, destination is same as departure
        passengers: formData.passengers.toString(),
        dateRange: formData.dateRange,
        tripType: selectedTab === 'city' ? 'roundtrip' : formData.tripType,
        totalPrice: '0' // Will be calculated in results
      }
    });
  };

  const incrementPassengers = () => {
    setFormData(prev => ({
      ...prev,
      passengers: Math.min(prev.passengers + 1, 8)
    }));
  };

  const decrementPassengers = () => {
    setFormData(prev => ({
      ...prev,
      passengers: Math.max(prev.passengers - 1, 1)
    }));
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.primary} />
      
      {/* Header with Simple Background */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Image 
            source={require('../assets/images/ifly-logo.png')}
            style={styles.logoImage}
            resizeMode="cover"
            fadeDuration={0}
          />
          <BodyText2 style={styles.slogan}>We fly, you relax</BodyText2>
        </View>
      </View>

      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {/* Tab Navigation */}
        <View style={styles.tabContainer}>
          {tabs.map((tab) => (
            <TouchableOpacity
              key={tab.key}
              style={[
                styles.tabButton,
                selectedTab === tab.key && styles.tabButtonActive
              ]}
              onPress={() => setSelectedTab(tab.key as any)}
            >
              <Ionicons
                name={tab.icon as any}
                size={20}
                color={selectedTab === tab.key ? 'white' : Colors.textSoft}
                style={styles.tabIcon}
              />
              <Text style={[
                styles.tabText,
                selectedTab === tab.key && styles.tabTextActive
              ]}>
                {tab.title}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Search Form Card */}
        <Card style={styles.formCard}>
          {/* Trip Type Selection */}
          {selectedTab !== 'city' && (
            <View style={styles.tripTypeContainer}>
              <TouchableOpacity
                style={[
                  styles.tripTypeButton,
                  formData.tripType === 'oneway' && styles.tripTypeButtonActive
                ]}
                onPress={() => setFormData(prev => ({ ...prev, tripType: 'oneway' }))}
              >
                <Text style={[
                  styles.tripTypeText,
                  formData.tripType === 'oneway' && styles.tripTypeTextActive
                ]}>
                  Tek Yön
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.tripTypeButton,
                  formData.tripType === 'roundtrip' && styles.tripTypeButtonActive
                ]}
                onPress={() => setFormData(prev => ({ ...prev, tripType: 'roundtrip' }))}
              >
                <Text style={[
                  styles.tripTypeText,
                  formData.tripType === 'roundtrip' && styles.tripTypeTextActive
                ]}>
                  Gidiş-Dönüş
                </Text>
              </TouchableOpacity>
            </View>
          )}

          {/* From Input */}
          <View style={styles.inputContainer}>
            <View style={styles.inputWrapper}>
              <Ionicons name="location-outline" size={20} color={Colors.primary} style={styles.inputIcon} />
              <TouchableOpacity 
                style={styles.inputButton}
                onPress={() => setShowFromPicker(true)}
              >
                <Text style={[
                  styles.inputText,
                  !formData.from && styles.inputPlaceholder
                ]}>
                  {formData.from || 'Nereden?'}
                </Text>
                <Ionicons name="chevron-down" size={16} color={Colors.textSoft} />
              </TouchableOpacity>
            </View>
          </View>

          {/* To Input - Only for non-city tours */}
          {selectedTab !== 'city' && (
            <View style={styles.inputContainer}>
              <View style={styles.inputWrapper}>
                <Ionicons name="location" size={20} color={Colors.primary} style={styles.inputIcon} />
                <TouchableOpacity 
                  style={styles.inputButton}
                  onPress={() => setShowToPicker(true)}
                >
                  <Text style={[
                    styles.inputText,
                    !formData.to && styles.inputPlaceholder
                  ]}>
                    {formData.to || 'Nereye?'}
                  </Text>
                  <Ionicons name="chevron-down" size={16} color={Colors.textSoft} />
                </TouchableOpacity>
              </View>
            </View>
          )}

          {/* Passengers */}
          <View style={styles.inputContainer}>
            <View style={styles.inputWrapper}>
              <Ionicons name="people-outline" size={20} color={Colors.primary} style={styles.inputIcon} />
              <View style={styles.passengerContainer}>
                <TouchableOpacity onPress={decrementPassengers} style={styles.passengerButton}>
                  <Ionicons name="remove" size={16} color={Colors.primary} />
                </TouchableOpacity>
                <Text style={styles.passengerText}>{formData.passengers}</Text>
                <TouchableOpacity onPress={incrementPassengers} style={styles.passengerButton}>
                  <Ionicons name="add" size={16} color={Colors.primary} />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* Date Selection */}
          <View style={styles.inputContainer}>
            <View style={styles.inputWrapper}>
              <Ionicons name="calendar-outline" size={20} color={Colors.primary} style={styles.inputIcon} />
              <TouchableOpacity 
                style={styles.inputButton}
                onPress={() => setShowCalendar(true)}
              >
                <Text style={[
                  styles.inputText,
                  formData.dateRange === 'Tarih Seçiniz' && styles.inputPlaceholder
                ]}>
                  {formData.dateRange}
                </Text>
                <Ionicons name="chevron-down" size={16} color={Colors.textSoft} />
              </TouchableOpacity>
            </View>
          </View>

          {/* Search Button */}
          <View style={styles.searchButtonContainer}>
            <TouchableOpacity
              style={styles.customSearchButton}
              onPress={handleSearch}
              activeOpacity={0.8}
            >
              <View style={styles.searchButtonContent}>
                <Ionicons name="search" size={20} color="white" style={styles.searchIcon} />
                <Text style={styles.searchButtonText}>Ara</Text>
              </View>
            </TouchableOpacity>
          </View>
        </Card>

        {/* Flying Icons Slider */}
        <FlyingIconsSlider />

        {/* Favorite Flights */}
        <FavoriteFlights onFlightSelect={handleFlightSelect} />
      </ScrollView>

      {/* From Location Picker Modal */}
      <Modal
        visible={showFromPicker}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowFromPicker(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Kalkış Noktası Seçin</Text>
              <TouchableOpacity onPress={() => setShowFromPicker(false)}>
                <Ionicons name="close" size={24} color={Colors.text} />
              </TouchableOpacity>
            </View>
            <ScrollView style={styles.modalContent}>
              {FLIGHT_LOCATIONS.map((location) => (
                <TouchableOpacity
                  key={location.value}
                  style={styles.modalOption}
                  onPress={() => handleFromSelect(location.value)}
                >
                  <Text style={styles.modalOptionText}>{location.label}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* To Location Picker Modal */}
      <Modal
        visible={showToPicker}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowToPicker(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Varış Noktası Seçin</Text>
              <TouchableOpacity onPress={() => setShowToPicker(false)}>
                <Ionicons name="close" size={24} color={Colors.text} />
              </TouchableOpacity>
            </View>
            <ScrollView style={styles.modalContent}>
              {getAvailableToLocations().map((location) => (
                <TouchableOpacity
                  key={location.value}
                  style={styles.modalOption}
                  onPress={() => handleToSelect(location.value)}
                >
                  <Text style={styles.modalOptionText}>{location.label}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* Calendar Modal */}
      <Modal
        visible={showCalendar}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowCalendar(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Tarih Seçin</Text>
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
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    paddingTop: Spacing.sm,
    paddingBottom: Spacing.md,
    paddingHorizontal: Spacing.md,
    borderBottomLeftRadius: BorderRadius.lg,
    borderBottomRightRadius: BorderRadius.lg,
    ...Shadows.medium,
  },
  headerContent: {
    alignItems: 'center',
  },
  logoImage: {
    width: '60%',
    height: 60,
    marginBottom: Spacing.xs,
    resizeMode: 'contain',
  },
  slogan: {
    color: Colors.text,
    fontSize: 14,
    fontWeight: '500',
  },
  scrollContainer: {
    flex: 1,
    paddingHorizontal: Spacing.lg,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: BorderRadius.lg,
    padding: 2,
    marginTop: Spacing.lg,
    marginBottom: Spacing.lg,
    ...Shadows.medium,
  },
  tabButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.sm,
    borderRadius: BorderRadius.md,
  },
  tabButtonActive: {
    backgroundColor: Colors.primary,
  },
  tabIcon: {
    marginRight: Spacing.xs,
  },
  tabText: {
    ...Typography.body2,
    fontWeight: '600',
    color: Colors.textSoft,
  },
  tabTextActive: {
    color: 'white',
  },
  formCard: {
    marginBottom: Spacing.lg,
  },
  tripTypeContainer: {
    flexDirection: 'row',
    backgroundColor: Colors.background,
    borderRadius: BorderRadius.md,
    padding: Spacing.xs,
    marginBottom: Spacing.md,
  },
  tripTypeButton: {
    flex: 1,
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
    borderRadius: BorderRadius.sm,
    alignItems: 'center',
  },
  tripTypeButtonActive: {
    backgroundColor: Colors.primary,
  },
  tripTypeText: {
    ...Typography.body2,
    fontWeight: '600',
    color: Colors.textSoft,
  },
  tripTypeTextActive: {
    color: 'white',
  },
  inputContainer: {
    marginBottom: Spacing.md,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: BorderRadius.md,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  inputIcon: {
    marginRight: Spacing.sm,
  },
  inputButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: Spacing.xs,
  },
  inputText: {
    ...Typography.body1,
    color: Colors.text,
    flex: 1,
  },
  inputPlaceholder: {
    color: Colors.textSoft,
  },
  passengerContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.md,
  },
  passengerButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  passengerText: {
    ...Typography.h5,
    color: Colors.text,
    minWidth: 30,
    textAlign: 'center',
  },
  searchButtonContainer: {
    marginTop: Spacing.lg,
    paddingHorizontal: Spacing.xxl,
  },
  customSearchButton: {
    backgroundColor: Colors.primary,
    borderRadius: BorderRadius.lg,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.xl,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    minWidth: 120,
    ...Shadows.small,
  },
  searchButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchIcon: {
    marginRight: Spacing.sm,
  },
  searchButtonText: {
    ...Typography.button,
    fontSize: 18,
    color: 'white',
  },
  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: 'white',
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    margin: Spacing.lg,
    maxHeight: '80%',
    width: '90%',
    ...Shadows.large,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.lg,
    paddingBottom: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  modalTitle: {
    ...Typography.h5,
    color: Colors.text,
  },
  modalContent: {
    maxHeight: 300,
  },
  modalOption: {
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  modalOptionText: {
    ...Typography.body1,
    color: Colors.text,
  },

}); 