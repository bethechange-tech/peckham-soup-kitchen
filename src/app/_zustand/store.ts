import { User } from "payload";
import { create } from "zustand";

export type State = {
  error: Record<string, any> | null;
  currentUser: User | null | undefined
};

export type Actions = {
  setError: (error: Record<string, any>) => void;
  setCurrentUser: (currentUser: User | null | undefined) => void;
};

export const useStore = create<State & Actions>((set) => ({
  error: null,
  currentUser: null,
  setCurrentUser: (currentUser) => {
    set({
      currentUser,
    });
  },
  setError: (error) => {
    set({
      error,
    });
  },
}));
