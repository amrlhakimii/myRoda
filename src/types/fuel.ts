export type FuelType = 'RON95' | 'RON97' | 'Diesel'

export interface FuelRecord {
  id: string
  vehicleId: string
  userId: string
  date: string
  mileage: number
  petrolStation?: string
  petrolType: FuelType
  litres: number
  totalPrice: number
  createdAt: string
}

export type FuelRecordInput = Omit<FuelRecord, 'id' | 'vehicleId' | 'userId' | 'createdAt'>
