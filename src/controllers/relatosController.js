import Relato from '../models/relatosModel.js';
import Quilombo from '../models/quilomboModel.js';

// GET: Listar todos os relatos
export const getRelatos = async (req, res) => {
  try {
    const relatos = await Relato.find()
      .populate({
        path: 'idlider_do_quilombo',
        select: 'nome email id_quilombo',
        populate: {
          path: 'id_quilombo',
            select: 'nome_do_quilombo -_id'
        }
      })
      .sort({ createdAt: -1 });

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

    if (!req.usuario.id_quilombo) {
      return res.status(403).json({
        mensagem: 'Líder não está vinculado a nenhum quilombo.'
      });
    }

    const quilomboDoc = await Quilombo.findById(req.usuario.id_quilombo);
    if (!quilomboDoc) {
      return res.status(404).json({
        mensagem: 'Quilombo vinculado não encontrado.'
      });
    }
    
    const { texto } = req.body;
    const liderId = String(req.usuario._id || req.usuario.id);

    const relatoCriado = await Relato.create({
      idlider_do_quilombo: liderId,
      texto,
    });

    return res.status(201).json({
      _id: relatoCriado._id,
      mensagem: "Relato cadastrado com sucesso!",
      texto: relatoCriado.texto,
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

    if (req.usuario.role !== 'LIDER' || String(relato.idlider_do_quilombo) !== usuarioId) {
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
      (req.usuario.role !== 'LIDER' || String(relato.idlider_do_quilombo) !== usuarioId)
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