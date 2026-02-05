import { useAuth } from '@/hooks/useAuth';
import { loginSchema, type LoginFormData } from '@/schemas/authSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, TextField, Typography } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { useEffect } from 'react';

interface AuthLoginFormProps {
  onValidityChange?: (isValid: boolean) => void;
}

const AuthLoginForm = ({ onValidityChange }: AuthLoginFormProps) => {
  const { handleLogin, isLoading } = useAuth();

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: 'onChange',
    defaultValues: {
      password: '',
    },
  });

  useEffect(() => {
    onValidityChange?.(isValid);
  }, [isValid, onValidityChange]);

  return (
    <>
      <Typography variant="h1" sx={{ mb: '8px' }}>
        WELCOME BACK!
      </Typography>
      <Typography variant="subtitle2" sx={{ marginBottom: '24px' }}>
        Please enter your password
      </Typography>

      <form id="auth-form" onSubmit={handleSubmit(handleLogin)}>
        <Box>
          <Typography variant="h6" sx={{ mb: 0.5, fontWeight: 500 }}>
            Password
          </Typography>
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                type="password"
                error={!!errors.password}
                helperText={errors.password?.message}
                fullWidth
                disabled={isLoading}
              />
            )}
          />
        </Box>
      </form>
    </>
  );
};

export default AuthLoginForm;