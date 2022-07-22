import { Button, Container, DropdownButton, Dropdown, Stack } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

import { MapContainer } from 'react-leaflet/MapContainer'
import { TileLayer } from 'react-leaflet/TileLayer'
import { FeatureGroup } from 'react-leaflet/FeatureGroup'
import { GeoJSON } from 'react-leaflet'

import { EditControl, } from "react-leaflet-draw"

import "./index.scss";
import "leaflet-draw/dist/leaflet.draw.css"

import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

import ejido from './ejido.json';

console.log(ejido)


function Selector() {
    return (
        <Container className="w-75 text-centered">
            <Tabs
                defaultActiveKey="profile"
                id="uncontrolled-tab-example"
                className="mb-3 justify-content-center"
            >
                <Tab eventKey="home" title="Elige una zona">
                    <Stack direction="horizontal" gap={3}  className="justify-content-center">
                        <DropdownButton id="dropdown-basic-button" title="Por ejido">
                            <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                            <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                        </DropdownButton>
                        <DropdownButton id="dropdown-basic-button" title="Por municipio">
                            <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                            <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                        </DropdownButton>
                        <DropdownButton id="dropdown-basic-button" title="Por cuenca">
                            <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                            <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                        </DropdownButton>
                    </Stack>
                </Tab>
                <Tab eventKey="profile" title="Sube un archivo">

                </Tab>
            </Tabs>
            <p className="mt-4">O traza directamente en el mapa:</p>
        </Container>
    );
}

const purpleOptions = { color: 'red' }



function ZonePicker() {
    return (
        <Container className="p-3 text-center">
            <h3 className="header">Delimita tu zona:</h3>
            <Selector />
            <Container className="p-3 zone-picker">
                <MapContainer center={[22.878, -106.260]} zoom={6} scrollWheelZoom={false}>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <FeatureGroup>
                        <EditControl
                            position='topright'
                            onEdited={() => { }}
                            onCreated={() => { }}
                            onDeleted={() => { }}
                            draw={{
                                rectangle: false,
                                polyline: false,
                                circle: false,
                                marker: false,
                                circlemarker: false
                            }}
                        />
                    </FeatureGroup>
                    <GeoJSON pathOptions={purpleOptions}  key="asasd" data={ejido} />
                </MapContainer>
            </Container>
            <LinkContainer to="/zone-picker">
                <Button>Continuar</Button>
            </LinkContainer>
        </Container>
    );
}

export default ZonePicker;
