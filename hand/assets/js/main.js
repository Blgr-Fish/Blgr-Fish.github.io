// main.js

var isSoundPlaying = false;
var startSize = null;
var videoContainer; 
var footerLeftGif, footerRightGif;

function secret() {
    if (!isSoundPlaying) {
        var audio = new Audio("audio/bomb.mp3"); 

  
        audio.addEventListener('play', function () {
            isSoundPlaying = true;
        });

       
        audio.addEventListener('ended', function () {
            isSoundPlaying = false;
            showVideo();
            updateFooterOpacity(); 
        });

        audio.play();
    }
}

function animateSize(timestamp) {
    if (!startSize) startSize = timestamp;
    var progress = timestamp - startSize;

    var width = Math.min(progress / 10, 70);
    var height = Math.min(progress / 10, 50); 

    videoContainer.style.width = width + 'vw';
    videoContainer.style.height = height + 'vh';

    if (progress < 1000) {
        requestAnimationFrame(animateSize);
    }
}

function updateFooterOpacity() {
    var maxWidth = 190;
    var maxHeight = 50; 

    if (parseFloat(videoContainer.style.width) >= maxWidth) {
     
        videoContainer.style.width = maxWidth + 'vw';
        videoContainer.style.height = maxHeight + 'vh';
        startSize = null;


        footerLeftGif.style.opacity = 1; 
        footerRightGif.style.opacity = 1;
    }
}



function showVideo() {
    videoContainer = document.getElementById('video-container');
    var video = document.getElementById('video');
    var textUnderVideo = document.getElementById('text-under-video');

    footerLeftGif = document.getElementById('footer-left-gif');
    footerRightGif = document.getElementById('footer-right-gif');


    videoContainer.style.opacity = 0;
    textUnderVideo.style.opacity = 0;
	footerLeftGif.style.opacity = 0;
	footerRightGif.style.opacity = 0;
    videoContainer.style.width = 0;
    videoContainer.style.height = 0;


    videoContainer.style.display = 'block';


    videoContainer.classList.add('grow-animation');

    video.play();

    
    requestAnimationFrame(animateSize);

    
    var startOpacity = null;
    function animateOpacity(timestamp) {
        if (!startOpacity) startOpacity = timestamp;
        var progress = timestamp - startOpacity;
        videoContainer.style.opacity = Math.min(progress / 1000, 1);
        textUnderVideo.style.opacity = Math.min(progress / 1000, 1); 
		footerLeftGif.style.opacity = Math.min(progress / 1000, 1);
		footerRightGif.style.opacity = Math.min(progress / 1000, 1);


        if (progress < 1000) {
            requestAnimationFrame(animateOpacity);
        }
    }

   
    requestAnimationFrame(animateOpacity);

    
    video.addEventListener('ended', function () {
        videoContainer.style.display = 'none';
        videoContainer.style.opacity = 0;
        textUnderVideo.style.opacity = 0;
        videoContainer.classList.remove('grow-animation');
        video.currentTime = 0; 
        startSize = null; 
        startOpacity = null; 
    });
}
