import logo from './logo.png';
import './index.css';

import Button from 'react-bootstrap/Button';
import { LinkContainer } from 'react-router-bootstrap';
import { Container, Row, Col } from 'react-bootstrap';

import Card from 'react-bootstrap/Card';

import curious from './curious.png';
import bosque from './bosque.png';


const users = [
    {
        "type": "Tengo terrenos",
        "icon": bosque,
        "description": "lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod teur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    }, {
        "type": "Curioso",
        "icon": curious,
        "description": "lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod teur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    }
]

const UserCard = (props) => {
    return (
        <Col>
            <Card className="user-card">
                <Card.Body>
                    <img src={props.icon} alt={props.type} className="user-icon" />
                    <Card.Title>{props.type}</Card.Title>
                    <Card.Text>
                        {props.description}
                    </Card.Text>
                    <LinkContainer to="/zone-picker">
                        <Button variant="primary">Iniciar</Button>
                    </LinkContainer>
                </Card.Body>
            </Card>
        </Col>
    );
}

function Landing() {
    return (
        <Container className="p-2 text-center">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="header">Cálculo de captura de carbono</h1>
            <h3 className="header mt-5 mb-0">¿Por qué te interesa?</h3>
            <Container className="p-3 text-center">
                <Row>
                    {
                        users.map((user) =>
                            <UserCard
                                key={user.type}
                                type={user.type}
                                description={user.description}
                                icon={user.icon}
                            />)
                    }
                </Row>
            </Container>
        </Container>
    );
}



export default Landing;
