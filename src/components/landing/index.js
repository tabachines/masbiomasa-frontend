import logo from './logo.png';
import './index.css';

import Button from 'react-bootstrap/Button';
import { LinkContainer } from 'react-router-bootstrap';

function Landing() {
    return (
        <div className="App">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="header">Cálculo de captura de carbono</h1>
            <LinkContainer to="/">
                <Button>Iniciar</Button>
            </LinkContainer>
        </div>
    );
}

export default Landing;
