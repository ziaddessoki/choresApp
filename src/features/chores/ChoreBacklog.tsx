import { Box, Chip, IconButton, Paper, Stack, Typography } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import type { Chore } from '../../types'
import { priorityTone, statusColor } from './choreDisplay'

type Props = {
  chores: Chore[]
  memberName: (id: string | null) => string
  onRemove: (id: string) => void
}

export function ChoreBacklog({ chores, memberName, onRemove }: Props) {
  return (
    <Paper elevation={0} sx={{ p: 2, borderRadius: 3, border: '1px solid', borderColor: 'divider' }}>
      <Typography variant="h6" gutterBottom>
        Chore backlog
      </Typography>
      <Stack spacing={1.25}>
        {chores.length === 0 ? (
          <Typography variant="body2" color="text.secondary">
            Add a chore to see it listed here.
          </Typography>
        ) : (
          chores.map((chore) => (
            <Stack
              key={chore.id}
              direction={{ xs: 'column', sm: 'row' }}
              spacing={1}
              alignItems={{ xs: 'flex-start', sm: 'center' }}
              sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 2, p: 1.25 }}
            >
              <Box sx={{ flex: 1 }}>
                <Typography variant="subtitle1">{chore.title}</Typography>
                <Typography variant="body2" color="text.secondary">
                  Due {new Date(`${chore.dueDate}T00:00:00`).toLocaleDateString()} •{' '}
                  {chore.recurrence === 'none' ? 'one-time' : chore.recurrence}
                </Typography>
                {chore.notes && (
                  <Typography variant="body2" color="text.secondary">
                    {chore.notes}
                  </Typography>
                )}
              </Box>
              <Stack direction="row" spacing={1} alignItems="center">
                <Chip size="small" label={chore.status} color={statusColor[chore.status]} />
                <Chip size="small" label={chore.priority} color={priorityTone[chore.priority]} />
                <Chip size="small" variant="outlined" label={memberName(chore.assigneeId)} />
                <IconButton aria-label={`delete ${chore.title}`} onClick={() => onRemove(chore.id)}>
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Stack>
            </Stack>
          ))
        )}
      </Stack>
    </Paper>
  )
}
