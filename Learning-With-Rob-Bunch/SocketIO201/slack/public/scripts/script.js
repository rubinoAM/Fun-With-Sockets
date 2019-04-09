const socket = io('http://localhost:7773'); //Root endpoint- '/'
let nsSocket = "";

//Namespaces
socket.on('nsList',(nsData)=>{
    let namespacesDiv = document.querySelector('.namespaces');
    namespacesDiv.innerHTML = "";
    nsData.forEach((ns)=>{
        namespacesDiv.innerHTML += `<div class="namespace" ns="${ns.endpoint}"><img src="${ns.img}" /></div>`
    })

    Array.from(document.getElementsByClassName('namespace')).forEach((elem)=>{
        elem.addEventListener('click',(e)=>{
            const nsEndpoint = elem.getAttribute('ns');
            //console.log(nsEndpoint);
            joinNs(nsEndpoint);
        })
    })

    joinNs('/wiki');
})