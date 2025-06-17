import { Alert, Box } from '@mui/material';

interface ErrorComponentProps {
  error: string;
}

const ErrorComponent = ({ error }: ErrorComponentProps) => {
  return (
    <Box sx={{ width: '100%', maxWidth: 500 }}>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '300px' }}>
        <Alert severity="error">{error}</Alert>
      </Box>
    </Box>
  );
};

export default ErrorComponent;