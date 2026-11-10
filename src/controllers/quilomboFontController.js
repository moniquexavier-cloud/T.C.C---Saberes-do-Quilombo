// Dados Mocks (falsos) das informações sobre os quilombos
const mockQuilomboFontes = {
  cartao_referencial_1: "Artigo científico sobre a formação histórica e resistência das comunidades quilombolas no século XIX.",
  cartao_referencial_2: "Relatório técnico e mapeamento territorial fornecido pelas associações comunitárias locais.",
  cartao_referencial_3: "Documentário e registos orais recolhidos com os anciãos da comunidade sobre as suas tradições."
};

// Controller das fontes usadas no site
const getQuilomboFontes = async (req, res) => {
  try {
    return res.status(200).json(mockQuilomboFontes);
  } catch (error) {
    return res.status(500).json({
      mensagem: "Erro interno ao obter as fontes do quilombo.",
      erro: error.message
    });
  }
};



export { getQuilomboFontes};

