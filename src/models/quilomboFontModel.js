import mongoose from 'mongoose';

// Model de Quilombo Font
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

export default mongoose.model('quilomboFont', quilomboFontSchema);