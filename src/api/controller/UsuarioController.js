import * as Yup from 'yup';
import bcrypt from 'bcryptjs';
import fs from 'fs';
import jwt from 'jsonwebtoken';
import Usuario from '../../domain/model/Usuario';
import chave from '../../core/authority/chave';
import config from '../../core/config';
import { mailtrap } from '../../core/mail';

class UsuarioController {

    async adicionar(req, res) {
        let dados = req.body;

        const schema = Yup.object().shape({
            nome: Yup.string().required(),
            email: Yup.string().email().required(),
            senha: Yup.string().required().min(6),
        });

        if (!(await schema.isValid(dados))) {
            return res.json({
                erro: true,
                codigo: 103,
                mensagem: "Dados invalidos.",
                dados: null
            });
        }

        const emailExistente = await Usuario.findAll({
            where: {
                email: dados.email
            }
        });

        if (emailExistente.length !== 0) {
            return res.status(409).json({
                erro: true,
                codigo: 409,
                mensagem: "Já existe usuário cadastrado com esse email."
            });
        }

        dados.senha = await bcrypt.hash(dados.senha, 6);

        await Usuario.create(
            dados
        ).then(() => {
            return res.status(201).json({
                erro: false,
                codigo: 201,
                mensagem: "Usuário cadastrado ",
            });
        }).catch(() => {
            return res.status(400).json({
                erro: true,
                codigo: 400,
                mensagem: "Erro ao cadastrar usuário.",
            });
        });
    }

    async ativar(req, res) {
        const { id } = req.params;
        let dados = req.body;

        const schema = Yup.object().shape({
            ativo: Yup.boolean(),
        });

        if (!Number(id)) {
            return res.status(400).json({
                erro: true,
                codigo: 400,
                mensagem: "Parâmetro deve ser um valor numérico!"
            });
        }

        if (!(await schema.isValid(dados))) {
            return res.status(400).json({
                erro: true,
                codigo: 400,
                mensagem: "Dados do formulário inválido!"
            });
        };

        const usuarioExiste = await Usuario.findOne({ where: { id: id } });

        if (usuarioExiste === null) {
            return res.status(404).json({
                erro: true,
                codigo: 404,
                mensagem: "Usuário não encontrado!"
            });
        };

        await Usuario.update(dados, {
            where: { id: id }
        }).then(() => {
            return res.status(200).json({
                erro: false,
                codigo: 200,
                mensagem: "Usuário ativado/desativado com sucesso!"
            });
        }).catch((erro) => {
            return res.status(500).json({
                erro: true,
                codigo: 500,
                mensagem: "Erro ao ativar/desativar usuário!"
            });
        });
    }

    async atualizar(req, res) {
        const { id } = req.params;
        let dados = req.body;

        if (!Number(id)) {
            return res.status(400).json({
                erro: true,
                codigo: 400,
                mensagem: "Parâmetro deve ser um valor numérico!"
            });
        }

        const schema = Yup.object().shape({
            nome: Yup.string(),
            email: Yup.string().email(),
            senha: Yup.string().min(6)
        });

        if (!(await schema.isValid(dados))) {
            return res.status(400).json({
                erro: true,
                codigo: 400,
                mensagem: "Dados do formulário inválido!"
            });
        };

        const usuarioExiste = await Usuario.findOne({ where: { id: id } });

        if (usuarioExiste === null) {
            return res.status(404).json({
                erro: true,
                codigo: 404,
                mensagem: "Usuário não encontrado!"
            });
        };

        if (dados.email != usuarioExiste.email) {
            const emailExiste = await Usuario.findOne({ email: dados.email });
            if (emailExiste !== null) {
                return res.status(400).json({
                    erro: true,
                    codigo: 110,
                    mensagem: "Este e-mail já está cadastrado!"
                });
            };
        };

        if (dados.senha) {
            dados.senha = await bcrypt.hash(dados.senha, 8);
        };

        await Usuario.update(dados, {
            where: { id: id }
        }).then(() => {
            return res.status(200).json({
                erro: false,
                codigo: 200,
                mensagem: "Usuário alterado com sucesso!"
            });
        }).catch((erro) => {
            return res.status(500).json({
                erro: true,
                codigo: 500,
                mensagem: "Erro ao alterar usuário!"
            });
        });
    };

