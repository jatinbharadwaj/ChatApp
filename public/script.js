let socket = io()

let btnSend = $('#btnSend')
let inpMsg = $('#inpMsg')
let ulMsgList = $('#ulMsgList')
let user = $('#User')
let loginBox = $('#loginBox')
let chatBox = $('#chatBox')
let btnStart = $('#btnStart')
let inpUsername = $('#inpUsername')
let inpPassword = $('#inpPassword')
let inpToUser = $('#inpToUser')

loginBox.show()
chatBox.hide()

btnStart.click(()=>{
    console.log('btnStart')
    socket.emit('login',{
        username:inpUsername.val(),
        password:inpPassword.val()
    })
})

socket.on('logged_in',(data)=>{
    loginBox.hide()
    chatBox.show()
    
    let useritem = $('<li>',
    {
        'class':'list-group-item col-4',
        text:`Hello ${inpUsername.val()} !!`
    })
    user.append(useritem)
})

socket.on('login_failed',()=>{
    window.alert('Username or Password Incorrect!')
})


btnSend.click(()=>{
    socket.emit('msg_send',{
        to:inpToUser.val(),
        msg:inpMsg.val()
    })
    console.log(inpMsg.val())
    inpMsg.val('')
})

socket.on('msg_rcvd',(data)=>{
    console.log('script.js Recieved')
    let chatitem = $('<li>',
    {
        'class':'list-group-item',
        text:`From (${data.from}) : ${data.msg}`
    })
    ulMsgList.append(chatitem)
})