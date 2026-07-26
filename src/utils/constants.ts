export const DEFAULT_SERVICE_COMPONENTS = [
  'Engine Oil',
  'Oil Filter',
  'Air Filter',
  'Cabin Filter',
  'Spark Plug',
  'Brake Pad',
  'Brake Disc',
  'Battery',
  'Coolant',
  'Transmission Oil',
  'CVT Oil',
  'Chain & Sprocket',
  'Drive Belt',
  'Timing Belt',
  'Tyres',
  'Suspension',
  'Alignment',
  'Balancing',
] as const

export const FUEL_TYPES = ['RON95', 'RON97', 'Diesel'] as const

export const REMINDER_INTERVAL_OPTIONS = [
  { label: 'Every 3 months', months: 3 },
  { label: 'Every 6 months', months: 6 },
  { label: 'Every 12 months', months: 12 },
] as const

export const REMINDER_TYPE_LABELS: Record<string, string> = {
  service: 'Service',
  roadTax: 'Road Tax',
  insurance: 'Insurance',
}

export const VEHICLE_TYPE_LABELS: Record<string, string> = {
  car: 'Car',
  motorcycle: 'Motorcycle',
}
