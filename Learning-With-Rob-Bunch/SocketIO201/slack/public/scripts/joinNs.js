function joinNs(endpoint){
    nsSocket = io(`http://localhost:7773${endpoint}`);
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

        const topRoom = document.querySelector('.room');
        const topRoomName = topRoom.innerText;
        joinRoom(topRoomName);
    })
    
    nsSocket.on('messageToClients',(msg)=>{
        document.querySelector('#messages').innerHTML += `<li>${msg.text}</li>`
    })

    document.querySelector('#userInput').addEventListener('submit',(e)=>{
        e.preventDefault();
        const newMsg = document.querySelector('#userMessage').value;
        nsSocket.emit('newMsgToServer',{text: newMsg});
    });
}