export interface ServiceItem {
  id: string
  itemName: string
  quantity: number
  cost?: number
  notes?: string
}

export type ServiceItemInput = Omit<ServiceItem, 'id'>

export interface ServiceRecord {
  id: string
  vehicleId: string
  userId: string
  date: string
  mileage: number
  workshopName: string
  workshopLocation?: string
  totalCost: number
  notes?: string
  items: ServiceItem[]
  createdAt: string
}

export type ServiceRecordInput = Omit<
  ServiceRecord,
  'id' | 'vehicleId' | 'userId' | 'createdAt'
>
