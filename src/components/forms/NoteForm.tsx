import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '@/components/common/Input'
import { Textarea } from '@/components/common/Textarea'
import { Button } from '@/components/common/Button'
import { noteFormSchema, type NoteFormValues } from '@/lib/validation/note'

interface NoteFormProps {
  defaultValues?: Partial<NoteFormValues>
  onSubmit: (values: NoteFormValues) => Promise<void> | void
  onCancel: () => void
  submitLabel?: string
}

export function NoteForm({ defaultValues, onSubmit, onCancel, submitLabel = 'Save note' }: NoteFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<NoteFormValues>({
    resolver: zodResolver(noteFormSchema),
    defaultValues: { title: '', content: '', ...defaultValues },
  })

  return (
    <form onSubmit={handleSubmit((values) => onSubmit(values))} className="flex flex-col gap-4" noValidate>
      <Input
        label="Title"
        placeholder="e.g. Workshop recommendation"
        error={errors.title?.message}
        {...register('title')}
      />
      <Textarea
        label="Note"
        placeholder="Warranty info, problems noticed, future repairs…"
        rows={5}
        error={errors.content?.message}
        {...register('content')}
      />
      <div className="mt-2 flex justify-end gap-3">
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Saving…' : submitLabel}
        </Button>
      </div>
    </form>
  )
}
