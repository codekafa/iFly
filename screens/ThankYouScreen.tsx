import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import {
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import Colors from '../constants/Colors';

export default function ThankYouScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();

  const handleBackToHome = () => {
    // Expo Router kullanarak ana sayfaya dön
    router.push('/');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <Ionicons name="checkmark-circle" size={80} color="#4CAF50" />
        </View>
        
        <Text style={styles.title}>Rezervasyon Talebiniz Alınmıştır!</Text>
        
        <Text style={styles.message}>
          Rezervasyon talebiniz başarıyla gönderildi. En kısa sürede size dönüş yapacağız.
        </Text>
        
        <View style={styles.detailsContainer}>
          <View style={styles.detailItem}>
            <Ionicons name="mail-outline" size={20} color={Colors.primary} />
            <Text style={styles.detailText}>tayfun.koc@windowslive.com</Text>
          </View>
          <View style={styles.detailItem}>
            <Ionicons name="time-outline" size={20} color={Colors.primary} />
            <Text style={styles.detailText}>24 saat içinde yanıt alacaksınız</Text>
          </View>
        </View>
        
        <TouchableOpacity style={styles.backButton} onPress={handleBackToHome}>
          <Ionicons name="airplane-outline" size={20} color="white" />
          <Text style={styles.backButtonText}>Uçuşlara Dön</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  iconContainer: {
    marginBottom: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.text,
    textAlign: 'center',
    marginBottom: 20,
  },
  message: {
    fontSize: 16,
    color: Colors.textSoft,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 40,
  },
  detailsContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 12,
    marginBottom: 40,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  detailText: {
    marginLeft: 10,
    fontSize: 14,
    color: Colors.text,
  },
  backButton: {
    backgroundColor: Colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 12,
  },
  backButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
}); 