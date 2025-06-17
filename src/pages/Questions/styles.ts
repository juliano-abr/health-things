import { Box, Radio, RadioGroup } from "@mui/material";
import { styled } from "@mui/material/styles";
import { DefaultContainer } from "../../styles/components";

export const QuestionsContainer = styled(DefaultContainer)({
    margin: '0 auto',
    gap: 16,
});

export const BottomBox = styled(Box)({
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: 16,
    width: '100%',
});

export const RadioButton = styled(Radio)(({ theme }) => ({
    p: 1.5,
    color: theme.palette.primary.main,
    '& .MuiSvgIcon-root': { fontSize: 28 },
}));

export const DefaultRadioGroup = styled(RadioGroup)({
    marginTop: 16,
    marginBottom: 8,
});