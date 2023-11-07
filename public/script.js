const socket = io('/')
const myPeer = new Peer(undefined, {
     host: '/'   
    // port: '3001'
})
const peers = {};

const videoGrid = document.getElementById('video-grid')
const myVideo = document.createElement('video')

myVideo.muted = true;

navigator.mediaDevices.getUserMedia({
    video: true,
    audio: true,
}).then(stream => {
    addVideoStream(myVideo, stream);

    myPeer.on('call', call => {
        
        call.answer(stream);
        const video = document.createElement('video');
        call.on('stream', userVideoStream => {
            addVideoStream(video, userVideoStream)
        })
        
        videoResize();
    })

    socket.on('user-connected', userId => {
        connectToNewUser(userId, stream )
        videoResize();

    })
})
/////////////////
socket.on('user-disconnected', userId => {
    if(peers[userId])
    {
        peers[userId].close();
        
        videoResize();

    }
})

myPeer.on('open', id => {
    socket.emit('join-room', ROOM_ID, id);
    
})

function connectToNewUser(userId, stream)
{
    const call = myPeer.call(userId, stream);
    const video = document.createElement('video')
    call.on('stream', userVideoStream => {
        addVideoStream(video, userVideoStream)
    })

    call.on('close', () => {
        video.remove()
    })
    
    peers[userId] = call;
    

}

//////////////
function addVideoStream(video, stream){
    video.srcObject = stream;
    video.addEventListener('loadedmetadata', () => {
        video.play();
    })

    videoGrid.append(video)
    videoResize();

}

function videoResize()
{
    const videos = document.querySelectorAll('video');
    if(videos.length <= 2)
    {
        videos.forEach(video => {
            video.style.maxHeight = "50%";
        })
    }
    if(videos.length > 2)
    {
        videos.forEach(video => {
            video.style.maxHeight = "40%";
        })
    }
}

$('.audio_navbar_item_icon').click(function(e)
{
    if(e.currentTarget.name)
    e.currentTarget.classList.toggle('active')
})

// $('.audio_navbar_item_icon').forEach(btn => {
//     btn.onclick = (e) => { 
//         console.log(e)
//     }
// })