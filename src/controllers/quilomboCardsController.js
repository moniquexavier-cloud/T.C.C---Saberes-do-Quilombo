import quilomboCard from '../models/quilomboCardsModel.js'; 

// Listar os cards do MongoDB (mantendo o filtro por ?nome= na URL)
export const getQuilomboCards = async (req, res) => {
  try {
    const nome = req.query.nome?.trim();

    const filtro = nome ? { nome: { $regex: nome, $options: 'i' } } : {};
    const cards = await quilomboCard.find(filtro); 

    return res.status(200).json(cards);
  } catch (error) {
    return res.status(500).json({
      mensagem: "Erro interno ao procurar os cards dos quilombos.",
      erro: error.message
    });
  }
};