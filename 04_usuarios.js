const lista =
    document.getElementById(
        "listaUsuarios"
    );

const total =
    document.getElementById(
        "totalUsuarios"
    );

// =====================
// CARGAR USUARIOS
// =====================

async function cargarUsuarios() {

    try {

        const respuesta =
            await fetch(
                "http://localhost:3000/api/usuarios"
            );

        const usuarios =
            await respuesta.json();

        lista.innerHTML = "";

        usuarios.forEach(usuario => {

            lista.innerHTML += `
                <article class="card-usuario">

                    <div class="avatar">

                        <i data-lucide="user-round"></i>

                    </div>

                    <div class="datos">

                        <h3>
                            ${usuario.nombre}
                            ${usuario.apellido}
                        </h3>

                        <p>
                            Usuario:
                            ${usuario.usuario}
                        </p>

                    </div>

                  <div class="acciones-usuario">

    <span class="rol">
        ${usuario.rol}
    </span>

    <button
        class="editarUsuario"
        data-id="${usuario.id}">

        ✏️

    </button>

    <button
        class="eliminarUsuario"
        data-id="${usuario.id}">

        🗑️

    </button>

</div>

                </article>
            `;

        });

        total.textContent =
            usuarios.length;

        lucide.createIcons();

    }

    catch (error) {

        console.error(error);

    }

}

// =====================
// MODAL
// =====================

const btnNuevoUsuario =
    document.getElementById(
        "btnNuevoUsuario"
    );

const modal =
    document.getElementById(
        "modalUsuario"
    );

const cerrarModal =
    document.getElementById(
        "cerrarModal"
    );

btnNuevoUsuario.addEventListener(
    "click",
    () => {

        document.getElementById(
            "tituloModal"
        ).textContent =
            "Nuevo usuario";

        document.getElementById(
            "usuarioId"
        ).value = "";

        document.getElementById(
            "nombre"
        ).value = "";

        document.getElementById(
            "apellido"
        ).value = "";

        document.getElementById(
            "usuario"
        ).value = "";

        document.getElementById(
            "password"
        ).value = "";

        document.getElementById(
            "rol"
        ).value =
            "Administrador";

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

// =====================
// EDITAR USUARIO
// =====================

document.addEventListener(
    "click",
    async e => {

        const boton =
            e.target.closest(
                ".editarUsuario"
            );

        if (!boton) return;

        const id =
            boton.dataset.id;

        try {

            const respuesta =
                await fetch(
                    "http://localhost:3000/api/usuarios"
                );

            const usuarios =
                await respuesta.json();

            const usuario =
                usuarios.find(
                    u => u.id == id
                );

            document.getElementById(
                "tituloModal"
            ).textContent =
                "Editar usuario";

            document.getElementById(
                "usuarioId"
            ).value =
                usuario.id;

            document.getElementById(
                "nombre"
            ).value =
                usuario.nombre;

            document.getElementById(
                "apellido"
            ).value =
                usuario.apellido;

            document.getElementById(
                "usuario"
            ).value =
                usuario.usuario;

            document.getElementById(
                "password"
            ).value = "";

            document.getElementById(
                "rol"
            ).value =
                usuario.rol;

            modal.classList.remove(
                "oculto"
            );

        }

        catch (error) {

            console.error(error);

            alert(
                "Error al cargar usuario"
            );

        }

    }
);

// =====================
// GUARDAR USUARIO
// =====================

const guardarUsuario =
    document.getElementById(
        "guardarUsuario"
    );

guardarUsuario.addEventListener(
    "click",
    async () => {

        const id =
            document.getElementById(
                "usuarioId"
            ).value;

        const nombre =
            document.getElementById(
                "nombre"
            ).value.trim();

        const apellido =
            document.getElementById(
                "apellido"
            ).value.trim();

        const usuario =
            document.getElementById(
                "usuario"
            ).value.trim();

        const password =
            document.getElementById(
                "password"
            ).value.trim();

        const rol =
            document.getElementById(
                "rol"
            ).value;

        if (
            !nombre ||
            !apellido ||
            !usuario
        ) {

            alert(
                "Complete todos los campos"
            );

            return;

        }

        try {

            const url =
                id
                    ? `http://localhost:3000/api/usuarios/${id}`
                    : "http://localhost:3000/api/usuarios";

            const metodo =
                id
                    ? "PUT"
                    : "POST";

            const respuesta =
                await fetch(
                    url,
                    {
                        method: metodo,
                        headers: {
                            "Content-Type":
                                "application/json"
                        },
                        body: JSON.stringify({
                            nombre,
                            apellido,
                            usuario,
                            password,
                            rol
                        })
                    }
                );

            const datos =
                await respuesta.json();

            if (!respuesta.ok) {

                alert(
                    datos.error
                );

                return;

            }

            modal.classList.add(
                "oculto"
            );

            await cargarUsuarios();

            alert(
                id
                    ? "Usuario actualizado"
                    : "Usuario creado correctamente"
            );

        }

        catch (error) {

            console.error(error);

            alert(
                "Error al guardar usuario"
            );

        }

    }
);

// =====================
// INICIO
// =====================
// =====================
// ELIMINAR USUARIO
// =====================

document.addEventListener(
    "click",
    async e => {

        const boton =
            e.target.closest(
                ".eliminarUsuario"
            );

        if (!boton) return;

        const id =
            boton.dataset.id;

        if (id == 1) {

            alert(
                "No se puede eliminar el administrador principal"
            );

            return;

        }

        const confirmar =
            confirm(
                "¿Eliminar usuario?"
            );

        if (!confirmar) return;

        try {

            const respuesta =
                await fetch(
                    `http://localhost:3000/api/usuarios/${id}`,
                    {
                        method: "DELETE"
                    }
                );

            if (!respuesta.ok) {

                alert(
                    "No se pudo eliminar el usuario"
                );

                return;

            }

            await cargarUsuarios();

            alert(
                "Usuario eliminado correctamente"
            );

        }

        catch (error) {

            console.error(error);

            alert(
                "Error al eliminar usuario"
            );

        }

    }
);

// =====================
// INICIO
// =====================

cargarUsuarios();


