import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from '../App'
import { AppStateProvider } from '../app/providers/AppStateProvider'

beforeEach(() => {
  localStorage.clear()
})

describe('Members page', () => {
  it('adds a member via modal and shows on members page', async () => {
    const user = userEvent.setup()
    render(
      <AppStateProvider>
        <App />
      </AppStateProvider>,
    )

    await user.click(screen.getByRole('button', { name: /^add member$/i }))
    const dialog = screen.getByRole('dialog', { name: /add member/i })
    await user.type(within(dialog).getByLabelText(/name/i), 'Casey')
    await user.type(within(dialog).getByLabelText(/email/i), 'casey@example.com')
    await user.click(within(dialog).getByRole('button', { name: /^add member$/i }))

    await user.click(screen.getByLabelText(/menu/i))
    await user.click(screen.getByRole('button', { name: /members/i }))

    expect(await screen.findByText('Casey')).toBeInTheDocument()
    expect(screen.getByText('casey@example.com')).toBeInTheDocument()
  })
})
