import { z } from 'zod'

export const serviceItemSchema = z.object({
  itemName: z.string().min(1, 'Component name is required'),
  quantity: z.coerce.number().min(1).default(1),
  cost: z.coerce.number().min(0).optional(),
  notes: z.string().optional(),
})
export type ServiceItemFormValues = z.output<typeof serviceItemSchema>

export const serviceFormSchema = z.object({
  date: z.string().min(1, 'Date is required'),
  mileage: z.coerce.number().min(0, 'Mileage cannot be negative'),
  workshopName: z.string().min(1, 'Workshop name is required'),
  workshopLocation: z.string().optional(),
  totalCost: z.coerce.number().min(0, 'Total cost cannot be negative'),
  notes: z.string().optional(),
  items: z.array(serviceItemSchema).default([]),
})

/** Parsed/coerced output — what onSubmit handlers receive. */
export type ServiceFormValues = z.output<typeof serviceFormSchema>
/** Raw shape react-hook-form should type its fields as (numeric inputs arrive as strings pre-coercion). */
export type ServiceFormInput = z.input<typeof serviceFormSchema>
