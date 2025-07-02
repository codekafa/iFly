export interface FlightRoute {
  from: string;
  to: string;
  duration: string; // Süre (ör: 01:15)
  price: number; // Toplam fiyat (EUR)
  isRoundTrip?: boolean; // Gidiş-dönüş uçuşu mu?
}

export interface FlightLocation {
  label: string;
  value: string;
  code: string;
}

// All possible flight routes between locations
export const FLIGHT_ROUTES: FlightRoute[] = [
  // One-way flights from Antalya
  {
    from: 'Antalya',
    to: 'Kıbrıs',
    duration: '01:15',
    price: 3200,
  },
  {
    from: 'Antalya',
    to: 'Dalaman',
    duration: '01:20',
    price: 3200,
  },
  {
    from: 'Antalya',
    to: 'Gazipaşa',
    duration: '00:45',
    price: 2400,
  },
  {
    from: 'Antalya',
    to: 'Bodrum',
    duration: '01:15',
    price: 3200,
  },
  {
    from: 'Antalya',
    to: 'Denizli',
    duration: '01:00',
    price: 3000,
  },
  {
    from: 'Antalya',
    to: 'Adana',
    duration: '01:30',
    price: 4000,
  },
  
  // One-way flights to Antalya (from other locations)
  {
    from: 'Kıbrıs',
    to: 'Antalya',
    duration: '01:15',
    price: 6400, // 2x price for non-Antalya departure
  },
  {
    from: 'Dalaman',
    to: 'Antalya',
    duration: '01:20',
    price: 6400,
  },
  {
    from: 'Gazipaşa',
    to: 'Antalya',
    duration: '00:45',
    price: 4800,
  },
  {
    from: 'Bodrum',
    to: 'Antalya',
    duration: '01:15',
    price: 6400,
  },
  {
    from: 'Denizli',
    to: 'Antalya',
    duration: '01:00',
    price: 6000,
  },
  {
    from: 'Adana',
    to: 'Antalya',
    duration: '01:30',
    price: 8000,
  },

  // Cross-location flights (not involving Antalya)
  {
    from: 'Kıbrıs',
    to: 'Dalaman',
    duration: '01:30',
    price: 7200,
  },
  {
    from: 'Dalaman',
    to: 'Kıbrıs',
    duration: '01:30',
    price: 7200,
  },
  {
    from: 'Kıbrıs',
    to: 'Gazipaşa',
    duration: '01:00',
    price: 5600,
  },
  {
    from: 'Gazipaşa',
    to: 'Kıbrıs',
    duration: '01:00',
    price: 5600,
  },
  {
    from: 'Kıbrıs',
    to: 'Bodrum',
    duration: '01:30',
    price: 7200,
  },
  {
    from: 'Bodrum',
    to: 'Kıbrıs',
    duration: '01:30',
    price: 7200,
  },
  {
    from: 'Kıbrıs',
    to: 'Denizli',
    duration: '01:15',
    price: 6800,
  },
  {
    from: 'Denizli',
    to: 'Kıbrıs',
    duration: '01:15',
    price: 6800,
  },
  {
    from: 'Kıbrıs',
    to: 'Adana',
    duration: '01:45',
    price: 8800,
  },
  {
    from: 'Adana',
    to: 'Kıbrıs',
    duration: '01:45',
    price: 8800,
  },
  {
    from: 'Dalaman',
    to: 'Gazipaşa',
    duration: '01:05',
    price: 5600,
  },
  {
    from: 'Gazipaşa',
    to: 'Dalaman',
    duration: '01:05',
    price: 5600,
  },
  {
    from: 'Dalaman',
    to: 'Bodrum',
    duration: '01:35',
    price: 7200,
  },
  {
    from: 'Bodrum',
    to: 'Dalaman',
    duration: '01:35',
    price: 7200,
  },
  {
    from: 'Dalaman',
    to: 'Denizli',
    duration: '01:20',
    price: 6800,
  },
  {
    from: 'Denizli',
    to: 'Dalaman',
    duration: '01:20',
    price: 6800,
  },
  {
    from: 'Dalaman',
    to: 'Adana',
    duration: '01:50',
    price: 8800,
  },
  {
    from: 'Adana',
    to: 'Dalaman',
    duration: '01:50',
    price: 8800,
  },
  {
    from: 'Gazipaşa',
    to: 'Bodrum',
    duration: '01:00',
    price: 5600,
  },
  {
    from: 'Bodrum',
    to: 'Gazipaşa',
    duration: '01:00',
    price: 5600,
  },
  {
    from: 'Gazipaşa',
    to: 'Denizli',
    duration: '00:45',
    price: 4800,
  },
  {
    from: 'Denizli',
    to: 'Gazipaşa',
    duration: '00:45',
    price: 4800,
  },
  {
    from: 'Gazipaşa',
    to: 'Adana',
    duration: '01:15',
    price: 6400,
  },
  {
    from: 'Adana',
    to: 'Gazipaşa',
    duration: '01:15',
    price: 6400,
  },
  {
    from: 'Bodrum',
    to: 'Denizli',
    duration: '01:15',
    price: 6800,
  },
  {
    from: 'Denizli',
    to: 'Bodrum',
    duration: '01:15',
    price: 6800,
  },
  {
    from: 'Bodrum',
    to: 'Adana',
    duration: '01:45',
    price: 8800,
  },
  {
    from: 'Adana',
    to: 'Bodrum',
    duration: '01:45',
    price: 8800,
  },
  {
    from: 'Denizli',
    to: 'Adana',
    duration: '01:30',
    price: 8000,
  },
  {
    from: 'Adana',
    to: 'Denizli',
    duration: '01:30',
    price: 8000,
  },

  // Roundtrip flights (Antalya - Other locations)
  {
    from: 'Antalya',
    to: 'Kıbrıs',
    duration: '01:15',
    price: 3200,
    isRoundTrip: true,
  },
  {
    from: 'Antalya',
    to: 'Dalaman',
    duration: '01:20',
    price: 3200,
    isRoundTrip: true,
  },
  {
    from: 'Antalya',
    to: 'Gazipaşa',
    duration: '00:45',
    price: 2400,
    isRoundTrip: true,
  },
  {
    from: 'Antalya',
    to: 'Bodrum',
    duration: '01:15',
    price: 3200,
    isRoundTrip: true,
  },
  {
    from: 'Antalya',
    to: 'Denizli',
    duration: '01:00',
    price: 3000,
    isRoundTrip: true,
  },
  {
    from: 'Antalya',
    to: 'Adana',
    duration: '01:30',
    price: 4000,
    isRoundTrip: true,
  },

  // Roundtrip flights (Other locations - Antalya)
  {
    from: 'Kıbrıs',
    to: 'Antalya',
    duration: '01:15',
    price: 6200, // Special roundtrip price for non-Antalya departures
    isRoundTrip: true,
  },
  {
    from: 'Dalaman',
    to: 'Antalya',
    duration: '01:20',
    price: 6200,
    isRoundTrip: true,
  },
  {
    from: 'Gazipaşa',
    to: 'Antalya',
    duration: '00:45',
    price: 6200,
    isRoundTrip: true,
  },
  {
    from: 'Bodrum',
    to: 'Antalya',
    duration: '01:15',
    price: 6200,
    isRoundTrip: true,
  },
  {
    from: 'Denizli',
    to: 'Antalya',
    duration: '01:00',
    price: 6200,
    isRoundTrip: true,
  },
  {
    from: 'Adana',
    to: 'Antalya',
    duration: '01:30',
    price: 6200,
    isRoundTrip: true,
  },

  // Cross-location roundtrip flights
  {
    from: 'Kıbrıs',
    to: 'Dalaman',
    duration: '01:30',
    price: 7200,
    isRoundTrip: true,
  },
  {
    from: 'Dalaman',
    to: 'Kıbrıs',
    duration: '01:30',
    price: 7200,
    isRoundTrip: true,
  },
  {
    from: 'Kıbrıs',
    to: 'Gazipaşa',
    duration: '01:00',
    price: 5600,
    isRoundTrip: true,
  },
  {
    from: 'Gazipaşa',
    to: 'Kıbrıs',
    duration: '01:00',
    price: 5600,
    isRoundTrip: true,
  },
  {
    from: 'Kıbrıs',
    to: 'Bodrum',
    duration: '01:30',
    price: 7200,
    isRoundTrip: true,
  },
  {
    from: 'Bodrum',
    to: 'Kıbrıs',
    duration: '01:30',
    price: 7200,
    isRoundTrip: true,
  },
  {
    from: 'Kıbrıs',
    to: 'Denizli',
    duration: '01:15',
    price: 6800,
    isRoundTrip: true,
  },
  {
    from: 'Denizli',
    to: 'Kıbrıs',
    duration: '01:15',
    price: 6800,
    isRoundTrip: true,
  },
  {
    from: 'Kıbrıs',
    to: 'Adana',
    duration: '01:45',
    price: 8800,
    isRoundTrip: true,
  },
  {
    from: 'Adana',
    to: 'Kıbrıs',
    duration: '01:45',
    price: 8800,
    isRoundTrip: true,
  },
  {
    from: 'Dalaman',
    to: 'Gazipaşa',
    duration: '01:05',
    price: 5600,
    isRoundTrip: true,
  },
  {
    from: 'Gazipaşa',
    to: 'Dalaman',
    duration: '01:05',
    price: 5600,
    isRoundTrip: true,
  },
  {
    from: 'Dalaman',
    to: 'Bodrum',
    duration: '01:35',
    price: 7200,
    isRoundTrip: true,
  },
  {
    from: 'Bodrum',
    to: 'Dalaman',
    duration: '01:35',
    price: 7200,
    isRoundTrip: true,
  },
  {
    from: 'Dalaman',
    to: 'Denizli',
    duration: '01:20',
    price: 6800,
    isRoundTrip: true,
  },
  {
    from: 'Denizli',
    to: 'Dalaman',
    duration: '01:20',
    price: 6800,
    isRoundTrip: true,
  },
  {
    from: 'Dalaman',
    to: 'Adana',
    duration: '01:50',
    price: 8800,
    isRoundTrip: true,
  },
  {
    from: 'Adana',
    to: 'Dalaman',
    duration: '01:50',
    price: 8800,
    isRoundTrip: true,
  },
  {
    from: 'Gazipaşa',
    to: 'Bodrum',
    duration: '01:00',
    price: 5600,
    isRoundTrip: true,
  },
  {
    from: 'Bodrum',
    to: 'Gazipaşa',
    duration: '01:00',
    price: 5600,
    isRoundTrip: true,
  },
  {
    from: 'Gazipaşa',
    to: 'Denizli',
    duration: '00:45',
    price: 4800,
    isRoundTrip: true,
  },
  {
    from: 'Denizli',
    to: 'Gazipaşa',
    duration: '00:45',
    price: 4800,
    isRoundTrip: true,
  },
  {
    from: 'Gazipaşa',
    to: 'Adana',
    duration: '01:15',
    price: 6400,
    isRoundTrip: true,
  },
  {
    from: 'Adana',
    to: 'Gazipaşa',
    duration: '01:15',
    price: 6400,
    isRoundTrip: true,
  },
  {
    from: 'Bodrum',
    to: 'Denizli',
    duration: '01:15',
    price: 6800,
    isRoundTrip: true,
  },
  {
    from: 'Denizli',
    to: 'Bodrum',
    duration: '01:15',
    price: 6800,
    isRoundTrip: true,
  },
  {
    from: 'Bodrum',
    to: 'Adana',
    duration: '01:45',
    price: 8800,
    isRoundTrip: true,
  },
  {
    from: 'Adana',
    to: 'Bodrum',
    duration: '01:45',
    price: 8800,
    isRoundTrip: true,
  },
  {
    from: 'Denizli',
    to: 'Adana',
    duration: '01:30',
    price: 8000,
    isRoundTrip: true,
  },
  {
    from: 'Adana',
    to: 'Denizli',
    duration: '01:30',
    price: 8000,
    isRoundTrip: true,
  },

  // City tour flights (same location)
  {
    from: 'Antalya',
    to: 'Antalya',
    duration: '01:00',
    price: 3200,
  },
  {
    from: 'Kıbrıs',
    to: 'Kıbrıs',
    duration: '01:00',
    price: 6400,
  },
  {
    from: 'Dalaman',
    to: 'Dalaman',
    duration: '01:00',
    price: 6400,
  },
  {
    from: 'Gazipaşa',
    to: 'Gazipaşa',
    duration: '01:00',
    price: 4800,
  },
  {
    from: 'Bodrum',
    to: 'Bodrum',
    duration: '01:00',
    price: 6400,
  },
  {
    from: 'Denizli',
    to: 'Denizli',
    duration: '01:00',
    price: 6000,
  },
  {
    from: 'Adana',
    to: 'Adana',
    duration: '01:00',
    price: 8000,
  },
];

