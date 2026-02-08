import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from '../App'
import { AppStateProvider } from '../app/providers/AppStateProvider'

beforeEach(() => {
  localStorage.clear()
})

describe('Chores flow', () => {
  it('adds a chore and shows it in backlog page', async () => {
    const user = userEvent.setup()
    render(
      <AppStateProvider>
        <App />
      </AppStateProvider>,
    )

    await user.click(screen.getByRole('button', { name: /^add chore$/i }))
    const dialog = screen.getByRole('dialog', { name: /add chore/i })
    await user.type(within(dialog).getByLabelText(/title/i), 'Take out trash')
    await user.click(within(dialog).getByRole('button', { name: /^add chore$/i }))

    await user.click(screen.getByLabelText(/menu/i))
    await user.click(screen.getByRole('button', { name: /backlog/i }))

    expect(await screen.findByText('Take out trash')).toBeInTheDocument()
  })

  it('edits a chore from the calendar tile', async () => {
    const user = userEvent.setup()
    render(
      <AppStateProvider>
        <App />
      </AppStateProvider>,
    )

    await user.click(screen.getByRole('button', { name: /^add chore$/i }))
    const dialog = screen.getByRole('dialog', { name: /add chore/i })
    await user.type(within(dialog).getByLabelText(/title/i), 'Wipe desks')
    await user.click(within(dialog).getByRole('button', { name: /^add chore$/i }))

    const tile = await screen.findByText('Wipe desks')
    await user.click(tile)

    const editDialog = await screen.findByRole('dialog', { name: /edit chore/i })
    const titleInput = within(editDialog).getByLabelText(/title/i)
    await user.clear(titleInput)
    await user.type(titleInput, 'Wipe desks updated')
    await user.click(within(editDialog).getByRole('button', { name: /save changes/i }))

    await user.click(screen.getByLabelText(/menu/i))
    await user.click(screen.getByRole('button', { name: /backlog/i }))

    expect(await screen.findByText('Wipe desks updated')).toBeInTheDocument()
  })
})
