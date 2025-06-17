import {
  TextField,
  CircularProgress
} from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { useAuthStore } from '../../store/authStore';
import withProtectedLayout from '../../hocs/withProtectedLayout';
import { DefaultContainer, DefaultAlert, DefaultButton } from '../../styles/components';
import { FormBox } from './styles';

const Login = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { login, isLoading, error } = useAuthStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(email, password);
    navigate('/photo-upload');
  };

  return (
    <DefaultContainer>
      <FormBox onSubmit={handleSubmit}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label={t('login.email')}
          name="email"
          autoComplete="email"
          autoFocus
          value={email}
          onChange={(e) => { setEmail(e.target.value); }}
          disabled={isLoading}
          sx={{ 
            mb: 2,
          }}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label={t('login.password')}
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => { setPassword(e.target.value); }}
          disabled={isLoading}
          sx={{ 
            mb: 4,
          }}
        />
        <DefaultButton
          type="submit"
          fullWidth
          variant="contained"
          disabled={isLoading}
        >
          {isLoading ? <CircularProgress size={24} /> : t('login.submit')}
        </DefaultButton>
        {error && (
          <DefaultAlert severity="error">
            {error}
          </DefaultAlert>
        )}
      </FormBox>
    </DefaultContainer>
  );
};

export default withProtectedLayout(Login, false);