# FlyTaxi Style Guide

Bu dokümantasyon, FlyTaxi uygulamasının merkezi stil sistemini açıklar.

## 🎨 Renk Paleti

### Ana Renkler
- **Primary**: `#8755CC` - Ana mor renk
- **PrimarySoft**: `#A98DDA` - Yumuşak mor
- **Background**: `#F6F2FB` - Çok açık morumsu arka plan
- **Card**: `#E5D8F6` - Kartlar için soft mor

### Metin Renkleri
- **Text**: `#3D246C` - Koyu mor, ana yazı
- **TextSoft**: `#6D4E9C` - Soft mor yazı

### Durum Renkleri
- **Success**: `#81C784` - Başarı için yeşil
- **Error**: `#E57373` - Hata için kırmızımsı
- **Border**: `#D1B3FF` - Border için açık mor

## 📝 Typography

### Başlıklar
```typescript
import { Typography } from '../constants/Styles';

// Kullanım
<Text style={Typography.h1}>Başlık 1</Text>
<Text style={Typography.h2}>Başlık 2</Text>
<Text style={Typography.h3}>Başlık 3</Text>
<Text style={Typography.h4}>Başlık 4</Text>
<Text style={Typography.h5}>Başlık 5</Text>
<Text style={Typography.h6}>Başlık 6</Text>
```

### Metin
```typescript
// Body Text
<Text style={Typography.body1}>Ana metin</Text>
<Text style={Typography.body2}>Küçük metin</Text>
<Text style={Typography.body3}>Çok küçük metin</Text>

// Caption
<Text style={Typography.caption}>Açıklama metni</Text>

// Button Text
<Text style={Typography.button}>Buton metni</Text>
```

## 📏 Spacing (Boşluklar)

```typescript
import { Spacing } from '../constants/Styles';

// Kullanım
<View style={{ margin: Spacing.xs }}>  // 4px
<View style={{ margin: Spacing.sm }}>  // 8px
<View style={{ margin: Spacing.md }}>  // 16px
<View style={{ margin: Spacing.lg }}>  // 24px
<View style={{ margin: Spacing.xl }}>  // 32px
<View style={{ margin: Spacing.xxl }}> // 48px
```

## 🔲 Border Radius

```typescript
import { BorderRadius } from '../constants/Styles';

// Kullanım
<View style={{ borderRadius: BorderRadius.xs }}>   // 4px
<View style={{ borderRadius: BorderRadius.sm }}>   // 8px
<View style={{ borderRadius: BorderRadius.md }}>   // 12px
<View style={{ borderRadius: BorderRadius.lg }}>   // 16px
<View style={{ borderRadius: BorderRadius.xl }}>   // 20px
<View style={{ borderRadius: BorderRadius.xxl }}>  // 24px
<View style={{ borderRadius: BorderRadius.round }}> // 50px (yuvarlak)
```

## 🌟 Shadows (Gölgeler)

```typescript
import { Shadows } from '../constants/Styles';

// Kullanım
<View style={Shadows.small}>  // Küçük gölge
<View style={Shadows.medium}> // Orta gölge
<View style={Shadows.large}>  // Büyük gölge
```

## 🧩 Ortak Component'ler

### Typography Components
```typescript
import { 
  Heading1, Heading2, Heading3, Heading4, Heading5, Heading6,
  BodyText1, BodyText2, BodyText3, Caption 
} from '../components/ui/CommonComponents';

// Kullanım
<Heading1>Ana Başlık</Heading1>
<BodyText1>Ana metin içeriği</BodyText1>
<Caption>Açıklama metni</Caption>
```

### Button Component
```typescript
import { Button } from '../components/ui/CommonComponents';

// Kullanım
<Button 
  title="Tıkla"
  onPress={() => {}}
  variant="primary" // primary, secondary, outline
  size="medium"     // small, medium, large
  icon="airplane"   // Ionicons icon name
  loading={false}
  disabled={false}
/>
```

