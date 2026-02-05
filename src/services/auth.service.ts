import type { AuthFormData, LoginFormData, RegisterFormData } from "@/schemas/authSchema";
import { api } from "./api";
import type { AuthResponse, CheckEmailResponse } from "@/types/authTypes";

export const authService = {
  checkEmail: async (data: AuthFormData): Promise<CheckEmailResponse> => {
    const response = await api.post<CheckEmailResponse>('/auth/check-email', data);
    return response.data;
  },

  login: async (email: string, data: LoginFormData): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/auth/login', {
      email,
      ...data,
    });
    return response.data;
  },

  register: async (email: string, data: RegisterFormData): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/auth/register', {
      email,
      ...data,
    });
    return response.data;
  },
};