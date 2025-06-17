import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  CircularProgress,
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { compressImage, isDataUrlTooLarge } from '../../utils/imageCompression';
import withProtectedLayout from '../../hocs/withProtectedLayout';
import { DefaultAlert, DefaultBox, DefaultButton, DefaultContainer, DefaultSubTitle, DefaultTitle } from '../../styles/components';
import { useTranslation } from 'react-i18next';
import { PreviewImage, PreviewImageContainer } from './styles';
import { useQuestionsStore } from '../../store/questionsStore';

const PhotoUpload = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const { resetQuestionsAnswers } = useQuestionsStore();

  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        setLoading(true);
        setError(null);
        const compressedImage = await compressImage(file);
        
        // Check if the compressed image is still too large
        if (isDataUrlTooLarge(compressedImage)) {
          throw new Error('Image is still too large after compression. Please try a smaller image.');
        }
        
        setSelectedImage(compressedImage);
        localStorage.setItem('uploadedPhoto', compressedImage);
      } catch (error) {
        console.error('Error processing image:', error);
        setError(error instanceof Error ? error.message : 'Failed to process image');
      } finally {
        setLoading(false);
      }
    }
  };

  const handleNext = () => {
    resetQuestionsAnswers();
    navigate('/questions');
  };

  return (
    <DefaultContainer>
      <DefaultTitle gutterBottom align="left">
        {t('photoUpload.welcome')}
      </DefaultTitle>
      <DefaultSubTitle align="left">
        {t('photoUpload.description')}
      </DefaultSubTitle>
      
      <DefaultBox sx={{ mt: 4 }}>
        <DefaultButton
          variant="outlined"
          startIcon={<CloudUploadIcon />}
          disabled={loading}
          component="label"
        >
          {t('photoUpload.choosePhoto')}
          <input
            id="file-upload"
            type="file"
            hidden
            accept="image/*"
            onChange={handleImageUpload}
          />
        </DefaultButton>

        {loading && <CircularProgress />}

        {error && (
          <DefaultAlert severity="error">
            {error}
          </DefaultAlert>
        )}

        {selectedImage && (
          <PreviewImageContainer>
            <PreviewImage
              src={selectedImage}
              alt="Preview"
            />
            <DefaultButton
              variant="contained"
              onClick={handleNext}
            >
              {t('photoUpload.next')}
            </DefaultButton>
          </PreviewImageContainer>
        )}
      </DefaultBox>
    </DefaultContainer>
  );
};

export default withProtectedLayout(PhotoUpload); 