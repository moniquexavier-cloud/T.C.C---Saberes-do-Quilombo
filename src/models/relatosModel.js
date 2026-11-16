import mongoose from 'mongoose';

const relatoSchema = new mongoose.Schema({
  idlider_do_quilombo: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Usuario', 
        required: true
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