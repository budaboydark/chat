var server = require('./config/server')
var serverApp = server.listen(8081, () => {
    console.log('servidor conectado')
})

var io = require('socket.io').listen(serverApp)
server.set('io',io)

io.on('connection', (socket) => {
    console.log('usuario conectou')
    socket.on('disconnect', ()=>{
        console.log('usuário desconectou')
    })

    socket.on('msgParaServidor', (data) => {
        socket.emit('msgParaCliente', 
        {
            apelido:data.apelido,
            mensagem: data.mensagem
        }
        )

        socket.broadcast.emit('msgParaCliente', 
        {
            apelido:data.apelido,
            mensagem: data.mensagem
        }
        )

        if(parseInt(data.apelido_atualizado) == 0){
            socket.emit('participantesParaCliente', 
                {apelido:data.apelido}
            )
            socket.broadcast.emit('participantesParaCliente', 
                {
                    apelido:data.apelido
                }
            )
        }


    })
})