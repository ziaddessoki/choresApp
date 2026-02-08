import { Container, CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { useMemo, useState } from "react";
import { buildTheme } from "./app/theme";
import { useAppDispatch, useAppState } from "./app/providers/AppStateProvider";
import { Header } from "./layout/Header";
import { LeftNav } from "./layout/LeftNav";
import { BacklogPage } from "./pages/BacklogPage";
import { CalendarPage } from "./pages/CalendarPage";
import { MembersPage } from "./pages/MembersPage";
import { ChoreModal } from "./features/chores/ChoreModal";
import { MemberModal } from "./features/members/MemberModal";
import { useChoreState } from "./state/useChoreState";
import type { Chore, Priority, Recurrence, Status } from "./types";

type ChoreFormState = {
  title: string;
  notes: string;
  dueDate: string;
  recurrence: Recurrence;
  priority: Priority;
  status: Status;
  assigneeId: string | null;
};

function App() {
  const {
    members,
    chores,
    addMember,
    removeMember,
    addChore,
    removeChore,
    updateChore,
    defaults,
  } = useChoreState();
  const {
    mode,
    activePage,
    drawerOpen,
    memberModalOpen,
    choreModalOpen,
    currentView,
    focusedDate,
    editingChoreId,
  } = useAppState();
  const dispatch = useAppDispatch();

  const [memberForm, setMemberForm] = useState({ name: "", email: "" });
  const [choreForm, setChoreForm] = useState<ChoreFormState>({
    title: "",
    notes: "",
    dueDate: defaults.dueDate,
    recurrence: defaults.recurrence,
    priority: defaults.priority,
    status: defaults.status,
    assigneeId: defaults.assigneeId,
  });

  const resetChoreForm = () =>
    setChoreForm({
      title: "",
      notes: "",
      dueDate: defaults.dueDate,
      recurrence: defaults.recurrence,
      priority: defaults.priority,
      status: defaults.status,
      assigneeId: defaults.assigneeId,
    });

  const handleMemberAdd = () => {
    addMember(memberForm.name, memberForm.email);
    setMemberForm({ name: "", email: "" });
    dispatch({ type: "close-member-modal" });
  };

  const handleChoreAdd = () => {
    if (editingChoreId) {
      updateChore({
        id: editingChoreId,
        title: choreForm.title,
        dueDate: choreForm.dueDate,
        recurrence: choreForm.recurrence,
        notes: choreForm.notes,
        priority: choreForm.priority,
        status: choreForm.status,
        assigneeId: choreForm.assigneeId,
      });
    } else {
      addChore({
        title: choreForm.title,
        dueDate: choreForm.dueDate,
        recurrence: choreForm.recurrence,
        notes: choreForm.notes,
        priority: choreForm.priority,
        status: choreForm.status,
        assigneeId: choreForm.assigneeId,
      });
    }
    resetChoreForm();
    dispatch({ type: "close-chore-modal" });
  };

  const memberName = (id: string | null) =>
    members.find((m) => m.id === id)?.name ?? "Unassigned";

  const openEditChore = (chore: Chore) => {
    dispatch({ type: "open-chore-modal", id: chore.id });
    setChoreForm({
      title: chore.title,
      notes: chore.notes,
      dueDate: chore.dueDate,
      recurrence: chore.recurrence,
      priority: chore.priority,
      status: chore.status,
      assigneeId: chore.assigneeId,
    });
  };

  const renderContent = () => {
    if (activePage === "members") {
      return (
        <MembersPage
          members={members}
          onRemove={removeMember}
          onOpenModal={() => {
            setMemberForm({ name: "", email: "" });
            dispatch({ type: "open-member-modal" });
          }}
        />
      );
    }

    if (activePage === "backlog") {
      return (
        <BacklogPage
          chores={chores}
          memberName={memberName}
          onRemove={removeChore}
          onOpenModal={() => {
            dispatch({ type: "open-chore-modal", id: null });
            resetChoreForm();
          }}
        />
      );
    }

    return (
      <CalendarPage
        currentView={currentView}
        focusedDate={focusedDate}
        setView={(view) => dispatch({ type: "set-view", view })}
        setFocusedDate={(date) => dispatch({ type: "set-focused-date", date })}
        chores={chores}
        memberName={memberName}
        onRemove={removeChore}
        onEdit={openEditChore}
        onOpenMemberModal={() => dispatch({ type: "open-member-modal" })}
        onOpenChoreModal={() => {
          dispatch({ type: "open-chore-modal", id: null });
          resetChoreForm();
        }}
      />
    );
  };

  const theme = useMemo(() => buildTheme(mode), [mode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header
        onMenuClick={() => dispatch({ type: "toggle-drawer", open: true })}
        onToggleTheme={() => dispatch({ type: "toggle-mode" })}
        mode={mode}
      />
      <Container maxWidth="lg" sx={{ py: 4 }}>
        {renderContent()}
      </Container>

      <MemberModal
        open={memberModalOpen}
        onClose={() => dispatch({ type: "close-member-modal" })}
        form={memberForm}
        setForm={setMemberForm}
        onAdd={handleMemberAdd}
      />

      <ChoreModal
        open={choreModalOpen}
        onClose={() => {
          dispatch({ type: "close-chore-modal" });
          resetChoreForm();
        }}
        members={members}
        form={choreForm}
        setForm={setChoreForm}
        onAdd={handleChoreAdd}
        titleText={editingChoreId ? "Edit chore" : "Add chore"}
        submitLabel={editingChoreId ? "Save changes" : "Add chore"}
      />

      <LeftNav
        open={drawerOpen}
        onClose={() => dispatch({ type: "toggle-drawer", open: false })}
        activePage={activePage}
        onSelect={(page) => dispatch({ type: "set-page", page })}
      />
    </ThemeProvider>
  );
}

export default App;
