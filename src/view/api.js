const API_BASE = '/api';

async function api(caminho, { token, auth = false, ...opcoes } = {}) {
  const headers = { ...opcoes.headers };

  if (opcoes.body) {
    headers['Content-Type'] = 'application/json';
  }

  token = token || (auth ? sessionStorage.getItem('token') : null);

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const resposta = await fetch(`${API_BASE}${caminho}`, {
    ...opcoes,
    headers
  });

  const tipo = resposta.headers.get('content-type') || '';
  const dados = tipo.includes('application/json')
    ? await resposta.json()
    : null;

  if (!resposta.ok) {
    throw new Error(
      dados?.mensagem ||
      dados?.erro ||
      dados?.message ||
      `Erro na requisição (${resposta.status}).`
    );
  }

  return dados;
}

window.api = api;

function resolverUrl(valor) {
  const caminhoRelativo = String(valor)
    .replace(/^(?:\.\.\/)+(?=images\/)/, '')
    .replace(/^\/(?=images\/)/, '');
  const url = new URL(caminhoRelativo, document.baseURI);

  if (!['http:', 'https:'].includes(url.protocol)) {
    throw new Error('URL inválida.');
  }

  return url.href;
}

window.resolverUrl = resolverUrl;

function mostrarErro(elemento, erro) {
  if (elemento) {
    elemento.textContent = erro.message;
    elemento.hidden = false;
  }
}

// Login: POST /api/usuarios/login
const formularioLogin = document.querySelector('#form-login');

if (formularioLogin) {
  formularioLogin.addEventListener('submit', async (evento) => {
    evento.preventDefault();

    const feedback = document.querySelector('#feedback-login');

    try {
      const resultado = await api('/usuarios/login', {
        method: 'POST',
        body: JSON.stringify({
          email: document.querySelector('#usuario').value.trim(),
          senha: document.querySelector('#senha').value
        })
      });

      sessionStorage.setItem('token', resultado.token);
      sessionStorage.setItem('usuario', JSON.stringify(resultado.usuario));
      window.location.href = 'relatos.html';
    } catch (erro) {
      mostrarErro(feedback, erro);
    }
  });
}

// Cards: GET /api/quilombos/cards
const listaQuilombos = document.querySelector('#lista-quilombos');

if (listaQuilombos) {
  api('/quilombos/cards')
    .then((quilombos) => {
      listaQuilombos.replaceChildren();

      for (const quilombo of quilombos) {
        const link = document.createElement('a');
        const card = document.createElement('article');
        const imagem = document.createElement('img');
        const titulo = document.createElement('strong');
        const descricao = document.createElement('p');

        link.className = 'card-link';
        link.href = `conteudo1.html?nome=${encodeURIComponent(quilombo.nome)}`;
        card.className = 'card';
        imagem.src = resolverUrl(quilombo.foto);
        imagem.alt = quilombo.nome;
        imagem.className = 'card-image';
        titulo.textContent = quilombo.nome;
        descricao.textContent = quilombo.descricao;

        const seta = document.createElement('img');
        seta.src = resolverUrl('../../images/Arrow right-circle.png');
        seta.alt = '';
        seta.className = 'acessar';

        card.append(imagem, titulo, descricao, seta);
        link.append(card);
        listaQuilombos.append(link);
      }
    })
    .catch((erro) => mostrarErro(listaQuilombos, erro));
}

// Detalhes: GET /api/quilombos/:nome
const campoNome = document.querySelector('#nome-quilombo');

