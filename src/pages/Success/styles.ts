import { List, styled } from "@mui/material";

export const PreviewImage = styled('img')({
    width: '120px',
    height: '120px',
    objectFit: 'cover',
    borderRadius: '50%',
    marginBottom: '16px',
});

export const SuccessList = styled(List)({
    width: '100%',
});