import { Button, Container, Stack, Card, Spinner } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

import { MapContainer } from 'react-leaflet/MapContainer'
import { TileLayer } from 'react-leaflet/TileLayer'
import { ImageOverlay, Marker, useMapEvents } from "react-leaflet";
import { LayersControl } from "react-leaflet";
import { Chart as ChartJS, registerables } from 'chart.js';

import { Bar } from 'react-chartjs-2';

import "./index.scss";

import ndvi from './ndvi.png';
import picture from './picture.png';
import { useEffect, useState } from "react";

import bosque from './lands/bosque.jpg';
import pastizal from './lands/pastizal.jpg';
import matorral from './lands/matorral.jpg';
import agricultura from './lands/agricultura.jpg';
import selvabaja from './lands/selvabaja.jpg';

import land from './icons/land.png';
import layers from './icons/layers.png';

ChartJS.register(...registerables);

const vegetations = [
    {
        "usv": "Selva baja caducifolia",
        "image": selvabaja,
        "area": 1263,
        "ndvi": 0.756,
        "description": "Vegetación dominada por árboles de diferentes especies de hoja caduca. Se desarrolla en ambientes cálidos con lluvias en verano."
    },
    {
        "usv": "Bosque templado",
        "image": bosque,
        "area": 572,
        "ndvi": 0.875,
        "description": "Comunidades dominadas por árboles altos mayormente pinos y encinos acompañados por otras varias especies suelen habitar en zonas montañosas."
    },
    {
        "usv": "Agricultura",
        "image": agricultura,
        "area": 491,
        "ndvi": 0.221,
        "description": "Predominio de parcelas agrícolas de riego o temporal."
    },
    {
        "usv": "Matorral",
        "image": matorral,
        "area": 92,
        "ndvi": 0.665,
        "description": "Vegetación dominada por arbustos de altura inferior a 4 m, típica de las zonas áridas y semiáridas."
    },
    {
        "usv": "Pastizal",
        "image": pastizal,
        "area": 12,
        "ndvi": 0.436,
        "description": "Es una comunidad dominada por especies de gramíneas, en ocasiones acompañadas por hierbas y arbustos de diferentes familias. "
    },
]

const labels = vegetations.map(vegetation => vegetation.usv);
const values = vegetations.map(vegetation => vegetation.area);

const data = {
    labels,
    datasets: [
        {
            data: values,
            backgroundColor: 'rgba(99, 255, 132, 0.5)',
        },
    ],
}

export const options = {
    indexAxis: 'y',
    elements: {
        bar: {
            borderWidth: 2,
        },
    },
    responsive: true,
    plugins: {
        legend: {
            display: false,
        },
        title: {
            display: false,
        },
    },
};


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

const MetricCard = props => {
    const { label, value, icon, suffix } = props;
    return (
        <Stack direction="horizontal" className="align-items-center" gap={2}>
            <img src={icon} className="icon m-0" alt={label} />
            <p className="m-0">{label}</p>
            <h5 className="m-0">{value}{suffix}</h5>
        </Stack>
    )
}

const Info = props => {
    const { info, loader } = props;

    const metrics = [
        { "key": "ndvi", "label": "NDVI", "icon": layers, "suffix": "" },
        { "key": "area", "label": "Área en tu zona", "icon": land, "suffix": " ha" },
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
            <Stack direction="horizontal">
                <img src={info.image} className="img-fluid w-50" />
                <div>
                    <h5>{info.usv}</h5>
                    <p>{info.description}</p>
                </div>
            </Stack>
            <Stack direction="horizontal" gap={3} className="mt-3 justify-content-center">
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

const loaderMessages = [
    "Obteniendo imágenes satelitales ...",
    "Calculando índice de vegetación ...",
]

function LandElegibility() {

    const [loader, setLoader] = useState(loaderMessages[0]);
    const [marker, setMarker] = useState(null);
    const [info, setInfo] = useState(null);
    const [infoLoader, setInfoLoader] = useState(false);

    useEffect(() => {
        const wait = 1000;
        for (let i = 0; i < loaderMessages.length; i++) {
            setTimeout(() => {
                setLoader(loaderMessages[i]);
            }, wait * i);
        }
        setTimeout(() => {
            setLoader(false);
        }, (loaderMessages.length + 1) * wait)
    }, [])


    const getInfo = coords => {
        setMarker(coords);
        setInfoLoader(true);
        setTimeout(() => {
            setInfoLoader(false)
            setInfo(getVegetation())
        }, 1500)
    }

    if (loader) {
        return (
            <Stack className="general-loader justify-content-center align-items-center">
                <h3 className="mb-3 text-primary">{loader}</h3>
                <Spinner animation="border" variant="primary" />
            </Stack>
        )
    }

    return (
        <Container className="text-center land-elegibility">
            <h3 className="header">Detalles de tu zona:</h3>
            <Stack direction="horizontal" className="m-3 justify-content-center flex-wrap" gap={0}>
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
                        </LayersControl>
                    </MapContainer>
                </div>
                <Stack className="align-items-center ">
                    <div className="chart text-center">
                        <Stack className="justify-content-center align-items-center">
                            <h6>Tipo de cobertura</h6>
                            <Bar options={options} data={data} />
                        </Stack>
                    </div>
                    <Card className="details-card">
                        <Stack className="justify-content-center align-items-center">
                            <Info info={info} loader={infoLoader} />
                        </Stack>
                    </Card>
                </Stack>

            </Stack>
            <Stack gap={3} className="text-center justify-content-center align-items-center">
                <LinkContainer to="/carbon-capture">
                    <Button className="w-25">Estimar captura de carbono</Button>
                </LinkContainer>
            </Stack>
        </Container>
    );
}

export default LandElegibility;
