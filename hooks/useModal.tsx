import { useState, useCallback } from "react";

interface UseModalReturn {
  isModalOpen: boolean;
  toggleModal: () => void;
  selectedTrainer: string | null;
  handleTrainerSelect: (trainer: string) => void;
}

const useModal = (): UseModalReturn => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedTrainer, setSelectedTrainer] = useState<string | null>(null);

  const toggleModal = useCallback(() => {
    setIsModalOpen((prev) => !prev);
  }, []);

  const handleTrainerSelect = (trainer: string) => {
    setSelectedTrainer(trainer);
    setIsModalOpen(false);
  };

  return {
    isModalOpen,
    toggleModal,
    selectedTrainer,
    handleTrainerSelect,
  };
};

export default useModal;
