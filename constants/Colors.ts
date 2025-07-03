/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = '#0a7ea4';
const tintColorDark = '#fff';

const Colors = {
  primary: '#2563EB', // Ana mavi renk
  primarySoft: '#3B82F6', // Soft mavi
  background: '#F0F8FF', // Çok açık mavimsi arka plan
  card: '#DBEAFE', // Kartlar için soft mavi
  accent: '#60A5FA', // Vurgu için açık mavi
  button: '#2563EB', // Buton ana rengi
  buttonText: '#FFFFFF', // Buton üzeri yazı
  text: '#1E3A8A', // Koyu mavi, ana yazı
  textSoft: '#475569', // Soft mavi yazı
  border: '#BFDBFE', // Border için açık mavi
  error: '#E57373', // Hata için kırmızımsı
  success: '#81C784', // Başarı için yeşil
  light: {
    text: '#11181C',
    background: '#fff',
    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: '#ECEDEE',
    background: '#151718',
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
  },
};

export default Colors;
