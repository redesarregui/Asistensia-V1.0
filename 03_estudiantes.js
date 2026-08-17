const guardarEstudiante =
    document.getElementById(
        "guardarEstudiante"
    );

const modal =
    document.getElementById(
        "modalEstudiante"
    );

const btnNuevoEstudiante =
    document.getElementById(
        "btnNuevoEstudiante"
    );

const cerrarModal =
    document.getElementById(
        "cerrarModal"
    );

btnNuevoEstudiante.addEventListener(
    "click",
    () => {

        document.getElementById(
            "tituloModal"
        ).textContent =
            "Nuevo estudiante";

        document.getElementById(
            "estudianteId"
        ).value = "";

        document.getElementById(
            "apellido"
        ).value = "";

        document.getElementById(
            "nombre"
        ).value = "";

        document.getElementById(
            "anio"
        ).value = "";

        document.getElementById(
            "division"
        ).value = "";

        document.getElementById(
            "grupo"
        ).innerHTML =
            `<option value="">
                Seleccione grupo
            </option>`;

        document.getElementById(
            "taller"
        ).innerHTML =
            `<option value="">
                Seleccione taller
            </option>`;

        modal.classList.remove(
            "oculto"
        );

    }
);

cerrarModal.addEventListener(
    "click",
    () => {

        modal.classList.add(
            "oculto"
        );

    }
);

const listaEstudiantes =
    document.getElementById(
        "listaEstudiantes"
    );

const totalEstudiantes =
    document.getElementById(
        "totalEstudiantes"
    );

async function cargarEstudiantes() {

    try {

        const respuesta =
            await fetch(
                "http://localhost:3000/api/estudiantes"
            );

        const estudiantes =
            await respuesta.json();

        listaEstudiantes.innerHTML = "";

        estudiantes.forEach(estudiante => {

            listaEstudiantes.innerHTML += `
                <article class="estudiante">

                    <div class="avatar">

                        <i data-lucide="graduation-cap"></i>

                    </div>

                    <div class="datos">

                        <h3>
                            ${estudiante.apellido},
                            ${estudiante.nombre}
                        </h3>

                        <p>
                            ${estudiante.anio}°${estudiante.division}
                            •
                            ${estudiante.grupo}
                        </p>

                        <small>
                            ${estudiante.taller}
                        </small>

                    </div>

                    <div class="acciones-estudiante">

                        <span class="curso">

                            ${estudiante.anio}°${estudiante.division}

                        </span>

                       <button
    class="editarEstudiante"
    data-id="${estudiante.id}">
    ✏️
</button>

<button
    class="eliminarEstudiante"
    data-id="${estudiante.id}">
    🗑️
</button>

                    </div>

                </article>
            `;

        });

        totalEstudiantes.textContent =
            estudiantes.length;

        lucide.createIcons();

    }

    catch (error) {

        console.error(error);

    }

}

document.addEventListener(
    "click",
    async e => {

        const boton =
            e.target.closest(
                ".editarEstudiante"
            );

        if (!boton) return;

        const id =
            boton.dataset.id;

        try {

            const respuesta =
                await fetch(
                    "http://localhost:3000/api/estudiantes"
                );

            const estudiantes =
                await respuesta.json();

            const estudiante =
                estudiantes.find(
                    e => e.id == id
                );

            if (!estudiante) return;

            document.getElementById(
                "tituloModal"
            ).textContent =
                "Editar estudiante";

            document.getElementById(
                "estudianteId"
            ).value =
                estudiante.id;

            document.getElementById(
                "apellido"
            ).value =
                estudiante.apellido;

            document.getElementById(
                "nombre"
            ).value =
                estudiante.nombre;

            document.getElementById(
                "anio"
            ).value =
                estudiante.anio;

            document.getElementById(
                "division"
            ).value =
                estudiante.division;
                // cargar grupos del año

await cargarGrupos(
    estudiante.anio
);

// seleccionar grupo

document.getElementById(
    "grupo"
).value =
    estudiante.grupo_id;

// cargar talleres

await cargarTalleres(
    estudiante.anio,
    estudiante.grupo_id
);

// seleccionar taller

document.getElementById(
    "taller"
).value =
    estudiante.taller_inicial_id;

            modal.classList.remove(
                "oculto"
            );

        }

        catch(error) {

            console.error(error);

        }

    }
);

