import { Navigate } from 'react-router-dom';
import type { ComponentType } from 'react';

import Header from '../components/Header';
import { useAuthStore } from '../store/authStore';
import { ProtectedLayoutContainer, ProtectedLayoutMain } from './styles';

interface ProtectedLayoutProps {
  children: React.ReactNode;
  protected?: boolean;
}

const ProtectedLayout = ({ children, protected: isProtected = true }: ProtectedLayoutProps) => {
  const { isAuthenticated } = useAuthStore();

  if (isProtected && !isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  if (!isProtected && isAuthenticated) {
    return <Navigate to="/photo-upload" replace />;
  }

  return (
    <ProtectedLayoutContainer>
      <Header showLogout={isProtected} />
      <ProtectedLayoutMain>
        {children}
      </ProtectedLayoutMain>
    </ProtectedLayoutContainer>
  );
};

const withProtectedLayout = <P extends object>(Component: ComponentType<P>, isProtected = true) => {
  return (props: P) => (
    <ProtectedLayout protected={isProtected}>
      <Component {...props} />
    </ProtectedLayout>
  );
};

export default withProtectedLayout; 