// Available locations for selection
export const FLIGHT_LOCATIONS: FlightLocation[] = [
  { label: 'Antalya, Türkiye', value: 'antalya', code: 'AYT' },
  { label: 'Kıbrıs, KKTC', value: 'kibris', code: 'ECN' },
  { label: 'Dalaman, Türkiye', value: 'dalaman', code: 'DLM' },
  { label: 'Gazipaşa, Türkiye', value: 'gazipasa', code: 'GZP' },
  { label: 'Bodrum, Türkiye', value: 'bodrum', code: 'BJV' },
  { label: 'Denizli, Türkiye', value: 'denizli', code: 'DNZ' },
  { label: 'Adana, Türkiye', value: 'adana', code: 'ADA' },
];

// Pricing logic (total price, not per person)
export const calculateFlightPrice = (
  fromLocation: string,
  toLocation: string,
  isRoundTrip: boolean
): number => {
  // Find the exact route
  const route = FLIGHT_ROUTES.find(r => 
    r.from.toLowerCase() === fromLocation.toLowerCase() && 
    r.to.toLowerCase() === toLocation.toLowerCase() &&
    r.isRoundTrip === isRoundTrip
  );
  
  if (route) {
    return route.price;
  }
  
  // Fallback: if no exact route found, calculate based on old logic
  let basePrice = 0;
  const destinationRoute = FLIGHT_ROUTES.find(r => r.to.toLowerCase() === toLocation.toLowerCase() && !r.isRoundTrip);
  if (destinationRoute) {
    basePrice = destinationRoute.price;
  }
  
  // If departure is not from Antalya, add Antalya to departure location price
  if (fromLocation.toLowerCase() !== 'antalya') {
    const departureRoute = FLIGHT_ROUTES.find(r => r.to.toLowerCase() === fromLocation.toLowerCase() && !r.isRoundTrip);
    if (departureRoute) {
      basePrice += departureRoute.price;
    }
  }
  
  // For round trip, multiply by 2
  if (isRoundTrip) {
    basePrice *= 2;
  }
  
  return basePrice;
};

// Get available destinations based on departure location
export const getAvailableDestinations = (fromLocation: string): FlightLocation[] => {
  // For city tour, return all locations including the departure location
  return FLIGHT_LOCATIONS;
};

// Get flight details for a specific route
export const getFlightDetails = (fromLocation: string, toLocation: string, isRoundTrip: boolean = false): FlightRoute | null => {
  // Find the exact route
  const route = FLIGHT_ROUTES.find(r => 
    r.from.toLowerCase() === fromLocation.toLowerCase() && 
    r.to.toLowerCase() === toLocation.toLowerCase() &&
    r.isRoundTrip === isRoundTrip
  );
  
  if (route) {
    return route;
  }
  
  // Fallback: if no exact route found, return null
  return null;
};

// Get all available flights for a specific route
export const getAvailableFlights = (fromLocation: string, toLocation: string, isRoundTrip: boolean = false): FlightRoute[] => {
  return FLIGHT_ROUTES.filter(r => 
    r.from.toLowerCase() === fromLocation.toLowerCase() && 
    r.to.toLowerCase() === toLocation.toLowerCase() &&
    r.isRoundTrip === isRoundTrip
  );
}; 