/* global use, db */
// MongoDB Playground
// To disable this template go to Settings | MongoDB | Use Default Template For Playground.
// Make sure you are connected to enable completions and to be able to run a playground.
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.
// The result of the last command run in a playground is shown on the results panel.
// By default the first 20 documents will be returned with a cursor.
// Use 'console.log()' to print to the debug output.
// For more documentation on playgrounds please refer to
// https://www.mongodb.com/docs/mongodb-vscode/playgrounds/

use('test');

db.getCollection('certificacaos').insertOne({
  titulo: 'Certificação Quilombola',
  subtitulo: 'PROCESSO DE CERTIFICAÇÃO',
  conteudo: 'Guia informativo sobre o processo de reconhecimento e emissão de certidões às comunidades remanescentes de quilombos junto à Fundação Cultural Palmares.',
  itens: [
    {
      titulo: 'Responsável pela Certificação',
      descricao: 'Fundação Cultural Palmares – FCP: Conforme o 4º artigo do Decreto nº 4.887, de 20 de novembro de 2003, a Fundação Cultural Palmares – FCP é responsável pela emissão de certidões às comunidades quilombolas e sua inscrição em um cadastro geral.'
    },
    {
      titulo: 'Definição de Comunidade Remanescente de Quilombo',
      descricao: 'Art. 2º do Decreto nº 4.887/2003: Consideram-se remanescentes das comunidades dos quilombos, para os fins deste Decreto, os grupos étnico-raciais, segundo critérios de autoatribuição, com trajetória histórica própria, dotados de relações territoriais específicas, com presunção de ancestralidade negra relacionada com a resistência à opressão histórica sofrida.'
    },
    {
      titulo: 'Documentos Exigidos para Certificação',
      descricao: 'Documentação necessária: 1. Ata de Reunião ou Assembleia: Ata de reunião específica para tratar do tema da autodeclaração, caso a comunidade não tenha uma associação constituída, ou uma ata de assembleia da associação, se esta já estiver formalizada, com assinatura da maioria de seus membros. 2. Relato Histórico da Comunidade: Um breve relato histórico (geralmente de 2 a 5 páginas) descrevendo a formação da comunidade, seus principais troncos familiares, manifestações culturais tradicionais, atividades produtivas, festejos, religiosidade, entre outros aspectos relevantes. 3. Requerimento de Certificação: Um requerimento de certificação endereçado à presidência da FCP. A documentação e o requerimento deverão ser enviados via e-mail: quilombo@palmares.gov.br'
    },
    {
      titulo: 'Portaria FCP nº 85/2026 – Cadastro Geral das Comunidades Quilombolas',
      descricao: 'Portaria FCP nº 85/2026: A Portaria 85/2026 nasce com o objetivo de ampliar direitos. Ao mesmo tempo em que valoriza a ancestralidade Quilombola ao reconhecer que a história oral também é instrumento para a construção e garantia de políticas públicas, ela se abre ao uso das novas tecnologias, ao aceitar vídeos para fins de comprovação de autodefinição da Comunidade.'
    }
  ],
  emailContato: 'quilombo@palmares.gov.br',
  createdAt: new Date(),
  updatedAt: new Date()
});