import { Alert } from '@mui/material';
import { ErrorComponentContainer, ErrorComponentContent } from './styles';

interface ErrorComponentProps {
  error: string;
}

const ErrorComponent = ({ error }: ErrorComponentProps) => {
  return (
    <ErrorComponentContainer>
      <ErrorComponentContent>
        <Alert severity="error">{error}</Alert>
      </ErrorComponentContent>
    </ErrorComponentContainer>
  );
};

export default ErrorComponent;