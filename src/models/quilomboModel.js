import mongoose from 'mongoose';

const quilomboSchema = new mongoose.Schema({
    lider_do_quilombo: { 
        type: String, 
        required: true 
    },
    nome_do_quilombo: { 
        type: String, 
        required: true 
    },
    cep: { 
        type: Number,
        required: true 
    }
}, { timestamps: true });

export default mongoose.model('Quilombo', quilomboSchema, 'quilombo');