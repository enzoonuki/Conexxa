const Usuario = require('../models/Usuario');

class UsuarioController {
    async criarUsuario(req, res) {
        try {
            const usuario = new Usuario(req.body);
            await usuario.save();
            res.status(201).json(usuario);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async listarUsuarios(req, res) {
        try {
            const usuarios = await Usuario.find();
            res.status(200).json(usuarios);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = UsuarioController;

// Teste no console
(async () => {
    const usuarioController = new UsuarioController();
    // Simulando a criação de um usuário
    await usuarioController.criarUsuario({ body: { nomeCompleto: 'Enzo', email: 'eo228424@unisanta.br', curso: "Sistemas de Informação", periodo: "noite", senha: "Teste123" } }, { status: (code) => ({ json: (data) => console.log(code, data) }) });
    // Simulando a listagem de usuários
    await usuarioController.listarUsuarios({}, { status: (code) => ({ json: (data) => console.log(code, data) }) });
})();