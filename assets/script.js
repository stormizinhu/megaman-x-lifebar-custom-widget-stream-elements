const dmgS = new Audio('{{soundDmgS}}');
const dmgB = new Audio('{{soundDmgB}}');
const healS = new Audio('{{soundHealS}}');
const healB = new Audio('{{soundHealB}}');
const death = new Audio('{{soundDeath}}');

dmgS.volume = {soundsVolume} * .01;
dmgB.volume = {soundsVolume} * .01;
healS.volume = {soundsVolume} * .01;
healB.volume = {soundsVolume} * .01;
death.volume = {soundsVolume} * .01;

const jebaitedAPI = '{jebaitedAPIToken}';

const background = document.querySelector('#background');
let letter = '{logoLetter}';
let currentHP = '{hpCount}';


if (letter != "") {
	img.style.display = "none";	
};

if (currentHP <= 32) {
	(function hpCount() {
   		currentHP = '{hpCount}';
  		for (i = 0; i < currentHP; i++) {
      	const newLife = document.createElement("div"); 
      	document.querySelector('#background').appendChild(newLife).classList = "life";
    }
})()};

function dmgReceived() {
    if (background.hasChildNodes()) {
    }
};

function dead() {
	death.playbackRate = 0.8;
    death.play()
    setTimeout(revive, '{reviveTime}');
    setTimeout(reviveMsg, 9000);
};

function revive() {
  	if (currentHP <= 0) {
	for (i = 0; i < '{hpCount}'; i++) {
      	const newLife = document.createElement("div"); 
      	document.querySelector('#background').appendChild(newLife).classList = "life";
      healS.play();	
      healB.play();
    }
 	currentHP = '{hpCount}';
    }
};

function reviveMsg() {
	rawMessage = '{msgRevive}';
    message = rawMessage.replace('hp', '{hpCount}')
                		.replace("{", "").replace("}", "");
    encodedMessage = encodeURIComponent(message);
    fetch(`https://api.jebaited.net/botMsg/${jebaitedAPI}/${encodedMessage}`);
};



window.addEventListener('onEventReceived', function (obj) {
    if (!obj.detail.event) {
      return;
    }
    if (typeof obj.detail.event.itemId !== "undefined") {
      obj.detail.listener = "cheer-latest";
    }
      const listener = obj.detail.listener.split("-")[0];
      const event = obj.detail.event;

if (listener === "cheer") {
    switch (event.amount) {
        case {bitHealS}:
            if (background.childElementCount <= 30) {
              for (a = 0; a < '{hpHealS}'; a++){
                healS.play();
                const newLife = document.createElement("div"); 
      			document.querySelector('#background').appendChild(newLife).classList = "life";
                currentHP++;
              }
              userName = event.name;
              rawMessage = '{msgHealS}';
              message = rawMessage.replace(/{user}/g, event.name)
                				  .replace('hp', currentHP)
                				  .replace("{", "").replace("}", "")
                				  .replace('heal', '{hpHealS}')
                				  .replace("{", "").replace("}", "");
              encodedMessage = encodeURIComponent(message);
              fetch(`https://api.jebaited.net/botMsg/${jebaitedAPI}/${encodedMessage}`);
            }
        break
        case {bitHealB}:
            if (background.childElementCount <= 30) {
       			for (b = 0; b < '{hpHealB}'; b++){
                healB.play();
                const newLife = document.createElement("div"); 
      			document.querySelector('#background').appendChild(newLife).classList = "life";
                currentHP++;
              }
              userName = event.name;
              rawMessage = '{msgHealB}';
              message = rawMessage.replace(/{user}/g, event.name)
                				  .replace('hp', currentHP)
                				  .replace("{", "").replace("}", "")
                				  .replace('heal', '{hpHealB}')
                				  .replace("{", "").replace("}", "");
              encodedMessage = encodeURIComponent(message);
              fetch(`https://api.jebaited.net/botMsg/${jebaitedAPI}/${encodedMessage}`);
              }
        break
        case {bitDmgS}:
            dmgReceived();
        	for (c = 0; c < '{hpDmgS}'; c++){
              	dmgS.play();
              	if(background.childElementCount > 0){
                   background.removeChild(background.children[0]);
                };
                currentHP--;
            }; 
        	if (currentHP >= 1) {
        	userName = event.name;
            rawMessage = '{msgDmgS}';
			message = rawMessage.replace(/{user}/g, event.name)
                				.replace('hp', currentHP)
                				.replace("{", "").replace("}", "")
                				.replace('dmg', '{hpDmgS}')
                				.replace("{", "").replace("}", "");
            encodedMessage = encodeURIComponent(message);
            fetch(`https://api.jebaited.net/botMsg/${jebaitedAPI}/${encodedMessage}`);
            } if (currentHP < 1) {
              setTimeout(dead, '{deathSoundTime}');
              userName = event.name;
              rawMessage = '{msgDeath}';
   			  message = rawMessage.replace(/{user}/g, userName)
    		  encodedMessage = encodeURIComponent(message);
    		  fetch(`https://api.jebaited.net/botMsg/${jebaitedAPI}/${encodedMessage}`);
            };
		break
        case {bitDmgB}:
            dmgReceived();
            for (d = 0; d < '{hpDmgB}'; d++){
              	dmgB.play();
             	currentHP--;
              	if(background.childElementCount > 0){
                   background.removeChild(background.children[0]);
                };
			} if (currentHP >= 1) {
        	userName = event.name;
            rawMessage = '{msgDmgB}';
            message = rawMessage.replace(/{user}/g, event.name)
                				.replace('hp', currentHP)
                				.replace("{", "").replace("}", "")
                				.replace('dmg', '{hpDmgB}')
                				.replace("{", "").replace("}", "");
            encodedMessage = encodeURIComponent(message);
            fetch(`https://api.jebaited.net/botMsg/${jebaitedAPI}/${encodedMessage}`);
            } if (currentHP < 1) {
              setTimeout(dead, '{deathSoundTime}');
              userName = event.name;
              rawMessage = '{msgDeath}';
   			  message = rawMessage.replace(/{user}/g, userName)
    		  encodedMessage = encodeURIComponent(message);
    		  fetch(`https://api.jebaited.net/botMsg/${jebaitedAPI}/${encodedMessage}`);
            };
		break
    }
}});