### Input Component
```typescript
import { Input } from '../components/ui/CommonComponents';

// Kullanım
<Input
  label="Email"
  placeholder="ornek@email.com"
  value={email}
  onChangeText={setEmail}
  error={emailError}
  keyboardType="email-address"
/>
```

### Card Component
```typescript
import { Card } from '../components/ui/CommonComponents';

// Kullanım
<Card>
  <Text>Kart içeriği</Text>
</Card>

// Tıklanabilir kart
<Card onPress={() => {}}>
  <Text>Tıklanabilir kart</Text>
</Card>
```

### Badge Component
```typescript
import { Badge } from '../components/ui/CommonComponents';

// Kullanım
<Badge text="Yeni" variant="primary" />
<Badge text="Başarılı" variant="success" />
<Badge text="Hata" variant="error" />
```

### Empty State Component
```typescript
import { EmptyState } from '../components/ui/CommonComponents';

// Kullanım
<EmptyState
  icon="airplane-outline"
  title="Uçuş bulunamadı"
  message="Aradığınız kriterlere uygun uçuş bulunamadı."
  actionText="Tekrar Ara"
  onAction={() => {}}
/>
```

## 🎯 Ortak Stiller

### Container
```typescript
import { CommonStyles } from '../constants/Styles';

// Kullanım
<View style={CommonStyles.container}>     // Ana container
<View style={CommonStyles.safeContainer}> // Safe area container
<View style={CommonStyles.card}>          // Kart stili
<View style={CommonStyles.section}>       // Bölüm stili
<View style={CommonStyles.header}>        // Header stili
<View style={CommonStyles.footer}>        // Footer stili
```

### Form Stilleri
```typescript
import { FormStyles } from '../constants/Styles';

// Kullanım
<View style={FormStyles.formContainer}>
  <View style={FormStyles.formSection}>
    <Text style={FormStyles.formSectionTitle}>Bölüm Başlığı</Text>
    <View style={FormStyles.inputContainer}>
      <Text style={FormStyles.inputLabel}>Label</Text>
      <TextInput style={FormStyles.inputField} />
    </View>
  </View>
</View>
```

### Flight Card Stilleri
```typescript
import { FlightCardStyles } from '../constants/Styles';

// Kullanım
<View style={FlightCardStyles.card}>
  <View style={FlightCardStyles.header}>
    <View style={FlightCardStyles.routeContainer}>
      <Text style={FlightCardStyles.fromText}>İstanbul</Text>
      <Text style={FlightCardStyles.toText}>Ankara</Text>
    </View>
    <Text style={FlightCardStyles.price}>500 €</Text>
  </View>
</View>
```

## 📱 Responsive Design

### Platform-specific Stiller
```typescript
import { Platform } from 'react-native';

const styles = StyleSheet.create({
  container: {
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },
});
```

## 🔄 Stil Güncelleme Süreci

1. **Yeni stil eklerken**: Önce `constants/Styles.ts` dosyasına ekleyin
2. **Ortak component eklerken**: `components/ui/CommonComponents.tsx` dosyasına ekleyin
3. **Renk değişikliği**: Sadece `constants/Colors.ts` dosyasını güncelleyin
4. **Typography değişikliği**: `constants/Styles.ts` içindeki `Typography` objesini güncelleyin

## 📋 Best Practices

1. **Tutarlılık**: Her zaman merkezi stil sistemini kullanın
2. **Semantic naming**: Anlamlı stil isimleri kullanın
3. **Reusability**: Tekrar kullanılabilir component'ler oluşturun
4. **Performance**: StyleSheet.create() kullanın
5. **Accessibility**: Renk kontrastlarını kontrol edin

## 🎨 Tema Değişiklikleri

Tema değişikliği yapmak için:

1. `constants/Colors.ts` dosyasını güncelleyin
2. Gerekirse `constants/Styles.ts` dosyasındaki renk referanslarını kontrol edin
3. Component'lerde hardcoded renkler varsa güncelleyin

Bu stil sistemi sayesinde tüm uygulama genelinde tutarlı ve profesyonel bir görünüm elde edebilirsiniz. 