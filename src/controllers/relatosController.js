import Relato from '../models/relatosModel.js';

const nomesQuilombos = {
  1: 'Cordoaria',
  2: 'Quingoma'
};

// GET: Listar todos os relatos
export const getRelatos = async (req, res) => {
  try {
    const relatos = await Relato.find().sort({ createdAt: -1 });
    return res.status(200).json(relatos);
  } catch (error) {
    return res.status(500).json({
      mensagem: "Erro interno ao listar os relatos.",
      erro: error.message
    });
  }
};

// POST: Criar um novo relato (apenas LIDER do respectivo quilombo)
export const createRelato = async (req, res) => {
  try {
    if (req.usuario.role !== 'LIDER') {
      return res.status(403).json({
        mensagem: 'Apenas líderes podem criar relatos.'
      });
    }

    const { quilombo_id, texto } = req.body;
    const quilombo = nomesQuilombos[quilombo_id];

    if (!quilombo) {
      return res.status(404).json({
        mensagem: 'Quilombo não encontrado.'
      });
    }

    if (req.usuario.quilombo_id !== quilombo_id) {
      return res.status(403).json({
        mensagem: 'Você só pode criar relatos para o seu quilombo.'
      });
    }

    // Pega o ID do usuário autenticado (suporta tanto _id do MongoDB quanto id vindo do token JWT)
    const liderId = String(req.usuario._id || req.usuario.id);

    const relatoCriado = await Relato.create({
      quilombo_id,
      quilombo,
      lider_id: liderId,
      lider: req.usuario.nome,
      data: new Date(),
      texto
    });

    return res.status(201).json({
      mensagem: "Relato cadastrado com sucesso!",
      relatoCriado
    });
  } catch (error) {
    return res.status(400).json({
      mensagem: "Erro ao cadastrar o relato.",
      erro: error.message
    });
  }
};

// PATCH: Editar o texto do relato (apenas o LIDER autor do relato)
export const patchRelato = async (req, res) => {
  try {
    const { id } = req.params;
    const relato = await Relato.findById(id);

    if (!relato) {
      return res.status(404).json({
        mensagem: "Relato não encontrado."
      });
    }

    const usuarioId = String(req.usuario._id || req.usuario.id);

    if (req.usuario.role !== 'LIDER' || relato.lider_id !== usuarioId) {
      return res.status(403).json({
        mensagem: 'Você não pode editar este relato.'
      });
    }

    relato.texto = req.body.texto;
    await relato.save();

    return res.status(200).json({
      mensagem: "Relato atualizado com sucesso!",
      relatoAtualizado: relato
    });
  } catch (error) {
    // Caso o ID enviado na URL não seja um ObjectId válido do MongoDB
    if (error.name === 'CastError') {
      return res.status(400).json({ mensagem: "ID de relato inválido." });
    }
    return res.status(500).json({
      mensagem: "Erro interno ao atualizar o relato.",
      erro: error.message
    });
  }
};

// DELETE: Excluir um relato (ADMIN pode excluir qualquer um; LIDER apenas o seu)
export const deleteRelato = async (req, res) => {
  try {
    const { id } = req.params;
    const relato = await Relato.findById(id);

    if (!relato) {
      return res.status(404).json({
        mensagem: "Relato não encontrado."
      });
    }

    const usuarioId = String(req.usuario._id || req.usuario.id);

    if (
      req.usuario.role !== 'ADMIN' &&
      (req.usuario.role !== 'LIDER' || relato.lider_id !== usuarioId)
    ) {
      return res.status(403).json({
        mensagem: 'Você não pode excluir este relato.'
      });
    }

    const relatoExcluido = await Relato.findByIdAndDelete(id);

    return res.status(200).json({
      mensagem: "Relato excluído com sucesso!",
      relatoExcluido
    });
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({ mensagem: "ID de relato inválido." });
    }
    return res.status(500).json({
      mensagem: "Erro interno ao excluir o relato.",
      erro: error.message
    });
  }
};