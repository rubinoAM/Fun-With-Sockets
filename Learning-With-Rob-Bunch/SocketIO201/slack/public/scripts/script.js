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
        })
    })

    const nsSocket = io('http://localhost:7773/wiki');
    nsSocket.on('nsRoomLoad',(nsRooms)=>{
        let roomList = document.querySelector('.room-list');
        roomList.innerHTML = "";
        nsRooms.forEach((room)=>{
            let glyph;
            if(room.privateRoom){
                glyph = 'lock';
            } else {
                glyph = 'globe';
            }

            roomList.innerHTML += `<li class="room"><span class="glyphicon glyphicon-${glyph}"></span>${room.title}</li>`;
        })

        Array.from(document.getElementsByClassName('room')).forEach((elem)=>{
            elem.addEventListener('click',(e)=>{
                console.log("MEOW")
            })
        });
    })
})

socket.on('dataFromServer',(fromData)=>{
    socket.emit('dataToServer', {data:'Thank you!'});
});

document.querySelector('#userInput').addEventListener('submit',(e)=>{
    e.preventDefault();
    const newMsg = document.querySelector('#userMessage').value;
    socket.emit('newMsgToServer',{text: newMsg});
});

socket.on('messageToClients',(msg)=>{
    document.querySelector('#messages').innerHTML += `<li>${msg.text}</li>`
})