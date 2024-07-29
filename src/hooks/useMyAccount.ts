import { useState } from "react";

interface UseMyAccountReturn {
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  isLoading: boolean;
  error: Error | null;
}

const useMyAccount = (onClose: () => void): UseMyAccountReturn => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    const formData = new FormData(event.currentTarget);
    const oldPassword = formData.get("oldPassword") as string;
    const newPassword = formData.get("newPassword") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    try {
      if (newPassword !== confirmPassword) {
        throw new Error("Passwords do not match");
      }

      await new Promise((resolve) => setTimeout(resolve, 2000));

      onClose();
    } catch (err) {
      setError(err as Error);
    } finally {
      setIsLoading(false);
    }
  };

  return { handleSubmit, isLoading, error };
};

export default useMyAccount;
