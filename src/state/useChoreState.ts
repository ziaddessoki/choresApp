import { useEffect, useMemo, useState } from "react";
import type { AppState, Chore, Member } from "../types";
import { dateKey } from "../utils/date";

const STORAGE_KEY = "choreAppState";

const createId = () =>
  crypto.randomUUID?.() ?? Math.random().toString(36).slice(2);

const loadState = (): AppState => {
  if (typeof window === "undefined") return { members: [], chores: [] };
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return {
        members: [
          { id: "m-1", name: "Avery", email: "avery@office.local" },
          { id: "m-2", name: "Jordan", email: "jordan@office.local" },
        ],
        chores: [],
      };
    }
    return JSON.parse(raw) as AppState;
  } catch {
    return { members: [], chores: [] };
  }
};

export const useChoreState = () => {
  const initial = useMemo(() => loadState(), []);
  const [members, setMembers] = useState<Member[]>(initial.members);
  const [chores, setChores] = useState<Chore[]>(initial.chores);

  useEffect(() => {
    if (typeof window === "undefined") return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ members, chores }));
  }, [members, chores]);

  const addMember = (name: string, email: string) => {
    if (!name.trim()) return;
    const next: Member = {
      id: createId(),
      name: name.trim(),
      email: email.trim(),
    };
    setMembers((prev) => [...prev, next]);
  };

  const removeMember = (id: string) => {
    setMembers((prev) => prev.filter((m) => m.id !== id));
    setChores((prev) =>
      prev.map((chore) =>
        chore.assigneeId === id ? { ...chore, assigneeId: null } : chore,
      ),
    );
  };

  const addChore = (input: Omit<Chore, "id">) => {
    if (!input.title.trim() || !input.dueDate) return;
    const next: Chore = { ...input, id: createId(), title: input.title.trim() };
    setChores((prev) => [...prev, next]);
  };

  const removeChore = (id: string) =>
    setChores((prev) => prev.filter((chore) => chore.id !== id));
  const updateChore = (updated: Chore) =>
    setChores((prev) =>
      prev.map((chore) => (chore.id === updated.id ? updated : chore)),
    );

  const resetFormsDefaults: Pick<
    Chore,
    "dueDate" | "recurrence" | "priority" | "status" | "assigneeId" | "notes"
  > = {
    dueDate: dateKey(new Date()),
    recurrence: "none",
    priority: "medium",
    status: "pending",
    assigneeId: null,
    notes: "",
  };

  return {
    members,
    chores,
    addMember,
    removeMember,
    addChore,
    removeChore,
    updateChore,
    defaults: resetFormsDefaults,
  };
};
