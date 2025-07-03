import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useRef } from 'react';
import { Animated, Dimensions, StyleSheet, View } from 'react-native';
import Colors from '../constants/Colors';
import { Spacing } from '../constants/Styles';

const { width: screenWidth } = Dimensions.get('window');

const flyingIcons = [
  { icon: 'airplane', color: Colors.primary, size: 24 },
  { icon: 'airplane-outline', color: Colors.primarySoft, size: 20 },
  { icon: 'compass-outline', color: Colors.accent, size: 22 },
  { icon: 'location-outline', color: Colors.primary, size: 20 },
  { icon: 'speedometer-outline', color: Colors.primarySoft, size: 22 },
  { icon: 'cloud-outline', color: Colors.accent, size: 24 },
  { icon: 'navigate-outline', color: Colors.primary, size: 20 },
  { icon: 'radio-outline', color: Colors.primarySoft, size: 22 },
  { icon: 'shield-outline', color: Colors.accent, size: 20 },
  { icon: 'time-outline', color: Colors.primary, size: 22 },
  { icon: 'thermometer-outline', color: Colors.primarySoft, size: 20 },
  { icon: 'flash-outline', color: Colors.accent, size: 24 },
];

export default function FlyingIconsSlider() {
  const scrollX = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const startAnimation = () => {
      // Reset to start position
      scrollX.setValue(0);
      
      Animated.loop(
        Animated.timing(scrollX, {
          toValue: -(flyingIcons.length * 80), // Move by the width of one complete set
          duration: 8000, // 8 saniye - daha hızlı
          useNativeDriver: true,
        }),
        {
          iterations: -1, // Sonsuz döngü
        }
      ).start();
    };

    startAnimation();
  }, [scrollX]);

  return (
    <View style={styles.container}>
      <View style={styles.sliderContainer}>
        <Animated.View
          style={[
            styles.sliderContent,
            {
              transform: [{ translateX: scrollX }],
            },
          ]}
        >
          {/* İlk set */}
          {flyingIcons.map((item, index) => (
            <View key={`first-${index}`} style={styles.iconContainer}>
              <Ionicons
                name={item.icon as any}
                size={item.size}
                color={item.color}
              />
            </View>
          ))}
          
          {/* İkinci set (sürekli geçiş için) */}
          {flyingIcons.map((item, index) => (
            <View key={`second-${index}`} style={styles.iconContainer}>
              <Ionicons
                name={item.icon as any}
                size={item.size}
                color={item.color}
              />
            </View>
          ))}
          
          {/* Üçüncü set (daha akıcı geçiş için) */}
          {flyingIcons.map((item, index) => (
            <View key={`third-${index}`} style={styles.iconContainer}>
              <Ionicons
                name={item.icon as any}
                size={item.size}
                color={item.color}
              />
            </View>
          ))}
        </Animated.View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: Spacing.lg,
    height: 60,
    overflow: 'hidden',
  },
  sliderContainer: {
    height: '100%',
    overflow: 'hidden',
  },
  sliderContent: {
    flexDirection: 'row',
    alignItems: 'center',
    height: '100%',
  },
  iconContainer: {
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: Spacing.sm,
  },
}); 