function usuariosDAO(connection){
    this._connection = connection();
}

usuariosDAO.prototype.inserirCadastro = function(usuario){
    this._connection.open( function(err, mongocliente){
        mongocliente.collection("usuarios", function(err, collection){
            collection.insert(usuario)

            mongocliente.close();
        })
    })
}

usuariosDAO.prototype.verificarLogin = function(usuario, req,res){
    this._connection.open( function(err, mongocliente){
        mongocliente.collection("usuarios", function(err, collection){
            collection.find(usuario).toArray(function(error, result){
                
                if (result[0] != undefined){
                    req.session.autorizado = true;
                    req.session.usuario = result[0].usuario;
                    req.session.casa = result[0].casa;
                }
 
                if(req.session.autorizado){
                    res.redirect('jogo')
                }else{
                    var autenticacao = 'Usuario ou senha incorretos';
                    res.render('index', { validacao: {}, autenticacao });
                }

            })

            mongocliente.close();
        })
    })
}

module.exports = function(){
    return usuariosDAO;
}