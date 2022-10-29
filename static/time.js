// this function is to keep track of time and its changes
function displayTime() {
    clock = new Date();
    minutes = clock.getSeconds();
    if (minutes === 0 && !hourAdded) {
        hours++;
        if (hours === 24) {
            hours = 0;
            invokeghost();
        }
        if (hours === 3) {
            invokeghost('out');
        }
        adjustSound();
        adjustLight();
        hourAdded = true;
    }
    if (minutes > 1) hourAdded = false;
    time.innerHTML = hours + ':';
    if (minutes < 10) time.innerHTML += '0';
    time.innerHTML += minutes;
}

// depending on the time it changes the scene
function adjustLight() {
    switch (hours) {
        case 0:
            time_layer.style.backgroundColor = nightColor;
            game_layer.style.opacity = 0.3;
            break;
        case 1:
            time_layer.style.backgroundColor = nightColor;
            game_layer.style.opacity = 0.3;
            break;
        case 2: case 3:
            time_layer.style.backgroundColor = nightColor;
            game_layer.style.opacity = 0.3;
            break;
        case 4:
            time_layer.style.backgroundColor = nightColor;
            game_layer.style.opacity = 0.4;
            break;
        case 5:
            time_layer.style.backgroundColor = nightColor;
            game_layer.style.opacity = 0.5;
            break;
        case 6:
            time_layer.style.backgroundColor = nightColor;
            game_layer.style.opacity = 0.6;
            break;
        case 7:
            time_layer.style.backgroundColor = nightColor;
            game_layer.style.opacity = 0.8;
            break;
        case 8: case 9: case 10: case 11: case 12: case 13: case 14: case 15: case 16: case 17:
            game_layer.style.opacity = 1;
            time_layer.style.backgroundColor = nightColor;
            break;
        case 18:
            time_layer.style.backgroundColor = '#b14500';
            game_layer.style.opacity = 0.9;
            break;
        case 19:
            time_layer.style.backgroundColor = '#b14500';
            game_layer.style.opacity = 0.8;
            break;
        case 20:
            time_layer.style.backgroundColor = nightColor;
            game_layer.style.opacity = 0.6;
            break;
        case 21:
            time_layer.style.backgroundColor = nightColor;
            game_layer.style.opacity = 0.5;
            break;
        case 22:
            time_layer.style.backgroundColor = nightColor;
            game_layer.style.opacity = 0.4;
            break;
        case 23:
            time_layer.style.backgroundColor = nightColor;
            game_layer.style.opacity = 0.3;
            break;
    }
    if (hours >= 20 && solIsUp === true || hours < 6 && solIsUp === true) {
        time_icon.src = '/static/images/moon.png';
        solIsUp = false;
    }
    else if (hours >= 6 && solIsUp === false && hours < 20) {
        time_icon.src = '/static/images/sun.png';
        solIsUp = true;
    }
}

// depending on the situation it plays a different track
function adjustSound() {
    if (!checkMusic.checked) currentMusic.pause()
    else if (hours < 4 && hours >= 0 && nigth_music.paused && merchant_music.paused) {
        delayMusic(nigth_music);
    }
    else if (hours >= 4 && hours < 18 && day_music.paused && merchant_music.paused) {
        delayMusic(day_music);
    }
    else if(hours >= 18 && hours < 24 && afternoon_music.paused && merchant_music.paused){
        delayMusic(afternoon_music);
    }
}