import { Box, IconButton, Stack, Typography } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import type { Member } from '../../types'

type Props = {
  members: Member[]
  onRemove: (id: string) => void
}

export function MemberList({ members, onRemove }: Props) {
  if (members.length === 0) {
    return (
      <Typography variant="body2" color="text.secondary">
        No members yet
      </Typography>
    )
  }

  return (
    <Stack spacing={1.5}>
      {members.map((member) => (
        <Stack
          key={member.id}
          direction="row"
          spacing={1}
          alignItems="center"
          justifyContent="space-between"
        >
          <Box>
            <Typography variant="subtitle2">{member.name}</Typography>
            <Typography variant="caption" color="text.secondary">
              {member.email}
            </Typography>
          </Box>
          <IconButton aria-label={`remove ${member.name}`} onClick={() => onRemove(member.id)}>
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Stack>
      ))}
    </Stack>
  )
}
