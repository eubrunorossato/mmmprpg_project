module.exports.index = function(application, req, res){
    res.render('index', { validacao: {} });
}

module.exports.autenticar = function(application, req, res){

    var dadosForm = req.body;

    req.assert('usuario', 'usuario nao pode ser vazio').notEmpty();
    req.assert('senha', 'senha nao pode ser vazia').notEmpty();

    var error = req.validationErrors();

    if(error){
        res.render('index', { validacao : error });
        return
    }else{
        var connection = application.config.mongoConfig

        var usuariosDAO = new application.app.models.usuariosDAO(connection)

        usuariosDAO.verificarLogin(dadosForm, req,res);

    }

}