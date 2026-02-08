import { createContext, useContext, useMemo, useReducer } from 'react'

type View = 'month' | 'week' | 'day'
type Page = 'calendar' | 'members' | 'backlog'
type Mode = 'light' | 'dark'

type State = {
  mode: Mode
  activePage: Page
  drawerOpen: boolean
  memberModalOpen: boolean
  choreModalOpen: boolean
  currentView: View
  focusedDate: Date
  editingChoreId: string | null
}

type Action =
  | { type: 'toggle-mode' }
  | { type: 'set-mode'; mode: Mode }
  | { type: 'set-page'; page: Page }
  | { type: 'toggle-drawer'; open?: boolean }
  | { type: 'open-member-modal' }
  | { type: 'close-member-modal' }
  | { type: 'open-chore-modal'; id?: string | null }
  | { type: 'close-chore-modal' }
  | { type: 'set-view'; view: View }
  | { type: 'set-focused-date'; date: Date }

const initialState: State = {
  mode: 'light',
  activePage: 'calendar',
  drawerOpen: false,
  memberModalOpen: false,
  choreModalOpen: false,
  currentView: 'month',
  focusedDate: new Date(),
  editingChoreId: null,
}

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'toggle-mode':
      return { ...state, mode: state.mode === 'light' ? 'dark' : 'light' }
    case 'set-mode':
      return { ...state, mode: action.mode }
    case 'set-page':
      return { ...state, activePage: action.page }
    case 'toggle-drawer':
      return { ...state, drawerOpen: action.open ?? !state.drawerOpen }
    case 'open-member-modal':
      return { ...state, memberModalOpen: true }
    case 'close-member-modal':
      return { ...state, memberModalOpen: false }
    case 'open-chore-modal':
      return { ...state, choreModalOpen: true, editingChoreId: action.id ?? null }
    case 'close-chore-modal':
      return { ...state, choreModalOpen: false, editingChoreId: null }
    case 'set-view':
      return { ...state, currentView: action.view }
    case 'set-focused-date':
      return { ...state, focusedDate: action.date }
    default:
      return state
  }
}

const StateCtx = createContext<State | undefined>(undefined)
const DispatchCtx = createContext<React.Dispatch<Action> | undefined>(undefined)

export function AppStateProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState)
  const memoState = useMemo(() => state, [state])

  return (
    <StateCtx.Provider value={memoState}>
      <DispatchCtx.Provider value={dispatch}>{children}</DispatchCtx.Provider>
    </StateCtx.Provider>
  )
}

export function useAppState() {
  const ctx = useContext(StateCtx)
  if (!ctx) throw new Error('useAppState must be used within AppStateProvider')
  return ctx
}

export function useAppDispatch() {
  const ctx = useContext(DispatchCtx)
  if (!ctx) throw new Error('useAppDispatch must be used within AppStateProvider')
  return ctx
}

export type { View, Page, Mode }
