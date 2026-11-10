// Dados Mocks (falsos) dos cards sobre os quilombos
const mockQuilomboCards = [
  {
    id: 1,
    imagem: "https://exemplo.com/imagens/cordoaria.jpg",
    nome: "Cordoaria",
    descricao: "Informações sobre o Quilombo de Cordoaria."
  },
  {
    id: 2,
    imagem: "https://exemplo.com/imagens/quingoma.jpg",
    nome: "Quingoma",
    descricao: "Informações sobre o Quilombo de Quingoma."
  }
];

// Controller dos cards sobre os quilombos
const getQuilomboCards = async (req, res) => {
  try {
    const nome = req.query.nome?.trim().toLocaleLowerCase('pt-BR');
    const cards = nome
      ? mockQuilomboCards.filter(card =>
          card.nome.toLocaleLowerCase('pt-BR').includes(nome)
        )
      : mockQuilomboCards;

    return res.status(200).json(cards);
  } catch (error) {
    return res.status(500).json({
      mensagem: "Erro interno ao procurar os cards dos quilombos.",
      erro: error.message
    });
  }
};

export { getQuilomboCards };