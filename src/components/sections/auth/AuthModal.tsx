import { useState } from 'react';
import { Button, TextField, Typography } from '@mui/material';
import { GenericDialog } from '@/components/ui/GenericDialog';

const AuthModal = () => {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmit = () => {
    // Lógica de autenticación aquí
    console.log('Email:', email, 'Password:', password);
    handleClose();
  };

  return (
    <div>
      {/* Botón para abrir el modal */}
      <Button variant="contained" onClick={handleOpen}>
        Iniciar Sesión
      </Button>

      <GenericDialog
        open={open}
        onClose={handleClose}
        title="Autenticación"
        showCloseButton={true}
        maxWidth="sm"
        actions={
          <>
            <Button onClick={handleClose}>Cancelar</Button>
            <Button 
              variant="contained" 
              onClick={handleSubmit}
              disabled={!email || !password}
            >
              Ingresar
            </Button>
          </>
        }
      >
        {/* Contenido del formulario */}
        <Typography variant="body1" gutterBottom>
          Ingresa tus credenciales para continuar
        </Typography>
        
        <TextField
          fullWidth
          label="Correo electrónico"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          margin="normal"
          autoComplete="email"
        />
        
        <TextField
          fullWidth
          label="Contraseña"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          margin="normal"
          autoComplete="current-password"
        />
      </GenericDialog>
    </div>
  );
}

export default AuthModal;