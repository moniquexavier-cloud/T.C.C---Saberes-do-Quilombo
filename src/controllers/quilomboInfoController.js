import QuilomboInfo from '../models/quilomboInfoModel.js';

export const getQuilomboInfo = async (req, res) => {
    try {
        const nomeParam = req.params.nome.trim();
       const info = await QuilomboInfo.findOne({
      nome: { $regex: `^${nomeParam}$`, $options: 'i' }
    });

     if (!info) {
      return res.status(404).json({
        mensagem: 'Quilombo não encontrado.'
      });
    }

    return res.status(200).json(info);
  } catch (error) {
    return res.status(500).json({
      mensagem: "Erro interno ao obter informações do quilombo.",
      erro: error.message
    });
  }
};
