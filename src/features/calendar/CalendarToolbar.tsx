import {
  Button,
  IconButton,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import type { ReactNode } from "react";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

type Props = {
  currentView: "month" | "week" | "day";
  periodLabel: string;
  onChangeView: (view: "month" | "week" | "day") => void;
  onPrev: () => void;
  onNext: () => void;
  onToday: () => void;
  actions?: ReactNode;
};

export function CalendarToolbar({
  currentView,
  periodLabel,
  onChangeView,
  onPrev,
  onNext,
  onToday,
  actions,
}: Props) {
  return (
    <Stack spacing={2}>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={2}
        alignItems={{ xs: "flex-start", sm: "center" }}
        justifyContent="space-between"
      >
        <Stack direction="row" spacing={1} alignItems="center">
          <IconButton
            aria-label="previous"
            onClick={onPrev}
            sx={{
              color: (theme) =>
                theme.palette.mode === "dark"
                  ? "rgba(226, 232, 240, 0.9)"
                  : "rgba(30, 41, 59, 0.9)",
            }}
          >
            <ArrowBackIosNewIcon fontSize="small" />
          </IconButton>
          <IconButton
            aria-label="next"
            onClick={onNext}
            sx={{
              color: (theme) =>
                theme.palette.mode === "dark"
                  ? "rgba(226, 232, 240, 0.9)"
                  : "rgba(30, 41, 59, 0.9)",
            }}
          >
            <ArrowForwardIosIcon fontSize="small" />
          </IconButton>
          <Button
            variant="outlined"
            size="small"
            onClick={onToday}
            sx={{
              borderColor: (theme) =>
                theme.palette.mode === "dark"
                  ? "rgba(148, 163, 184, 0.35)"
                  : "rgba(148, 163, 184, 0.55)",
              color: (theme) =>
                theme.palette.mode === "dark"
                  ? "rgba(226, 232, 240, 0.9)"
                  : "rgba(30, 41, 59, 0.9)",
            }}
          >
            Today
          </Button>
          <Typography
            variant="h6"
            sx={{
              ml: 1,
              color: (theme) =>
                theme.palette.mode === "dark"
                  ? "rgba(226, 232, 240, 0.95)"
                  : "rgba(15, 23, 42, 0.95)",
            }}
          >
            {periodLabel}
          </Typography>
        </Stack>

        <Stack direction="row" spacing={1.5} alignItems="center">
          <ToggleButtonGroup
            color="primary"
            exclusive
            value={currentView}
            onChange={(_, val) => val && onChangeView(val)}
            size="small"
            sx={{
              backgroundColor: (theme) =>
                theme.palette.mode === "dark"
                  ? "rgba(30, 41, 59, 0.9)"
                  : "rgba(226, 232, 240, 0.85)",
              borderRadius: 2,
              p: 0.5,
              "& .MuiToggleButton-root": {
                border: "none",
                color: (theme) =>
                  theme.palette.mode === "dark"
                    ? "rgba(148, 163, 184, 0.8)"
                    : "rgba(71, 85, 105, 0.9)",
                textTransform: "none",
                px: 2,
                borderRadius: 1.5,
                "&.Mui-selected": {
                  backgroundColor: (theme) =>
                    theme.palette.mode === "dark"
                      ? "rgba(59, 91, 219, 0.3)"
                      : "rgba(59, 91, 219, 0.18)",
                  color: (theme) =>
                    theme.palette.mode === "dark"
                      ? "rgba(226, 232, 240, 0.95)"
                      : "rgba(30, 41, 59, 0.95)",
                },
              },
            }}
          >
            <ToggleButton value="month">Month</ToggleButton>
            <ToggleButton value="week">Week</ToggleButton>
            <ToggleButton value="day">Day</ToggleButton>
          </ToggleButtonGroup>
          {actions}
        </Stack>
      </Stack>
    </Stack>
  );
}
