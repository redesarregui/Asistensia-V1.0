if (!localStorage.getItem("usuario")) {

    window.location.href =
        "01_login.html";

}

const nombreUsuario =
    document.getElementById(
        "nombreUsuario"
    );

if (nombreUsuario) {

    nombreUsuario.textContent =
        localStorage.getItem(
            "usuario"
        );

}

const btnCerrar =
    document.getElementById(
        "cerrarSesion"
    );

if (btnCerrar) {

    btnCerrar.addEventListener(
        "click",
        () => {

            localStorage.clear();

            window.location.href =
                "01_login.html";

        }
    );

}

let temporizador;

function reiniciarTemporizador() {

    clearTimeout(temporizador);

    temporizador = setTimeout(() => {

        alert(
            "La sesión expiró por inactividad."
        );

        localStorage.clear();

        window.location.href =
            "01_login.html";

    }, 15 * 60 * 1000);

}

[
    "mousemove",
    "keydown",
    "click",
    "scroll"
].forEach(evento => {

    document.addEventListener(
        evento,
        reiniciarTemporizador
    );

});

reiniciarTemporizador();