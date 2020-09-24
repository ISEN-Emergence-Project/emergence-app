<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Document test</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <main>
        <section>
            <div class="live-box">
               
                <div class="top">
                    <div class="top-bg">
                        <a href="//radio.etns.tech/" class="radio-titre">Radio ETN</a>
                        <p class="titre">Live</p>
                        
                        <div class="btn-div">
                            <button class="btn-play">
                                <img class="img-play show" src="img/play-button.svg">
                                <img class="img-pause" src="img/pause-button.svg">
                            </button>
                            <button class="btn-reload">
                                <img class="img-reload" src="img/reload-button.svg">
                            </button>
                        </div>
                        
                        <div class="tag-div">
                            <span class="tag">Public</span>
                        </div>
                    </div>
                </div>
                <div class="bottom">
                    <div class="slider-div">
                        <img class="slider-icon" src="img/volume-down.svg"><input class="slider" type="range" min="0" max="1" step="0.01" value="1">
                    </div>
                    <p class="desc">Description live super</p>
                    <audio controls preload="none">
                        <p>Votre navigateur ne supporte pas l'écoute en ligne. Réessayez avec un navigateur plus récent.</p>
                        <source src="https://rcf.streamakaci.com/rcf59.mp3">
                    </audio>
                    <hr class="separate-device"/>
                    <p class="other-device">Ecouter sur un autre appareil</p>
                </div>
                
            </div>
            
            <div class="live-box">
               
                <div class="top">
                    <div class="top-bg">
                        <a href="//radio.etns.tech/" class="radio-titre">Radio ETN</a>
                        <p class="titre">Private Live</p>
                        
                        <div class="btn-div">
                            <button class="btn-play">
                                <img class="img-play show" src="img/play-button.svg">
                                <img class="img-pause" src="img/pause-button.svg">
                            </button>
                            <button class="btn-reload">
                                <img class="img-reload" src="img/reload-button.svg">
                            </button>
                        </div>
                        
                        <div class="tag-div">
                            <span class="tag">Prive</span><span class="tag">Music Mix</span>
                        </div>
                    </div>
                </div>
                <div class="bottom">
                    <div class="slider-div">
                        <img class="slider-icon" src="img/volume-up.svg"><input class="slider" type="range" min="0" max="1" step="0.01" value="1">
                    </div>
                    <p class="desc">Description live super, en plus elle est longue...</p>
                    <audio controls preload="none">
                        <p>Votre navigateur ne supporte pas l'écoute en ligne. Réessayez avec un navigateur plus récent.</p>
                        <source src="https://rcf.streamakaci.com/rcfbe.mp3">
                    </audio>
                    <hr class="separate-device"/>
                    <p class="other-device">Ecouter sur un autre appareil</p>
                </div>
                
            </div>
        </section>
    </main>
    <script type="application/javascript" src="script.js"></script>
</body>
</html>