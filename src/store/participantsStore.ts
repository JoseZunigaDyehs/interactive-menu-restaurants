import { create } from "zustand";
import { persist } from "zustand/middleware";

type Participant = {
  id: string;
  name: string;
};

interface ParticipantsState {
  participants: Participant[];
  setParticipants: (p: Participant[]) => void;
}

export const useParticipantsStore = create<ParticipantsState>()(
  persist(
    (set) => ({
      participants: [],
      setParticipants: (participants) => set({ participants }),
    }),
    {
      name: "participants-store",
    }
  )
);
