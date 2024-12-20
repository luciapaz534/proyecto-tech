function validarFormulario(event) {
    // Obtener valores de los campos
    const nombre = document.getElementById('nombre').value.trim();
    const correo = document.getElementById('correo').value.trim();
    const mensaje = document.getElementById('mensaje').value.trim();
    console.log(nombre,mensaje)

    // Validar que el nombre y el mensaje no estén vacíos
    if (nombre === '') {
        alert('Por favor, ingresa tu nombre.');
        return false;
    }

    if (mensaje === '') {
        alert('Por favor, ingresa un mensaje.');
        return false;
    }

    // Validar que el correo tenga un formato válido
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(correo)) {
        alert('Por favor, ingresa un correo electrónico válido.');
        return false;
    }
    return true; // validacion exitosa
    alert("validacion exitosa")
}
    // Si todas las validaciones pasan, enviar el formulario
    //document.getElementById('formularioContacto').submit();
//}

// Añadir el evento de submit al formulario

//const form = document.querySelector("form");

    // Prevenir el envío del formulario
    //form.addEventListener("submit", (event) => { 
    //event.preventDefault()) ;
    //if (validarFormulario()) {
        // Si la validación es exitosa, envía el formulario
  //      form.submit();
    //}

    //document.addEventListener("DOMContentLoaded", () => { cambiado por productos
    // cuando carga el DOM ya que cargue los productos

// envío del formulario
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById('formularioContacto');

    form.addEventListener("submit", async (event) => {
        event.preventDefault(); // Previene el envío del formulario por defecto

        const formData = new FormData(form); // Captura los datos del formulario

        if (validarFormulario()) {
            try {
                const response = await fetch('https://formspree.io/f/mkgnjjrr', {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json' // Acepta la respuesta en formato JSON
                    }
                });

                if (response.ok) {
                    alert('Formulario enviado con éxito. ¡Gracias por contactarnos!');
                    form.reset(); // Reinicia el formulario
                } else {
                    alert('Hubo un problema al enviar el formulario. Por favor, intenta nuevamente.');
                }
            } catch (error) {
                console.error('Error:', error);
                alert('Hubo un problema al enviar el formulario. Por favor, intenta nuevamente más tarde.');
            }
        }
    });
});
