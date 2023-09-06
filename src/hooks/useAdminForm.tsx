import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const useAdminForm = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleEmailChange = (newEmail: string) => {
    setEmail(newEmail);
  };

  const handlePasswordChange = (newPassword: string) => {
    setPassword(newPassword);
  };

  const handleError = (hasError: boolean) => {
    setError(hasError);
  };

  const handleSuccess = (isSuccess: boolean) => {
    setSuccess(isSuccess);
  };

  return {
    email,
    password,
    error,
    success,
    navigate,
    handleEmailChange,
    handlePasswordChange,
    handleError,
    handleSuccess,
  };
};
