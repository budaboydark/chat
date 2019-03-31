var express = require('express')
var consign = require('consign')
var bodyParser = require('body-parser')
var expressValidator = require('express-validator')
var server = express()

server.set('view engine', 'ejs')
server.set('views','./app/views')
server.use(express.static('./app/public'))
server.use(bodyParser.urlencoded({extended: true}))
server.use(expressValidator())

/* configurando autoload do projeto */

consign()
    .include('app/routes')
    .then('app/models')
    .then('app/controllers')
    .into(server)

module.exports = server
