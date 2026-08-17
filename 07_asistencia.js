const anioSelect = document.getElementById("anio");
const grupoSelect = document.getElementById("grupo");
const tallerSelect = document.getElementById("taller");
let rotacionAsignacionId = null;

// ======================
// AÑOS
// ======================

function cargarAnios() {

    anioSelect.innerHTML =
        '<option value="">Seleccione...</option>';

    for (let i = 1; i <= 6; i++) {

        const option = document.createElement("option");

        option.value = i;
        option.textContent = `${i}° Año`;

        anioSelect.appendChild(option);

    }

}

// ======================
// TALLERES
// ======================

async function cargarTalleres(anio, grupo) {

    try {

        tallerSelect.innerHTML =
            '<option value="">Seleccione...</option>';

        if (!anio || !grupo) return;

        const respuesta =
            await fetch(
                `http://localhost:3000/api/talleres/anio/${anio}`
            );

        let talleres =
            await respuesta.json();

        // 4° año
        if (anio === 4) {

            if (grupo === "mañana") {

                talleres = talleres.filter(t =>
                    [16, 17, 18].includes(t.id)
                );

            }

            if (grupo === "tarde") {

                talleres = talleres.filter(t =>
                    [10, 11, 12].includes(t.id)
                );

            }

        }

        talleres.forEach(taller => {

            const option =
                document.createElement("option");

            option.value = taller.id;
            option.textContent = taller.nombre;

            tallerSelect.appendChild(option);

        });

    } catch (error) {

        console.error(
            "Error cargando talleres:",
            error
        );

    }

}

// ======================
// CAMBIO DE AÑO
// ======================

anioSelect.addEventListener("change", () => {

    const anio =
        parseInt(anioSelect.value);

    grupoSelect.innerHTML =
        '<option value="">Seleccione...</option>';

    tallerSelect.innerHTML =
        '<option value="">Seleccione...</option>';

    // 1°, 2°, 3° y 6°

    if ([1, 2, 3, 6].includes(anio)) {

        grupoSelect.innerHTML +=
            '<option value="LyM">LyM</option>';

        grupoSelect.innerHTML +=
            '<option value="MyJ">MyJ</option>';

    }

    // 4° y 5°

    else if ([4, 5].includes(anio)) {

        grupoSelect.innerHTML +=
            '<option value="mañana">Mañana</option>';

        grupoSelect.innerHTML +=
            '<option value="tarde">Tarde</option>';

    }

});

// ======================
// CAMBIO DE GRUPO
// ======================

grupoSelect.addEventListener("change", () => {

    const anio =
        parseInt(anioSelect.value);

    const grupo =
        grupoSelect.value;

    cargarTalleres(
        anio,
        grupo
    );

});

// ======================
// INICIO
// ======================

cargarAnios();

const listaAsistencia =
    document.getElementById("listaAsistencia");

tallerSelect.addEventListener("change", async () => {

    const anio = anioSelect.value;
    const taller_id = tallerSelect.value;

    if (!anio || !taller_id) return;

    try {

        const respuesta = await fetch(
            `http://localhost:3000/api/asistencias/buscar?anio=${anio}&taller_id=${taller_id}`
        );

        const datos =
    await respuesta.json();

rotacionAsignacionId =
    datos.rotacion_asignacion_id;


console.log(
    "Rotación asignación:",
    rotacionAsignacionId
);

const alumnos =
    datos.alumnos;

listaAsistencia.innerHTML = "";

buscarInput.value = "";

alumnos.forEach(alumno => {

    listaAsistencia.innerHTML += `
        <div
            class="alumno-item"
            data-estudiante-id="${alumno.id}"
        >

            <span class="nombre-alumno">
                    <strong>${alumno.apellido}</strong>, ${alumno.nombre}
            </span>

            <input
                type="checkbox"
                checked
                class="presente"
            >

        </div>
    `;

});

        actualizarTotales();
       document
    .querySelectorAll(".presente")
    .forEach(check => {

        check.addEventListener(
            "change",
            () => {

                const fila =
                    check.closest(
                        ".alumno-item"
                    );

                if (check.checked) {

                    fila.classList.remove(
                        "ausente"
                    );

                }

                else {

                    fila.classList.add(
                        "ausente"
                    );

                }

                fila.classList.add(
                    "animando"
                );

                setTimeout(() => {

                    fila.classList.remove(
                        "animando"
                    );

                }, 300);

                actualizarTotales();

            }
        );

    });

    }

    catch(error) {

        console.error(error);

    }

});
function actualizarTotales() {

    const checks =
        document.querySelectorAll(".presente");

    let presentes = 0;
    let ausentes = 0;

    checks.forEach(check => {

        if (check.checked)
            presentes++;
        else
            ausentes++;

       

    });

    document.getElementById(
        "totalPresentes"
    ).textContent = presentes;

    document.getElementById(
        "totalAusentes"
    ).textContent = ausentes;

}
const btnGuardar =
    document.getElementById(
        "guardarAsistencia"
    );

btnGuardar.addEventListener(
    "click",
    async () => {

        const fecha =
            document.getElementById(
                "fecha"
            ).value;

        if (!fecha) {

            alert(
                "Seleccione una fecha"
            );

            return;

        }

        const filas =
            document.querySelectorAll(
                ".alumno-item"
            );

        const asistencias = [];

        filas.forEach(fila => {

            const estudiante_id =
                fila.dataset.estudianteId;

            const estado =
                fila.querySelector(
                    ".presente"
                ).checked
                    ? 1
                    : 0;

            asistencias.push({
                estudiante_id,
                estado
            });

        });

        try {

            const respuesta =
                await fetch(
                    "http://localhost:3000/api/asistencias/guardar",
                    {
                        method: "POST",
                        headers: {
                            "Content-Type":
                                "application/json"
                        },
                        body: JSON.stringify({
                            fecha,
                            rotacion_asignacion_id:
                                rotacionAsignacionId,
                            asistencias
                        })
                    }
                );

            const resultado =
                await respuesta.json();

            alert(
                resultado.mensaje
            );

        }

        catch(error) {

            console.error(error);

            alert(
                "Error al guardar"
            );

        }

    }
);

const buscarInput =
    document.getElementById("buscar");

buscarInput.addEventListener(
    "input",
    () => {

        const texto =
            buscarInput.value
                .toLowerCase()
                .trim();

        const alumnos =
            document.querySelectorAll(
                ".alumno-item"
            );

        alumnos.forEach(alumno => {

            const nombre =
                alumno.textContent
                    .toLowerCase();

            if (nombre.includes(texto)) {

                alumno.style.display =
                    "flex";

            }

            else {

                alumno.style.display =
                    "none";

            }

        });

    }
);