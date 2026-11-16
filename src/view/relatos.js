const formularioRelato = document.querySelector('#form-relato');

if (formularioRelato) {
  const campoQuilombo = document.querySelector('#quilombo-nome');
  const campoTexto = document.querySelector('#relato-texto');
  const botaoEnviar = document.querySelector('#btn-enviar');
  const feedback = document.querySelector('#feedback-msg');
  const avisos = formularioRelato.querySelectorAll('.aviso-login');
  const token = sessionStorage.getItem('token');

  let usuario = null;

  try {
    usuario = JSON.parse(sessionStorage.getItem('usuario') || 'null');
  } catch {
    sessionStorage.removeItem('usuario');
    sessionStorage.removeItem('token');
  }

  const autenticado = Boolean(token && usuario);
  const podeCriar = autenticado && usuario.role === 'LIDER';

  for (const aviso of avisos) {
    aviso.hidden = podeCriar;
    if (autenticado && !podeCriar) {
      aviso.textContent = 'Somente líderes podem enviar relatos.';
    }
  }

  if (autenticado) {
    campoQuilombo.value = usuario.role === 'ADMIN'
      ? 'Administrador'
      : usuario.id_quilombo?.nome_do_quilombo || 'Quilombo vinculado';
  }

  if (podeCriar) {
    campoTexto.disabled = false;
    botaoEnviar.disabled = false;
  }

  formularioRelato.addEventListener('submit', async (evento) => {
    evento.preventDefault();
    feedback.hidden = true;

    try {
      if (!podeCriar) {
        throw new Error('Somente líderes autenticados podem enviar relatos.');
      }

      await window.api('/relatos', {
        method: 'POST',
        auth: true,
        body: JSON.stringify({ texto: campoTexto.value.trim() })
      });

      feedback.textContent = 'Relato enviado com sucesso!';
      feedback.hidden = false;
      campoTexto.value = '';
      await window.carregarRelatos();
    } catch (erro) {
      feedback.textContent = erro.message;
      feedback.hidden = false;
    }
  });
}