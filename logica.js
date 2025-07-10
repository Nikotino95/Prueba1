document.addEventListener('DOMContentLoaded', function() {
    const citas = document.querySelectorAll('.carousel-citas .cita');
    let indiceActual = 0;

    // Define la duración de la transición en CSS (en milisegundos)
    // Coincide con el "1s" de transition: opacity 1s... en tu CSS
    const duracionTransicionMs = 1000; 
    
    // Define la duración del "blanco" (la pausa entre citas)
    // Por ejemplo, 500ms (medio segundo) después de que la cita se oculta
    const duracionBlancoMs = 500; 

    // Función para mostrar una cita específica
    function mostrarCita(indice) {
        // Primero, oculta la cita actual (si hay alguna activa)
        // Usamos forEach para asegurarnos de que solo haya una activa
        citas.forEach(cita => {
            if (cita.classList.contains('active')) {
                cita.classList.remove('active');
            }
        });

        // Después de que la cita actual se ha ocultado (duracionTransicionMs)
        // y ha pasado el tiempo de "blanco" (duracionBlancoMs),
        // entonces mostramos la siguiente cita.
        setTimeout(() => {
            if (citas[indice]) { // Asegurarse de que la cita exista
                citas[indice].classList.add('active');
            }
        }, duracionTransicionMs + duracionBlancoMs);
    }

    // Función para pasar a la siguiente cita
    function siguienteCita() {
        // Calculamos el índice de la siguiente cita antes de ocultar la actual
        const proximoIndice = (indiceActual + 1) % citas.length;

        // Si hay una cita activa, quítale la clase 'active' para que empiece a desvanecerse
        if (citas[indiceActual]) {
            citas[indiceActual].classList.remove('active');
        }

        // Una vez que la cita actual ha terminado de desvanecerse,
        // y hemos esperado el tiempo del "blanco", entonces mostramos la siguiente.
        // El `setTimeout` aquí manejará el tiempo total.
        setTimeout(() => {
            indiceActual = proximoIndice; // Actualizamos el índice a la próxima cita
            if (citas[indiceActual]) {
                citas[indiceActual].classList.add('active');
            }
        }, duracionTransicionMs + duracionBlancoMs);
    }

    // Mostrar la primera cita al cargar la página inmediatamente
    if (citas.length > 0) {
        citas[indiceActual].classList.add('active');
    }

    // Configurar el intervalo para el cambio de citas
    // El tiempo total entre el inicio de una cita y el inicio de la siguiente
    // será: duración de la cita visible + duración de la transición + duración del blanco.
    // Para simplificar, el intervalo debe ser el tiempo que quieres que la cita ESTÉ VISIBLE,
    // MÁS el tiempo que tarda en desaparecer Y el tiempo de BLANCO.
    
    // Si la cita está visible por 5 segundos, y la transición+blanco dura 1.5 segundos:
    // Intervalo = 5000ms (visible) + (1000ms + 500ms) (ocultarse y blanco) = 6500ms
    const tiempoVisibleCitaMs = 5000; // Tiempo que cada cita permanece visible ANTES de empezar a desvanecerse
    setInterval(siguienteCita, tiempoVisibleCitaMs + duracionTransicionMs + duracionBlancoMs); 
});