import { Chip, IconButton, Paper, Stack, Typography } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import type { Chore } from '../../types'
import { statusColor } from '../chores/choreDisplay'

type Props = {
  day: Date
  chores: Chore[]
  memberName: (id: string | null) => string
  onRemove: (id: string) => void
}

export function DayDetails({ day, chores, memberName, onRemove }: Props) {
  return (
    <Paper variant="outlined" sx={{ p: 1.5, borderRadius: 2, borderColor: 'divider' }}>
      <Stack spacing={1.5}>
        <Typography variant="subtitle1">
          {day.toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
        </Typography>
        {chores.length === 0 ? (
          <Typography variant="body2" color="text.secondary">
            Nothing scheduled for this day.
          </Typography>
        ) : (
          chores.map((chore) => (
            <Paper key={chore.id} variant="outlined" sx={{ p: 1.25, borderRadius: 2, borderColor: 'divider' }}>
              <Stack direction="row" spacing={1} alignItems="center">
                <Chip size="small" label={chore.status} color={statusColor[chore.status]} />
                <Typography variant="subtitle1" sx={{ flex: 1 }}>
                  {chore.title}
                </Typography>
                <Chip size="small" variant="outlined" label={memberName(chore.assigneeId)} />
                <IconButton aria-label={`delete ${chore.title}`} onClick={() => onRemove(chore.id)}>
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Stack>
              {chore.notes && (
                <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                  {chore.notes}
                </Typography>
              )}
            </Paper>
          ))
        )}
      </Stack>
    </Paper>
  )
}
