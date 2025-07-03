import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useEffect, useRef } from 'react';
import { Animated, Image, ImageBackground, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BodyText1 } from '../components/ui/CommonComponents';
import Colors from '../constants/Colors';

export default function WelcomeScreen() {
  const router = useRouter();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const planeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Fade in animation
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]).start();

    // Airplane flying animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(planeAnim, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(planeAnim, {
          toValue: 0,
          duration: 2000,
          useNativeDriver: true,
        }),
      ])
    ).start();

    // Navigate to HomeScreen after 4 seconds
    const timer = setTimeout(() => {
      router.replace('/home');
    }, 4000);

    return () => clearTimeout(timer);
  }, [fadeAnim, slideAnim, planeAnim, router]);

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={require('../assets/images/backgorund.jpg')}
        style={styles.backgroundImage}
        resizeMode="cover"
        imageStyle={{ opacity: 0.8 }}
        fadeDuration={0}
        progressiveRenderingEnabled={true}
      >
        <View style={styles.content}>
          {/* Welcome Text and Slogan */}
          <Animated.View
            style={[
              styles.brandContainer,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }],
              },
            ]}
          >
            <Image 
              source={require('../assets/images/ifly-logo.png')}
              style={styles.logoImage}
              resizeMode="contain"
              fadeDuration={0}
            />
            <BodyText1 style={styles.slogan}>We fly, you relax</BodyText1>
          </Animated.View>

          {/* Animated Airplane */}
          <Animated.View
            style={[
              styles.planeContainer,
              {
                transform: [
                  {
                    translateY: planeAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, -20],
                    }),
                  },
                  {
                    rotate: planeAnim.interpolate({
                      inputRange: [0, 0.5, 1],
                      outputRange: ['0deg', '5deg', '0deg'],
                    }),
                  },
                ],
              },
            ]}
          >
            <Ionicons
              name="airplane"
              size={60}
              color={Colors.primary}
              style={styles.planeIcon}
            />
          </Animated.View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  content: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  brandContainer: {
    alignItems: 'center',
    marginBottom: 60,
  },
  logoImage: {
    width: 200,
    height: 100,
    marginBottom: 20,
  },

  slogan: {
    fontSize: 18,
    color: '#FFFFFF',
    textAlign: 'center',
    fontStyle: 'italic',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  planeContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  planeIcon: {
    transform: [{ rotate: '45deg' }],
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: Colors.primary,
  },
}); 