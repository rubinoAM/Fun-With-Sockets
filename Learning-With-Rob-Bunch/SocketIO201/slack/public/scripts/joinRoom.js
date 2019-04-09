function joinRoom(roomName){
    nsSocket.emit('joinRoom',roomName,(newNumberOfMembers)=>{
        //Update room member total
        document.querySelector('.curr-room-num-users').innerHTML = `${newNumberOfMembers} <span class="glyphicon glyphicon-user"></span>`;
    });

    nsSocket.on('historyUpdate',(history)=>{
        const messagesUl = document.querySelector('#messages');
        messagesUl.innerHTML = "";
        history.forEach((msg)=>{
            const newMsg = buildHTMLMsg(msg);
            const curMsgs = messagesUl.innerHTML;
            messagesUl.innerHTML = curMsgs + newMsg;
        })

        messagesUl.scrollTo(0,messagesUl.scrollHeight);
    })

    nsSocket.on('updateUsers',(numUsers)=>{
        document.querySelector('.curr-room-num-users').innerHTML = `${numUsers} <span class="glyphicon glyphicon-user"></span>`;
        document.querySelector('.curr-room-text').innerText = roomName;
    })

    let searchBox = document.querySelector('#searchBox');
    searchBox.addEventListener('input',(e)=>{
        let messages = Array.from(document.getElementsByClassName('message-text'));
        messages.forEach((msg)=>{
            if(msg.innerText.toLowerCase().indexOf(e.target.value.toLowerCase()) === -1){
                msg.parentElement.parentElement.style.display = "none";
            } else {
                msg.parentElement.parentElement.style.display = "flex";
            }
        })
    })
}