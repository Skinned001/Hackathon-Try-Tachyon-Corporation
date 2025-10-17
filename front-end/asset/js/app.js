document.addEventListener('DOMContentLoaded', () => {
    // --- ELEMENTOS DEL DOM ---
    const questionTextElement = document.getElementById('question-text');
    const conceptInfoElement = document.getElementById('concept-info');
    const optionsContainer = document.getElementById('options-container');
    const feedbackTextElement = document.getElementById('feedback-text');
    const nextButton = document.getElementById('next-button');

    // --- ESTADO DE LA APP ---
    let currentExercise = null;
    let correctAnswer = '';

    // --- URL DE LA API (¡Cámbiala por la tuya!) ---
    const API_URL = 'http://localhost:3008/api/ejercicios/random'; // Asume que tienes una ruta que devuelve un ejercicio aleatorio

    // --- FUNCIONES ---

    /**
     * Carga un nuevo ejercicio desde el backend y lo muestra en pantalla.
     */
    async function fetchExercise() {
        // Reiniciar estado
        resetState();
        questionTextElement.textContent = 'Cargando...';

        try {
            const response = await fetch(API_URL);
            if (!response.ok) {
                throw new Error('No se pudo conectar con el servidor.');
            }
            currentExercise = await response.json();

            // Guardar la respuesta correcta para compararla después
            correctAnswer = currentExercise.respuesta_correcta;

            displayExercise(currentExercise);

        } catch (error) {
            questionTextElement.textContent = 'Error al cargar el ejercicio.';
            console.error('Error fetching exercise:', error);
        }
    }

    /**
     * Muestra los datos del ejercicio en la interfaz.
     * @param {object} exercise - El objeto del ejercicio con sus datos.
     */
    function displayExercise(exercise) {
        questionTextElement.textContent = exercise.texto_pregunta;
        conceptInfoElement.textContent = `${exercise.concepto.nombre} (${exercise.concepto.nivel_mcjer})`;

        // Crear las opciones
        const options = [...exercise.opciones_adicionales, exercise.respuesta_correcta];

        // Mezclar opciones para que no siempre aparezcan en el mismo orden
        shuffleArray(options);

        options.forEach(optionText => {
            const button = document.createElement('button');
            button.textContent = optionText;
            button.classList.add('option-button');
            button.addEventListener('click', () => handleOptionClick(button, optionText));
            optionsContainer.appendChild(button);
        });
    }

    /**
     * Maneja el evento de clic en un botón de opción.
     * @param {HTMLButtonElement} selectedButton - El botón que fue presionado.
     * @param {string} selectedAnswer - El texto de la respuesta seleccionada.
     */
    function handleOptionClick(selectedButton, selectedAnswer) {
        // Deshabilitar todos los botones para evitar más clics
        const allButtons = optionsContainer.querySelectorAll('.option-button');
        allButtons.forEach(button => button.disabled = true);

        // Comprobar si la respuesta es correcta
        if (selectedAnswer === correctAnswer) {
            selectedButton.classList.add('correct');
            feedbackTextElement.textContent = '¡Correcto! 🎉';
            feedbackTextElement.style.color = '#0f5132';
        } else {
            selectedButton.classList.add('incorrect');
            feedbackTextElement.textContent = `Incorrecto. La respuesta era "${correctAnswer}".`;
            feedbackTextElement.style.color = '#842029';

            // Resaltar también la respuesta correcta
            allButtons.forEach(button => {
                if (button.textContent === correctAnswer) {
                    button.classList.add('correct');
                }
            });
        }
    }

    /**
     * Limpia la interfaz para el siguiente ejercicio.
     */
    function resetState() {
        optionsContainer.innerHTML = '';
        feedbackTextElement.textContent = '';
        currentExercise = null;
        correctAnswer = '';
    }

    /**
     * Algoritmo Fisher-Yates para mezclar un array.
     * @param {Array} array - El array a mezclar.
     */
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    // --- EVENT LISTENERS ---
    nextButton.addEventListener('click', fetchExercise);

    // --- CARGA INICIAL ---
    fetchExercise();
});