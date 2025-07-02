/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = '#0a7ea4';
const tintColorDark = '#fff';

const Colors = {
  primary: '#8755CC', // Ana mor renk
  primarySoft: '#A98DDA', // Soft mor
  background: '#F6F2FB', // Çok açık morumsu arka plan
  card: '#E5D8F6', // Kartlar için soft mor
  accent: '#B388FF', // Vurgu için açık mor
  button: '#8755CC', // Buton ana rengi
  buttonText: '#FFFFFF', // Buton üzeri yazı
  text: '#3D246C', // Koyu mor, ana yazı
  textSoft: '#6D4E9C', // Soft mor yazı
  border: '#D1B3FF', // Border için açık mor
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
