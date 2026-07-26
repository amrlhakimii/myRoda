export type ReminderType = 'service' | 'roadTax' | 'insurance'
export type ReminderBasis = 'interval' | 'custom' | 'mileage'

export interface Reminder {
  id: string
  vehicleId: string
  userId: string
  type: ReminderType
  basis: ReminderBasis
  intervalMonths?: number
  mileageInterval?: number
  lastServiceDate?: string
  lastServiceMileage?: number
  nextDueDate: string
  nextDueMileage?: number
  label?: string
  createdAt: string
}

export type ReminderInput = Omit<
  Reminder,
  'id' | 'vehicleId' | 'userId' | 'createdAt' | 'nextDueDate'
>
