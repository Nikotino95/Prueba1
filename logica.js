document.addEventListener('DOMContentLoaded', function() {
    const citas = document.querySelectorAll('.carousel-citas .cita');
    const menuToggle = document.querySelector('.menu-icono');
    const menuNav = document.querySelector('.menu');
    let indiceActual = 0;
    const tiempoVisibleCitaMs = 5000;
    const duracionTransicionMs = 1000;

    // Funcionalidad del carrusel de citas
    if (citas.length > 0) {
        function mostrarSiguienteCita() {
            if (citas[indiceActual]) {
                citas[indiceActual].classList.remove('active');
            }

            indiceActual = (indiceActual + 1) % citas.length;

            setTimeout(() => {
                if (citas[indiceActual]) {
                    citas[indiceActual].classList.add('active');
                }
            }, duracionTransicionMs);
        }

        // Muestra la primera cita al cargar la página
        if (citas[indiceActual]) {
            citas[indiceActual].classList.add('active');
        }

        // Configura el intervalo
        setInterval(mostrarSiguienteCita, tiempoVisibleCitaMs + duracionTransicionMs);
    }

    // Funcionalidad del menú de hamburguesa
    if (menuToggle && menuNav) {
        menuToggle.addEventListener('click', function() {
            menuNav.classList.toggle('mostrar');
        });
    }

    // Establece el año actual en el footer
    const currentYearSpan = document.getElementById('current-year');
    if (currentYearSpan) {
        const currentYear = new Date().getFullYear();
        currentYearSpan.textContent = currentYear;
    }
});