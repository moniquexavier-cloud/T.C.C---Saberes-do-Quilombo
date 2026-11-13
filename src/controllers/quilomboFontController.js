import QuilomboFont from '../models/quilomboFontModel.js';

export const getQuilomboFontes = async (req, res) => {
  try {
    const fontes = await QuilomboFont.find();
    return res.status(200).json(fontes);
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao buscar referências', error: error.message });
  }
};

export { getQuilomboFontes};

