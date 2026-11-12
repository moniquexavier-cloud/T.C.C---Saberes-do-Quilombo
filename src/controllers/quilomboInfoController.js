// Dados Mocks (falsos) das informações sobre os quilombos
const mockQuilomboInfo = {
  historia: {
    titulo: "História",
    imagem: "https://exemplo.com/imagens/historia-quilombo.jpg",
    texto: "Esta comunidade foi fundada no século XVIII por remanescentes de quilombos que buscavam liberdade e autonomia territorial na região."
  },
  modoDeVida: {
    titulo: "Modo de Vida",
    imagem: "https://exemplo.com/imagens/modo-de-vida.jpg",
    texto: "A comunidade subsiste primariamente através do cultivo de agricultura familiar orgânica, extrativismo sustentável e pesca artesanal."
  },
  cultura: {
    titulo: "Cultura",
    imagem: "https://exemplo.com/imagens/cultura.jpg",
    texto: "As tradições ancestrais são preservadas por meio de festejos populares, danças folclóricas, culinária típica e oficinas de artesanato."
  },
  questoesEnfrentadas: {
    titulo: "Desafios Locais",
    introducao: "Abaixo estão elencados os principais desafios vividos atualmente pela comunidade:",
    itens: [
      {
        titulo: "Titulação de Terras",
        descricao: "Luta contínua pelo reconhecimento legal e demarcação formal do território ancestral."
      },
      {
        titulo: "Acesso à Saúde",
        descricao: "Necessidade de melhorias na infraestrutura do posto de saúde e atendimento especializado."
      }
    ]
  }
};

const getQuilomboInfo = (req, res) => {
    try {
        const nome = ['Cordoaria', 'Quingoma'].find(
            quilombo => quilombo.toLocaleLowerCase('pt-BR') ===
                req.params.nome.trim().toLocaleLowerCase('pt-BR')
        );

        if (!nome) {
            return res.status(404).json({
                mensagem: 'Quilombo não encontrado.'
            });
        }

        return res.status(200).json({
            nome,
            ...mockQuilomboInfo
        });
    } catch (error) {
        return res.status(500).json({
            mensagem: "Erro interno ao obter informações do quilombo.",
            erro: error.message
        });
    }
};

export { getQuilomboInfo };