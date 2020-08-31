let socket = io()

let btnSend = $('#btnSend')
let inpMsg = $('#inpMsg')
let ulMsgList = $('#ulMsgList')

btnSend.click(()=>{
    let x = inpMsg.val()
    console.log('here')
    socket.emit('msg_send',{
        msg:inpMsg.val() 
    })
    inpMsg.val(' ') 
})

socket.on('msg_rcvd',(data)=>{
    console.log('script.js Recieved')
    let chatitem = $('<li>',
    {
        'class':'list-group-item',
        text:data.msg
    })
    ulMsgList.append(chatitem)
})