import api from './axios';

interface LoginPayload {
  email: string;
  password: string;
}

export const loginUser = async (data: LoginPayload) => {
  const res = await api.post('/auth/login', data);
  return res.data;
};

interface SignupPayload {
  name: string;
  email: string;
  password: string;
}

export const signupUser = async (data: SignupPayload) => {
  const res = await api.post('/auth/signup', data);
  return res.data;
};
