import type { Chore } from '../types'

export const dateKey = (value: Date) =>
  new Date(Date.UTC(value.getFullYear(), value.getMonth(), value.getDate()))
    .toISOString()
    .slice(0, 10)

export const startOfWeek = (value: Date) => {
  const day = value.getDay()
  const diff = (day + 6) % 7 // Monday as start
  const next = new Date(value)
  next.setHours(0, 0, 0, 0)
  next.setDate(value.getDate() - diff)
  return next
}

export const addDays = (value: Date, days: number) => {
  const next = new Date(value)
  next.setDate(value.getDate() + days)
  return next
}

export const sameDay = (a: Date, b: Date) =>
  a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate()

export const occursOnDay = (chore: Chore, day: Date) => {
  const anchor = new Date(`${chore.dueDate}T00:00:00`)
  anchor.setHours(0, 0, 0, 0)
  const target = new Date(day)
  target.setHours(0, 0, 0, 0)

  if (sameDay(anchor, target)) return true
  if (target < anchor) return false

  switch (chore.recurrence) {
    case 'daily':
      return true
    case 'weekly':
      return anchor.getDay() === target.getDay()
    case 'monthly':
      return anchor.getDate() === target.getDate()
    case 'none':
    default:
      return false
  }
}

export const buildMonthGrid = (value: Date) => {
  const start = startOfWeek(new Date(value.getFullYear(), value.getMonth(), 1))
  return Array.from({ length: 42 }, (_, idx) => addDays(start, idx))
}

export const weekDays = (value: Date) => {
  const start = startOfWeek(value)
  return Array.from({ length: 7 }, (_, idx) => addDays(start, idx))
}
