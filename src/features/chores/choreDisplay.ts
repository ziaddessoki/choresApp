import type { Priority, Status } from '../../types'

export const statusColor: Record<Status, 'default' | 'info' | 'success' | 'warning'> = {
  pending: 'warning',
  'in-progress': 'info',
  done: 'success',
}

export const priorityTone: Record<Priority, 'default' | 'primary' | 'secondary'> = {
  low: 'default',
  medium: 'primary',
  high: 'secondary',
}
