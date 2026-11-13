import mongoose from 'mongoose';

// Model de quilombo Font Model
const quilomboFontSchema = new mongoose.Schema({
    cartao_referencial_1: {
    type: String,
    required: [true, 'A referência é obrigatória'],
    trim: true
    },

cartao_referencial_2: {
    type: String,
    required: [true, 'A referência é obrigatória'],
    trim: true
    },

cartao_referencial_3: {
    type: String,
    required: [true, 'A referência é obrigatória'],
    trim: true
    }
}, {
  timestamps: true 
});

export default mongoose.model('quilomboFont',  quilomboFontSchema);