import mongoose from 'mongoose';

const usuarioSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: [true, 'O nome é obrigatório'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'O e-mail é obrigatório'],
    unique: true,
    lowercase: true,
    trim: true
  },
  senha: {
    type: String,
    required: [true, 'A senha é obrigatória']
  },
  role: {
    type: String,
    enum: ['LIDER', 'ADMIN'],
    required: [true, 'O perfil (role) é obrigatório']
  },
  quilombo_id: {
    type: Number,
    enum: [1, 2],
    required: function () {
      return this.role === 'LIDER';
    }
  }
}, {
  timestamps: true
});

export default mongoose.model('Usuario', usuarioSchema);