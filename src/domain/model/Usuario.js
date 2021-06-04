import mongoose from 'mongoose';

const Usuario = new mongoose.Schema({
    id: {
        type: Number,
    },
    nome: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    senha: {
        type: String,
        required: true
    },
    recuperarSenha: {
        type: String
    },
    ativo: {
        type: Boolean,
        required: true
    },
    foto: {
        type: String,
    }
}, { timestamps: true });

export default mongoose.model('usuario', Usuario);