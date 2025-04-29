const config = {
  jebaitedAPIToken: '{jebaitedAPIToken}',
  logoLetter: '{logoLetter}',
  hpCount: Number('{hpCount}'),
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

const lifebar = document.getElementById("lifeBar");

if (config.lifebarOrientation?.toLowerCase() === "horizontal") {
  lifebar.classList.add("horizontal");
} else {
  lifebar.classList.remove("horizontal");
}

function validateConfig(cfg) {
  if (!cfg.jebaitedAPIToken || !cfg.hpCount || !cfg.soundsVolume) {
    console.error('Erro: Configuração inválida. Verifique o JSON.');
    throw new Error('Configuração incompleta.');
  }
}

function setSoundVolume(volume) {
  for (const sound of Object.values(config.sounds)) {
    sound.volume = volume * 0.01;
  }
}

function formatMessage(msgTemplate, userName, currentHPValue) {
  const finalMessage = msgTemplate
    .replace(/{user}/g, userName)
    .replace('healS', config.hpStats.healS)
    .replace('healB', config.hpStats.healB)
    .replace('dmgS', config.hpStats.dmgS)
    .replace('dmgB', config.hpStats.dmgB)
    .replace('hp', currentHPValue)
    .replace(/{|}/g, '');

  const encodedMessage = encodeURIComponent(finalMessage);
  fetch(`https://api.jebaited.net/botMsg/${config.jebaitedAPIToken}/${encodedMessage}`);
}

function createLife() {
  const newLife = document.createElement('div');
  newLife.classList.add('life');
  background.appendChild(newLife);
}

function removeLife() {
  if (background.childElementCount > 0) {
    background.removeChild(background.children[0]);
  }
}

function handleLife(bitAmount, statAmount, sound, messageTemplate, userName) {
  const isHeal = [config.bits.healS, config.bits.healB].includes(bitAmount);
  const iterations = statAmount;
  let completedIterations = 0;

  function addRemoveLife() {
    if (isHeal) {
      createLife();
      currentHP++;
    } else {
      removeLife();
      currentHP = Math.max(0, currentHP - 1);
    }
    sound.play();
    completedIterations++;

    if (completedIterations === iterations) {
      if (currentHP <= 0) {
        setTimeout(() => {
          config.sounds.death.playbackRate = 0.8;
          config.sounds.death.play();
          formatMessage(config.messages.death, userName, 0);
          setTimeout(() => revive(userName), config.hpStats.rTime);
        }, config.hpStats.dTime);
      } else {
        formatMessage(messageTemplate, userName, currentHP);
      }
    }
  }

  for (let i = 0; i < iterations; i++) {
    setTimeout(() => {
      addRemoveLife();
    }, i * config.lifeIncrementTime);
  }
}

function revive(userName) {
  for (let i = 0; i < config.hpCount; i++) {
    createLife();
    config.sounds.revive.play();
  }
  currentHP = config.hpCount;
  formatMessage(config.messages.revive, userName, currentHP);
}

function hpInit() {
  for (let i = 0; i < config.hpCount; i++) {
    createLife();
  }
}

function handleCheer(event) {
  const { name, amount } = event;

  if (background.childElementCount > 30) return;

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

const background = document.querySelector('#background');
let currentHP = config.hpCount;

validateConfig(config);
setSoundVolume(config.soundsVolume);

const logoElement = document.querySelector('#logo');
const imgElement = document.querySelector('#img');

const isValidLogoLetter = config.logoLetter && config.logoLetter.trim().length === 1;

if (!isValidLogoLetter) {
  if (imgElement) {
    imgElement.style.display = 'block';
  }
  if (logoElement) {
    logoElement.style.display = 'none';
  }
} else {
  if (imgElement) {
    imgElement.style.display = 'none';
  }
  if (logoElement) {
    logoElement.textContent = config.logoLetter.trim();
    logoElement.style.display = 'block';
  }
}


if (currentHP <= 32) {
  hpInit();
}

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
