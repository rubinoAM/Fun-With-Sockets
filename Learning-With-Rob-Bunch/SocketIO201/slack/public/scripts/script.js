const socket = io('http://localhost:7773'); //Root endpoint- '/'

//Main Connection
socket.on('connect',(msg)=>{
    console.log(msg);
})

socket.on('nsList',(nsData)=>{
    //console.log("ARRIVAL")
    let namespacesDiv = document.querySelector('.namespaces');
    namespacesDiv.innerHTML = "";
    nsData.forEach((ns)=>{
        namespacesDiv.innerHTML += `<div class="namespace" ns="${ns.endpoint}"><img src="${ns.img}" /></div>`
    })

    Array.from(document.getElementsByClassName('namespace')).forEach((elem)=>{
        elem.addEventListener('click',(e)=>{
            const nsEndpoint = elem.getAttribute('ns');
            console.log(`${nsEndpoint} CLICKED`)
        })
    })
})

socket.on('dataFromServer',(fromData)=>{
    socket.emit('dataToServer', {data:'Thank you!'});
});

document.querySelector('#msg-form').addEventListener('submit',(e)=>{
    e.preventDefault();
    const newMsg = document.querySelector('#user-msg').value;
    socket.emit('newMsgToServer',{text: newMsg});
});

socket.on('messageToClients',(msg)=>{
    document.querySelector('#messages').innerHTML += `<li>${msg.text}</li>`
})