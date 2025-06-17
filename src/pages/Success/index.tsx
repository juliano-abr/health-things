import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  Box,
  ListItem,
  ListItemText,
  Divider
} from '@mui/material';

import { useQuestionsStore } from '../../store/questionsStore';
import { useAuthStore } from '../../store/authStore';
import withProtectedLayout from '../../hocs/withProtectedLayout';
import { DefaultBox, DefaultButton, DefaultContainer, DefaultSmallText, DefaultSubTitle, DefaultTitle } from '../../styles/components';
import { PreviewImage, SuccessList } from './styles';

const Success = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { questions, answers } = useQuestionsStore();
  const { logout } = useAuthStore();

  const handleRestart = () => {
    localStorage.removeItem('uploadedPhoto');
    logout();
    navigate('/');
  };

  return (
    <DefaultContainer>
      <DefaultBox>
        {localStorage.getItem('uploadedPhoto') && (
          <PreviewImage src={localStorage.getItem('uploadedPhoto') || ''} alt="Uploaded" />
        )}
        <DefaultTitle>
          {t('success.answers')}
        </DefaultTitle>
        <SuccessList>
          {questions.map((question, index) => (
            <Box key={question.id}>
              <ListItem alignItems="flex-start" sx={{ px: 0 }}>
                <ListItemText
                  primary={<DefaultSmallText>{question.text}</DefaultSmallText>}
                  secondary={<DefaultSubTitle sx={{ fontWeight: 700 }}>{answers[question.id] || 'Not answered'}</DefaultSubTitle>}
                />
              </ListItem>
              {index < questions.length - 1 && <Divider />}
            </Box>
          ))}
        </SuccessList>
      </DefaultBox>
      <DefaultBox>
        <DefaultButton
          variant="contained"
          onClick={handleRestart}
          fullWidth
        >
          {t('success.startNew')}
        </DefaultButton>
      </DefaultBox>
    </DefaultContainer>
  );
};

export default withProtectedLayout(Success);
