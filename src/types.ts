export type Recurrence = 'none' | 'daily' | 'weekly' | 'monthly'
export type Priority = 'low' | 'medium' | 'high'
export type Status = 'pending' | 'in-progress' | 'done'

export type Member = {
  id: string
  name: string
  email: string
}

export type Chore = {
  id: string
  title: string
  dueDate: string
  recurrence: Recurrence
  notes: string
  priority: Priority
  status: Status
  assigneeId: string | null
}

export type AppState = {
  members: Member[]
  chores: Chore[]
}