    async atualizarSenhaRecuperada(req, res) {
        let dados = req.body;

        const schema = Yup.object().shape({
            id: Yup.number().required(),
            recuperarSenha: Yup.string().required(),
            senha: Yup.string().required().min(6)
        });

        if (!(await schema.isValid(dados))) {
            return res.status(400).json({
                error: true,
                code: 101,
                messsage: "Dados inválidos!"
            });
        };

        const usuarioExiste = await Usuario.findOne({ where: { id: dados.id } });

        if (usuarioExiste === null) {
            return res.status(404).json({
                erro: true,
                codigo: 404,
                mensagem: "Usuário não encontrado!"
            });
        };

        const validarChave = await Usuario.findOne({
            attributes: ['id'],
            where: { recuperarSenha: dados.recuperarSenha }
        });


        if (validarChave === null) {
            return res.status(400).json({
                error: true,
                code: 400,
                mensagem: "Senha solicitada inválida, recomendamos solicitar uma nova recuperação!"
            })
        }


        if (dados.senha) {
            dados.senha = await bcrypt.hash(dados.senha, 8);
        };

        await Usuario.update(
            { senha: dados.senha, recuperarSenha: null },
            { where: { id: dados.id } }
        ).then(() => {
            return res.status(200).json({
                erro: false,
                codigo: 200,
                mensagem: "Senha alterada com sucesso!"
            });
        }).catch((erro) => {
            return res.status(500).json({
                erro: true,
                codigo: 500,
                mensagem: "Erro ao alterar a senha!"
            });
        });
    };

