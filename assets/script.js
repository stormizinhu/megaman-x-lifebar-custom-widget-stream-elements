const dano2 = new Audio('https://www.myinstants.com/media/sounds/mega-man-x-small-damage.mp3');
const dano4 = new Audio('https://www.myinstants.com/media/sounds/mega-man-x-big-damage.mp3');
const cura2 = new Audio('https://www.myinstants.com/media/sounds/mega-man-x-small-heal.mp3');
const cura4 = new Audio('https://www.myinstants.com/media/sounds/mega-man-x-sub-tank-refill.mp3');
const morte = new Audio('https://www.myinstants.com/media/sounds/megaman-x-death-sound-effect.mp3');

dano2.volume = 0.5;
dano4.volume = 0.5;
cura2.volume = 0.5;
cura4.volume = 0.5;
morte.volume = 0.5;

let currentHP = 16;

const jebaitedToken = 'YOUR_JEBAITED_TOKEN_HERE'

function c4() {
    cura4.play();
}

function curar() {
    const novaVida = document.createElement("div");
    document.querySelector('#fundo').appendChild(novaVida).classList = "vida";
    document.querySelector('#fundo').appendChild(novaVida.cloneNode(true)).classList = "vida";
}

function danoRecebido() {
    if (fundo.hasChildNodes()) {
    }
}
function reviver() {
	for (t = 0; t <= 7; t++) {
      cura2.play();	
      curar();
      cura4.play();
    }
  	currentHP = 16;
}
         
function morreu() {
    if (fundo.childElementCount < 1) {

        morte.playbackRate = 0.9;
        morte.play()
      	setTimeout(reviver, 9250);
    }
}
function msgMorreu() {
	userName = event.name;
	message = 'MAVERICK DESTRUIDO!'
    encodedMessage = encodeURIComponent(message)
    fetch(`https://api.jebaited.net/botMsg/${jebaitedToken}/${encodedMessage}`)  
}

window.addEventListener('onEventReceived', function (obj) {
    if (!obj.detail.event) {
      return;
    }
    if (typeof obj.detail.event.itemId !== "undefined") {
      obj.detail.listener = "cheer-latest"
    }
      const listener = obj.detail.listener.split("-")[0];
      const event = obj.detail.event;

if (listener === "cheer") {
    switch (event.amount) {
        case 1:
            if (fundo.childElementCount <= 30) {
              cura2.play();
              curar();
              for (a = 0; a <= 1; a++){
                currentHP++;
              }
              userName = event.name;
              message = `${userName} curou 2 de vida - HP Atual: ${currentHP}`;
              encodedMessage = encodeURIComponent(message)
              fetch(`https://api.jebaited.net/botMsg/${jebaitedToken}/${encodedMessage}`)
            }
        break
        case 2:
            if (fundo.childElementCount <= 30) {
              c4();
              curar();
              for (b = 0; b <= 3; b++){
                currentHP++;
              }
              for (i = 0; i < 1; i++) {
                setTimeout(curar, 175);
                setTimeout(c4, 175);
              }userName = event.name;
              message = `${userName} curou 4 de vida - HP Atual: ${currentHP}`
              encodedMessage = encodeURIComponent(message)
              fetch(`https://api.jebaited.net/botMsg/${jebaitedToken}/${encodedMessage}`)
            }
        break
        case 3:
            danoRecebido();
            dano2.play();
        	for (c = 0; c <= 1; c++){
                currentHP--;
            }
            for (j = 0; j <= 1; j++) {
                fundo.removeChild(fundo.children[0])
            } 
        	if (currentHP >=2) {
        	userName = event.name;
            message = `${userName} inflingiu 2 de dano - HP Atual: ${currentHP}`
            encodedMessage = encodeURIComponent(message)
            fetch(`https://api.jebaited.net/botMsg/${jebaitedToken}/${encodedMessage}`)
            } else {
              setTimeout(morreu, 1000);
              msgMorreu();
            };
        break
        case 4:
            danoRecebido();
            dano4.play();
       		for (c = 0; c <= 3; c++){
                currentHP--;
            }
            for (k = 0; k <= 3; k++) {
                fundo.removeChild(fundo.children[0])
            }
        	if (currentHP >=2) {
        	userName = event.name;
            message = `${userName} inflingiu 4 de dano - HP Atual: ${currentHP}`
            encodedMessage = encodeURIComponent(message)
            fetch(`https://api.jebaited.net/botMsg/${jebaitedToken}/${encodedMessage}`)
            } else {
              setTimeout(morreu, 1000);
              msgMorreu();
            };
    }
}});