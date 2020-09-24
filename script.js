// play/pause btn - audio players
var btns_radio = document.getElementsByClassName('btn-play');

for (var i = 0; i < btns_radio.length; i++) {
    // foreach btn
    btns_radio[i].addEventListener('click', playPauseAudio);
}

function playPauseAudio () {
    var playing = this.classList.contains('playing');

    var icon_play = this.getElementsByClassName('img-play')[0];
    var icon_pause = this.getElementsByClassName('img-pause')[0];
    var bottom_div = this.parentElement.parentElement.parentElement.nextElementSibling;
    var audio_player = bottom_div.getElementsByTagName('audio')[0];
    var slider_div = bottom_div.getElementsByClassName('slider-div')[0];

    if (playing) {
        audio_player.pause();
    } else {
        audio_player.play();
    }

    icon_play.classList.toggle('show');
    icon_pause.classList.toggle('show');
    slider_div.classList.toggle('show');
    this.classList.toggle('playing');
}

// volume slider
var volume_sliders = document.getElementsByClassName("slider");

for (var i = 0; i< volume_sliders.length; i++) {
    // foreach slider
    volume_sliders[i].addEventListener('input', updateVolume);
}

function updateVolume (e) {
    var bottom_div = e.target.parentElement.parentElement;
    var audio_player = bottom_div.getElementsByTagName('audio')[0];
    var slider = bottom_div.getElementsByClassName('slider')[0];
    
    var volume_icon = bottom_div.getElementsByClassName('slider-icon')[0];

    audio_player.volume = slider.value;

    if (slider.value == 0) {
        volume_icon.src = "img/volume-mute.svg";
    }
    else if (slider.value > 0.5) {
        volume_icon.src = "img/volume-up.svg";
    }
    else {
        volume_icon.src = "img/volume-down.svg";
    }
}

// volume icon
var volume_icons = document.getElementsByClassName("slider-icon");
var save_audio_volume = 0;

for (var i = 0; i< volume_icons.length; i++) {
    // foreach slider
    volume_icons[i].addEventListener('click', function (e) {
        var bottom_div = this.parentElement.parentElement;
        var audio_player = bottom_div.getElementsByTagName('audio')[0];
        var slider = bottom_div.getElementsByClassName('slider')[0];
        
        if (audio_player.volume == 0) {
            slider.value = save_audio_volume;
        } else {
            // sauvergarder le volume
            save_audio_volume = audio_player.volume;
            // changer le volume
            slider.value = 0;
        }
        
        updateVolume(e);
    });
}

// reload btn
var reload_btns = document.getElementsByClassName("btn-reload");
var save_audio_volume = 0;

for (var i = 0; i< reload_btns.length; i++) {
    // foreach slider
    reload_btns[i].addEventListener('click', function (e) {
        var bottom_div = this.parentElement.parentElement.parentElement.nextElementSibling;
        var audio_player = bottom_div.getElementsByTagName('audio')[0];
        var save_audio_player = audio_player.cloneNode(true);
        
        audio_player.remove();
        
        bottom_div.insertBefore(save_audio_player, bottom_div.children[2]);
        
        var btn_play = this.previousElementSibling;
        
        if (btn_play.classList.contains('playing')) {
            save_audio_player.play()
        }
    });
}