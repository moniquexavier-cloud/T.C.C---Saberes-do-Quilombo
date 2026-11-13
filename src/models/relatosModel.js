import mongoose from 'mongoose';

const relatoSchema = new mongoose.Schema({
  quilombo_id: {
    type: Number,
    required: [true, 'O ID do quilombo é obrigatório'],
    enum: [1, 2] 
  },
  quilombo: {
    type: String,
    required: true,
    trim: true
  },
  lider_id: {
    type: String,
    required: true
  },
  lider: {
    type: String,
    required: true,
    trim: true
  },
  data: {
    type: Date,
    default: Date.now
  },
  texto: {
    type: String,
    required: [true, 'O texto do relato é obrigatório'],
    trim: true
  }
}, {
  timestamps: true
});

export default mongoose.model('Relato', relatoSchema);