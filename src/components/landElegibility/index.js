import { Button, Container, Stack, Card, Spinner } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

import { MapContainer } from 'react-leaflet/MapContainer'
import { TileLayer } from 'react-leaflet/TileLayer'
import { ImageOverlay, Marker, useMapEvents } from "react-leaflet";
import { GeoJSON } from 'react-leaflet';
import { LayersControl } from "react-leaflet";

import "./index.scss";

import ndvi from './ndvi.png';
import feature from './feature.json';
import { useState } from "react";

import coniferas from './lands/bosque-coniferas.jpg';
import pastizal from './lands/pastizal.jpg';

const vegetations = [
    {
        "key": 1,
        "name": "Bosque de coníferas",
        "ndvi": (0.82, 0.83),
        "image": coniferas,
    },
    {
        "key": 2,
        "name": "Pastizal",
        "ndvi": (0.34, 0.41),
        "image": pastizal,
    },
]

const imageLatLong = [[20.555466593136146, -104.647648655564012], [20.488294657666245, -104.713341010704994]]

const LocationMarker = props => {
    const map = useMapEvents({
        click(e) {
            props.setPosition(e.latlng)
            map.flyTo(e.latlng)
        },
    })

    return props.position === null ? null : (
        <Marker position={props.position} />
    )
}

const Info = props => {
    const {info, loader} = props;
    if (loader) {
        return (
            <Spinner animation="border" variant="primary" />
        )
    }
    if (info === null) {
        return <p>Da click en un área de tu zona para ver los detalles</p>
    }
    return (
        <Stack key={info.key}>
            <h4 className="mt-3">{info.name}</h4>
            <img src={info.image} className="img-fluid" />
            <p>{info.ndvi}</p>
        </Stack>
    )
}

let infoKey = -1;
const getVegetation = () => {
    infoKey = infoKey + 1;
    if (infoKey >= vegetations.length) {
        infoKey = 0;
    }
    return vegetations[infoKey];
}

function LandElegibility() {

    const [marker, setMarker] = useState(null);
    const [info, setInfo] = useState(null);
    const [infoLoader, setInfoLoader] = useState(false);

    const getInfo = coords => {
        setMarker(coords);
        setInfoLoader(true);
        setTimeout(() => {
            setInfoLoader(false)
            setInfo(getVegetation())
        }, 2000)
    }

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
                        <LocationMarker position={marker} setPosition={(p) => getInfo(p)} />
                        <LayersControl position="topright" >
                            <LayersControl.Overlay checked name="NDVI">
                                <ImageOverlay url={ndvi} bounds={imageLatLong} opacity={0.8} />
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
                    <Stack className="justify-content-center align-items-center">
                        <Info info={info} loader={infoLoader} />
                    </Stack>
                </Card>
            </Stack>
            <Stack gap={3} className="text-center justify-content-center align-items-center">
                <LinkContainer to="/zone-picker">
                    <Button className="w-25">Continuar</Button>
                </LinkContainer>
            </Stack>
        </Container>
    );
}

export default LandElegibility;
