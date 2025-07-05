// src/components/ParticipantsForm.tsx
import React, { useEffect } from "react";
import { useParticipantsStore } from "../store/participantsStore";
import { v4 as uuid } from "uuid";
import { useForm, useFieldArray } from "react-hook-form";
import { gradientButtonClass } from "../helpers/constants";

const MIN_PARTICIPANTS = 2;
const MAX_PARTICIPANTS = 10;

type Participant = { id: string; name: string };
type FormValues = { participants: Participant[] };

export default function ParticipantsForm() {
  const setParticipants = useParticipantsStore(
    (state) => state.setParticipants
  );

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      participants: Array.from({ length: MIN_PARTICIPANTS }, () => ({
        id: uuid(),
        name: "",
      })),
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "participants",
  });

  // 🔒 Asegurar mínimo de participantes
  useEffect(() => {
    if (fields.length < MIN_PARTICIPANTS) {
      for (let i = fields.length; i < MIN_PARTICIPANTS; i++) {
        append({ id: uuid(), name: "" });
      }
    }
  }, [fields.length]);

  const onSubmit = (data: FormValues) => {
    setParticipants(
      data.participants.map((p) => ({ ...p, name: p.name.trim() }))
    );
    window.location.href = "participants"; // o la ruta que quieras
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-sm mx-auto w-full flex flex-col justify-between h-full"
    >
      <div>
        {fields.map((field, index) => (
          <div key={field.id} className="mb-5">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Nombre de participante
            </label>
            <div className="flex">
              <input
                {...register(`participants.${index}.name`, {
                  required: "Este campo es obligatorio",
                  minLength: {
                    value: 2,
                    message: "Debe tener al menos 2 caracteres",
                  },
                  maxLength: {
                    value: 20,
                    message: "No debe superar los 20 caracteres",
                  },
                })}
                placeholder={`Participante ${index + 1}`}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
              {fields.length > MIN_PARTICIPANTS && (
                <button
                  type="button"
                  onClick={() => remove(index)}
                  className="ml-2 bg-red-500 rounded-lg px-2"
                >
                  <svg
                    fill="#ffffff"
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 64 64"
                  >
                    <g>
                      <path d="M39,0H25c-1.104,0-2,0.896-2,2v6H10c-1.104,0-2,0.896-2,2s0.896,2,2,2h2v50c0,1.104,0.896,2,2,2h36c1.104,0,2-0.896,2-2V12h2c1.104,0,2-0.896,2-2s-0.896-2-2-2H41V2C41,0.896,40.104,0,39,0z M48,12v48H16V12H48z M27,8V4h10v4H27z" />
                      <path d="M26,56c1.104,0,2-0.896,2-2V20c0-1.104-0.896-2-2-2s-2,0.896-2,2v34C24,55.104,24.896,56,26,56z" />
                      <path d="M38,56c1.104,0,2-0.896,2-2V20c0-1.104-0.896-2-2-2s-2,0.896-2,2v34C36,55.104,36.896,56,38,56z" />
                    </g>
                  </svg>
                </button>
              )}
            </div>
            {errors.participants?.[index]?.name && (
              <p className="text-sm text-red-500 mt-1">
                {errors.participants[index].name?.message}
              </p>
            )}
          </div>
        ))}

        <div className="flex justify-end cursor-pointer">
          <button
            type="button"
            onClick={() =>
              fields.length < MAX_PARTICIPANTS &&
              append({ id: uuid(), name: "" })
            }
            disabled={fields.length >= MAX_PARTICIPANTS}
            className=""
          >
            + Agregar nuevo participante
          </button>
        </div>
      </div>

      <button
        type="submit"
        className={`${gradientButtonClass} disabled:opacity-50`}
      >
        Confirmar →
      </button>
    </form>
  );
}