cargarEstudiantes();

async function cargarGrupos(anio) {

    const grupoSelect =
        document.getElementById(
            "grupo"
        );

    grupoSelect.innerHTML =
        `<option value="">
            Seleccione grupo
        </option>`;

    if (!anio) return;

    const respuesta =
        await fetch(
            `http://localhost:3000/api/grupos/anio/${anio}`
        );

    const grupos =
        await respuesta.json();

    grupos.forEach(grupo => {

        grupoSelect.innerHTML += `
            <option value="${grupo.id}">
                ${grupo.nombre}
            </option>
        `;

    });

}

async function cargarTalleres(anio) {

    const tallerSelect =
        document.getElementById(
            "taller"
        );

    tallerSelect.innerHTML =
        `<option value="">
            Seleccione taller
        </option>`;

    if (!anio) return;

    const respuesta =
        await fetch(
            `http://localhost:3000/api/talleres/anio/${anio}`
        );

    const talleres =
        await respuesta.json();

    talleres.forEach(taller => {

        tallerSelect.innerHTML += `
            <option value="${taller.id}">
                ${taller.nombre}
            </option>
        `;

    });

}

// =====================
// ELIMINAR
// =====================

document.addEventListener(
    "click",
    async e => {

        const boton =
            e.target.closest(
                ".eliminarEstudiante"
            );

        if (!boton) return;

        const id =
            boton.dataset.id;

        const confirmar =
            confirm(
                "¿Eliminar estudiante?"
            );

        if (!confirmar) return;

        try {

            await fetch(
                `http://localhost:3000/api/estudiantes/${id}`,
                {
                    method: "DELETE"
                }
            );

            cargarEstudiantes();

        }

        catch(error) {

            console.error(error);

        }

    }
);

document.getElementById(
    "anio"
).addEventListener(
    "change",
    async e => {

        const anio =
            e.target.value;

        await cargarGrupos(
            anio
        );

        await cargarTalleres(
            anio
        );

    }
);

guardarEstudiante.addEventListener(
    "click",
    async () => {

        const id =
            document.getElementById(
                "estudianteId"
            ).value;

        const datos = {

            apellido:
                document.getElementById(
                    "apellido"
                ).value,

            nombre:
                document.getElementById(
                    "nombre"
                ).value,

            anio:
                document.getElementById(
                    "anio"
                ).value,

            division:
                document.getElementById(
                    "division"
                ).value,

            grupo_id:
                document.getElementById(
                    "grupo"
                ).value,

            taller_inicial_id:
                document.getElementById(
                    "taller"
                ).value

        };

        // =====================
        // VALIDACIÓN
        // =====================

        if (
            !datos.apellido ||
            !datos.nombre ||
            !datos.anio ||
            !datos.division ||
            !datos.grupo_id ||
            !datos.taller_inicial_id
        ) {

            alert(
                "Complete todos los campos"
            );

            return;

        }

        try {

            if (id) {

                await fetch(
                    `http://localhost:3000/api/estudiantes/${id}`,
                    {
                        method: "PUT",
                        headers: {
                            "Content-Type":
                                "application/json"
                        },
                        body: JSON.stringify(
                            datos
                        )
                    }
                );

            }

            else {

                await fetch(
                    "http://localhost:3000/api/estudiantes",
                    {
                        method: "POST",
                        headers: {
                            "Content-Type":
                                "application/json"
                        },
                        body: JSON.stringify(
                            datos
                        )
                    }
                );

            }

            alert(
                id
                    ? "Estudiante actualizado"
                    : "Estudiante creado"
            );

            modal.classList.add(
                "oculto"
            );

            cargarEstudiantes();

        }

        catch(error) {

            console.error(error);

            alert(
                "Error al guardar"
            );

        }

    }
);
const buscar =
    document.getElementById(
        "buscar"
    );

buscar.addEventListener(
    "input",
    () => {

        const texto =
            buscar.value
                .toLowerCase()
                .trim();

        const estudiantes =
            document.querySelectorAll(
                ".estudiante"
            );

        estudiantes.forEach(estudiante => {

            const contenido =
                estudiante.textContent
                    .toLowerCase();

            if (
                contenido.includes(texto)
            ) {

                estudiante.style.display =
                    "grid";

            }

            else {

                estudiante.style.display =
                    "none";

            }

        });

    }
);