if (campoNome) {
  const nome = new URLSearchParams(location.search).get('nome');

  if (nome) {
    api(`/quilombos/${encodeURIComponent(nome)}`)
      .then((quilombo) => {
        campoNome.textContent = quilombo.nome;
        document.title = `${quilombo.nome} — Saberes do Quilombo`;

        if (quilombo.nome.toLocaleLowerCase('pt-BR').includes('quingoma')) {
          document.querySelector('#descricao-quilombo').textContent =
            'Descrição: É uma comunidade rural remanescente de quilombo conhecido por ser polo de resistência ancestral e preservação da cultura afro-brasileira';
          document.querySelector('#localizacao-quilombo').textContent =
            'Localização: Lauro de Freitas, Região Metropolitana de Salvador - BA';
          document.querySelector('#contato-quilombo').textContent = 'Contato Indisponível';
        }

        for (const [secao, idTitulo, idTexto, idImagem] of [
          ['historia', 'titulo-historia', 'texto-historia', 'imagem-historia'],
          ['modoDeVida', 'titulo-modo-de-vida', 'texto-modo-de-vida', 'imagem-modo-de-vida'],
          ['cultura', 'titulo-cultura', 'texto-cultura', 'imagem-cultura']
        ]) {
          const dados = quilombo[secao];
          const titulo = document.querySelector(`#${idTitulo}`);
          const texto = document.querySelector(`#${idTexto}`);
          const imagem = document.querySelector(`#${idImagem}`);

          titulo.textContent = dados.titulo;
          texto.textContent = dados.texto;
          imagem.src = resolverUrl(dados.imagem);
          imagem.alt = `${dados.titulo} — ${quilombo.nome}`;
        }

        const questoes = quilombo.questoesEnfrentadas;
        document.querySelector('#titulo-questoes').textContent = questoes.titulo;
        document.querySelector('#introducao-questoes').textContent = questoes.introducao;

        const listaQuestoes = document.querySelector('#lista-questoes');
        listaQuestoes.replaceChildren();

        for (const [indice, questao] of questoes.itens.entries()) {
          const item = document.createElement('div');
          const cabecalho = document.createElement('h3');
          const botao = document.createElement('button');
          const painel = document.createElement('div');
          const corpo = document.createElement('div');
          const descricao = document.createElement('p');
          const idPainel = `questao-painel-${indice}`;

          item.className = 'accordion-item';
          cabecalho.className = 'accordion-header';
          botao.className = 'accordion-button collapsed';
          botao.type = 'button';
          botao.dataset.bsToggle = 'collapse';
          botao.dataset.bsTarget = `#${idPainel}`;
          botao.setAttribute('aria-expanded', 'false');
          botao.setAttribute('aria-controls', idPainel);
          botao.textContent = questao.titulo;

          painel.id = idPainel;
          painel.className = 'accordion-collapse collapse';
          painel.dataset.bsParent = '#lista-questoes';
          corpo.className = 'accordion-body';
          descricao.textContent = questao.descricao;

          corpo.append(descricao);
          painel.append(corpo);
          cabecalho.append(botao);
          item.append(cabecalho, painel);
          listaQuestoes.append(item);
        }

        document.querySelector('#banner-quilombo').hidden = false;
        document.querySelector('#conteudo-quilombo').hidden = false;
      })
      .catch((erro) => {
        document.querySelector('#banner-quilombo').hidden = false;
        mostrarErro(document.querySelector('#mensagem-erro'), erro);
      });
  } else {
    document.querySelector('#banner-quilombo').hidden = false;
    mostrarErro(
      document.querySelector('#mensagem-erro'),
      new Error('Não foi informado o nome do quilombo.')
    );
  }
}

// Relatos públicos: GET /api/relatos
const listaRelatos = document.querySelector('#lista-relatos');

