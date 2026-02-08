import { Dialog, DialogContent, DialogTitle } from '@mui/material'
import type { Dispatch, SetStateAction } from 'react'
import type { Member, Priority, Recurrence, Status } from '../../types'
import { ChoreForm } from './ChoreForm'

type Props = {
  open: boolean
  onClose: () => void
  members: Member[]
  form: {
    title: string
    dueDate: string
    recurrence: Recurrence
    notes: string
    priority: Priority
    status: Status
    assigneeId: string | null
  }
  setForm: Dispatch<
    SetStateAction<{
      title: string
      dueDate: string
      recurrence: Recurrence
      notes: string
      priority: Priority
      status: Status
      assigneeId: string | null
    }>
  >
  onAdd: () => void
  titleText?: string
  submitLabel?: string
}

export function ChoreModal({ open, onClose, members, form, setForm, onAdd, titleText, submitLabel }: Props) {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{titleText ?? 'Add chore'}</DialogTitle>
      <DialogContent dividers>
        <ChoreForm members={members} form={form} setForm={setForm} onAdd={onAdd} submitLabel={submitLabel} />
      </DialogContent>
    </Dialog>
  )
}
