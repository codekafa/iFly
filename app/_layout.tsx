import emailjs from 'emailjs-com';
import { Stack } from "expo-router";
import { useEffect } from "react";

export default function RootLayout() {
  useEffect(() => {
    // EmailJS'i başlat
    emailjs.init('YOUR_EMAILJS_USER_ID'); // User ID'nizi buraya yazın
  }, []);

  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="results" options={{ headerShown: false }} />
      <Stack.Screen name="cart" options={{ headerShown: false }} />
      <Stack.Screen name="reservation" options={{ headerShown: false }} />
      <Stack.Screen name="unified-reservation" options={{ headerShown: false }} />
      <Stack.Screen name="thank-you" options={{ headerShown: false }} />
      <Stack.Screen name="favorite-flight-detail" options={{ headerShown: false }} />
    </Stack>
  );
}
