import { z } from 'zod'

export const fuelFormSchema = z.object({
  date: z.string().min(1, 'Date is required'),
  mileage: z.coerce.number().min(0, 'Mileage cannot be negative'),
  petrolStation: z.string().optional(),
  petrolType: z.enum(['RON95', 'RON97', 'Diesel']),
  litres: z.coerce.number().positive('Litres must be greater than 0'),
  totalPrice: z.coerce.number().positive('Total cost must be greater than 0'),
})

/** Parsed/coerced output — what onSubmit handlers receive. */
export type FuelFormValues = z.output<typeof fuelFormSchema>
/** Raw shape react-hook-form should type its fields as (numeric inputs arrive as strings pre-coercion). */
export type FuelFormInput = z.input<typeof fuelFormSchema>
