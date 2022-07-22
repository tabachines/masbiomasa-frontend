import { Button, Container, Stack, Card } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

import { MapContainer } from 'react-leaflet/MapContainer'
import { TileLayer } from 'react-leaflet/TileLayer'
import { ImageOverlay } from "react-leaflet";
import { GeoJSON } from 'react-leaflet';
import { LayersControl } from "react-leaflet";

import "./index.scss";

import ndvi from './ndvi.png';
import feature from './feature.json';

const imageLatLong = [[20.555466593136146, -104.647648655564012], [20.488294657666245, -104.713341010704994]]

function LandElegibility() {

    return (
        <Container className="m-3 text-center land-elegibility">
            <h3 className="header">Detalles de tu zona:</h3>
            <Stack direction="horizontal" className="m-5 justify-content-center flex-wrap" gap={3}>
                <div className="map-wrap">
                    <MapContainer center={[20.521880625401195, -104.6804948331345]} zoom={13}>
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <LayersControl position="topright">
                            <LayersControl.Overlay checked name="NDVI">
                                <ImageOverlay url={ndvi} bounds={imageLatLong} />
                            </LayersControl.Overlay>
                            <LayersControl.Overlay name="Polígono">
                                <GeoJSON
                                    pathOptions={{ color: 'purple' }}
                                    data={feature}
                                />
                            </LayersControl.Overlay>
                        </LayersControl>
                    </MapContainer>
                </div>
                <Card className="details-card">
                    <Stack className="justify-content-center aling-items-center">
                        <p>Da click en un área del mapa para ver los detalles</p>
                    </Stack>
                </Card>
            </Stack>
            {false &&
                <Stack gap={3} className="text-center justify-content-center align-items-center">
                    {/* {selectedZone} */}
                    <LinkContainer to="/zone-picker">
                        <Button className="w-25">Continuar</Button>
                    </LinkContainer>
                </Stack>
            }
        </Container>
    );
}

export default LandElegibility;
