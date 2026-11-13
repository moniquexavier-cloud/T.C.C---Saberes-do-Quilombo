import mongoose from 'mongoose';

// Model de quilombo Card Model
const quilomboCardSchema = new mongoose.Schema({
    foto: {
    type: String, 
    required: [ true, 'A foto é obrigatória'], 
    trim: true
    },

    nome: {
    type: String,
    required: [true, 'O nome é obrigatório'],
    minlength: [3, 'O nome deve ter pelo menos 3 caracteres'],
    trim: true
    },

  descricao: {
    type: String,
    required: [true, 'A descrição é obrigatória'],
    trim: true
    }
}, {
  timestamps: true 
});

export default mongoose.model('quilomboCard',  quilomboCardSchema);