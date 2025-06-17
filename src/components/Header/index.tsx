
import logo from '../../assets/logo.png';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';
import { ButtonTitle, HeaderContainer, LogoContainer, LogoContainerImg } from './styles';
import { useAuthStore } from '../../store/authStore';
import { DefaultTitle } from '../../styles/components';

interface HeaderProps {
  showLogout?: boolean;
}

const Header = ({ showLogout = true }: HeaderProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  
  const { logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <HeaderContainer>
      <LogoContainer>
        <LogoContainerImg src={logo} alt="logo" />
        <DefaultTitle sx={{ color: '#ffffff' }}>
          {t('header.title')}
        </DefaultTitle>
      </LogoContainer>

      {showLogout && (
        <ButtonTitle
          variant="outlined"
          startIcon={<LogoutIcon />}
          onClick={handleLogout}
        >
          <span>{t('header.logout')}</span>
        </ButtonTitle>
      )}
    </HeaderContainer>
  );
};

export default Header;