const socket = io('http://localhost:7773'); //Root endpoint- '/'
const socket2 = io('http://localhost:7773/admin'); //Endpoint- '/admin'

//Main Connection
socket.on('dataFromServer',(fromData)=>{
    socket.emit('dataToServer', {data:'Thank you!'});
});

socket.on('joined',(msg)=>{
    console.log(msg);
})

//Client Socket for /admin
socket2.on('welcome',(fromData)=>{
    console.log(fromData);
})

//Submit Text to Chat
document.querySelector('#msg-form').addEventListener('submit',(e)=>{
    e.preventDefault();
    const newMsg = document.querySelector('#user-msg').value;
    socket.emit('newMsgToServer',{text: newMsg});
});