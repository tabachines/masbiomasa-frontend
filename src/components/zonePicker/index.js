import { Button, Container, Stack, Card } from "react-bootstrap";
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

import ejidos from './geojsons/ejidos.json';
import cuencas from './geojsons/cuencas.json';
import municipios from './geojsons/municipios.json';

import { useState } from "react";

// const geojsons = {
//     "ejidos": ejidos,
//     "cuencas": cuencas,
//     "municipios": municipios
// }

const infoKey = {
    "cuencas": "nom_cuenca",
    "ejidos": "NombreNucl",
    "municipios": "NOMGEO"
}

function Selector(props) {
    return (
        <Container className="text-centered">
            <Tabs
                defaultActiveKey="zone"
                id="uncontrolled-tab-example"
                onSelect={key => props.setTab(key)}
                className="mb-3 justify-content-center"
            >
                <Tab eventKey="zone" title="Elige una zona">
                    <Stack direction="horizontal" gap={3} className="tab-content justify-content-center">
                        <Button onClick={() => props.setGeojsonData("ejidos")} variant="primary">Por ejido</Button>
                        <Button onClick={() => props.setGeojsonData("municipios")} variant="primary">Por municipio</Button>
                        <Button onClick={() => props.setGeojsonData("cuencas")} variant="primary">Por cuenca</Button>
                    </Stack>
                </Tab>
                <Tab eventKey="file" title="Sube un archivo">
                    <Stack className="tab-content file-drop-container justify-content-center">
                        <p className="m-0 text-secondary">{`Arrastra hasta aquí tu archivo (.shp, .geojson)`}</p>
                    </Stack>
                </Tab>
                <Tab eventKey="draw" title="Traza directamente en el mapa">
                    <Stack className="tab-content justify-content-center">
                    </Stack>
                </Tab>
            </Tabs>
        </Container>
    );
}

const colorOptions = { color: 'green' }


const Zone = props => (
    <Card style={{ width: '18rem' }}>
        <Card.Body>
            <Card.Title>{props.name}</Card.Title>
            <Card.Text>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </Card.Text>
        </Card.Body>
    </Card>
)

const mapBounds = [[
    18.6670631919266,
    -106.07299804687499
], [
    23.120153621695614,
    -101.48071289062499
]];

function ZonePicker() {
    const [geojsonKey, setGeojsonKey] = useState(null);
    const [selectedZone, setSelectedZone] = useState(null);
    const [drawControlEnabled, enableDrawControl] = useState(false);

    const handleZoneClick = (feature, layer, key) => {
        layer.on('click', () => {
            setSelectedZone(
                <Zone name={feature.properties[infoKey[key]]} />
            );
        })
    }

    const setTab = (key) => {
        setSelectedZone(null);
        setGeojsonKey(null);
        if (key === "draw") {
            enableDrawControl(true);
        } else {
            enableDrawControl(false);
        }
    }

    return (
        <Container className="p-3 text-center">
            <h3 className="header">Delimita tu zona:</h3>
            <Selector setGeojsonData={key => setGeojsonKey(key)} setTab={(k) => setTab(k)} />
            <Container className="p-3 zone-picker">
                <MapContainer center={[20.7715230, -103.584594]} zoom={7} bounds={mapBounds}>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {drawControlEnabled &&
                        <FeatureGroup>
                            <EditControl
                                position='topright'
                                onEdited={() => { }}
                                onCreated={() => setSelectedZone(<Zone name="Zona personalizada" />)}
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
                    }
                    {/* {
                        geojsonKey &&
                        <GeoJSON
                            key={geojsonKey}
                            onEachFeature={(f, l) => handleZoneClick(f, l, geojsonKey)}
                            pathOptions={colorOptions}
                            data={geojsons[geojsonKey]}
                        />
                    } */}
                </MapContainer>
            </Container>
            {selectedZone &&
                <Stack gap={3} className="text-center justify-content-center align-items-center">
                    {selectedZone}
                    <LinkContainer to="/land-elegibility">
                        <Button className="w-25">Continuar</Button>
                    </LinkContainer>
                </Stack>
            }
        </Container>
    );
}

export default ZonePicker;
