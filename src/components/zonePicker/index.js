import { Button, Container } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

import { MapContainer } from 'react-leaflet/MapContainer'
import { TileLayer } from 'react-leaflet/TileLayer'

import "./index.scss";
import { Marker } from "react-leaflet";

import { Popup } from "react-leaflet";


function ZonePicker() {
    return (
        <Container className="p-3 text-center">
            <h1 className="header">Elige tu zona:</h1>
            <Container className="p-3 text-center zone-picker">
                <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false}>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker position={[51.505, -0.09]}>
                        <Popup>
                            A pretty CSS3 popup. <br /> Easily customizable.
                        </Popup>
                    </Marker>
                </MapContainer>
            </Container>
            <LinkContainer to="/zone-picker">
                <Button>Continuar</Button>
            </LinkContainer>
        </Container>
    );
}

export default ZonePicker;
