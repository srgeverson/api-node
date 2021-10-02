import * as Yup from 'yup';
import bcrypt from 'bcryptjs';
import Funcionalidade from '../../domain/model/Funcionalidade';

class FuncionalidadeController {

    // async adicionar(req, res) {
    //     //Apenas para teste
    //     await sleep(3000);

    //     function sleep(ms) {
    //         return new Promise((resolve) => {
    //             setTimeout(resolve, ms);
    //         });
    //     }

    //     const emailExistente = await Usuario.findOne({ email: req.body.email });
    //     if (emailExistente) {
    //         return res.json({ erro: true, codigo: 102, mensagem: "Já existe usuário cadastrado com esse email.", dados: null });
    //     }

    //     const schema = Yup.object().shape({
    //         nome: Yup.string().required(),
    //         email: Yup.string().email().required(),
    //         senha: Yup.string().required().min(6),
    //         ativo: Yup.boolean().required(),
    //     });

    //     var dados = req.body;
    //     dados.senha = await bcrypt.hash(dados.senha, 6);
    //     console.log('Cheguei aqui...');
    //     console.log(req.body);

    //     if (!(await schema.isValid(req.body))) {
    //         return res.json({ erro: true, codigo: 103, mensagem: "Dados invalidos.", dados: null });
    //     }
    //     const usuario = await Usuario.create(req.body, (err, small) => {
    //         return err ?
    //             res.json({ erro: true, codigo: 101, mensagem: "Erro ao cadastrar usuário.", dados: null })
    //             :
    //             res.status(201).json({ erro: false, codigo: null, mensagem: "Usuário cadastrado com sucesso!", dados: usuario });
    //     });
    // }

    // async ativar(req, res) {
    //     //Apenas para teste
    //     await sleep(3000);

    //     function sleep(ms) {
    //         return new Promise((resolve) => {
    //             setTimeout(resolve, ms);
    //         });
    //     }

    //     const schema = Yup.object().shape({
    //         ativo: Yup.boolean(),
    //     });

    //     if (!(await schema.isValid(req.body))) {
    //         return res.status(400).json({
    //             erro: true,
    //             codigo: 108,
    //             mensagem: "Dados do formulário inválido!"
    //         });
    //     };

    //     const usuarioExiste = await Usuario.findOne({ _id: req.params.id });

    //     if (!usuarioExiste) {
    //         return res.status(400).json({
    //             erro: true,
    //             codigo: 109,
    //             mensagem: "Usuário não encontrado!"
    //         });
    //     };

    //     var dados = req.body;

    //     await Usuario.updateOne({ _id: req.params.id }, dados, (err) => {
    //         if (err) return res.status(400).json({
    //             erro: true,
    //             codigo: 111,
    //             mensagem: "Erro ao ativar/desativar usuário!"
    //         });

    //         return res.json({
    //             erro: false,
    //             mensagem: "Usuário ativado/desativado com sucesso!"
    //         });
    //     });
    // };

    // async atualizar(req, res) {
    //     await sleep(3000);

    //     function sleep(ms) {
    //         return new Promise((resolve) => {
    //             setTimeout(resolve, ms);
    //         });
    //     }

    //     const schema = Yup.object().shape({
    //         nome: Yup.string(),
    //         email: Yup.string()
    //             .email(),
    //         senha: Yup.string()
    //             .min(6)
    //     });

    //     if (!(await schema.isValid(req.body))) {
    //         return res.status(400).json({
    //             erro: true,
    //             codigo: 108,
    //             mensagem: "Dados do formulário inválido!"
    //         });
    //     };

    //     const { email } = req.body;

    //     const usuarioExiste = await Usuario.findOne({ _id: req.params.id });

    //     if (!usuarioExiste) {
    //         return res.status(400).json({
    //             erro: true,
    //             codigo: 109,
    //             mensagem: "Usuário não encontrado!"
    //         });
    //     };

    //     if (email != usuarioExiste.email) {
    //         const emailExiste = await Usuario.findOne({ email });
    //         if (emailExiste) {
    //             return res.status(400).json({
    //                 erro: true,
    //                 codigo: 110,
    //                 mensagem: "Este e-mail já está cadastrado!"
    //             });
    //         };
    //     };

