import { useState, useCallback } from "react";

interface UseModalReturn {
  isModalOpen: boolean;
  modalType: string | null;
  toggleModal: () => void;
  openModal: (type: string) => void;
  closeModal: () => void;
  selectedTrainer: string | null;
  handleTrainerSelect: (trainer: string) => void;
}

const useModal = (): UseModalReturn => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalType, setModalType] = useState<string | null>(null);
  const [selectedTrainer, setSelectedTrainer] = useState<string | null>(null);

  const toggleModal = useCallback(() => {
    setIsModalOpen((prev) => !prev);
  }, []);

  const openModal = (type: string) => {
    setModalType(type);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setModalType(null);
    setIsModalOpen(false);
  };

  const handleTrainerSelect = (trainer: string) => {
    setSelectedTrainer(trainer);
    setIsModalOpen(false);
  };

  return {
    isModalOpen,
    modalType,
    toggleModal,
    openModal,
    closeModal,
    selectedTrainer,
    handleTrainerSelect,
  };
};

export default useModal;