    async atualizarPerfil(req, res) {

        await sleep(3000);

        function sleep(ms) {
            return new Promise((resolve) => {
                setTimeout(resolve, ms);
            });
        }

        const schema = Yup.object().shape({
            nome: Yup.string(),
            email: Yup.string()
                .email(),
            senha: Yup.string()
                .min(6)
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({
                erro: true,
                codigo: 108,
                mensagem: "Dados do formulário inválido!"
            });
        };

        const { email } = req.body;

        const usuarioExiste = await Usuario.findOne({ _id: req.usuarioId });

        if (!usuarioExiste) {
            return res.status(404).json({
                erro: true,
                codigo: 109,
                mensagem: "Usuário não encontrado!"
            });
        };

        if (email != usuarioExiste.email) {
            const emailExiste = await Usuario.findOne({ email });
            if (emailExiste) {
                return res.status(400).json({
                    erro: true,
                    codigo: 110,
                    mensagem: "Este e-mail já está cadastrado!"
                });
            };
        };

        let dados = req.body;
        if (dados.senha) {
            dados.senha = await bcrypt.hash(dados.senha, 8);
        };

        await Usuario.updateOne({ _id: req.usuarioId }, dados, (err) => {
            if (err) return res.status(400).json({
                erro: true,
                codigo: 116,
                mensagem: "Erro ao atualizar usuário!"
            });

            return res.json({
                erro: false,
                mensagem: "Usuário editado com sucesso!"
            });
        });
    };

    async atualizarFotoPerfil(req, res) {
        //Apenas para teste
        await sleep(3000);

        function sleep(ms) {
            return new Promise((resolve) => {
                setTimeout(resolve, ms);
            });
        }
        if (!req.file) {
            return res.status(400).json({
                erro: true,
                codigo: 129,
                mensagem: "Selecione uma imagem válida JPEG ou PNG!"
            });
        };

        const dadosImagem = {
            //originalName: req.file.originalname,
            foto: req.file.filename
        }
        await Usuario.findOne({ _id: req.usuarioId }, '_id foto').then((usuario) => {
            req.dadosImgUser = usuario.foto;
        }).catch((err) => {
            return res.status(400).json({
                erro: true,
                codigo: 128,
                mensagem: "Não foi possível recuperar a imagem que está salva!"
            })
        })

        await Usuario.updateOne({ _id: req.usuarioId }, dadosImagem, (err) => {
            if (err) return res.status(400).json({
                erro: true,
                codigo: 129,
                mensagem: "Erro ao alterar a imagem do perfil!"
            });
        });

        const imgAntiga = req.file.destination + "/" + req.dadosImgUser;

        fs.access(imgAntiga, (err) => {
            if (!err) {
                fs.unlink(imgAntiga, err => {
                    //Msg de imagem excluida sucesso
                })
            }
        })

        return res.json({
            erro: false,
            mensagem: "Imagem do perfil editado com sucesso!"
        });
    }

    async buscar(req, res) {
        //Apenas para teste
        await sleep(3000);

        function sleep(ms) {
            return new Promise((resolve) => {
                setTimeout(resolve, ms);
            });
        }

        Usuario.findOne({ _id: req.params.id }, '_id id nome email ativo createdAt updatedAt').then((usuario) => {
            if (!usuario) {
                return res.status(404).json({ erro: true, codigo: 104, mensagem: "Usuário não encontrado!" });
            };

            return res.status(200).json({ erro: false, usuario: usuario });

        }).catch((err) => {
            return res.status(400).json({
                erro: true,
                codigo: 107,
                mensagem: "Erro ao buscar o usuário!"
            })
        });
    };

    async pesquisar(req, res) {
        //Apenas para teste
        await sleep(3000);

        function sleep(ms) {
            return new Promise((resolve) => {
                setTimeout(resolve, ms);
            });
        }
        const { nome, email } = req.query;

        //console.log(req.query);

        const parametros = {};
        nome && nome !== null ? parametros['nome'] = { $regex: new RegExp(`^${nome}`, "i") } : '';
        email && email !== null ? parametros['email'] = { $regex: new RegExp(`^${email}`, "i") } : '';

        //console.log(parametros);

        Usuario.find(parametros, '_id id nome email ativo createdAt updatedAt').then((usuarios) => {
            if (!usuarios) {
                return res.status(404).json({ erro: true, codigo: 104, mensagem: "Usuário não encontrado!" });
            };

            return res.status(200).json({ erro: false, usuarios: usuarios });

        }).catch((err) => {
            return res.status(400).json({
                erro: true,
                codigo: 150,
                mensagem: "Erro ao pesquisar o usuário!"
            })
        });
    };

    async publicarFotos(req, res) {
        //Apenas para teste
        await sleep(3000);

        function sleep(ms) {
            return new Promise((resolve) => {
                setTimeout(resolve, ms);
            });
        }

        Usuario.findOne({ _id: req.usuarioId }, '_id nome email createdAt updatedAt foto').then((usuario) => {
            var url = config.url + "/fotos/usuario/" + usuario.foto;
            return res.json({
                erro: false,
                usuario: usuario,
                url: usuario.foto ? url : null
            });
        }).catch((erro) => {
            return res.status(404).json({
                erro: true,
                codigo: 115,
                mensagem: "Usuário não encontrado!"
            });
        });
    };

    async listar(req, res) {
        await Usuario.findAll({
            attributes: ['id', 'nome', 'email', 'recuperarSenha']
        }).then((usuarios) => {
            return res.status(200).json({
                erro: false,
                codigo: 200,
                usuarios: usuarios
            });
        }).catch((erro) => {
            return res.status(500).json({
                erro: true,
                codigo: 500,
                mensagem: "Não foi possível listar os usuário!"
            });
        });
    };

    async login(req, res) {
        const { email, senha } = req.body;

        const usuarioExiste = await Usuario.findOne({ where: { email: email, ativo: true } });

        if (usuarioExiste === null) {
            return res.status(404).json({
                error: true,
                codigo: 404,
                mensagem: "Usuário não encontrado, ou usuário está desativado!"
            });
        }


        if (!(await bcrypt.compare(senha, usuarioExiste.senha))) {
            return res.status(401).json({
                error: true,
                codigo: 401,
                mensagem: "Senha inválida!"
            });
        }

        return res.status(200).json({
            usuario: {
                id: usuarioExiste.id,
                nome: usuarioExiste.nome,
                email: usuarioExiste.email
            },
            token: jwt.sign({ id: usuarioExiste.id }, chave.chaveSecreta, { expiresIn: chave.expiraEm }),
        });
    }

    async remover(req, res) {
        //Apenas para teste
        await sleep(3000);

        function sleep(ms) {
            return new Promise((resolve) => {
                setTimeout(resolve, ms);
            });
        }

        const usuarioExiste = await Usuario.findOne({ _id: req.params.id });

        if (!usuarioExiste) {
            return res.status(404).json({ erro: true, codigo: 104, mensagem: "Usuário não encontrado!" });
        };

        await Usuario.deleteOne({ _id: req.params.id }, (err) => {
            if (err) { return res.status(400).json({ erro: true, codigo: 105, mensagem: "Não foi possível apagar usuário!" }); }
        });

        return res.status(200).json({ erro: false, mensagem: "Usuário apagado com sucesso!" });
    }

    async recuperarSenha(req, res) {
        let dados = req.body;

        const schema = Yup.object().shape({
            email: Yup.string().required()
        });

        if (!(await schema.isValid(dados))) {
            return res.json({
                erro: true,
                codigo: 101,
                messsage: "Dados inválidos!"
            });
        };

        const emailExiste = await Usuario.findOne({ where: { email: dados.email, ativo: true } });


        if (emailExiste === null) {
            return res.status(404).json({
                erro: true,
                codigo: 404,
                mensagem: "Nenhum usuário encontrado com esse e-mail, ou este usuário está desativado!"
            });
        };

        dados.recuperarSenha = Math.random().toString(36).substr(3, 10);
        dados.nome = emailExiste.nome;

        await Usuario.update(dados, {
            where: { email: dados.email }
        }).then(() => {
            let mensagem = {
                from: "geverson@gmail.com",
                to: "geverson@gmail.com",
                subject: "API Node JS - Recuperação de Senha",
                text: `${emailExiste.nome} solicitação de recuperação de senha, recomendamos troca-lá logo após o primeiro login. Sua senha provisória senha é: ${dados.recuperarSenha}`,
                html: `Segue o link para trocar a senha<br><a href="http://localhost:3000/api-node/nova-senha/${dados.recuperarSenha}">Clique aqui.</a>`
            };

            mailtrap.sendMail(mensagem, (retorno) => {
                if (retorno) {
                    return res.status(500).json({
                        erro: true,
                        codigo: 500,
                        mensagem: "Erro ao enviar a senha de recuperação da conta!"
                    });
                } else {
                    return res.status(200).json({
                        erro: false,
                        codigo: 200,
                        mensagem: "Enviado no e-mail as intruções para recuperar a senha, verifique sua caixa de entrada!"
                    });
                }
            });
        }).catch((erro) => {
            return res.status(500).json({
                erro: true,
                codigo: 500,
                mensagem: "Houve um erro na solicitação de senha realizada com sucesso!"
            });
        });
    }

    async validacaoRecuperarSenha(req, res) {
        const { recuperarSenha } = req.params;

        const usuarioValidacaoRecuperarSenha = await Usuario.findOne({
            attributes: ['id', 'nome', 'email', 'recuperarSenha'],
            where: { recuperarSenha }
        });

        if (usuarioValidacaoRecuperarSenha === null) {
            return res.status(404).json({
                erro: true,
                codigo: 404,
                mensagem: "Senha recuperada inválida, recomendamos fazer uma nova solicitação!"
            });
        };

        return res.status(200).json({
            erro: false,
            codigo: 200,
            usuario: usuarioValidacaoRecuperarSenha
        });
    }

    async visualizarPerfil(req, res) {
        //Apenas para teste
        await sleep(3000);

        function sleep(ms) {
            return new Promise((resolve) => {
                setTimeout(resolve, ms);
            });
        }

        Usuario.findOne({ _id: req.usuarioId }, '_id nome email createdAt updatedAt foto').then((usuario) => {
            var url = config.url + "/imagens/usuarios/";
            if (usuario.foto) {
                url += usuario.foto;
            } else {
                url += "icone_usuario.png";
            }
            const { _id, nome, email, createdAt, updatedAt, foto } = usuario;
            return res.status(200).json({
                erro: false,
                usuario: { _id, nome, email, createdAt, updatedAt, foto, url: url },
                token: jwt.sign({ id: req.usuarioId }, chave.chaveSecreta, { expiresIn: chave.expiraEm }),
            });
        }).catch((erro) => {
            return res.status(404).json({
                erro: true,
                codigo: 115,
                mensagem: "Perfil não encontrado!"
            });
        });
    }
}

export default new UsuarioController();