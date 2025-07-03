import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="welcome" options={{ headerShown: false }} />
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="home" options={{ headerShown: false }} />
      <Stack.Screen name="results" options={{ headerShown: false }} />
      <Stack.Screen name="cart" options={{ headerShown: false }} />
      <Stack.Screen name="reservation" options={{ headerShown: false }} />
      <Stack.Screen name="unified-reservation" options={{ headerShown: false }} />
      <Stack.Screen name="thank-you" options={{ headerShown: false }} />
      <Stack.Screen name="favorite-flight-detail" options={{ headerShown: false }} />
    </Stack>
  );
}
