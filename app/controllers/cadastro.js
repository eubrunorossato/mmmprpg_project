module.exports.cadastro = function(application, req, res){
    res.render('cadastro', { validacao: {}, dadosForm: {} });
}

module.exports.cadastrar = function(application, req, res){
    
    var dadosForm = req.body;

    req.assert('nome', 'Nome não pode ser vazio').notEmpty();
    req.assert('usuario', 'Usuário não pode ser vazio').notEmpty();
    req.assert('senha', 'Senha não pode ser vazia').notEmpty();
    req.assert('senha', 'Senha precisa ter entre 5 e 15 caracteres').isLength({ min: 5, max:15 });
    req.assert('casa', 'Casa não pode ser vazia').notEmpty();
    
    var erros = req.validationErrors();

    if(erros){
        res.render('cadastro', { validacao: erros, dadosForm: dadosForm });
        return;
    }

    var connection = application.config.mongoConfig;

    var usuariosDAO = new application.app.models.usuariosDAO(connection)

    usuariosDAO.inserirCadastro(dadosForm)

    res.send('podemos cadastrar');

}