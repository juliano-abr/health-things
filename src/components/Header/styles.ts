import { Box, Container } from "@mui/material";
import { styled } from "@mui/material/styles";
import { DefaultButton } from "../../styles/components";

export const HeaderContainer = styled(Container)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    padding: '24px',
    backgroundColor: theme.palette.primary.dark,
}));

export const LogoContainer = styled(Box)({
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
});

export const LogoContainerImg = styled('img')({
    width: '64px',
});

export const ButtonTitle = styled(DefaultButton)(({ theme }) => ({
    backgroundColor: theme.palette.primary.main,
    '& .MuiButton-startIcon': {
        [theme.breakpoints.down('sm')]: {
            margin: 0,
        },
    },
    '& .MuiButton-startIcon + span': {
        [theme.breakpoints.down('sm')]: {
            display: 'none',
        },
    },
}));