if (listaRelatos) {
  async function carregarRelatos() {
    try {
      const relatos = await api('/relatos');
      listaRelatos.replaceChildren();
      const token = sessionStorage.getItem('token');
      let usuario = null;

      try {
        usuario = JSON.parse(sessionStorage.getItem('usuario') || 'null');
      } catch {
        sessionStorage.removeItem('usuario');
        sessionStorage.removeItem('token');
      }

      for (const relato of relatos) {
        const card = document.createElement('article');
        const titulo = document.createElement('h3');
        const texto = document.createElement('p');

        card.className = 'relato-card';
        titulo.textContent =
          relato.idlider_do_quilombo?.id_quilombo?.nome_do_quilombo || 'Relato';
        texto.textContent = relato.texto;

        card.append(titulo, texto);

        const autorId = relato.idlider_do_quilombo?._id;
        const usuarioId = usuario?._id || usuario?.id;
        const liderProprio = usuario?.role === 'LIDER' &&
          String(autorId) === String(usuarioId);
        const podeExcluir = usuario?.role === 'ADMIN' || liderProprio;

        if (token && (liderProprio || podeExcluir)) {
          const acoes = document.createElement('div');
          acoes.className = 'relato-actions';

          if (liderProprio) {
            const botaoEditar = document.createElement('button');
            botaoEditar.type = 'button';
            botaoEditar.textContent = 'Editar';
            botaoEditar.addEventListener('click', async () => {
              const textoAtualizado = window.prompt('Edite seu relato:', relato.texto);

              if (textoAtualizado === null) return;

              try {
                await api(`/relatos/${encodeURIComponent(relato._id)}`, {
                  method: 'PATCH',
                  auth: true,
                  body: JSON.stringify({ texto: textoAtualizado.trim() })
                });
                await carregarRelatos();
              } catch (erro) {
                mostrarErro(listaRelatos, erro);
              }
            });
            acoes.append(botaoEditar);
          }

          if (podeExcluir) {
            const botaoExcluir = document.createElement('button');
            botaoExcluir.type = 'button';
            botaoExcluir.textContent = 'Excluir';
            botaoExcluir.addEventListener('click', async () => {
              if (!window.confirm('Deseja excluir este relato?')) return;

              try {
                await api(`/relatos/${encodeURIComponent(relato._id)}`, {
                  method: 'DELETE',
                  auth: true
                });
                await carregarRelatos();
              } catch (erro) {
                mostrarErro(listaRelatos, erro);
              }
            });
            acoes.append(botaoExcluir);
          }

          card.append(acoes);
        }

        listaRelatos.append(card);
      }
    } catch (erro) {
      mostrarErro(listaRelatos, erro);
    }
  }

  window.carregarRelatos = carregarRelatos;
  carregarRelatos();
}

// Referências, leis e certificações: GET /api/fontes
const listaFontes = document.querySelector('.referencial_teorico');
const leisFederais = document.querySelector('#accordionFederal');
const leisBahia = document.querySelector('#accordionBahia');
const listaCertificacoes = document.querySelector('#accordionCertificacao');
const erroDetalhes = document.querySelector('#detalhes-erro');

function criarItemAccordion(container, id, titulo, conteudo) {
  const item = document.createElement('div');
  const cabecalho = document.createElement('h2');
  const botao = document.createElement('button');
  const painel = document.createElement('div');
  const corpo = document.createElement('div');

  item.className = 'accordion-item';
  cabecalho.className = 'accordion-header';
  botao.className = 'accordion-button collapsed';
  botao.type = 'button';
  botao.dataset.bsToggle = 'collapse';
  botao.dataset.bsTarget = `#${id}`;
  botao.setAttribute('aria-expanded', 'false');
  botao.setAttribute('aria-controls', id);
  botao.textContent = titulo;

  painel.id = id;
  painel.className = 'accordion-collapse collapse';
  painel.dataset.bsParent = `#${container.id}`;
  corpo.className = 'accordion-body';
  corpo.append(conteudo);

  cabecalho.append(botao);
  painel.append(corpo);
  item.append(cabecalho, painel);
  container.append(item);
}

function mostrarEstadoVazio(container, mensagem) {
  const estado = document.createElement('p');
  estado.textContent = mensagem;
  container.append(estado);
}

