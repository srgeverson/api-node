import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import chave from '../authority/chave';

export default async (req, res, next) => {
    const authorizationHeader = req.headers.authorization;

    if (!authorizationHeader) {
        return res.status(404).json({ erro: true, codigo: 130, mensagem: "Token não encontrado!" });
    }

    const [bearer, token] = authorizationHeader.split(' ');

    try {
        const decoded = await promisify(jwt.verify)(token, chave.chaveSecreta);
        req.usuarioId = decoded.id;
        return next();

    } catch (err) {
        return res.status(401).json({ erro: true, codigo: 130, mensagem: "Token inválido!" });
    }
}