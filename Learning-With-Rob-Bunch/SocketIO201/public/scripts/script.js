const socket = io('http://localhost:7773'); //Root endpoint- '/'
const socket2 = io('http://localhost:7773/admin'); //Endpoint- '/admin'

socket.on('connect',()=>{
    console.log(socket.id);
})

socket2.on('connect',()=>{
    console.log(socket2.id);
})

socket.on('dataFromServer',(fromData)=>{
    socket.emit('dataToServer', {data:'Thank you!'});
});

document.querySelector('#msg-form').addEventListener('submit',(e)=>{
    e.preventDefault();
    const newMsg = document.querySelector('#user-msg').value;
    socket.emit('newMsgToServer',{text: newMsg});
});

socket.on('msgToClients',(msg)=>{
    document.querySelector('#messages').innerHTML += `<li>${msg.text}</li>`;
});