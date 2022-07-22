import { Button, Container } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

import { MapContainer } from 'react-leaflet/MapContainer'
import { TileLayer } from 'react-leaflet/TileLayer'
import { FeatureGroup } from 'react-leaflet/FeatureGroup'

import { EditControl, } from "react-leaflet-draw"

import "./index.scss";
import "leaflet-draw/dist/leaflet.draw.css"

function ZonePicker() {
    return (
        <Container className="p-3 text-center">
            <h1 className="header">Elige tu zona:</h1>
            <Container className="p-3 text-center zone-picker">
                <MapContainer center={[22.878, -106.260]} zoom={6} scrollWheelZoom={false}>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <FeatureGroup>
                        <EditControl
                            position='topright'
                            onEdited={() => {}}
                            onCreated={() => {}}
                            onDeleted={() => {}}
                            draw={{
                                rectangle: false,
                                polyline: false,
                                circle: false,
                                marker: false,
                                circlemarker: false
                            }}
                        />
                    </FeatureGroup>
                </MapContainer>
            </Container>
            <LinkContainer to="/zone-picker">
                <Button>Continuar</Button>
            </LinkContainer>
        </Container>
    );
}

export default ZonePicker;
