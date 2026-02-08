import { Box, Paper, Stack, Typography } from "@mui/material";
import type { Chore } from "../../types";
import { ChoreTile } from "../chores/ChoreTile";

type Props = {
  day: Date;
  chores: Chore[];
  memberName: (id: string | null) => string;
  muted?: boolean;
  showWeekday?: boolean;
  rounded?: boolean;
  isToday?: boolean;
  onEdit: (chore: Chore) => void;
};

export function DayCell({
  day,
  chores,
  memberName,
  muted,
  showWeekday = false,
  rounded = false,
  isToday = false,
  onEdit,
}: Props) {
  return (
    <Paper
      variant="outlined"
      sx={{
        p: 1.5,
        borderRadius: rounded ? 2 : 0,
        height: "100%",
        borderColor: (theme) =>
          theme.palette.mode === "dark"
            ? muted
              ? "rgba(148, 163, 184, 0.15)"
              : "rgba(148, 163, 184, 0.25)"
            : muted
              ? "rgba(148, 163, 184, 0.25)"
              : "rgba(148, 163, 184, 0.4)",
        backgroundColor: (theme) =>
          theme.palette.mode === "dark"
            ? muted
              ? "#0b1220"
              : "#0f172a"
            : muted
              ? "#f1f5f9"
              : "#ffffff",
        display: "flex",
        flexDirection: "column",
        minHeight: 150,
        maxHeight: 260,
        overflow: "hidden",
        overflowY: "auto",
      }}
    >
      <Stack spacing={1} sx={{ flex: 1 }}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          {showWeekday ? (
            <Typography
              variant="subtitle2"
              sx={{
                color: (theme) =>
                  theme.palette.mode === "dark"
                    ? "rgba(148, 163, 184, 0.8)"
                    : "rgba(71, 85, 105, 0.8)",
              }}
            >
              {day.toLocaleDateString(undefined, { weekday: "short" })}
            </Typography>
          ) : (
            <Box />
          )}
          <Box
            sx={{
              width: 28,
              height: 28,
              borderRadius: "50%",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 600,
              fontSize: 14,
              color: (theme) =>
                isToday
                  ? "#fff"
                  : theme.palette.mode === "dark"
                    ? "rgba(226, 232, 240, 0.9)"
                    : "rgba(51, 65, 85, 0.9)",
              backgroundColor: isToday ? "primary.main" : "transparent",
              border: isToday
                ? "1px solid transparent"
                : (theme) =>
                    theme.palette.mode === "dark"
                      ? "1px solid rgba(148, 163, 184, 0.25)"
                      : "1px solid rgba(148, 163, 184, 0.45)",
            }}
          >
            {day.getDate()}
          </Box>
        </Stack>
        <Stack spacing={0.5}>
          {chores.length === 0 ? (
            <Typography
              variant="caption"
              sx={{
                color: (theme) =>
                  theme.palette.mode === "dark"
                    ? "rgba(148, 163, 184, 0.65)"
                    : "rgba(100, 116, 139, 0.85)",
              }}
            >
              No chores
            </Typography>
          ) : (
            chores.map((chore) => (
              <ChoreTile
                key={chore.id}
                chore={chore}
                memberName={memberName}
                onClick={onEdit}
                tone="calendar"
              />
            ))
          )}
        </Stack>
      </Stack>
    </Paper>
  );
}
