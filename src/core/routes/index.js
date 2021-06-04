import { Router } from 'express';
import autenticacao from '../middlewares/autenticacao';
import enviarFotosUsuario from '../middlewares/enviarFotosUsuario';
import UsuarioController from '../../api/controller/UsuarioController';
import multer from 'multer';

const routes = new Router();
const enviandoFotoUsuario = multer(enviarFotosUsuario);

routes.get('/', (req, res) => {
    res.send("Sistema de Atendimento ao Cliente - SAC");
});
//Autorização de todas requisições
routes.post('/usuarios/login', UsuarioController.login);
//Criar conta sem autorização
routes.post('/usuarios/criar-conta', UsuarioController.adicionar);
//Recuperar senha
routes.put('/usuarios/nova-senha', UsuarioController.atualizarSenhaRecuperada);
routes.put('/usuarios/recuperar-senha', UsuarioController.recuperarSenha);
routes.get('/usuarios/recuperar-senha/:recuperarSenha', UsuarioController.validacaoRecuperarSenha);
//Usuário Logado
routes.get('/usuarios/perfil', autenticacao, UsuarioController.visualizarPerfil);
routes.put('/usuarios/perfil', autenticacao, UsuarioController.atualizarPerfil);
routes.put('/usuarios/perfil-imagem', autenticacao, enviandoFotoUsuario.single('foto'), UsuarioController.atualizarFotoPerfil);
//CRUD Usuário
routes.delete('/usuarios/:id', autenticacao, UsuarioController.remover);
routes.get('/usuarios/fotos', autenticacao, UsuarioController.publicarFotos);
routes.get('/usuarios', autenticacao, UsuarioController.listar);
routes.get('/usuarios/pesquisar', autenticacao, UsuarioController.pesquisar);
routes.get('/usuarios/:id', autenticacao, UsuarioController.buscar);
routes.post('/usuarios', autenticacao, UsuarioController.adicionar);
routes.put('/usuarios/:id', autenticacao, UsuarioController.atualizar);
routes.put('/usuarios/ativar/:id', autenticacao, UsuarioController.ativar);

export default routes;
