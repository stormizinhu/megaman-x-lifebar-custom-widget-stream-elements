const jebaitedAPI = '{jebaitedAPIToken}';
const background = document.querySelector('#background');
const letter = '{logoLetter}';
let currentHP = '{hpCount}';
const soundsVolume = '{soundsVolume}';

const sounds = {
  dmgS: new Audio('{{soundDmgS}}'),
  dmgB: new Audio('{{soundDmgB}}'),
  healS: new Audio('{{soundHealS}}'),
  healB: new Audio('{{soundHealB}}'),
  death: new Audio('{{soundDeath}}'),
  revive: new Audio('{{soundRevive}}')
};

function setSoundVolume(volume) {
  for (const sound of Object.values(sounds)) {
    sound.volume = volume * 0.01;
  }
}

setSoundVolume(soundsVolume);

console.log(sounds.dmgS.volume);

const messages = {
  healS: ('{{msgHealS}}'),
  healB: ('{{msgHealB}}'),
  dmgS: ('{{msgDmgS}}'),
  dmgB: ('{{msgDmgB}}'),
  death: ('{{msgDeath}}'),
  revive: ('{{msgRevive}}')
};

const bits = {
  healS: {bitHealS},
  healB: {bitHealB},
  dmgS: {bitDmgS},
  dmgB: {bitDmgB},
};

const hpStats = {
  count: {hpCount},
  healS: {hpHealS},
  healB: {hpHealB},
  dmgS: {hpDmgS},
  dmgB: {hpDmgB},
  dTime: {deathSoundTime},
  rTime: {reviveTime}
};

function formatMessage(msg, name) {
  let rawMessage = msg;
  if (msg === messages.healS) {
    rawMessage = rawMessage.replace('healS', hpStats.healS);
  } else if (msg === messages.healB) {
    rawMessage = rawMessage.replace('healB', hpStats.healB);
  }	else if (msg === messages.dmgS) {
    rawMessage = rawMessage.replace('dmgS', hpStats.dmgS);
  } else if (msg === messages.dmgB) {
    rawMessage = rawMessage.replace('dmgB', hpStats.dmgB);
  } else if (msg === messages.death || messages.revive ) {
    rawMessage = rawMessage.replace('hp', '{hpCount}');
  }
  const finalMessage = rawMessage.replace(/{user}/g, name)
   								 .replace(/{|}/g, '')		 
    							 .replace('hp', currentHP);
  const encodedMessage = encodeURIComponent(finalMessage);
  fetch(`https://api.jebaited.net/botMsg/${jebaitedAPI}/${encodedMessage}`);
};

function handleLife(amount, stats, sound) {
  switch (amount) {
    case bits.healS:
    case bits.healB:  
      for (let i = 0; i < stats; i++) {
        createLife();
        sound.play();
        currentHP++;
      };
      break;
    case bits.dmgS:
    case bits.dmgB:
      for (let i = 0; i < stats; i++) {
        removeLife();
        sound.play();
        currentHP--;
      };
      break;
  };
};


function createLife() {
  const newLife = document.createElement("div");
  newLife.classList.add("life");
  background.appendChild(newLife);
}

function hpCount() {
  currentHP = '{hpCount}';
  for (let i = 0; i < currentHP; i++) {
    createLife();
  }
}

function removeLife() {
  if (background.childElementCount > 0) {
    background.removeChild(background.children[0]);
  }
}

function dead() {
  sounds.death.playbackRate = 0.8;
  sounds.death.play();
  setTimeout(revive, hpStats.rTime)
}

function revive() {
  if (currentHP <= 0) {
    for (let i = 0; i < '{hpCount}'; i++) {
      createLife();
  	sounds.revive.play();
    }
    currentHP = '{hpCount}';
    formatMessage(messages.revive, name);
  }
}

function handleCheer(event) {
  const { name, amount } = event;
    if (background.childElementCount > 30) {
    return;
    }
  switch (amount) {
    case bits.healS:
      handleLife(bits.healS, hpStats.healS, sounds.healS);	
      if (currentHP <= 32) { formatMessage(messages.healS, name) }
    break;
    case bits.healB: 
      handleLife(bits.healB, hpStats.healB, sounds.healB);	
      if (currentHP <= 32) { formatMessage(messages.healB, name) }
    break;
    case bits.dmgS:
      handleLife(bits.dmgS, hpStats.dmgS, sounds.dmgS);	
      if (currentHP >= 1) { 
        formatMessage(messages.dmgS, name);
      }
      else if (currentHP < 1) { formatMessage(messages.death, name)
        setTimeout(dead, hpStats.dTime);
      }
    break; 
    case bits.dmgB:
      handleLife(bits.dmgB, hpStats.dmgB, sounds.dmgB);	
      if (currentHP >= 1) {
        formatMessage(messages.dmgB, name);
      }
      else if (currentHP < 1) { formatMessage(messages.death, name)
        setTimeout(dead, hpStats.dTime);
    break;
  }
 }
}
          
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
    handleCheer(event);
  }
});

if (letter !== "") {
  img.style.display = "none";
}

if (currentHP <= 32) {
  hpCount();
};