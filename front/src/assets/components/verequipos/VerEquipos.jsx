import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Table, Dropdown } from "react-bootstrap";

import "../verequipos/estiloverequipos.css";

import AdminEquipos from "../adminequipos/AdminEquipos";

function VerEquipos() {
  const [equipos, setEquipos] = useState([]);

  useEffect(() => {
    const fetchEquipos = async () => {
      try {
        const response = await fetch("http://localhost:3002/equipos"); // Asegúrate de ajustar esta URL
        const data = await response.json();
        setEquipos(data);
      } catch (error) {
        console.error("Error al obtener los equipos: ", error);
      }
    };

    fetchEquipos();
  }, []);

  const renderEquipos = () => {
    return equipos.map((equipo, index) => (
      <tr key={`${equipo.codigo_inventario}-${equipo.numempleado}-${index}`}>
        <td className="text-center align-middle">{equipo.numempleado}</td>
        <td className="text-center align-middle">{`${equipo.nombre} ${equipo.appaterno} ${equipo.apmaterno}`}</td>
        <td className="text-center align-middle">{equipo.id_direccion}</td>
        <td className="text-center align-middle">{equipo.id_departamento}</td>
        <td className="text-center align-middle">{equipo.puesto}</td>
        <td className="text-center align-middle">{equipo.codigo_inventario}</td>
        <td className="text-center align-middle">{equipo.numero_serie}</td>
        <td className="text-center align-middle">{equipo.marca}</td>
        <td className="text-center align-middle">{equipo.modelo}</td>
        <td className="text-center align-middle">{equipo.monitor}</td>
        <td>
          <Dropdown>
            <Dropdown.Toggle variant="primary" id="dropdown-basic">
              Acciones
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item>
                <Link
                  to={`/datoscompletos/${equipo.codigo_inventario}/${
                    equipo.numempleado || "sinEmpleado"
                  }`}
                  className="btn btn-info mb-2"
                >
                  Ver Más
                </Link>
              </Dropdown.Item>
              <Dropdown.Item>
                <button
                  className="btn btn-danger mx-auto"
                  onClick={() =>
                    confirmarEliminarEquipo(equipo.id, equipo.codigo_inventario)
                  }
                >
                  Eliminar
                </button>
              </Dropdown.Item>
              <Dropdown.Item>
  <button
    className="btn btn-warning"
    onClick={() => quitarAsignacionEquipo(equipo.codigo_inventario, equipo.numempleado)}
  >
    Quitar Asignación
  </button>
</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </td>
      </tr>
    ));
  };
  const quitarAsignacionEquipo = async (codigo_inventario, numempleado) => {
    if(window.confirm(`¿Estás seguro de que quieres el equipo con código de inventario ${codigo_inventario} y el num empleado ${numempleado}?`)) {
      try {
        const response = await fetch(`http://localhost:3002/asignaciones/${codigo_inventario}/${numempleado}`, {
          method: 'DELETE',
        });
        const data = await response.json();
        
        alert(data.mensaje); // O maneja la respuesta como prefieras
        // Actualiza tu estado local o refresca los datos para reflejar el cambio en la UI
      } catch (error) {
        console.error("Error al quitar la asignación: ", error);
        alert("No se pudo quitar la asignación."); // O maneja el error como prefieras
      }
    }
  };
  return (
    <div className="containerverequipos">
      <div className="cajaadminequiposverequipos">
        <AdminEquipos />
      </div>
      <div className="cajaprincipalverequipos">
        <Table striped bordered hover variant="dark" className="custom-table">
          <thead>
            <tr>
              <th className="text-center align-middle">Número de Empleado</th>
              <th className="text-center align-middle">Empleado </th>
              <th className="text-center align-middle">Dirección</th>
              <th className="text-center align-middle">Departamento</th>
              <th className="text-center align-middle">Puesto</th>
              <th className="text-center align-middle">Código de Inventario</th>
              <th className="text-center align-middle">Número de Serie</th>
              <th className="text-center align-middle">Marca</th>
              <th className="text-center align-middle">Modelo</th>
              <th className="text-center align-middle">Monitor</th>
              <th className="text-center align-middle"></th>
            </tr>
          </thead>
          <tbody>{renderEquipos()}</tbody>
        </Table>
      </div>
    </div>
  );
}

export default VerEquipos;
