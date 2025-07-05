// src/components/ResumenParticipantes.tsx
import React from "react";
import { useParticipantsStore } from "../store/participantsStore";

export default function ResumenParticipantes() {
  const participants = useParticipantsStore((state) => state.participants);

  return (
    <div className="max-w-md mx-auto mt-8 px-4">
      <h1 className="text-2xl font-bold mb-6">Participantes</h1>
      <ul className="space-y-3">
        {participants.map((p, i) => (
          <li
            key={p.id}
            className="p-4 bg-white rounded-lg shadow cursor-pointer hover:bg-gray-100 transition"
            onClick={() => (window.location.href = `/menu/${p.id}`)}
          >
            {i + 1}. {p.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
