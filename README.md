# Mega Man X Lifebar – Custom StreamElements Widget  

---
[![Made with ❤️](https://img.shields.io/badge/Made%20with-%E2%9D%A4-blue)](https://beacons.ai/stormizinhu) [![Releases](https://img.shields.io/github/v/release/stormizinhu/megaman-x-lifebar-custom-widget-stream-elements?label=Releases)](https://github.com/stormizinhu/megaman-x-lifebar-custom-widget-stream-elements/releases) ![Repo Size](https://img.shields.io/github/repo-size/stormizinhu/megaman-x-lifebar-custom-widget-stream-elements) ![status](https://img.shields.io/badge/status-WIP-orange) ![Last Commit](https://img.shields.io/github/last-commit/stormizinhu/megaman-x-lifebar-custom-widget-stream-elements) [![Issues](https://img.shields.io/github/issues/stormizinhu/megaman-x-lifebar-custom-widget-stream-elements?label=Issues)](https://github.com/stormizinhu/megaman-x-lifebar-custom-widget-stream-elements/issues) [![MIT License](https://img.shields.io/badge/license-MIT-brightgreen.svg)](LICENSE) ![Stars](https://img.shields.io/github/stars/stormizinhu/megaman-x-lifebar-custom-widget-stream-elements?style=social) ![Forks](https://img.shields.io/github/forks/stormizinhu/megaman-x-lifebar-custom-widget-stream-elements) 

![Vertical Demo](https://raw.githubusercontent.com/stormizinhu/megaman-x-lifebar-custom-widget-stream-elements/refs/heads/main/src/img/vertical.gif) 

![Horizontal Demo](https://raw.githubusercontent.com/stormizinhu/megaman-x-lifebar-custom-widget-stream-elements/refs/heads/main/src/img/horizontal.png)

---

### Contents
- [Introduction](#introduction)
- [Features](#features)
- [Installation](#installation)
- [How to Use](#how-to-use)
- [Technologies](#technologies)
- [Versions & Changelog](#versions-&-changelog)
- [License](#license)

---

## [Introduction](#contents)  
This widget brings Mega Man X nostalgia to your stream!  
Whenever a viewer sends a specific Bit amount (Cheer), the HP bar reacts by healing or taking damage. A message appears in chat showing the user, the action, and the current HP. If HP reaches zero, a webcam explosion effect is triggered in OBS via Streamer.bot.

Inspired by the original game's visuals, everything is built with pure HTML/CSS/JavaScript. Sound effects from Mega Man X are included for actions like Heal, Damage and Revive.

---
## [Features](#contents)

- Real-time reactions based on Bit donations (Cheer).
- Applies Heal or Damage depending on the cheer amount.
- Sends chat messages with user name, action, and current HP.
- Triggers explosion animation via OBS when HP reaches 0.
- Automatically revives and resets after “death”.
- Highly customizable:
  - 🎨 Colors, 📦 Sizes, 🖼️ Logo, 🔤 Fonts  
  - 💰 Cheer thresholds, 💊 Heal/Damage values  
  - 🔊 Sound files, 🔉 Volume levels, 🕒 Timings  
  - 💬 Chat messages, 👁️‍🗨️ Widget display mode (horizontal/vertical)

---

## [Installation](#contents)
📢 This widget is not yet published to the StreamElements Gallery. You can still fork or clone the repo for personal use:

#### Clone via HTTPS
```bash
git clone https://github.com/stormizinhu/megaman-x-custom-alerts-widget-stream-elements.git
```

**Using SSH**
```bash
git clone git@github.com:stormizinhu/megaman-x-custom-alerts-widget-stream-elements.git
```
---

## [How to Use](#contents)

1. Open StreamElements → **My Overlays**.
2. Create a new Overlay and add a **"Custom Widget"**.
3. Paste the **HTML/CSS/JS/JSON** files from this project.
4. Copy your **Channel ID** and **JWT Token** from Stream Elements Channel Settings.
5. Paste them in the **ID/Token Config** group
6. Configure your **Custom Fields** on the widget interface.
7. Integrate with **OBS** + **Streamer.bot** for extra effects (optional).

---

## [Features](#contents)
- Reacts to Bit donations with Heal or Damage animations.
- Triggers sound effects and OBS actions based on HP state.
- Automatically resets and "revives" when HP hits zero.
- Fully customizable: colors, layout (horizontal/vertical), HP values, thresholds, sound files, fonts, messages, and more.
- Sends live chat messages with user actions and remaining HP.
- Vertical or Horizontal Diplay.
- From 0 to 32 hp, it changes it's size to fit the lifebar.

---

## [Technologies](#contents)
``Code``

![HTML](https://img.shields.io/badge/HTML-5-orange?logo=html5) ![CSS](https://img.shields.io/badge/CSS-3-blue?logo=css3) ![JavaScript](https://img.shields.io/badge/JavaScript-ES6-yellow?logo=javascript) ![JSON](https://img.shields.io/badge/JSON-grey?logo=json)

``Platforms``

![StreamElements](https://img.shields.io/badge/StreamElements-darkgreen?logo=streamelements) ![Twitch](https://img.shields.io/badge/Twitch-purple?logo=twitch)

``Softwares``

![OBS](https://img.shields.io/badge/OBS-black?logo=obsstudio) ![StreamerBot](https://img.shields.io/badge/StreamerBot-cyan?logo=streamerbot)

---

## [Versions & Changelog](#contents)

🟢 v1.0 – Initial Release
- Basic Cheer-to-HP logic (Heal/Damage).
- Manual configuration via JS variables.
- Prototype layout and animations.

🟢 v1.1 – UI Improvements
- Visual enhancements and polish.
- Health bar with pixel-style design.
- Sound effects for Heal/Damage.

🟢 v2.0 – Custom Fields Support
- Replaced hardcoded configs with StreamElements JSON fields.
- Easier customization (colors, HP values, messages, etc.).

🟢 v3.0 – Code Refactor
- Transition to object-based structure.
- Modularized code for maintainability.
- Better performance and flexibility.

🟢 v4.0 – Major Upgrade
- Better OOP architecture.
- Pixel border system.
- Enhanced health logic (more accurate HP tracking).
- Optimized for both vertical and horizontal orientation.

🟢 v5.0 – Major Upgrade
- Now using Channel ID and JWT Token from Stream Elements.
- Overall better code structure.
- HP responsive size based on max HP.
- HP sounds to loop like in the game.


##### 📄[Full Changelog](./CHANGELOG.md)


---

## License [![MIT License](https://img.shields.io/badge/license-MIT-brightgreen.svg)](LICENSE)

> ⚠️ This is an independent fan project inspired by Streamer.bot functionality.
> It is not affiliated with, endorsed by, or sponsored by Streamer.bot or Capcom.
> All trademarks and assets belong to their respective owners.

This project is licensed under the MIT License. 

---

### © stormizinhu - 2025
