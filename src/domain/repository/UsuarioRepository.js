import Usuario from '../model/Usuario';

class UsuarioRepository {

    async buscarUsuarioPorEmail(email) {
        return await Usuario.findAll({
            where: {
                email: email
            }
        });
    }

    async buscarUsuarioPorId(id) {
        return await Usuario.findAll({
            where: {
                id: id
            }
        });
    }

    async salvarUsuario(usuario) {
        await Usuario.create(
            usuario
        ).then(() => {
            return {
                codigo: 201,
            }
        }).catch(() => {
            return {
                codigo: 500,
            }
        });
    }
}

export default new UsuarioRepository();