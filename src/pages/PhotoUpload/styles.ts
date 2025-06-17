import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";

export const PreviewImage = styled('img')({
    maxWidth: '100%',
    maxHeight: '300px',
    objectFit: 'contain',
});

export const PreviewImageContainer = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px 0',
    gap: 16,
});