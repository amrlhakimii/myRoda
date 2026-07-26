import { z } from 'zod'

export const noteFormSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  content: z.string().min(1, 'Note content is required'),
})
export type NoteFormValues = z.infer<typeof noteFormSchema>
