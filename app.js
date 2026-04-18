// =========================================================
// INICIALIZACIÓN
// Recuperación de datos persistentes
// =========================================================

// Obtenemos la racha guardada (si no existe → 0)
let racha = localStorage.getItem("racha") || 0;

// Obtenemos la racha guardada (si no existe → 0)
let ultimaFecha = localStorage.getItem("fecha");

// =========================================================
// REFERENCIAS AL DOM
// Elementos de la interfaz
// =========================================================
const rachaTexto = document.getElementById("racha");
const mensaje = document.getElementById("mensaje");
const boton = document.getElementById("btnFichar");

// Mostrar racha inicial al cargar la página
rachaTexto.innerText = racha + " días";

// Evento principal: clic en "Fichar"
boton.addEventListener("click", fichar);

// =========================================================
// UTILIDADES DE FECHAS
// =========================================================

function obtenerHoy() {
    return new Date().toDateString();
}

function obtenerAyer() {
    let ayer = new Date();
    ayer.setDate(ayer.getDate() - 1);
    return ayer.toDateString();
}

function esMismoDia(fecha1, fecha2) {
    return fecha1 === fecha2;
}

function esAyer(fecha) {
    return fecha === obtenerAyer();
}

// =========================================================
// LÓGICA DE RACHA
// =========================================================

function calcularNuevaRacha(ultimaFecha, rachaActual) {

    let nuevaRacha = 1;

    // Si la última fecha fue ayer, continuamos la racha
    if (esAyer(ultimaFecha)) {
        nuevaRacha = rachaActual + 1;
    }

    return nuevaRacha;
}

// =========================================================
// PERSISTENCIA
// =========================================================

function guardarDatos(racha, fecha) {
    localStorage.setItem("racha", racha);
    localStorage.setItem("fecha", fecha);
}

// =========================================================
// UI
// =========================================================

function actualizarInterfaz(racha) {
    rachaTexto.innerText = racha + " días";
    mensaje.innerText = "Racha actualizada! ^^";
}

function mostrarMensajeYaFichado() {
    mensaje.innerText = "Ya fichaste hoy - -";
}

// =========================================================
// FUNCIÓN NUEVA: ACTUALIZAR MASCOTA
// =========================================================

/**
 * Cambia y muestra la imagen según si ha fichado o no
 * - true  → imagen de “fichado / feliz”
 * - false → imagen “normal”
 */
function actualizarMascota(haFichadoHoy) {

    if (haFichadoHoy) {
        mascota.src = "img/fuego.png";
    } else {
        mascota.src = "img/prohibido.png";
    }
    mascota.style.display = "block";
}

// =========================================================
// FUNCIÓN PRINCIPAL (ORQUESTADOR)
// =========================================================

function fichar() {

    let hoy = obtenerHoy();

    // Estado de ejecución
    let yaFichadoHoy = esMismoDia(ultimaFecha, hoy);
    let rachaActualizada = racha;

    if (!yaFichadoHoy) {

        // Calcular nueva racha
        rachaActualizada = calcularNuevaRacha(ultimaFecha, racha);

        // Guardar estado
        guardarDatos(rachaActualizada, hoy);

        // Actualizar variable global
        racha = rachaActualizada;
        ultimaFecha = hoy;

        // UI éxito
        actualizarInterfaz(rachaActualizada);

    } else {

        // UI caso repetido
        mostrarMensajeYaFichado();
    }

    //actualizar mascota SIEMPRE al fichar
    actualizarMascota(!yaFichadoHoy);

    return;
}

function resetRacha() {
    localStorage.removeItem("racha");
    localStorage.removeItem("fecha");
    location.reload();
}