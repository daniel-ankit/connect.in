const socket = io();

var username;
var chats = document.querySelector(".chats");
var user_list = document.querySelector('.user-list');
var user_count = document.querySelector(".user-count");

do{
    username = prompt("Enter your name : ");
} while(!username);

socket.emit("new_user_joined", username);

socket.on("user-joined", (socket_name)=>{
    userJoinLeft(socket_name, 'joined');
})

function userJoinLeft(name, status){
    let div = document.createElement("div");
    div.classList.add('user-join');
    let content = `<p><b>${name}</b> ${status} the chat</p>`;
    div.innerHTML = content;
    chats.appendChild(div);
    chats.scrollTop = chats.scrollHeight;
}

socket.on("user-disconnect", (user)=>{
    userJoinLeft(user, "left");
});

socket.on("user-list", (users)=>{
    user_list.innerHTML= `<p>You</p>`;
    arr = Object.values(users);
    for(i=0; i<arr.length; i++)
    {
        let p = document.createElement('p');
        if(arr[i] != username)
        {  
            p.innerText = arr[i];
            user_list.appendChild(p);
        }
    }
    user_count.innerHTML = arr.length;
})