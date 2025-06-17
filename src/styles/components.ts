import { Alert, Box, Button, Container, styled, Typography } from "@mui/material";
import type { ButtonProps } from "@mui/material";

export const DefaultContainer = styled(Container)(({ theme }) => ({
    width: '600px',
    [theme.breakpoints.down('sm')]: {
        minWidth: '300px',
        width: '100%',
    },
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    backgroundColor: theme.palette.background.paper,
    padding: '16px',
}));

export const DefaultBox = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 4,
    width: '100%',
});

export const DefaultAlert = styled(Alert)({
    mt: 4,
    mb: 4,
    width: '100%',
});

export const DefaultButton = styled(Button)<ButtonProps>(({ theme }) => ({
    color: theme.palette.text.secondary,
    borderRadius: 4,
    boxShadow: '1px 1px 1px 1px rgba(0, 0, 0, 0.1)',
    backgroundColor: theme.palette.primary.main,
    '&:hover': { backgroundColor: theme.palette.primary.light },
    '&:disabled': {
        backgroundColor: theme.palette.primary.light,
        color: theme.palette.text.secondary,
    },
}));

export const DefaultTitle = styled(Typography)(({ theme }) => ({
    fontSize: '24px',
    fontWeight: 700,
    color: theme.palette.text.primary,    
}));

export const DefaultSubTitle = styled(Typography)(({ theme }) => ({
    fontSize: '18px',
    fontWeight: 400,
    color: theme.palette.text.primary,
}));

export const DefaultSmallText = styled(Typography)(({ theme }) => ({
    fontSize: '16px',
    fontWeight: 400,
    color: theme.palette.text.primary,
}));
