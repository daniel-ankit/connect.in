var chats = document.querySelector(".chats");
var user_send = document.querySelector('#user-send');
var user_msg = document.querySelector('#user-msg');

user_msg.addEventListener("keyup", (e)=>{
    if(e.key == "Enter" && user_msg.value != "")
    {
        let data = {
            user : username,
            msg : user_msg.value
        }
        if(user_msg.val!='')
        {
            appendMessage(data, 'sent');
            socket.emit('message', data);
            user_msg.value = "";
        }
    }
});

user_send.addEventListener('click', ()=>{
    let data = {
        user : username,
        msg : user_msg.value
    }
    if(user_msg.val!='')
    {
        appendMessage(data, 'sent');
        socket.emit('message', data);
        user_msg.value = "";
    }
});

function appendMessage(data, status){
    let div = document.createElement('div');
    div.classList.add('message', status);
    if(status == 'sent')
    {
        div.innerHTML = `<p>${data.msg}</p> `;
    }
    else
    {
        div.innerHTML = `<h5>${data.user}</h5> <p>${data.msg}</p>`;
    }
    chats.appendChild(div);
    chats.scrollTop = chats.scrollHeight;
}

socket.on('message', (data)=>{
    appendMessage(data, 'recived');
})