import { z } from 'zod'

export const reminderFormSchema = z.object({
  type: z.enum(['service', 'roadTax', 'insurance']),
  basis: z.enum(['interval', 'custom', 'mileage']),
  intervalMonths: z.coerce.number().optional(),
  mileageInterval: z.coerce.number().optional(),
  lastServiceDate: z.string().optional(),
  lastServiceMileage: z.coerce.number().optional(),
  customDate: z.string().optional(),
  label: z.string().optional(),
})

/** Parsed/coerced output — what onSubmit handlers receive. */
export type ReminderFormValues = z.output<typeof reminderFormSchema>
/** Raw shape react-hook-form should type its fields as (numeric inputs arrive as strings pre-coercion). */
export type ReminderFormInput = z.input<typeof reminderFormSchema>
