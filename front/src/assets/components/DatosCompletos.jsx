import { Link} from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
//import Table from "react-bootstrap/Table";
const URI = "http://localhost:3002/equipos";

function DatosCompletos() {
  const navigate = useNavigate();
  const { id } = useParams(); // Obtener el parámetro de la URL
  const [equipoData, setEquipoData] = useState({
    codigo_inventario: "",
    tipo_equipo: "",
    numero_serie: "",
    marca: "",
    modelo: "",
    sistema_operativo: "",
    memoria_ram: "",
    procesador: "",
    almacenamiento: "",
    numero_serie_cargador: "",
    monitor: "",
    teclado: "",
    raton: "",
    accesorios: "",
    suscripcion_office: "",
    numempleado: "",
    nombre: "",
    appaterno: "",
    apmaterno: "",
    id_direccion: "",
    id_departamento: "",
    puesto: "",
  });

  console.log("Equipo Data en DatosCompletos:", equipoData);

  useEffect(() => {
    const cargarDatosEquipo = async () => {
      try {
        const response = await axios.get(`${URI}/${id}`);
        setEquipoData(response.data);
        console.log("equipoData:", response.data);
      } catch (error) {
        console.error("Error al cargar datos del equipo:", error.message);
      }
    };

    cargarDatosEquipo();
  }, [id]);
  

  const handleVerResponsivaClick = () => {
    // Cambia history.push a navigate
    navigate(`/verResponsiva/${equipoData.id}`, {
      state: { equipoData: equipoData },
    });
  };
  return (
    <div className="containerform formagregarActualizarEquipo">
      <h2 >Datos completos</h2>
      <Form>
      <div style={{border: "5px solid dimgray"}}>
      <h2 style={{textAlign: "left", marginTop: "25px",padding: "5px"}}>Datos del empleado:</h2>
        <Row className="mb-3">
          

                    <Form.Group as={Col} controlId="formGridEmployeeName">
            <Form.Label className="formLabel">Nombre Empleado:</Form.Label>
            <Form.Control
              className="text-center-input"
              type="text"
              name="nombre"
              value={`${equipoData.nombre || ''} ${equipoData.appaterno || ''} ${equipoData.apmaterno || ''}`}
            />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridEmployeeNumber">
            <Form.Label className="formLabel">DIRECCIÓN</Form.Label>
            <Form.Control
              className="text-center-input"
              type="text"
              name="numEmpleado"
              value={equipoData.id_direccion || ""}
            />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridEmployeePuesto">
            <Form.Label className="formLabel">DEPARTAMENTO:</Form.Label>
            <Form.Control
              className="text-center-input"
              type="text"
              name="id_direccion"
              value={`${equipoData.id_departamento   || ''} `}
            />
          </Form.Group>
        </Row>
        <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridEmployeedireccion">
            <Form.Label className="formLabel">PUESTO:</Form.Label>
            <Form.Control
              className="text-center-input"
              type="text"
              name="numEmpleado"
              value={equipoData.puesto || ""}
            />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridEmployeeNumber">
            <Form.Label className="formLabel">NÚMERO EMPLEADO:</Form.Label>
            <Form.Control
              className="text-center-input"
              type="text"
              name="numEmpleado"
              value={equipoData.numempleado || ""}
            />
          </Form.Group>

        </Row>
        </div>

        <div  style={{border: "5px solid dimgray", marginTop: "45px"}}>
          <h2 style={{textAlign: "left", marginTop: "25px",padding: "5px"}}>Datos del Equipo</h2>
        
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridInventoryCode">
            <Form.Label className="formLabel">CÓDIGO DE INV</Form.Label>
            <Form.Control
              className="text-center-input"
              type="text"
              name="codigo_inventario"
              value={equipoData.codigo_inventario || ""}
            />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridEquipmentType">
            <Form.Label className="formLabel">TIPO DE EQUIPO</Form.Label>
            <Form.Control
              className="text-center-input"
              as="select"
              name="tipo_equipo"
              value={equipoData.tipo_equipo || ""}
            >
              <option>Selecciona el tipo de equipo</option>
              <option value="Desktop">Desktop</option>
              <option value="Laptop">Laptop</option>
              <option value="AllInOne">All in One</option>
            </Form.Control>
          </Form.Group>

          <Form.Group as={Col} controlId="formGridSerialNumber">
            <Form.Label className="formLabel">NÚMERO DE SERIE</Form.Label>
            <Form.Control
              className="text-center-input"
              type="text"
              name="numero_serie"
              value={equipoData.numero_serie || ""}
            />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridBrand">
            <Form.Label className="formLabel">MARCA</Form.Label>
            <Form.Control
              className="text-center-input"
              as="select"
              name="marca"
              value={equipoData.marca || ""}
            >
              <option>Selecciona la marca</option>
              <option value="">Selecciona la marca</option>
              <option value="Dell">Dell</option>
              <option value="HP">HP</option>
              <option value="Apple">Apple</option>
            </Form.Control>
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridModel">
            <Form.Label className="formLabel">MODELO</Form.Label>
            <Form.Control
              className="text-center-input"
              type="text"
              name="modelo"
              value={equipoData.modelo || ""}
            />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridOperatingSystem">
            <Form.Label className="formLabel">SISTEMA OPERATIVO</Form.Label>
            <Form.Control
              className="text-center-input"
              as="select"
              name="sistema_operativo"
              value={equipoData.sistema_operativo || ""}
            >
              <option>Selecciona el sistema operativo</option>
              <option value="Windows 11">Windows 11</option>
              <option value="Windows 10">Windows 10</option>
              {/* Agrega más opciones según sea necesario */}
            </Form.Control>
          </Form.Group>

          <Form.Group as={Col} controlId="formGridRAM">
            <Form.Label className="formLabel">MEMORIA RAM</Form.Label>
            <Form.Control
              className="text-center-input"
              as="select"
              name="memoria_ram"
              value={equipoData.memoria_ram || ""}
            >
              <option>Selecciona la cantidad de memoria RAM</option>
              <option value="4GB">4 GB</option>
              <option value="8GB">8 GB</option>
              <option value="16GB">16 GB</option>
              <option value="32GB">32 GB</option>
            </Form.Control>
          </Form.Group>

          <Form.Group as={Col} controlId="formGridProcessor">
            <Form.Label className="formLabel">PROCESADOR</Form.Label>
            <Form.Control
              className="text-center-input"
              type="text"
              name="procesador"
              value={equipoData.procesador || ""}
            />
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridStorage">
            <Form.Label className="formLabel">ALMACENAMIENTO</Form.Label>
            <Form.Control
              className="text-center-input"
              type="text"
              name="almacenamiento"
              value={equipoData.almacenamiento || ""}
            />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridChargerSerial">
            <Form.Label className="formLabel">SERIE DEL CARGADOR</Form.Label>
            <Form.Control
              className="text-center-input"
              type="text"
              name="numero_serie_cargador"
              value={equipoData.numero_serie_cargador || ""}
            />
          </Form.Group>
        </Row>
        <Form.Group controlId="formGridMonitor">
          <Form.Label className="formLabel">MONITOR</Form.Label>
          <Form.Control
            className="text-center-input"
            type="text"
            name="monitor"
            value={equipoData.monitor || ""}
          />
        </Form.Group>

        <Form.Group controlId="formGridKeyboard">
          <Form.Label className="formLabel">TECLADO</Form.Label>
          <Form.Control
            className="text-center-input"
            type="text"
            name="teclado"
            value={equipoData.teclado || ""}
          />
        </Form.Group>

        <Form.Group controlId="formGridMouse">
          <Form.Label className="formLabel">MOUSE</Form.Label>
          <Form.Control
            className="text-center-input"
            type="text"
            name="raton"
            value={equipoData.raton || ""}
          />
        </Form.Group>

        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridAccessories">
            <Form.Label className="formLabel">ACCESORIOS</Form.Label>
            <Form.Control
              className="text-center-input"
              type="text"
              name="accesorios"
              value={equipoData.accesorios || ""}
            />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridOfficeSubscription">
            <Form.Label className="formLabel">SUSCRIPCIÓN OFFICE</Form.Label>
            <Form.Control
              className="text-center-input"
              type="text"
              name="suscripcion_office"
              value={equipoData.suscripcion_office || ""}
            />
          </Form.Group>
        </Row>
        </div>
        <Row className="mb-3">
          <Col>
          <Link
            to={`/actualizarequipo/${equipoData.id}`}
            className="btn btn-info mb-2"
          >
            Actualizar Datos
          </Link>
          </Col>
          <Col>
            <Button
              variant="secondary"
              onClick={() => (window.location.href = "/")}
            >
              Ir a Home
            </Button>
            <Button
  variant="info"
  onClick={handleVerResponsivaClick}
>
  Ver Responsiva
</Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
}

export default DatosCompletos;
