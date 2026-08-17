/*
====================================================
Proyecto : TallerControl
Archivo  : 02_inicio.js
====================================================
*/

const fecha =
    document.querySelector("#fecha");

/*==============================
  Fecha
==============================*/

const hoy = new Date();

const opciones = {

    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric"

};

fecha.textContent =
    hoy.toLocaleDateString(
        "es-AR",
        opciones
    );

/*==============================
  Iconos
==============================*/

lucide.createIcons();