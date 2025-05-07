// ==============================
// CONFIGURAÇÃO GLOBAL
// ==============================
const config = {
  channelId: '{channelId}',
  seJWTToken: '{seJWTToken}',
  logoLetter: '{logoLetter}',
  initialHp: Number('{hpInitial}'),
  maxHp: Number('{hpMax}'),
  soundsVolume: Number('{soundsVolume}'),
  lifeIncrementTime: Number('{lifeIncrementTime}'),
  lifebarOrientation: '{lifebarOrientation}',
  sounds: {
    dmgS: new Audio('{{soundDmgS}}'),
    dmgB: new Audio('{{soundDmgB}}'),
    healS: new Audio('{{soundHealS}}'),
    healB: new Audio('{{soundHealB}}'),
    death: new Audio('{{soundDeath}}'),
    revive: new Audio('{{soundRevive}}')
  },
  messages: {
    healS: '{{msgHealS}}',
    healB: '{{msgHealB}}',
    dmgS: '{{msgDmgS}}',
    dmgB: '{{msgDmgB}}',
    death: '{{msgDeath}}',
    revive: '{{msgRevive}}'
  },
  bits: {
    healS: {bitHealS},
    healB: {bitHealB},
    dmgS: {bitDmgS},
    dmgB: {bitDmgB}
  },
  hpStats: {
    healS: {hpHealS},
    healB: {hpHealB},
    dmgS: {hpDmgS},
    dmgB: {hpDmgB},
    dTime: {deathSoundTime},
    rTime: {reviveTime}
  }
};

let currentHP = 0;

const lifebar = document.getElementById("lifeBar");

if (config.lifebarOrientation?.toLowerCase() === "horizontal") {
  lifebar.classList.add("horizontal");
} else {
  lifebar.classList.remove("horizontal");
}

// ==============================
// ÁUDIO
// ==============================
function setSoundVolume(volume) {
  for (const sound of Object.values(config.sounds)) {
    sound.volume = volume * 0.01;
  }
}

function unlockAudio() {
  for (const sound of Object.values(config.sounds)) {
    sound.volume = 0;
    sound.play().then(() => {
      sound.pause();
      sound.currentTime = 0;
      sound.volume = config.soundsVolume * 0.01;
    }).catch(() => {});
  }
}

function playSound(sound) {
  const newInstance = new Audio(sound.src);
  newInstance.volume = sound.volume;
  newInstance.play().catch(console.error);
}

// ==============================
// UI
// ==============================
function setupLogoOrImage() {
  const logoElement = document.querySelector('#logo');
  const imgElement = document.querySelector('#img');
  const isValidLogoLetter = config.logoLetter && config.logoLetter.trim().length === 1;

  if (!isValidLogoLetter) {
    if (imgElement) imgElement.style.display = 'block';
    if (logoElement) logoElement.style.display = 'none';
  } else {
    if (imgElement) imgElement.style.display = 'none';
    if (logoElement) {
      logoElement.textContent = config.logoLetter.trim();
      logoElement.style.display = 'block';
    }
  }
}

function updateLifeBarSize() {
  const background = document.querySelector('#background');
  const lifeBar = document.querySelector('#lifeBar');
  const isHorizontal = lifeBar.classList.contains('horizontal');
  const max = config.maxHp;

  document.documentElement.style.setProperty('--max-hp', max);
  background.innerHTML = '';

  for (let i = 0; i < max; i++) {
    const life = document.createElement('div');
    life.classList.add('life');

    if (i >= currentHP) {
      life.style.opacity = '0';
    }

    if (isHorizontal) {
      const backgroundWidth = background.clientWidth || 282;
      life.style.width = `${backgroundWidth / max}px`;
      life.style.height = '34px';
    } else {
      const backgroundHeight = background.clientHeight || 250;
      life.style.height = `${backgroundHeight / max}px`;
      life.style.width = '30px';
    }

    background.appendChild(life);
  }
}

function setLifebarOrientation() {
  const lifebar = document.getElementById("lifeBar");
  if (!lifebar) return;

  if (config.lifebarOrientation?.toLowerCase() === "horizontal") {
    lifebar.classList.add("horizontal");
  } else {
    lifebar.classList.remove("horizontal");
  }
}

function updateUI() {
  setSoundVolume(config.soundsVolume);
  setupLogoOrImage();
  updateLifeBarSize();
  setLifebarOrientation();
}

// ==============================
// VIDA
// ==============================
function changeLife(amount) {
  const background = document.querySelector('#background');

  for (let i = 0; i < Math.abs(amount); i++) {
    if (amount > 0 && currentHP < config.maxHp) {
      background.children[currentHP].style.opacity = '1';
      currentHP++;
    } else if (amount < 0 && currentHP > 0) {
      currentHP--;
      background.children[currentHP].style.opacity = '0';
    }
  }
}

