// Navegación suave al hacer clic en los enlaces del menú
document.querySelectorAll('nav a[href^="#"]').forEach(enlace => {
    enlace.addEventListener('click', function(e) {
        e.preventDefault();
        const destino = document.querySelector(this.getAttribute('href'));
        if(destino) {
            destino.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('contactForm');
  const msgDiv = document.getElementById('formMsg');

  function showMsg(text, type = "success") {
    msgDiv.textContent = text;
    msgDiv.className = "form-msg " + type;
  }

  form.addEventListener('submit', async function(e){
    e.preventDefault();

    // VALIDACIÓN MANUAL
    let nombre = form.nombre.value.trim();
    let correo = form.correo.value.trim();
    let mensaje = form.mensaje.value.trim();

    // Nombre mínimo 2 letras, sólo letras y espacios
    if(!/^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s]{2,40}$/.test(nombre)) {
      showMsg("Ingresá un nombre válido.", "error");
      form.nombre.focus();
      return false;
    }

    // Email válido
    if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo)) {
      showMsg("Ingresá un correo válido.", "error");
      form.correo.focus();
      return false;
    }

    // Mensaje mínimo 6 letras
    if(mensaje.length < 6) {
      showMsg("El mensaje es demasiado corto.", "error");
      form.mensaje.focus();
      return false;
    }

    showMsg("Enviando mensaje...", "success");

    // ENVÍO AJAX
    const data = new FormData(form);
    const res = await fetch(form.action, {
      method: form.method,
      body: data,
      headers: { 'Accept': 'application/json' }
    });

    if(res.ok){
      form.reset();
      showMsg("¡Mensaje enviado! Te responderé pronto.", "success");
    } else {
      showMsg("Ocurrió un error al enviar. Probá de nuevo.", "error");
    }
  });

  // Opcional: Limpia mensaje al empezar a escribir de nuevo
  ['input','textarea'].forEach(tag=>{
    form.querySelectorAll(tag).forEach(el=>{
      el.addEventListener('input',()=>msgDiv.className="form-msg");
    });
  });
});

