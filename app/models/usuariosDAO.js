function usuariosDAO(connection){
    this._connection = connection();
}

usuariosDAO.prototype.inserirCadastro = function(usuario){
    this._connection.open( function(err, mongocliente){
        mongocliente.collection("usuarios", function(err, collection){
            collection.insert(usuario)
        })
    })
}
module.exports = function(){
    return usuariosDAO;
}