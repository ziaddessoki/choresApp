import { Button, Paper, Stack, Typography } from '@mui/material'
import { ChoreBacklog } from '../features/chores/ChoreBacklog'
import type { Chore } from '../types'

type Props = {
  chores: Chore[]
  memberName: (id: string | null) => string
  onRemove: (id: string) => void
  onOpenModal: () => void
}

export function BacklogPage({ chores, memberName, onRemove, onOpenModal }: Props) {
  return (
    <Paper elevation={0} sx={{ p: 2.5, borderRadius: 3, border: '1px solid', borderColor: 'divider' }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
        <Typography variant="h6">Chore backlog</Typography>
        <Button variant="contained" onClick={onOpenModal}>
          Add chore
        </Button>
      </Stack>
      <ChoreBacklog chores={chores} memberName={memberName} onRemove={onRemove} />
    </Paper>
  )
}
