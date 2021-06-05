import * as Yup from 'yup';
import bcrypt from 'bcryptjs';
import fs from 'fs';
import jwt from 'jsonwebtoken';
import UsuarioRepository from '../repository/UsuarioRepository';
import chave from '../../core/authority/chave';
import config from '../../core/config';
import { gmail, mailtrap } from '../../core/mail';

class UsuarioService {

    async salvar(usuario) {
        const schema = Yup.object().shape({
            nome: Yup.string().required(),
            email: Yup.string().email().required(),
            senha: Yup.string().required().min(6),
        });

        // if (!(await schema.isValid(usuario))) {
        //     return {
        //         codigo: 400,
        //     };
        // }

        // const emailExistente = UsuarioRepository.buscarUsuarioPorEmail(usuario.email);

        // if (emailExistente.length !== 0) {
        //     return {
        //         codigo: 409,
        //     };
        // }

        // usuario.senha = await bcrypt.hash(usuario.senha, 6);

        // return UsuarioRepository.salvarUsuario(usuario);
    }
}

export default new UsuarioService();