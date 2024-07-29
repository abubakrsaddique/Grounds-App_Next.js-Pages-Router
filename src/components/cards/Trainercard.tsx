import { FC } from "react";

import useModal from "@/hooks/useModal";

const Trainercard: FC = () => {
  const { isModalOpen, toggleModal, selectedTrainer, handleTrainerSelect } =
    useModal();

  return (
    <div className="relative w-full mt-5">
      {/* Main Trainer Card */}
      <div className="rounded-2xl border-2 border-lightbrown bg-primary p-2 px-4">
        <p className="flex cursor-pointer text-lightbrown items-center justify-between text-sm font-normal">
          {selectedTrainer ? (
            <>
              {selectedTrainer}
              <span
                className="text-sm font-semibold text-red cursor-pointer"
                onClick={toggleModal}
              >
                Change
              </span>
            </>
          ) : (
            <>
              Trainer referred by
              <span
                className="text-sm font-semibold text-lightgreen cursor-pointer"
                onClick={toggleModal}
              >
                View
              </span>
            </>
          )}
        </p>
      </div>

      {/* View Card */}
      <div
        className={`absolute mt-2 z-[101] w-[94%] rounded-2xl border-2 border-lightbrown bg-primary py-2 pt-4 ${
          isModalOpen ? "" : "hidden"
        }`}
      >
        {[
          "Heidi Somers",
          "Bailey Stewart",
          "Brooklyn Moore",
          "Kara Corey",
          "Teresa Hurtado",
          "None",
        ].map((trainer) => (
          <p
            key={trainer}
            className="flex cursor-pointer text-lightbrown items-center justify-between px-4 py-2 text-sm font-normal hover:bg-[#F8F8F8]"
            onClick={() => handleTrainerSelect(trainer)}
          >
            {trainer}
          </p>
        ))}
      </div>
    </div>
  );
};

export default Trainercard;
