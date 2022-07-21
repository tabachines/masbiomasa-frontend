import { Button, Container } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";


function ZonePicker() {
    return (
        <Container className="p-3">
            <h1 className="header">Elige tu zona:</h1>
            <LinkContainer to="/zone-picker">
                <Button>Continuar</Button>
            </LinkContainer>
        </Container>
    );
}

export default ZonePicker;
