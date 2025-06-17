import { Box, Container } from "@mui/material";
import { styled } from "@mui/material/styles";

export const ProtectedLayoutContainer = styled(Container)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    minHeight: '100vh',
    padding: 0,
    [theme.breakpoints.up('sm')]: {
        padding: '0',
    },
}));

export const ProtectedLayoutMain = styled(Box)({
    display: 'flex',
    flexGrow: 1,
    flexDirection: 'column',
    padding: '24px',
});