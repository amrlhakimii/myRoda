import { useState } from 'react'
import { Plus, StickyNote, Pencil, Trash2 } from 'lucide-react'
import { Button } from '@/components/common/Button'
import { Modal } from '@/components/common/Modal'
import { ConfirmDialog } from '@/components/common/ConfirmDialog'
import { EmptyState } from '@/components/common/EmptyState'
import { Card } from '@/components/common/Card'
import { NoteForm } from '@/components/forms/NoteForm'
import { useNotes } from '@/hooks/useNotes'
import { createNote, deleteNote, updateNote } from '@/services/firestore/notes'
import { useAuthStore } from '@/store/authStore'
import { useToastStore } from '@/store/toastStore'
import { formatDate } from '@/utils/formatters'
import type { Vehicle } from '@/types/vehicle'
import type { MaintenanceNote } from '@/types/note'
import type { NoteFormValues } from '@/lib/validation/note'

export function NotesTab({ vehicle }: { vehicle: Vehicle }) {
  const userId = useAuthStore((s) => s.user?.uid)
  const { data: notes, isLoading } = useNotes(vehicle.id)
  const pushToast = useToastStore((s) => s.push)
  const [modalOpen, setModalOpen] = useState(false)
  const [editingNote, setEditingNote] = useState<MaintenanceNote | null>(null)
  const [deletingNote, setDeletingNote] = useState<MaintenanceNote | null>(null)

  const sorted = [...notes].sort((a, b) => b.createdAt.localeCompare(a.createdAt))

  function openCreate() {
    setEditingNote(null)
    setModalOpen(true)
  }

  function openEdit(note: MaintenanceNote) {
    setEditingNote(note)
    setModalOpen(true)
  }

  function handleSubmit(values: NoteFormValues) {
    if (!userId) return
    setModalOpen(false)
    if (editingNote) {
      updateNote(editingNote.id, values)
        .then(() => pushToast('Note updated'))
        .catch((error) => pushToast(error instanceof Error ? error.message : 'Failed to save note', 'error'))
    } else {
      createNote(userId, vehicle.id, values)
        .then(() => pushToast('Note added'))
        .catch((error) => pushToast(error instanceof Error ? error.message : 'Failed to save note', 'error'))
    }
  }

  function handleDelete() {
    if (!deletingNote) return
    const note = deletingNote
    setDeletingNote(null)
    deleteNote(note.id)
      .then(() => pushToast('Note removed'))
      .catch((error) => pushToast(error instanceof Error ? error.message : 'Failed to remove note', 'error'))
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-base font-bold text-navy-900">Notes</h2>
        <Button size="sm" onClick={openCreate}>
          <Plus size={16} /> Add note
        </Button>
      </div>

      {isLoading ? (
        <div className="h-24 animate-pulse rounded-2xl bg-mist-200" />
      ) : sorted.length === 0 ? (
        <EmptyState
          icon={<StickyNote size={28} />}
          title="No notes yet"
          description="Jot down workshop recommendations, warranty info, or problems noticed for later."
          action={<Button onClick={openCreate}>Add note</Button>}
        />
      ) : (
        <div className="grid gap-3 sm:grid-cols-2">
          {sorted.map((note) => (
            <Card key={note.id} className="p-4">
              <div className="flex items-start justify-between gap-2">
                <h3 className="font-bold text-navy-900">{note.title}</h3>
                <div className="flex shrink-0 items-center gap-1">
                  <button
                    onClick={() => openEdit(note)}
                    className="rounded-full p-1.5 text-navy-400 hover:bg-mist-100 hover:text-navy-700"
                    aria-label="Edit"
                  >
                    <Pencil size={14} />
                  </button>
                  <button
                    onClick={() => setDeletingNote(note)}
                    className="rounded-full p-1.5 text-navy-400 hover:bg-red-50 hover:text-red-600"
                    aria-label="Delete"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
              <p className="mt-1.5 text-sm whitespace-pre-wrap text-navy-600">{note.content}</p>
              <p className="mt-2 text-xs text-navy-400">{formatDate(note.createdAt)}</p>
            </Card>
          ))}
        </div>
      )}

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editingNote ? 'Edit note' : 'Add note'}
      >
        <NoteForm
          defaultValues={editingNote ?? undefined}
          submitLabel={editingNote ? 'Save changes' : 'Add note'}
          onSubmit={handleSubmit}
          onCancel={() => setModalOpen(false)}
        />
      </Modal>

      <ConfirmDialog
        open={Boolean(deletingNote)}
        title="Remove this note?"
        description="This will permanently delete the note."
        confirmLabel="Delete note"
        danger
        onConfirm={handleDelete}
        onCancel={() => setDeletingNote(null)}
      />
    </div>
  )
}
