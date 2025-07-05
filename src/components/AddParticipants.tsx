import { gradientButtonClass } from "../helpers/constants";

const Input = ({ couldDeleted = false }) => {
  return (
    <div className="mb-5">
      <label
        htmlFor="base-input"
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        Nombre de participante
      </label>
      <div className="flex">
        <input
          type="text"
          id="base-input"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
        {couldDeleted && <button className="ml-4">X</button>}
      </div>
    </div>
  );
};

const AddParticipants = () => {
  return (
    <form className="max-w-sm mx-auto w-full flex flex-col justify-between h-full">
      <div>
        <Input />
        <Input />
        <div className="flex justify-end cursor-pointer">
          <button>+ Agregar nuevo participante</button>
        </div>
      </div>
      <button type="button" className={`${gradientButtonClass}`}>
        Confirmar →
      </button>
    </form>
  );
};

export { AddParticipants };
