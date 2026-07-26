export type VehicleType = 'car' | 'motorcycle'

export interface Vehicle {
  id: string
  userId: string
  vehicleType: VehicleType
  brand: string
  model: string
  year: number
  registrationNumber: string
  mileage: number
  nickname?: string
  createdAt: string
  updatedAt: string
}

export type VehicleInput = Omit<Vehicle, 'id' | 'userId' | 'createdAt' | 'updatedAt'>
