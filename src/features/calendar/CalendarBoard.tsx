import { Box, Paper, Stack, Typography } from '@mui/material'
import type { Chore } from '../../types'
import { DayCell } from './DayCell'

type View = 'month' | 'week' | 'day'

type Props = {
  currentView: View
  focusedDate: Date
  monthDays: Date[]
  weekDays: Date[]
  choresForDate: (day: Date) => Chore[]
  memberName: (id: string | null) => string
  onRemove: (id: string) => void
  onEditChore: (chore: Chore) => void
}

export function CalendarBoard({
  currentView,
  focusedDate,
  monthDays,
  weekDays,
  choresForDate,
  memberName,
  onRemove,
  onEditChore,
}: Props) {
  const weekdayLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  const today = new Date()
  const isSameDay = (first: Date, second: Date) =>
    first.getFullYear() === second.getFullYear() &&
    first.getMonth() === second.getMonth() &&
    first.getDate() === second.getDate()

  return (
    <Paper
      elevation={0}
      sx={{
        p: 2,
        borderRadius: 3,
        border: '1px solid',
        borderColor: (theme) =>
          theme.palette.mode === 'dark'
            ? 'rgba(148, 163, 184, 0.25)'
            : 'rgba(148, 163, 184, 0.4)',
        background: (theme) =>
          theme.palette.mode === 'dark'
            ? 'linear-gradient(180deg, #0f172a 0%, #0b1220 100%)'
            : 'linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)',
        minHeight: 320,
        width: '100%',
      }}
    >
      {currentView === 'month' && (
        <Stack spacing={1.5}>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: 'repeat(7, minmax(0, 1fr))',
              gap: 1.5,
              px: 0.5,
            }}
          >
            {weekdayLabels.map((label) => (
              <Typography
                key={label}
                variant="caption"
                sx={{
                  textAlign: 'center',
                  color: (theme) =>
                    theme.palette.mode === 'dark'
                      ? 'rgba(148, 163, 184, 0.8)'
                      : 'rgba(71, 85, 105, 0.75)',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: 1,
                }}
              >
                {label}
              </Typography>
            ))}
          </Box>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: 'repeat(7, minmax(0, 1fr))',
              gap: 0,
              border: '1px solid',
              borderColor: (theme) =>
                theme.palette.mode === 'dark'
                  ? 'rgba(148, 163, 184, 0.2)'
                  : 'rgba(148, 163, 184, 0.35)',
              borderRadius: 2,
              overflow: 'hidden',
            }}
          >
            {monthDays.map((day) => (
              <DayCell
                key={day.toISOString()}
                day={day}
                chores={choresForDate(day)}
                memberName={memberName}
                muted={day.getMonth() !== focusedDate.getMonth()}
                isToday={isSameDay(day, today)}
                onEdit={onEditChore}
              />
            ))}
          </Box>
        </Stack>
      )}

      {currentView === 'week' && (
        <Stack spacing={1.5}>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: 'repeat(7, minmax(0, 1fr))',
              gap: 1.5,
              px: 0.5,
            }}
          >
            {weekdayLabels.map((label) => (
              <Typography
                key={label}
                variant="caption"
                sx={{
                  textAlign: 'center',
                  color: (theme) =>
                    theme.palette.mode === 'dark'
                      ? 'rgba(148, 163, 184, 0.8)'
                      : 'rgba(71, 85, 105, 0.75)',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: 1,
                }}
              >
                {label}
              </Typography>
            ))}
          </Box>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: 'repeat(7, minmax(0, 1fr))',
              gap: 0,
              border: '1px solid',
              borderColor: (theme) =>
                theme.palette.mode === 'dark'
                  ? 'rgba(148, 163, 184, 0.2)'
                  : 'rgba(148, 163, 184, 0.35)',
              borderRadius: 2,
              overflow: 'hidden',
            }}
          >
            {weekDays.map((day) => (
              <DayCell
                key={day.toISOString()}
                day={day}
                chores={choresForDate(day)}
                memberName={memberName}
                isToday={isSameDay(day, today)}
                onEdit={onEditChore}
              />
            ))}
          </Box>
        </Stack>
      )}

      {currentView === 'day' && (
        <Stack spacing={1.5}>
          <Typography
            variant="subtitle2"
            sx={{
              px: 0.5,
              color: (theme) =>
                theme.palette.mode === 'dark'
                  ? 'rgba(148, 163, 184, 0.85)'
                  : 'rgba(71, 85, 105, 0.85)',
            }}
          >
            {focusedDate.toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
          </Typography>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: 'repeat(1, minmax(0, 1fr))',
              gap: 0.5,
            }}
          >
            <DayCell
              day={focusedDate}
              chores={choresForDate(focusedDate)}
              memberName={memberName}
              showWeekday
              rounded
              isToday={isSameDay(focusedDate, today)}
              onEdit={onEditChore}
            />
          </Box>
        </Stack>
      )}
    </Paper>
  )
}
