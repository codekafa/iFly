import React, { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View
} from 'react-native';
import { SceneRendererProps, TabView } from 'react-native-tab-view';
import Colors from '../constants/Colors';

import FavoriteFlights from '../components/FavoriteFlights';
import RoundTripForm from '../components/forms/RoundTripForm';
import TrncForm from '../components/forms/TrncForm';
import VipFlightForm from '../components/forms/VipFlightForm';

type Route = { key: string; title: string; };

const CustomTabBar = (props: SceneRendererProps & { navigationState: { routes: Route[]; index: number } }) => {
    const { navigationState, position, jumpTo } = props;
    return (
        <View style={styles.tabBarContainer}>
            {navigationState.routes.map((route, i) => {
                const isFocused = navigationState.index === i;
                return (
                    <View
                        key={route.key}
                        style={styles.tabItem}
                    >
                        <Text
                          onPress={() => jumpTo(route.key)}
                          style={[styles.tabLabel, { color: isFocused ? Colors.primary : Colors.textSoft }]}
                        >
                          {route.title}
                        </Text>
                        {isFocused && <View style={styles.tabIndicator} />}
                    </View>
                );
            })}
        </View>
    );
};

export default function HomeScreen() {
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const [routes] = useState<Route[]>([
    { key: 'roundtrip', title: 'Şehir İçi Tur' },
    { key: 'trnc', title: 'KKTC' },
    { key: 'vip', title: 'Özel Uçuş' },
  ]);
  
  // State for form data
  const [formData, setFormData] = useState({
    from: '',
    to: '',
    tripType: 'oneway' as 'oneway' | 'roundtrip'
  });

  const handleFlightSelect = (flight: any, tabIndex: number) => {
    // Set the form data based on selected flight
    setFormData({
      from: flight.from,
      to: flight.to,
      tripType: flight.type === 'roundtrip' ? 'roundtrip' : 'oneway'
    });
    
    // Switch to the appropriate tab
    setIndex(tabIndex);
  };

  const renderScene = ({ route }: any) => {
    switch (route.key) {
      case 'roundtrip':
        return <RoundTripForm initialFrom={formData.from} initialTo={formData.to} />;
      case 'trnc':
        return <TrncForm initialFrom={formData.from} initialTo={formData.to} />;
      case 'vip':
        return <VipFlightForm 
          initialFrom={formData.from} 
          initialTo={formData.to} 
          initialTripType={formData.tripType}
        />;
      default:
        return null;
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.brand}>iFly</Text>
        <Text style={styles.slogan}>We fly, you relax</Text>
        <View style={styles.tabBarWrapper}>
          <TabView
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={setIndex}
            initialLayout={{ width: layout.width }}
            renderTabBar={CustomTabBar}
          />
        </View>
        {/* Favori uçuşlar formun altında */}
        <FavoriteFlights />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 32,
    backgroundColor: Colors.background,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 24,
    paddingTop: 64,
    width: '100%',
  },
  logo: {
    width: 160,
    height: 120,
    marginBottom: 16,
  },
  brand: {
    fontSize: 40,
    fontWeight: 'bold',
    color: Colors.primary,
    marginBottom: 8,
    letterSpacing: 1.5,
  },
  slogan: {
    fontSize: 18,
    color: Colors.textSoft,
    marginBottom: 32,
  },
  tabBarWrapper: {
    width: '100%',
    marginTop: 0,
  },
  tabBarContainer: {
    flexDirection: 'row',
    marginHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 12,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
  },
  tabLabel: {
    fontWeight: 'bold',
    fontSize: 15,
    textTransform: 'capitalize',
  },
  tabIndicator: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: Colors.primary,
    height: 3,
    borderRadius: 2,
  },
}); 