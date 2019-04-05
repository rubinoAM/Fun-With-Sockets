const socket = io('http://localhost:7773');

socket.on('dataFromServer',(fromData)=>{
    console.log(fromData);
    socket.emit('dataToServer', {
        data:'Thank you!'
    });
});

document.querySelector('#msg-form').addEventListener('submit',(e)=>{
    e.preventDefault();
    const newMsg = document.querySelector('#user-msg').value;
    socket.emit('newMsgToServer',{
        text: newMsg,
    });
});

socket.on('msgToClients',(msg)=>{
    //console.log(msg);
    document.querySelector('#messages').innerHTML += `<li>${msg.text}</li>`;
});