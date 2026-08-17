const btnGenerar =
    document.getElementById(
        "btnGenerar"
    );

const resultado =
    document.getElementById(
        "resultado"
    );

const resumenReporte =
    document.getElementById(
        "resumenReporte"
    );    

btnGenerar.addEventListener(
    "click",
    async () => {

        const desde =
            document.getElementById(
                "fechaDesde"
            ).value;

        const hasta =
            document.getElementById(
                "fechaHasta"
            ).value;

        if (!desde || !hasta) {

            alert(
                "Seleccione ambas fechas"
            );

            return;

        }

        try {

            const respuesta =
                await fetch(
                    `http://localhost:3000/api/reportes/ausentes?desde=${desde}&hasta=${hasta}`
                );

            const datos =
                await respuesta.json();

           resumenReporte.innerHTML = `
    <div class="resumen-card">

        <div class="resumen-info">

            <span class="resumen-titulo">
                Total de ausentes
            </span>

            <span class="resumen-total">
                ${datos.length}
            </span>

        </div>

        <div class="resumen-icono">

            👥

        </div>

    </div>
`;

            if (datos.length === 0) {

                resultado.innerHTML = `
                    <div class="sin-datos">

                        <h3>
                            No se encontraron ausentes
                        </h3>

                    </div>
                `;

                return;

            }

            let html = `
                <table class="tabla-reportes">

                    <thead>

                        <tr>

                            <th>Fecha</th>
                            <th>Alumno</th>
                            <th>Curso</th>
                            <th>Taller</th>

                        </tr>

                    </thead>

                    <tbody>
            `;

            datos.forEach(item => {

                const fechaFormateada =
                    item.fecha
                        .split("-")
                        .reverse()
                        .join("/");

                html += `
                    <tr>

                        <td>
                            ${fechaFormateada}
                        </td>

                        <td>
                            ${item.apellido},
                            ${item.nombre}
                        </td>

                        <td>
                            ${item.anio}°
                            ${item.division}
                        </td>

                        <td>
                            ${item.taller}
                        </td>

                    </tr>
                `;

            });

            html += `
                    </tbody>

                </table>
            `;

            resultado.innerHTML =
                html;

        }

        catch(error) {

            console.error(error);

            alert(
                "Error generando reporte"
            );

        }

    }
);
const btnExportar =
    document.getElementById(
        "btnExportar"
    );

btnExportar.addEventListener(
    "click",
    () => {

        const desde =
            document.getElementById(
                "fechaDesde"
            ).value;

        const hasta =
            document.getElementById(
                "fechaHasta"
            ).value;

        if (!desde || !hasta) {

            alert(
                "Seleccione ambas fechas"
            );

            return;

        }

        window.open(
            `http://localhost:3000/api/reportes/exportar?desde=${desde}&hasta=${hasta}`,
            "_blank"
        );

    }
);