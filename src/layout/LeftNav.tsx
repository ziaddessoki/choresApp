import { Box, Drawer, List, ListItemButton, ListItemText, Toolbar } from '@mui/material'
import type { Page } from '../app/providers/AppStateProvider'

type Props = {
  open: boolean
  onClose: () => void
  activePage: Page
  onSelect: (page: Page) => void
}

export function LeftNav({ open, onClose, activePage, onSelect }: Props) {
  const items: { key: Page; label: string }[] = [
    { key: 'calendar', label: 'Calendar' },
    { key: 'members', label: 'Members' },
    { key: 'backlog', label: 'Backlog' },
  ]

  return (
    <Drawer anchor="left" open={open} onClose={onClose}>
      <Box sx={{ width: { xs: 240, sm: 260 } }}>
        <Toolbar />
        <List>
          {items.map((item) => (
            <ListItemButton
              key={item.key}
              selected={activePage === item.key}
              onClick={() => {
                onSelect(item.key)
                onClose()
              }}
            >
              <ListItemText primary={item.label} />
            </ListItemButton>
          ))}
        </List>
      </Box>
    </Drawer>
  )
}
