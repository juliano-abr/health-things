import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  FormControlLabel,
  FormControl,
  CircularProgress,
} from '@mui/material';
import { useQuestionsStore } from '../../store/questionsStore';
import withProtectedLayout from '../../hocs/withProtectedLayout';
import ErrorComponent from '../../components/ErrorComponent';
import { DefaultBox, DefaultTitle, DefaultButton, DefaultSmallText, DefaultSubTitle } from '../../styles/components';
import { BottomBox, DefaultRadioGroup, QuestionsContainer, RadioButton } from './styles';

const Questions = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const {
    questions,
    answers,
    currentQuestionIndex,
    isLoading,
    error,
    fetchQuestions,
    setAnswer,
    setCurrentQuestionIndex,
  } = useQuestionsStore();

  useEffect(() => {
    const loadQuestions = async () => {
      try {
        await fetchQuestions();
      } catch (error) {
        // Error is handled by the store
      }
    };
    loadQuestions();
  }, [fetchQuestions]);

  const handleAnswer = (answer: string) => {
    setAnswer(questions[currentQuestionIndex].id, answer);
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      navigate('/success');
    }
  };

  if (isLoading) {
    return (
      <DefaultBox>
        <CircularProgress />
      </DefaultBox>
    );
  }

  if (error) {
    return <ErrorComponent error={t('questions.error')} />
  }

  if (questions.length === 0) {
    return null;
  }

  return (
    <QuestionsContainer>
       <DefaultSubTitle sx={{ fontWeight: 'bold' }}>
          {t('questions.title')}
        </DefaultSubTitle>
        <DefaultSmallText>
          {t('questions.question', { number: currentQuestionIndex + 1, total: questions.length })}
        </DefaultSmallText>
        <DefaultTitle>
          {questions[currentQuestionIndex].text}
        </DefaultTitle>
        <FormControl component="fieldset">
          <DefaultRadioGroup
            value={answers[questions[currentQuestionIndex].id] || ''}
            onChange={(e) => handleAnswer(e.target.value)}
          >
            {questions[currentQuestionIndex].options.map((option) => (
              <FormControlLabel
                key={option}
                value={option}
                control={<RadioButton />}
                label={<DefaultSmallText>{option}</DefaultSmallText>}
              />
            ))}
          </DefaultRadioGroup>
        </FormControl>
        <BottomBox>
          <DefaultButton
            variant="outlined"
            onClick={handlePrevious}
            disabled={currentQuestionIndex === 0}
          >
            {t('questions.previous')}
          </DefaultButton>
          <DefaultButton
            variant="contained"
            onClick={handleNext}
            disabled={!answers[questions[currentQuestionIndex].id]}
          >
            {currentQuestionIndex === questions.length - 1 
              ? t('questions.finish')
              : t('questions.next')}
          </DefaultButton>
        </BottomBox>
      </QuestionsContainer>
  );
};

export default withProtectedLayout(Questions);