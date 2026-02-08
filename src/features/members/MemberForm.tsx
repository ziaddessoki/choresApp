import { Button, Stack, TextField, Typography } from '@mui/material'
import type { Dispatch, SetStateAction } from 'react'

type Props = {
  name: string
  email: string
  setForm: Dispatch<SetStateAction<{ name: string; email: string }>>
  onAdd: () => void
}

export function MemberForm({ name, email, setForm, onAdd }: Props) {
  return (
    <Stack spacing={1.5}>
      <Typography variant="h6" gutterBottom>
        Members
      </Typography>
      <TextField
        label="Name"
        value={name}
        onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
        size="small"
        fullWidth
      />
      <TextField
        label="Email"
        value={email}
        onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
        size="small"
        fullWidth
      />
      <Button variant="contained" onClick={onAdd} fullWidth>
        Add member
      </Button>
    </Stack>
  )
}
