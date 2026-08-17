const formulario =
    document.querySelector("form");

formulario.addEventListener(
    "submit",
    async function (e) {

        e.preventDefault();

        const usuario =
            document.getElementById(
                "usuario"
            ).value.trim();

        const password =
            document.getElementById(
                "password"
            ).value.trim();

        try {

            const respuesta =
                await fetch(
                    "http://localhost:3000/api/usuarios/login",
                    {
                        method: "POST",
                        headers: {
                            "Content-Type":
                                "application/json"
                        },
                        body: JSON.stringify({
                            usuario,
                            password
                        })
                    }
                );

            const datos =
                await respuesta.json();

            console.log("DATOS LOGIN:", datos);
            console.log("NOMBRE:", datos.nombre);
            console.log("ROL:", datos.rol);

            if (!respuesta.ok) {

                alert(
                    datos.error
                );

                return;

            }

            localStorage.setItem(
                "usuario",
                datos.nombre
            );

            localStorage.setItem(
                "rol",
                datos.rol
            );

            window.location.href =
                "02_inicio.html";

        }

        catch (error) {

            console.error(error);

            alert(
                "Error de conexión con el servidor"
            );

        }

    }
);