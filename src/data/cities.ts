export interface City {
  value: string;
  label: string;
}

export interface CitiesByCountry {
  [countryCode: string]: City[];
}

export const CITIES_BY_COUNTRY: CitiesByCountry = {
  AE: [
    { value: "Dubai", label: "Dubai" },
    { value: "Abu Dhabi", label: "Abu Dhabi" },
    { value: "Sharjah", label: "Sharjah" },
    { value: "Ajman", label: "Ajman" },
    { value: "Al Ain", label: "Al Ain" },
    { value: "Ras Al Khaimah", label: "Ras Al Khaimah" },
    { value: "Fujairah", label: "Fujairah" },
    { value: "Umm Al Quwain", label: "Umm Al Quwain" },
  ],
  SA: [
    { value: "Riyadh", label: "Riyadh" },
    { value: "Jeddah", label: "Jeddah" },
    { value: "Mecca", label: "Mecca" },
    { value: "Medina", label: "Medina" },
    { value: "Dammam", label: "Dammam" },
    { value: "Khobar", label: "Khobar" },
    { value: "Dhahran", label: "Dhahran" },
    { value: "Tabuk", label: "Tabuk" },
    { value: "Abha", label: "Abha" },
  ],
  QA: [
    { value: "Doha", label: "Doha" },
    { value: "Al Wakrah", label: "Al Wakrah" },
    { value: "Al Khor", label: "Al Khor" },
    { value: "Lusail", label: "Lusail" },
  ],
  KW: [
    { value: "Kuwait City", label: "Kuwait City" },
    { value: "Hawalli", label: "Hawalli" },
    { value: "Salmiya", label: "Salmiya" },
    { value: "Jahra", label: "Jahra" },
  ],
  BH: [
    { value: "Manama", label: "Manama" },
    { value: "Riffa", label: "Riffa" },
    { value: "Muharraq", label: "Muharraq" },
  ],
  OM: [
    { value: "Muscat", label: "Muscat" },
    { value: "Salalah", label: "Salalah" },
    { value: "Sohar", label: "Sohar" },
  ],
  EG: [
    { value: "Cairo", label: "Cairo" },
    { value: "Alexandria", label: "Alexandria" },
    { value: "Giza", label: "Giza" },
    { value: "Sharm El Sheikh", label: "Sharm El Sheikh" },
    { value: "Luxor", label: "Luxor" },
  ],
  IN: [
    { value: "Mumbai", label: "Mumbai" },
    { value: "Delhi", label: "Delhi" },
    { value: "Bangalore", label: "Bangalore" },
    { value: "Hyderabad", label: "Hyderabad" },
    { value: "Chennai", label: "Chennai" },
    { value: "Kolkata", label: "Kolkata" },
    { value: "Pune", label: "Pune" },
    { value: "Ahmedabad", label: "Ahmedabad" },
  ],
  GB: [
    { value: "London", label: "London" },
    { value: "Manchester", label: "Manchester" },
    { value: "Birmingham", label: "Birmingham" },
    { value: "Edinburgh", label: "Edinburgh" },
    { value: "Glasgow", label: "Glasgow" },
    { value: "Liverpool", label: "Liverpool" },
    { value: "Bristol", label: "Bristol" },
    { value: "Leeds", label: "Leeds" },
  ],
  US: [
    { value: "New York", label: "New York" },
    { value: "Los Angeles", label: "Los Angeles" },
    { value: "Chicago", label: "Chicago" },
    { value: "Houston", label: "Houston" },
    { value: "San Francisco", label: "San Francisco" },
    { value: "Miami", label: "Miami" },
    { value: "Seattle", label: "Seattle" },
    { value: "Boston", label: "Boston" },
    { value: "Austin", label: "Austin" },
    { value: "Denver", label: "Denver" },
  ],
  PK: [
    { value: "Karachi", label: "Karachi" },
    { value: "Lahore", label: "Lahore" },
    { value: "Islamabad", label: "Islamabad" },
    { value: "Rawalpindi", label: "Rawalpindi" },
    { value: "Faisalabad", label: "Faisalabad" },
  ],
  JO: [
    { value: "Amman", label: "Amman" },
    { value: "Irbid", label: "Irbid" },
    { value: "Zarqa", label: "Zarqa" },
    { value: "Aqaba", label: "Aqaba" },
  ],
  LB: [
    { value: "Beirut", label: "Beirut" },
    { value: "Tripoli", label: "Tripoli" },
    { value: "Sidon", label: "Sidon" },
  ],
  MA: [
    { value: "Casablanca", label: "Casablanca" },
    { value: "Rabat", label: "Rabat" },
    { value: "Marrakech", label: "Marrakech" },
    { value: "Fez", label: "Fez" },
    { value: "Tangier", label: "Tangier" },
  ],
  NG: [
    { value: "Lagos", label: "Lagos" },
    { value: "Abuja", label: "Abuja" },
    { value: "Kano", label: "Kano" },
    { value: "Ibadan", label: "Ibadan" },
  ],
  ZA: [
    { value: "Johannesburg", label: "Johannesburg" },
    { value: "Cape Town", label: "Cape Town" },
    { value: "Durban", label: "Durban" },
    { value: "Pretoria", label: "Pretoria" },
  ],
  SG: [
    { value: "Singapore", label: "Singapore" },
  ],
  MY: [
    { value: "Kuala Lumpur", label: "Kuala Lumpur" },
    { value: "Penang", label: "Penang" },
    { value: "Johor Bahru", label: "Johor Bahru" },
  ],
  ID: [
    { value: "Jakarta", label: "Jakarta" },
    { value: "Surabaya", label: "Surabaya" },
    { value: "Bandung", label: "Bandung" },
    { value: "Bali", label: "Bali" },
  ],
  AU: [
    { value: "Sydney", label: "Sydney" },
    { value: "Melbourne", label: "Melbourne" },
    { value: "Brisbane", label: "Brisbane" },
    { value: "Perth", label: "Perth" },
    { value: "Adelaide", label: "Adelaide" },
  ],
  CA: [
    { value: "Toronto", label: "Toronto" },
    { value: "Vancouver", label: "Vancouver" },
    { value: "Montreal", label: "Montreal" },
    { value: "Calgary", label: "Calgary" },
    { value: "Ottawa", label: "Ottawa" },
  ],
  DE: [
    { value: "Berlin", label: "Berlin" },
    { value: "Munich", label: "Munich" },
    { value: "Frankfurt", label: "Frankfurt" },
    { value: "Hamburg", label: "Hamburg" },
  ],
  FR: [
    { value: "Paris", label: "Paris" },
    { value: "Lyon", label: "Lyon" },
    { value: "Marseille", label: "Marseille" },
    { value: "Nice", label: "Nice" },
  ],
};

// Default cities for countries not in the list
export const DEFAULT_CITIES: City[] = [];

export function getCitiesForCountry(countryCode: string): City[] {
  return CITIES_BY_COUNTRY[countryCode] || DEFAULT_CITIES;
}
