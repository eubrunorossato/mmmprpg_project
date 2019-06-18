/* importando o mongo DB */

var mongo = require('mongodb')



var comMongo = function(){
    console.log('instancia criada')
    var db = new mongo.Db(
        'got',
        new mongo.Server(
            'localhost',
            27017,
            {}
        ),
        {}
    )
    return db;
}

module.exports = function(){
    return comMongo;
}