import { GenericDialog } from '@/components/ui/GenericDialog';
import { Box, Button, CircularProgress, Typography } from '@mui/material';
import { useState } from 'react';
import ArrowRightIcon from '@/components/icons/ArrowRightIcon';
import AuthEmailForm from './AuthEmailForm';
import AuthLoginForm from './AuthLoginForm';
import HoverLink from '@/components/ui/HoverLink';
import { useAuth } from '@/hooks/useAuth';
import AuthRegisterForm from './AuthRegisterForm';
import AuthTitleModal from './AuthTitleModal';

const AuthModal = () => {
  const [open, setOpen] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const { currentStep, isLoading, resetAuth } = useAuth();

  const handleOpen = () => setOpen(true);

  const handleClose = () => {
    setOpen(false);
    setTimeout(() => resetAuth(), 300);
  };

  // Callback para recibir el estado de validación de los formularios
  const handleFormValidityChange = (isValid: boolean) => {
    setIsFormValid(isValid);
  };

  // Determinar qué formulario mostrar
  const renderForm = () => {
    switch (currentStep) {
      case 'email':
        return <AuthEmailForm onValidityChange={handleFormValidityChange} />;
      case 'login':
        return <AuthLoginForm onValidityChange={handleFormValidityChange} />;
      case 'register':
        return <AuthRegisterForm onValidityChange={handleFormValidityChange} />;
      default:
        return <AuthEmailForm onValidityChange={handleFormValidityChange} />;
    }
  };

  // Determinar el texto del botón
  const getButtonText = () => {
    switch (currentStep) {
      case 'email':
        return 'Continue';
      case 'login':
        return 'Login';
      case 'register':
        return 'Create password';
      default:
        return 'Continue';
    }
  };

  console.log("Mostrar is loading: ", isLoading)
  return (
    <>
      <Button variant="contained" onClick={handleOpen}>
        Iniciar Sesión
      </Button>

      <GenericDialog
        open={open}
        onClose={handleClose}
        title={<AuthTitleModal />}
        showCloseButton
        maxWidth="xs"
        actions={
          <Box sx={{ display: 'flex', width: '100%', flexDirection: 'column', gap: '24px' }}>
            <Button
              type="submit"
              form="auth-form"
              variant="contained"
              color="primary"
              disabled={isLoading || !isFormValid}
              sx={{ flex: 1 }}
            >
              {isLoading ? (
                <>
                  <CircularProgress size={20} color="inherit" sx={{ mr: 1 }} />
                  Processing...
                </>
              ) : (
                <>
                  {getButtonText()}
                  <Box sx={{ mt: '5px', ml: '5px' }}>
                    <ArrowRightIcon />
                  </Box>
                </>
              )}
            </Button>

            {currentStep === 'login' && (
              <>
                <Box sx={{ display: 'block' }}>
                  <Typography variant='body2' component="span">I have read and accepted the</Typography>
                  {' '}
                  <HoverLink to={"/dashboard"} underlineColor='#595959' alwaysUnderline>
                    <Typography variant='body2' component="span" sx={{
                      color: '#595959',
                      fontWeight: '700',
                    }}>Terms and Conditions</Typography>
                  </HoverLink>
                  {' '}
                  <Typography variant='body2' component="span"> of <br /> Bag Chatter's </Typography>
                  {' '}
                  <HoverLink to={"/dashboard"} underlineColor='#595959' alwaysUnderline>
                    <Typography variant='body2' component="span" sx={{
                      color: '#595959',
                      fontWeight: '700',
                    }}>Privacy Policy.</Typography>
                  </HoverLink>
                </Box>
                <Box sx={{ mb: '16px' }}>
                  <HoverLink to={"/dashboard"} underlineColor='transparent' alwaysUnderline={false}>
                    <Typography variant='body1' sx={{
                      color: '#6A9D50',
                      fontWeight: '600',
                    }}>Forgot your password?</Typography>
                  </HoverLink>
                </Box>
              </>
            )}
          </Box>
        }
      >
        {renderForm()}
      </GenericDialog>
    </>
  );
};

export default AuthModal;