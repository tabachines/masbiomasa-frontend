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
import picture from './picture.png';
import { useState } from "react";

import coniferas from './lands/bosque-coniferas.jpg';
import pastizal from './lands/pastizal.jpg';

// import icons from ./icons
import co2 from './icons/co2.png';
import curve from './icons/curve.png';
import land from './icons/land.png';
import layers from './icons/layers.png';


const vegetations = [
    {
        "key": 1,
        "name": "Bosque de coníferas",
        "ndvi": (0.82, 0.83),
        "image": coniferas,
        "co2": 144,
        "percentage": 37,
        "probability": 37
    },
    {
        "key": 2,
        "name": "Pastizal",
        "ndvi": (0.34, 0.41),
        "image": pastizal,
        "co2": 144,
        "percentage": 12,
        "probability": 37
    },
]

const imageLatLong = [[20.555466593136146, -104.647648655564012], [20.488294657666245, -104.713341010704994]]
const pictureLatLong = [[20.5555520, -104.713379], [20.488236, -104.647622]]

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

const HeaderCard = props => {
    return (
        <Card style={{ width: '18rem' }}>
            <Card.Body>
                <Card.Title>{props.value}</Card.Title>
                <Card.Text>
                    {props.label}
                </Card.Text>
            </Card.Body>
        </Card>)
}

const MetricCard = props => {
    const { label, value, icon, suffix } = props;
    return (
        <Stack direction="horizontal" className="align-items-center w-50 align-self-center" gap={2}>
            <img src={icon} className="icon m-0" />
            <p className="m-0">{label}</p>
            <h5 className="m-0">{value}{suffix}</h5>
        </Stack>
    )
}

const Info = props => {
    const { info, loader } = props;

    const metrics = [
        { "key": "ndvi", "label": "NDVI", "icon": layers, "suffix": "" },
        { "key": "co2", "label": "CO2", "icon": co2, "suffix": " ton" },
        { "key": "probability", "label": "Probabilidad", "icon": curve, "suffix": "%" },
        { "key": "percentage", "label": "Porcentaje en tu zona", "icon": land, "suffix": "%" },
    ]

    if (loader) {
        return (
            <Spinner animation="border" variant="primary" />
        )
    }
    if (info === null) {
        return <p>Da click en un área de tu zona para ver los detalles</p>
    }
    return (
        <Stack key={info.key} className="align-items-center">
            <h4 className="mt-3">{info.name}</h4>
            <img src={info.image} className="img-fluid w-50" />
            <Stack gap={3} className="mt-3">
                {metrics.map(metric => (
                    <MetricCard
                        key={metric.key} label={metric.label} value={info[metric.key]} icon={metric.icon}
                        suffix={metric.suffix} />
                ))}
            </Stack>

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
            <Stack gap={3} className="justify-content-center" direction="horizontal">
                <HeaderCard value={"70 ha"} label="Superficie" />
                <HeaderCard value={"70 ha"} label="Superficie" />
                <HeaderCard value={"70 ha"} label="Superficie" />
            </Stack>
            <Stack direction="horizontal" className="m-5 justify-content-center flex-wrap" gap={3}>
                <div className="map-wrap">
                    <MapContainer center={[20.521880625401195, -104.6804948331345]} zoom={13}>
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <LocationMarker position={marker} setPosition={(p) => getInfo(p)} />
                        <LayersControl position="topright" >
                            <LayersControl.Overlay checked name="copernicus">
                                <ImageOverlay url={picture} bounds={pictureLatLong} />
                            </LayersControl.Overlay>
                            <LayersControl.Overlay checked name="NDVI">
                                <ImageOverlay url={ndvi} bounds={pictureLatLong} opacity={0.5} />
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
