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
    
    nsSocket.on('msgToClients',(msg)=>{
        const newMsg = buildHTMLMsg(msg);
        console.log(newMsg);
        document.querySelector('#messages').innerHTML += newMsg;
    })

    document.querySelector('#userInput').addEventListener('submit',(e)=>{
        e.preventDefault();
        const newMsg = document.querySelector('#userMessage').value;
        nsSocket.emit('newMsgToServer',newMsg);
    });
}

function buildHTMLMsg(msg){
    const convertedDate = new Date(msg.time).toLocaleString();
    console.log(msg);
    const newHTML = `<li>
                        <div class="user-image"><img src="${msg.avatar}" /></div>
                        <div class="user-message">
                            <div class="user-name-time">${msg.username} <span>${convertedDate}</span></div>
                            <div class="message-text">${msg.text}</div>
                        </div>
                    </li>`;
    return newHTML;
}