import { Box, Paper, Popover, Stack, Typography } from "@mui/material";
import { useRef, useState } from "react";
import type { MouseEvent } from "react";
import type { Chore } from "../../types";

const priorityDot: Record<Chore["priority"], string> = {
  low: "#94a3b8",
  medium: "#3b5bdb",
  high: "#ef5e5e",
};

type Props = {
  chore: Chore;
  memberName: (id: string | null) => string;
  onClick: (chore: Chore) => void;
  tone?: "default" | "calendar";
};

export function ChoreTile({
  chore,
  memberName,
  onClick,
  tone = "default",
}: Props) {
  const [anchor, setAnchor] = useState<HTMLElement | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isCalendarTone = tone === "calendar";

  const handleMouseEnter = (event: MouseEvent<HTMLElement>) => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
    setAnchor(event.currentTarget);
  };

  const handleMouseLeave = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setAnchor(null), 3300);
  };

  const open = Boolean(anchor);

  return (
    <>
      <Paper
        variant="outlined"
        sx={{
          position: "relative",
          borderColor: (theme) =>
            isCalendarTone
              ? theme.palette.mode === "dark"
                ? "rgba(148, 163, 184, 0.35)"
                : "rgba(148, 163, 184, 0.6)"
              : "divider",
          borderRadius: 1.5,
          p: 0.5,
          overflow: "hidden",
          cursor: "pointer",
          backgroundColor: (theme) =>
            isCalendarTone
              ? theme.palette.mode === "dark"
                ? "rgba(30, 41, 59, 0.85)"
                : "rgba(226, 232, 240, 0.95)"
              : "background.paper",
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={() => {
          setAnchor(null);
          onClick(chore);
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: 6,
            left: 6,
            width: 8,
            height: 8,
            borderRadius: "50%",
            backgroundColor: priorityDot[chore.priority],
          }}
        />
        <Stack spacing={0.25} sx={{ pl: 1.5 }}>
          <Typography
            variant="body2"
            noWrap
            sx={{
              color: (theme) =>
                isCalendarTone
                  ? theme.palette.mode === "dark"
                    ? "rgba(226, 232, 240, 0.95)"
                    : "rgba(30, 41, 59, 0.95)"
                  : "text.primary",
            }}
          >
            {chore.title}
          </Typography>
          <Typography
            variant="caption"
            noWrap
            sx={{
              color: (theme) =>
                isCalendarTone
                  ? theme.palette.mode === "dark"
                    ? "rgba(148, 163, 184, 0.85)"
                    : "rgba(71, 85, 105, 0.85)"
                  : "text.secondary",
            }}
          >
            {memberName(chore.assigneeId)}
          </Typography>
        </Stack>
      </Paper>
      <Popover
        open={open}
        anchorEl={anchor}
        onClose={handleMouseLeave}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        transformOrigin={{ vertical: "top", horizontal: "left" }}
        disableRestoreFocus
        slotProps={{
          paper: {
            sx: {
              p: 1.5,
              width: 260,
              backgroundColor: (theme) =>
                isCalendarTone
                  ? theme.palette.mode === "dark"
                    ? "rgba(15, 23, 42, 0.98)"
                    : "#ffffff"
                  : "background.paper",
            },
            onMouseEnter: () => {
              if (closeTimer.current) {
                clearTimeout(closeTimer.current);
                closeTimer.current = null;
              }
            },
            onMouseLeave: handleMouseLeave,
          },
        }}
      >
        <Stack spacing={0.5}>
          <Typography
            variant="subtitle2"
            sx={{
              color: (theme) =>
                isCalendarTone
                  ? theme.palette.mode === "dark"
                    ? "rgba(226, 232, 240, 0.95)"
                    : "rgba(30, 41, 59, 0.95)"
                  : "text.primary",
            }}
          >
            {chore.title}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: (theme) =>
                isCalendarTone
                  ? theme.palette.mode === "dark"
                    ? "rgba(148, 163, 184, 0.85)"
                    : "rgba(71, 85, 105, 0.85)"
                  : "text.secondary",
            }}
          >
            {memberName(chore.assigneeId)}
          </Typography>
          <Stack direction="row" spacing={1} alignItems="center">
            <Box
              sx={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                backgroundColor: priorityDot[chore.priority],
              }}
            />
            <Typography
              variant="caption"
              sx={{
              color: (theme) =>
                isCalendarTone
                  ? theme.palette.mode === "dark"
                    ? "rgba(148, 163, 184, 0.85)"
                    : "rgba(71, 85, 105, 0.85)"
                  : "text.secondary",
            }}
          >
            Priority {chore.priority}
          </Typography>
            <Typography
              variant="caption"
              sx={{
              color: (theme) =>
                isCalendarTone
                  ? theme.palette.mode === "dark"
                    ? "rgba(148, 163, 184, 0.85)"
                    : "rgba(71, 85, 105, 0.85)"
                  : "text.secondary",
            }}
          >
            {chore.status}
          </Typography>
          </Stack>
          {chore.notes && (
            <Typography
              variant="body2"
              sx={{
              color: (theme) =>
                isCalendarTone
                  ? theme.palette.mode === "dark"
                    ? "rgba(148, 163, 184, 0.85)"
                    : "rgba(71, 85, 105, 0.85)"
                  : "text.secondary",
            }}
          >
            {chore.notes}
          </Typography>
          )}
        </Stack>
      </Popover>
    </>
  );
}