    //     var dados = req.body;
    //     if (dados.senha) {
    //         dados.senha = await bcrypt.hash(dados.senha, 8);
    //     };

    //     await Usuario.updateOne({ _id: dados._id }, dados, (err) => {
    //         if (err) return res.status(400).json({
    //             erro: true,
    //             codigo: 111,
    //             mensagem: "Erro ao atualizar usuário!"
    //         });

    //         return res.json({
    //             erro: false,
    //             mensagem: "Usuário atualizado com sucesso!"
    //         });
    //     });
    // };

    // async buscar(req, res) {
    //     //Apenas para teste
    //     await sleep(3000);

    //     function sleep(ms) {
    //         return new Promise((resolve) => {
    //             setTimeout(resolve, ms);
    //         });
    //     }

    //     Usuario.findOne({ _id: req.params.id }, '_id id nome email ativo createdAt updatedAt').then((usuario) => {
    //         if (!usuario) {
    //             return res.status(404).json({ erro: true, codigo: 104, mensagem: "Usuário não encontrado!" });
    //         };

    //         return res.status(200).json({ erro: false, usuario: usuario });

    //     }).catch((err) => {
    //         return res.status(400).json({
    //             erro: true,
    //             codigo: 107,
    //             mensagem: "Erro ao buscar o usuário!"
    //         })
    //     });
    // };

    // async pesquisar(req, res) {
    //     //Apenas para teste
    //     await sleep(3000);

    //     function sleep(ms) {
    //         return new Promise((resolve) => {
    //             setTimeout(resolve, ms);
    //         });
    //     }
    //     const { nome, email } = req.query;

    //     //console.log(req.query);

    //     const parametros = {};
    //     nome && nome !== null ? parametros['nome'] = { $regex: new RegExp(`^${nome}`, "i") } : '';
    //     email && email !== null ? parametros['email'] = { $regex: new RegExp(`^${email}`, "i") } : '';

    //     //console.log(parametros);

    //     Usuario.find(parametros, '_id id nome email ativo createdAt updatedAt').then((usuarios) => {
    //         if (!usuarios) {
    //             return res.status(404).json({ erro: true, codigo: 104, mensagem: "Usuário não encontrado!" });
    //         };

    //         return res.status(200).json({ erro: false, usuarios: usuarios });

    //     }).catch((err) => {
    //         return res.status(400).json({
    //             erro: true,
    //             codigo: 150,
    //             mensagem: "Erro ao pesquisar o usuário!"
    //         })
    //     });
    // };

    async listar(req, res) {
        //Apenas para teste
        // await sleep(3000);

        // function sleep(ms) {
        //     return new Promise((resolve) => {
        //         setTimeout(resolve, ms);
        //     });
        // }

        await Funcionalidade.findAll(
            { order: [['id', 'DESC']] }
        ).then((funcionalidades) => {
            return res.json({ funcionalidades });
        }).catch((erro) => {
            return res.status(400).json({
                erro: true,
                codigo: 106,
                mensagem: "Não foi possível executar a solicitação!"
            });
        });
    };

    // async remover(req, res) {
    //     //Apenas para teste
    //     await sleep(3000);

    //     function sleep(ms) {
    //         return new Promise((resolve) => {
    //             setTimeout(resolve, ms);
    //         });
    //     }

    //     const usuarioExiste = await Usuario.findOne({ _id: req.params.id });

    //     if (!usuarioExiste) {
    //         return res.status(404).json({ erro: true, codigo: 104, mensagem: "Usuário não encontrado!" });
    //     };

    //     await Usuario.deleteOne({ _id: req.params.id }, (err) => {
    //         if (err) { return res.status(400).json({ erro: true, codigo: 105, mensagem: "Não foi possível apagar usuário!" }); }
    //     });

    //     return res.status(200).json({ erro: false, mensagem: "Usuário apagado com sucesso!" });
    // };
}

export default new FuncionalidadeController();