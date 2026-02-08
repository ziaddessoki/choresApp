import { Button, Divider, Paper, Stack, Typography } from '@mui/material'
import { MemberList } from '../features/members/MemberList'
import type { Member } from '../types'

type Props = {
  members: Member[]
  onRemove: (id: string) => void
  onOpenModal: () => void
}

export function MembersPage({ members, onRemove, onOpenModal }: Props) {
  return (
    <Paper elevation={0} sx={{ p: 2.5, borderRadius: 3, border: '1px solid', borderColor: 'divider' }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
        <Typography variant="h6">Members</Typography>
        <Button variant="contained" onClick={onOpenModal}>
          Add member
        </Button>
      </Stack>
      <Divider sx={{ mb: 2 }} />
      <MemberList members={members} onRemove={onRemove} />
    </Paper>
  )
}
