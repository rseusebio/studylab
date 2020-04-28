import { Button } from '@material-ui/core';
import styled from 'styled-components';

const StyledButton = styled(Button)`
    background-color: light-grey;
`;

const ButtonContainer = styled.div`
    display: flex;
    flex-direction: row;
    background-color: white;

`;

export {
    StyledButton,
    ButtonContainer
}