function renderizarFontes(fontes) {
  const categorias = new Map();
  for (const fonte of fontes) {
    if (!categorias.has(fonte.categoria)) {
      categorias.set(fonte.categoria, []);
    }
    categorias.get(fonte.categoria).push(fonte);
  }

  for (const categoria of ['GERAL', 'CORDOARIA', 'QUINGOMA']) {
    const fontesDaCategoria = categorias.get(categoria);
    if (!fontesDaCategoria?.length) continue;

    const grupo = document.createElement('div');
    const titulo = document.createElement('h3');
    const lista = document.createElement('ol');

    grupo.className = 'cartao-referencial';
    titulo.textContent = categoria;

    for (const fonte of fontesDaCategoria) {
      const item = document.createElement('li');
      const link = document.createElement('a');

      link.textContent = fonte.titulo;
      link.href = resolverUrl(fonte.url);
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      item.append(link);
      lista.append(item);
    }

    grupo.append(titulo, lista);
    listaFontes.append(grupo);
  }

  if (!fontes.length) {
    mostrarEstadoVazio(listaFontes, 'Nenhuma fonte cadastrada.');
  }
}

function renderizarLeis(leis, esfera, container) {
  const leisDaEsfera = leis.filter((lei) => lei.esfera === esfera);

  leisDaEsfera.forEach((lei, indice) => {
    const conteudo = document.createElement('div');
    const titulo = document.createElement('strong');
    const descricao = document.createElement('p');
    const tituloBotao = lei.revogado ? `${lei.titulo} (Revogado)` : lei.titulo;

    titulo.textContent = lei.titulo;
    descricao.textContent = lei.descricao;
    conteudo.append(titulo, descricao);

    if (lei.revogadoPor) {
      const revogacao = document.createElement('p');
      revogacao.textContent = `Revogado por: ${lei.revogadoPor}`;
      conteudo.append(revogacao);
    }

    criarItemAccordion(container, `lei-${esfera.toLowerCase()}-${indice}`, tituloBotao, conteudo);
  });

  if (!leisDaEsfera.length) {
    mostrarEstadoVazio(container, 'Nenhuma lei cadastrada.');
  }
}

function renderizarCertificacoes(certificacoes) {
  certificacoes.forEach((certificacao, indice) => {
    const conteudo = document.createElement('div');

    if (certificacao.subtitulo) {
      const subtitulo = document.createElement('strong');
      subtitulo.textContent = certificacao.subtitulo;
      conteudo.append(subtitulo);
    }

    if (certificacao.conteudo) {
      const descricao = document.createElement('p');
      descricao.textContent = certificacao.conteudo;
      conteudo.append(descricao);
    }

    if (certificacao.itens.length) {
      const itens = document.createElement('ol');
      for (const dado of certificacao.itens) {
        const item = document.createElement('li');
        if (dado.titulo) {
          const titulo = document.createElement('strong');
          titulo.textContent = `${dado.titulo}: `;
          item.append(titulo);
        }
        if (dado.descricao) {
          item.append(document.createTextNode(dado.descricao));
        }
        itens.append(item);
      }
      conteudo.append(itens);
    }

    if (certificacao.emailContato) {
      const email = document.createElement('a');
      email.href = `mailto:${certificacao.emailContato}`;
      email.textContent = certificacao.emailContato;
      conteudo.append(email);
    }

    criarItemAccordion(
      listaCertificacoes,
      `certificacao-${indice}`,
      certificacao.titulo,
      conteudo
    );
  });

  if (!certificacoes.length) {
    mostrarEstadoVazio(listaCertificacoes, 'Nenhuma informação de certificação cadastrada.');
  }
}

if (listaFontes && leisFederais && leisBahia && listaCertificacoes) {
  api('/fontes')
    .then((dados) => {
      if (
        !dados ||
        !Array.isArray(dados.fontes) ||
        !Array.isArray(dados.leis) ||
        !Array.isArray(dados.certificacoes)
      ) {
        throw new Error('A resposta da API de detalhes está inválida.');
      }

      renderizarFontes(dados.fontes);
      renderizarLeis(dados.leis, 'FEDERAL', leisFederais);
      renderizarLeis(dados.leis, 'BAHIA', leisBahia);
      renderizarCertificacoes(dados.certificacoes);
    })
    .catch((erro) => mostrarErro(erroDetalhes, erro));
}