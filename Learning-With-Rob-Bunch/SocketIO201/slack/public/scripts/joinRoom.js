function joinRoom(roomName){
    nsSocket.emit('joinRoom',roomName,(newNumberOfMembers)=>{
        //Update room member total
        document.querySelector('.curr-room-num-users').innerHTML = `${newNumberOfMembers} <span class="glyphicon glyphicon-user"></span>`
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
}