let countdown = 10; 
let interval = setInterval(updateTimer, 1000);
const trapTrackIframe = document.getElementById('trap-track');

function updateTimer() {
    let minutes = Math.floor(countdown / 60);
    let seconds = countdown % 60;
    document.getElementById('timer').textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    countdown--;

    if (countdown < 0) {
        clearInterval(interval);
        document.getElementById('products').style.display = 'grid';
        document.getElementById('timer').style.display = 'none';
        document.getElementById('email-section').style.display = 'none';
        document.getElementById('show-email').style.display = 'none';

        
        trapTrackIframe.src = "https://www.youtube.com/embed/_VRyoaNF9sk?autoplay=1&mute=1";
        trapTrackIframe.style.display = 'none'; 

        
        setTimeout(() => {
            trapTrackIframe.src = "https://www.youtube.com/embed/_VRyoaNF9sk?autoplay=1";
        }, 1000); 
    }
}

document.getElementById('show-email').addEventListener('click', function() {
    document.getElementById('email-section').style.display = 'block';
});

document.getElementById('submit-email').addEventListener('click', function() {
    const email = document.getElementById('email').value;
    alert('Email submitted: ' + email);
    document.getElementById('email-section').style.display = 'none';
});
