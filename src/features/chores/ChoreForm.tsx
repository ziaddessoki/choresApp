import { Button, MenuItem, Stack, TextField, Typography } from '@mui/material'
import type { Dispatch, SetStateAction } from 'react'
import type { Member, Priority, Recurrence, Status } from '../../types'

type Props = {
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
  submitLabel?: string
}

export function ChoreForm({ members, form, setForm, onAdd, submitLabel = 'Add chore' }: Props) {
  return (
    <Stack spacing={1.5}>
      <Typography variant="h6" gutterBottom>
        Add chore
      </Typography>
      <TextField
        label="Title"
        value={form.title}
        onChange={(e) => setForm((prev) => ({ ...prev, title: e.target.value }))}
        size="small"
        fullWidth
      />
      <TextField
        label="Due date"
        type="date"
        value={form.dueDate}
        onChange={(e) => setForm((prev) => ({ ...prev, dueDate: e.target.value }))}
        size="small"
        fullWidth
        InputLabelProps={{ shrink: true }}
      />
      <TextField
        label="Recurrence"
        select
        value={form.recurrence}
        onChange={(e) => setForm((prev) => ({ ...prev, recurrence: e.target.value as Recurrence }))}
        size="small"
        fullWidth
      >
        <MenuItem value="none">None</MenuItem>
        <MenuItem value="daily">Daily</MenuItem>
        <MenuItem value="weekly">Weekly</MenuItem>
        <MenuItem value="monthly">Monthly</MenuItem>
      </TextField>
      <TextField
        label="Priority"
        select
        value={form.priority}
        onChange={(e) => setForm((prev) => ({ ...prev, priority: e.target.value as Priority }))}
        size="small"
        fullWidth
      >
        <MenuItem value="low">Low</MenuItem>
        <MenuItem value="medium">Medium</MenuItem>
        <MenuItem value="high">High</MenuItem>
      </TextField>
      <TextField
        label="Status"
        select
        value={form.status}
        onChange={(e) => setForm((prev) => ({ ...prev, status: e.target.value as Status }))}
        size="small"
        fullWidth
      >
        <MenuItem value="pending">Pending</MenuItem>
        <MenuItem value="in-progress">In progress</MenuItem>
        <MenuItem value="done">Done</MenuItem>
      </TextField>
      <TextField
        label="Assignee"
        select
        value={form.assigneeId ?? ''}
        onChange={(e) =>
          setForm((prev) => ({
            ...prev,
            assigneeId: e.target.value ? (e.target.value as string) : null,
          }))
        }
        size="small"
        fullWidth
      >
        <MenuItem value="">Unassigned</MenuItem>
        {members.map((member) => (
          <MenuItem key={member.id} value={member.id}>
            {member.name}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        label="Notes"
        multiline
        minRows={2}
        value={form.notes}
        onChange={(e) => setForm((prev) => ({ ...prev, notes: e.target.value }))}
        size="small"
        fullWidth
      />
      <Button variant="contained" onClick={onAdd} fullWidth>
        {submitLabel}
      </Button>
    </Stack>
  )
}
