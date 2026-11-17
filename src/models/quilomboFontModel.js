import mongoose from 'mongoose';

// Quilombo Font (referências teóricas)

const quilomboFontSchema = new mongoose.Schema({
  categoria: {
    type: String,
    required: [true, 'A categoria é obrigatória'],
    enum: ['GERAL', 'CORDOARIA', 'QUINGOMA'],
    uppercase: true,
    trim: true
  },
  titulo: {
    type: String,
    required: [true, 'O título da referência é obrigatório'],
    trim: true
  },
  url: {
    type: String,
    required: [true, 'O link (URL) é obrigatório'],
    trim: true
  }
}, {
  timestamps: true
});

export const QuilomboFont = mongoose.model('quilomboFont', quilomboFontSchema);

//Lei (leis de reconhecimento territorial)
const leiSchema = new mongoose.Schema({
  esfera: {
    type: String,
    required: [true, 'A esfera é obrigatória'],
    enum: ['FEDERAL', 'BAHIA'],
    uppercase: true,
    trim: true
  },
  tipo: {
    type: String,
    required: [true, 'O tipo da lei é obrigatório'],
    enum: [
      'CONSTITUICAO',
      'DECRETO',
      'DECRETO_SIMPLES',
      'LEI',
      'LEI_ORDINARIA',
      'LEI_COMPLEMENTAR',
      'PORTARIA'
    ],
    uppercase: true,
    trim: true
  },
  numero: {
    type: String,
    trim: true,
    default: null
  },
  ano: {
    type: Number,
    default: null
  },
  data: {
    type: String,
    trim: true,
    default: null
  },
  titulo: {
    type: String,
    required: [true, 'O título da lei é obrigatório'],
    trim: true
  },
  descricao: {
    type: String,
    required: [true, 'A descrição da lei é obrigatória'],
    trim: true
  },
  revogado: {
    type: Boolean,
    default: false
  },
  revogadoPor: {
    type: String,
    trim: true,
    default: null
  }
}, {
  timestamps: true
});

export const Lei = mongoose.model('Lei', leiSchema);

// Certificação (guia informativo)
const itemCertificacaoSchema = new mongoose.Schema({
  titulo: { type: String, trim: true },
  descricao: { type: String, trim: true }
}, { _id: false });


const certificacaoSchema = new mongoose.Schema({
  titulo: {
    type: String,
    required: [true, 'O título é obrigatório'],
    trim: true
  },
  subtitulo: {
    type: String,
    trim: true,
    default: null
  },
  conteudo: {
    type: String,
    trim: true,
    default: ''
  },
  itens: {
    type: [itemCertificacaoSchema],
    default: []
  },
  emailContato: {
    type: String,
    trim: true,
    lowercase: true,
    default: null
  }
}, {
  timestamps: true
});


export const Certificacao = mongoose.model('Certificacao', certificacaoSchema);