import { useParticipantsStore } from "../store/participantsStore";

export default function Resumen() {
  const participants = useParticipantsStore((state) => state.participants);

  return (
    <div className="max-w-md mx-auto mt-8">
      <h1 className="text-xl font-bold mb-4">Resumen de participantes</h1>
      <ul className="space-y-2">
        {participants.map((p, i) => (
          <li key={p.id} className="p-2 border rounded">
            {i + 1}. {p.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
