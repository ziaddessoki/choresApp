import { Button, Paper, Stack } from '@mui/material'
import Grid from '@mui/material/GridLegacy'
import type { Chore } from '../types'
import { CalendarBoard } from '../features/calendar/CalendarBoard'
import { CalendarToolbar } from '../features/calendar/CalendarToolbar'
import { addDays, buildMonthGrid, occursOnDay, weekDays } from '../utils/date'

type Props = {
  currentView: 'month' | 'week' | 'day'
  focusedDate: Date
  setView: (view: 'month' | 'week' | 'day') => void
  setFocusedDate: (date: Date) => void
  chores: Chore[]
  memberName: (id: string | null) => string
  onRemove: (id: string) => void
  onEdit: (chore: Chore) => void
  onOpenMemberModal: () => void
  onOpenChoreModal: () => void
}

export function CalendarPage({
  currentView,
  focusedDate,
  setView,
  setFocusedDate,
  chores,
  memberName,
  onRemove,
  onEdit,
  onOpenMemberModal,
  onOpenChoreModal,
}: Props) {
  const choresForDate = (day: Date) => chores.filter((chore) => occursOnDay(chore, day))
  const activeWeek = weekDays(focusedDate)
  const monthGrid = buildMonthGrid(focusedDate)

  const periodLabel =
    currentView === 'day'
      ? focusedDate.toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })
      : currentView === 'week'
      ? `${activeWeek[0].toLocaleDateString(undefined, { month: 'short', day: 'numeric' })} – ${activeWeek[6].toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}`
      : focusedDate.toLocaleDateString(undefined, { month: 'long', year: 'numeric' })

  const changePeriod = (direction: 1 | -1) => {
    if (currentView === 'day') {
      setFocusedDate(addDays(focusedDate, direction))
    } else if (currentView === 'week') {
      setFocusedDate(addDays(focusedDate, 7 * direction))
    } else {
      const next = new Date(focusedDate)
      next.setMonth(focusedDate.getMonth() + direction)
      setFocusedDate(next)
    }
  }

  const setToday = () => setFocusedDate(new Date())

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
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
                ? 'linear-gradient(120deg, #0f172a 0%, #111827 100%)'
                : 'linear-gradient(120deg, #ffffff 0%, #f8fafc 100%)',
          }}
        >
          <CalendarToolbar
            currentView={currentView}
            periodLabel={periodLabel}
            onChangeView={setView}
            onPrev={() => changePeriod(-1)}
            onNext={() => changePeriod(1)}
            onToday={setToday}
            actions={
              <Stack direction="row" spacing={1}>
                <Button
                  variant="outlined"
                  onClick={onOpenMemberModal}
                  sx={{
                    borderColor: (theme) =>
                      theme.palette.mode === 'dark'
                        ? 'rgba(148, 163, 184, 0.35)'
                        : 'rgba(148, 163, 184, 0.55)',
                    color: (theme) =>
                      theme.palette.mode === 'dark'
                        ? 'rgba(226, 232, 240, 0.9)'
                        : 'rgba(30, 41, 59, 0.9)',
                  }}
                >
                  Add member
                </Button>
                <Button variant="contained" onClick={onOpenChoreModal}>
                  Add chore
                </Button>
              </Stack>
            }
          />
        </Paper>
      </Grid>

      <Grid item xs={12}>
        <CalendarBoard
          currentView={currentView}
          focusedDate={focusedDate}
          monthDays={monthGrid}
          weekDays={activeWeek}
          choresForDate={choresForDate}
          memberName={memberName}
          onRemove={onRemove}
          onEditChore={onEdit}
        />
      </Grid>
    </Grid>
  )
}
