import { AppBar, Chip, IconButton, Stack, Switch, Toolbar, Typography } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'

type Props = {
  onMenuClick?: () => void
  onToggleTheme?: () => void
  mode: 'light' | 'dark'
}

export function Header({ onMenuClick, onToggleTheme, mode }: Props) {
  return (
    <AppBar position="static" elevation={0} sx={{ background: '#0f172a', color: '#e2e8f0' }}>
      <Toolbar>
        {onMenuClick && (
          <IconButton edge="start" color="inherit" aria-label="menu" onClick={onMenuClick} sx={{ mr: 1 }}>
            <MenuIcon />
          </IconButton>
        )}
        <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 700 }}>
          Office Chores
        </Typography>
        <Stack direction="row" spacing={1} alignItems="center">
          {onToggleTheme && (
            <Stack direction="row" alignItems="center" spacing={0.5}>
              <Typography variant="caption">{mode === 'dark' ? 'Dark' : 'Light'}</Typography>
              <Switch size="small" color="default" onChange={onToggleTheme} checked={mode === 'dark'} />
            </Stack>
          )}
          <Chip label="Local only" size="small" sx={{ background: '#1e293b', color: '#e2e8f0' }} />
        </Stack>
      </Toolbar>
    </AppBar>
  )
}
