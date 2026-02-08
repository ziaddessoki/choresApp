import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from '../App'
import { AppStateProvider } from '../app/providers/AppStateProvider'

beforeEach(() => {
  localStorage.clear()
})

describe('Calendar navigation', () => {
  it('switches calendar views', async () => {
    const user = userEvent.setup()
    render(
      <AppStateProvider>
        <App />
      </AppStateProvider>,
    )

    const weekToggle = screen.getByRole('button', { name: /^week$/i })
    await user.click(weekToggle)
    expect(weekToggle).toHaveAttribute('aria-pressed', 'true')

    const dayToggle = screen.getByRole('button', { name: /^day$/i })
    await user.click(dayToggle)
    expect(dayToggle).toHaveAttribute('aria-pressed', 'true')
  })
})
