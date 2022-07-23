import { Button, Container, Stack, Card, Spinner, Alert, Modal, Form } from "react-bootstrap";

import { MapContainer } from 'react-leaflet/MapContainer'
import { TileLayer } from 'react-leaflet/TileLayer'
import { Marker, useMapEvents } from "react-leaflet";

import { Chart as ChartJS, registerables } from 'chart.js';
import { Bar } from 'react-chartjs-2';

import { LayersControl } from "react-leaflet";
import { ImageOverlay } from "react-leaflet";

import "./index.scss";

import { useEffect, useState } from "react";

import picture from "./coberturas.png";


// import icons from ./icons
import co2 from './icons/co2.png';
import curve from './icons/curve.png';
import land from './icons/land.png';

ChartJS.register(...registerables);

const capture = [
    {
        "usv": "Selva baja caducifolia",
        "biomasa_aerea": 478845.4,
        "biomasa_sub": 105345.988,
        "total": 584191.388,
        "co2": "74%"
    },
    {
        "usv": "Bosque templado",
        "biomasa_aerea": 93645.93333,
        "biomasa_sub": 27859.66517,
        "total": 121505.5985,
        "co2": "15%"
    },
    {
        "usv": "Agricultura",
        "biomasa_aerea": 50769.4,
        "biomasa_sub": 16246.208,
        "total": 67015.608,
        "co2": "8%"
    },
    {
        "usv": "Matorral",
        "biomasa_aerea": 12683.73333,
        "biomasa_sub": 5073.493333,
        "total": 17757.22667,
        "co2": "2%"
    },
    {
        "usv": "Pastizal",
        "biomasa_aerea": 1240.8,
        "biomasa_sub": 397.056,
        "total": 1637.856,
        "co2": "0%"
    },
]


const totales = [
    { "label": "Biomasa aérea", "value": `637185.2667 ton/ha` },
    { "label": "Biomasa subterránea", "value": `154922.4105 ton/ha` },
    { "label": "CO2", "value": `792107.6772 ton/ha` },
]


const labels = capture.map(vegetation => vegetation.usv);
const values_aerea = capture.map(vegetation => vegetation.biomasa_aerea);
const values_sub = capture.map(vegetation => vegetation.biomasa_sub);

const data = {
    labels,
    datasets: [
        {
            data: values_aerea,
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
        {
            data: values_sub,
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

// const imageLatLong = [[20.555466593136146, -104.647648655564012], [20.488294657666245, -104.713341010704994]]
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
        <Stack direction="horizontal" className="align-items-center w-25 align-self-center" gap={2}>
            <img src={icon} className="icon m-0" />
            <p className="m-0">{label}</p>
            <h5 className="m-0">{value}{suffix}</h5>
        </Stack>
    )
}

const Info = props => {
    const { info, loader } = props;

    const metrics = [
        { "key": "usv", "label": "Tipo de cobertura", "icon": land, "suffix": "" },
        { "key": "co2", "label": "CO2", "icon": co2, "suffix": "" },
        { "key": "biomasa_aerea", "label": "Biomasa aérea", "icon": curve, "suffix": " ton/ha" },
        { "key": "biomasa_sub", "label": "Biomasa subterránea", "icon": land, "suffix": " ton/ha" },
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

function UserForm() {
    return (
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Nombre</Form.Label>
          <Form.Control type="name" />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Correo</Form.Label>
          <Form.Control type="email" />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Tipo de propiedad de la tierra</Form.Label>
          <Form.Control type="tipo" />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Superficie en hectáreas</Form.Label>
          <Form.Control type="superficie" />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Principal uso de la tierra</Form.Label>
          <Form.Control type="uso" />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Principal uso de la tierra</Form.Label>
          <Form.Control type="uso" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Estoy interesado en el mercado de bonos de carbono" />
        </Form.Group>
        <Form.Select aria-label="Default select example">
            <option>Selecciona</option>
            <option value="1">Sistemas agroforestales</option>
            <option value="2">Reforestación/aforestación</option>
            <option value="3">Manejo forestal mejorado (actividades que aumenten la rotación, vigor o acervo de carbono)</option>
            <option value="4">Bosques urbanos</option>
            <option value="5">Sistema silvo-pastoril</option>
        </Form.Select>
        <Button variant="primary" type="submit">
          Enviar datos
        </Button>
      </Form>
    );
  }

let infoKey = -1;
const getCaptureData = () => {
    infoKey = infoKey + 1;
    if (infoKey >= capture.length) {
        infoKey = 0;
    }
    return capture[infoKey];
}

function CarbonCapture() {

    const [loader, setLoader] = useState("Estimando captura de carbono...");
    const [marker, setMarker] = useState(null);
    const [info, setInfo] = useState(null);
    const [infoLoader, setInfoLoader] = useState(false);
    const [message, setMessage] = useState(null);
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setLoader(false);
        }, 5000);
        setTimeout(() => {
            setMessage(true);
        }, 6000);
    }, [])

    const getInfo = coords => {
        setMarker(coords);
        setInfoLoader(true);
        setTimeout(() => {
            setInfoLoader(false)
            setInfo(getCaptureData())
        }, 2000)
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
        <Container className="m-3 text-center land-elegibility">
            {message &&
                <Alert key="success" variant="success">
                    <Stack direction="horizontal" className="justify-content-around">
                        <p className="m-0">¿Eres dueño de esta tierra? La zona elegida tiene potencial para aplicar a proyectos de bono de carbono</p>
                        <Button variant="primary" onClick={() => setShowForm(true)}>Recibir asesoría</Button>
                    </Stack>
                </Alert>
            }
            <Modal show={showForm} onHide={() => setShowForm(false)}>
                <Modal.Body><UserForm/></Modal.Body>
            </Modal>
            <h3 className="header">Captura de Carbono estimada</h3>
            <Stack gap={3} className="justify-content-center" direction="horizontal">
                {
                    totales.map((el) => (<HeaderCard index={el.label} value={el.value} label={el.label} />))
                }
            </Stack>
            <Stack direction="horizontal" className="m-3 justify-content-center flex-wrap align-items-center" gap={3}>
                <div className="map-wrap">
                    <MapContainer center={[20.521880625401195, -104.6804948331345]} zoom={13}>
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <LocationMarker position={marker} setPosition={(p) => getInfo(p)} />
                        <ImageOverlay url={picture} bounds={pictureLatLong} />
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
        </Container>
    );
}

export default CarbonCapture;
