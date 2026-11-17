import { QuilomboFont, Lei, Certificacao } from '../models/quilomboFontModel.js';

export const getQuilomboFontes = async (_req, res) => {
  try {
    const [fontes, leis, certificacoes] = await Promise.all([
      QuilomboFont.find(),
      Lei.find().sort({ ano: -1 }),
      Certificacao.find()
    ]);

    return res.status(200).json({
      fontes,
      leis,
      certificacoes
    });
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao buscar os dados', error: error.message });
  }
};