import { createTheme } from '@mui/material'
import type { PaletteMode } from '@mui/material'

export const buildTheme = (mode: PaletteMode) =>
  createTheme({
    palette: {
      mode,
      primary: { main: '#3b5bdb' },
      secondary: { main: '#ef5e5e' },
      background: {
        default: mode === 'light' ? '#f5f7fb' : '#0b1220',
        paper: mode === 'light' ? '#ffffff' : '#0f172a',
      },
    },
    shape: {
      borderRadius: 12,
    },
    typography: {
      fontFamily: '"Space Grotesk","Inter","Segoe UI",system-ui,-apple-system,sans-serif',
      fontWeightBold: 700,
    },
  })
