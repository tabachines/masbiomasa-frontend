import logo from './logo.png';
import './index.css';

import Button from 'react-bootstrap/Button';
import { LinkContainer } from 'react-router-bootstrap';
import { Container } from 'react-bootstrap';

function Landing() {
    return (
        <Container className="p-3 text-center">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="header">Cálculo de captura de carbono</h1>
            <LinkContainer to="/zone-picker">
            <Button>Iniciar</Button>
            </LinkContainer>
        </Container>
    );
}



export default Landing;
