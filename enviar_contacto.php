<?php
if($_SERVER['REQUEST_METHOD'] == 'POST'){
  $to = "santiagorista123@gmail.com";
  $nombre = strip_tags($_POST['nombre']);
  $correo = filter_var($_POST['correo'], FILTER_SANITIZE_EMAIL);
  $mensaje = htmlspecialchars($_POST['mensaje']);

  $headers = "From: $correo\r\nReply-To: $correo\r\n";
  $subject = "Nuevo mensaje de contacto";
  $body = "Nombre: $nombre\nCorreo: $correo\nMensaje:\n$mensaje";

  if(mail($to, $subject, $body, $headers)){
    echo "<script>alert('Mensaje enviado!');window.location='index.html';</script>";
  } else {
    echo "<script>alert('Hubo un error al enviar el mensaje.');history.back();</script>";
  }
}
?>
