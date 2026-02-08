import { Dialog, DialogContent, DialogTitle } from '@mui/material'
import type { Dispatch, SetStateAction } from 'react'
import { MemberForm } from './MemberForm'

type Props = {
  open: boolean
  onClose: () => void
  form: { name: string; email: string }
  setForm: Dispatch<SetStateAction<{ name: string; email: string }>>
  onAdd: () => void
}

export function MemberModal({ open, onClose, form, setForm, onAdd }: Props) {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Add member</DialogTitle>
      <DialogContent dividers>
        <MemberForm name={form.name} email={form.email} setForm={setForm} onAdd={onAdd} />
      </DialogContent>
    </Dialog>
  )
}