function initLifeSystem(amount) {
  for (let i = 0; i < amount; i++) {
    changeLife(1);
  }
}

// ==============================
// STREAM ELEMENTS
// ==============================
function sendMessageToStreamElementsChannel(message) {
  fetch(`https://api.streamelements.com/kappa/v2/bot/${config.channelId}/say`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${config.seJWTToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ message })
  }).catch(console.error);
}

function formatMessage(template, userName, currentHPValue) {
  const replacements = {
    '{user}': userName,
    '{healS}': config.hpStats.healS,
    '{healB}': config.hpStats.healB,
    '{dmgS}': config.hpStats.dmgS,
    '{dmgB}': config.hpStats.dmgB,
    '{hp}': currentHPValue
  };

  let message = template;
  for (const [key, value] of Object.entries(replacements)) {
    message = message.replace(new RegExp(key, 'g'), value);
  }

  sendMessageToStreamElementsChannel(message.replace(/{|}/g, ''));
}

// ==============================
// RESET E REVIVE
// ==============================
function resetLifeSystem() {
  if (config.initialHp > config.maxHp) {
    console.warn('initialHp maior que maxHp. Ajustando para maxHp.');
    config.initialHp = config.maxHp;
  }

  currentHP = 0;
  updateUI();
  initLifeSystem(config.initialHp);
}

function reviveUser(userName) {
  resetLifeSystem();
  config.sounds.revive.play();
  formatMessage(config.messages.revive, userName, currentHP);
}

function playDeathSequence(userName) {
  config.sounds.death.playbackRate = 0.8;
  config.sounds.death.play();
  formatMessage(config.messages.death, userName, 0);
  setTimeout(() => reviveUser(userName), config.hpStats.rTime);
}

// ==============================
// MECÂNICA DE VIDA
// ==============================
function handleLife(bitAmount, statAmount, sound, messageTemplate, userName) {
  const isHeal = [config.bits.healS, config.bits.healB].includes(bitAmount);
  let completed = 0;

  // Condensando createLife e removeLife na lógica de handleLife
  function updateLife() {
    if (isHeal) {
      if (currentHP < config.maxHp) {  // Apenas cria uma barra se não tiver atingido o máximo
        const background = document.querySelector('#background');
        background.children[currentHP].style.opacity = '1';
        currentHP++;
      }
      playSound(sound);  // Toca o som de cura
    } else {
      if (currentHP > 0) {  // Só remove a vida se houver vida para remover
        currentHP--;
        const background = document.querySelector('#background');
        background.children[currentHP].style.opacity = '0';
      }
      playSound(sound);  // Toca o som de dano
    }

    completed++;
    if (completed === statAmount) {
      if (currentHP <= 0) {
        setTimeout(() => {
          playDeathSequence(userName);
        }, config.hpStats.dTime);
      } else {
        formatMessage(messageTemplate, userName, currentHP);  // Envia a mensagem com a quantidade de vida restante
      }
    }
  }

  // Garantir que o som só toque uma vez ao completar a ação
  if (statAmount === 1) {
    playSound(sound);
  }

  // Usando o lifeIncrementTime para controlar a velocidade do loop
  for (let i = 0; i < statAmount; i++) {
    setTimeout(updateLife, i * config.lifeIncrementTime);  // Cria ou remove barras com intervalo determinado por lifeIncrementTime
  }
}

// ==============================
// CHEERS
// ==============================
function handleCheer(event) {
  const { name, amount } = event;

  switch (amount) {
    case config.bits.healS:
      handleLife(amount, config.hpStats.healS, config.sounds.healS, config.messages.healS, name);
      break;
    case config.bits.healB:
      handleLife(amount, config.hpStats.healB, config.sounds.healB, config.messages.healB, name);
      break;
    case config.bits.dmgS:
      handleLife(amount, config.hpStats.dmgS, config.sounds.dmgS, config.messages.dmgS, name);
      break;
    case config.bits.dmgB:
      handleLife(amount, config.hpStats.dmgB, config.sounds.dmgB, config.messages.dmgB, name);
      break;
  }
}

// ==============================
// EVENTOS
// ==============================
function initEventListeners() {
  window.addEventListener('onEventReceived', function (obj) {
    if (!obj.detail.event) return;

    if (typeof obj.detail.event.itemId !== 'undefined') {
      obj.detail.listener = 'cheer-latest';
    }

    const listenerType = obj.detail.listener.split('-')[0];
    const event = obj.detail.event;

    if (listenerType === 'cheer') {
      handleCheer(event);
    }
  });

  window.addEventListener('click', function onceClick() {
    unlockAudio();
    window.removeEventListener('click', onceClick);
  });
}

// ==============================
// INICIALIZAÇÃO
// ==============================
resetLifeSystem();
initEventListeners();
