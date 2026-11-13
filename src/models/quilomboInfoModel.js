import mongoose from 'mongoose';

// Sub-schema para os itens dentro de "questoesEnfrentadas"
const questaoItemSchema = new mongoose.Schema({
  titulo: {
    type: String,
    required: [true, 'O título da questão é obrigatório'],
    trim: true
  },
  descricao: {
    type: String,
    required: [true, 'A descrição da questão é obrigatória'],
    trim: true
  }
}, { _id: false });

// schema de QuilomboInfo
const quilomboInfoSchema = new mongoose.Schema({
  // Campo para identificar e pesquisar o quilombo (baseado no nomeQuilomboSchema)
  nome: {
    type: String,
    required: [true, 'O nome do quilombo é obrigatório'],
    unique: true,
    trim: true
  },

  // Seção História
  historia: {
    titulo: {
      type: String,
      default: 'História',
      enum: {
        values: ['História'],
        message: 'Título incorreto'
      },
      required: true
    },
    imagem: {
      type: String,
      required: [true, 'A URL da foto da história é obrigatória'],
      trim: true
    },
    texto: {
      type: String,
      required: [true, 'O texto histórico é obrigatório'],
      minlength: [50, 'O texto histórico precisa ser mais descritivo.'],
      trim: true
    }
  },

  // Seção Modo de Vida
  modoDeVida: {
    titulo: {
      type: String,
      default: 'Modo de Vida',
      enum: {
        values: ['Modo de Vida'],
        message: 'Título incorreto'
      },
      required: true
    },
    imagem: {
      type: String,
      required: [true, 'A URL da foto do modo de vida é obrigatória'],
      trim: true
    },
    texto: {
      type: String,
      required: [true, 'O texto sobre o modo de vida é obrigatório'],
      minlength: [50, 'O texto sobre o modo de vida precisa de mais detalhes.'],
      trim: true
    }
  },

  // Seção Cultura
  cultura: {
    titulo: {
      type: String,
      default: 'Cultura',
      enum: {
        values: ['Cultura'],
        message: 'Título incorreto'
      },
      required: true
    },
    imagem: {
      type: String,
      required: [true, 'A URL da foto cultural é obrigatória'],
      trim: true
    },
    texto: {
      type: String,
      required: [true, 'O texto cultural é obrigatório'],
      minlength: [50, 'O texto cultural precisa de mais detalhes.'],
      trim: true
    }
  },

  // Seção Questões Enfrentadas
  questoesEnfrentadas: {
    titulo: {
      type: String,
      required: [true, 'O título das questões enfrentadas é obrigatório'],
      trim: true
    },
    introducao: {
      type: String,
      required: [true, 'A introdução das questões enfrentadas é obrigatória'],
      trim: true
    },
    itens: {
      type: [questaoItemSchema],
      validate: {
        validator: (arr) => Array.isArray(arr) && arr.length >= 1,
        message: 'É necessário listar pelo menos uma questão enfrentada.'
      }
    }
  }
}, {
  timestamps: true
});

const QuilomboInfo = mongoose.model('QuilomboInfo', quilomboInfoSchema);

export default QuilomboInfo;