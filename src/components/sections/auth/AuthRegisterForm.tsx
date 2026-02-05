import HoverLink from '@/components/ui/HoverLink';
import { useAuth } from '@/hooks/useAuth';
import { registerSchema, type RegisterFormData } from '@/schemas/authSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Checkbox, TextField, Typography } from '@mui/material';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';

interface AuthRegisterFormProps {
    onValidityChange?: (isValid: boolean) => void;
}

const AuthRegisterForm = ({ onValidityChange }: AuthRegisterFormProps) => {
    const { handleRegister, isLoading } = useAuth();

    const {
        control,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm<RegisterFormData>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            password: '',
            acceptTerms: false,
        },
    });

    useEffect(() => {
        onValidityChange?.(isValid);
    }, [isValid, onValidityChange]);

    return (
        <>
            <Typography variant="h1" sx={{ mb: '8px' }}>
                LOOKS LIKE YOU'RE <br /> NEW!
            </Typography>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: '24px'
            }}>
                <Typography variant="subtitle2">
                    Please create an account.
                </Typography>
                <form id="auth-form" onSubmit={handleSubmit(handleRegister)}>
                    <Box sx={{ mb: '24px' }}>
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
                        <Box sx={{
                            ml: '1px'
                        }}>
                            <Typography variant='caption' sx={{ mt: '4px' }}>
                                At least 8 characters with at least one uppercase, one lowercase, one special character, and one number.
                            </Typography>
                        </Box>

                    </Box>

                    <Box sx={{ display: 'flex' }}>
                        <Controller
                            name="acceptTerms"
                            control={control}
                            render={({ field }) => (
                                <Checkbox
                                    {...field}
                                    checked={field.value}
                                    disabled={isLoading}
                                    sx={{
                                        ml: '-2px',
                                        mb: '8px',
                                        mr: '8px'
                                    }}
                                />
                            )}
                        />

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
                            <Typography variant='body2' component="span"> of Bag Chatter's </Typography>
                            {' '}
                            <HoverLink to={"/dashboard"} underlineColor='#595959' alwaysUnderline>
                                <Typography variant='body2' component="span" sx={{
                                    color: '#595959',
                                    fontWeight: '700',
                                }}>Privacy Policy.</Typography>
                            </HoverLink>
                        </Box>
                    </Box>

                    {errors.acceptTerms && (
                        <Typography variant='caption' color="error" sx={{ mt: 1, display: 'block' }}>
                            {errors.acceptTerms.message}
                        </Typography>
                    )}
                </form>
            </Box>
        </>
    );
};

export default AuthRegisterForm;