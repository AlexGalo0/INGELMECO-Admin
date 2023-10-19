import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

export const useAdminForm = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleEmailChange = useCallback((newEmail: string) => {
    setEmail(newEmail);
  }, []);

  const handlePasswordChange = useCallback((newPassword: string) => {
    setPassword(newPassword);
  }, []);

  const handleError = useCallback((hasError: boolean) => {
    setError(hasError);
  }, []);

  const handleSuccess = useCallback((isSuccess: boolean) => {
    setSuccess(isSuccess);
  }, []);

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