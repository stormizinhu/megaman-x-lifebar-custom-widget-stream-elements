# Mega Man X Lifebar Custom Widget for Stream Elements 

## Versões
- **1.0** - Integração Básica entre HTML / CSS / Javascript (tudo criado por mim, exceto o objeto usado na comunicação da API do StreamElements)
- **2.0** - Integração de FIELDS em JSON para usabilidade sem necessidade de alterar o código, com entradas simples para qualquer usuário, podendo customizar como quiser (cores, imagens, sons, volumes, temporização).
- **3.0** - Refatoração para Obejtos, visando simplificação e redução de redundância.

## Resumo
- Toda vez que houver uma doação específica de bits (Cheer) no canal, a barra "cura" ou recebe "dano", enviando uma mensagem no chat contendo o Nome, a Ação e o HP Atual. Caso a vida chegue a zero, ativa uma animação de explosão na webcam (via integração com Streamer Bot no OBS Studio).

## Requisitos
- HTML / CSS / JS
- Conta Twitch
- Conta no site "https://jebaited.net/login/" (3rd Party API)
- Comandos no Streamer Bot.
- Imagens / Sons em alguma cena no OBS Studio.

## Explicação
- Sou muito fã de games retro, mas mais ainda de Mega Man, então quis trazer algo bem específico do jogo para minhas lives ficarem mais interativas.
- Construí a parte visual apenas com HTML / CSS / JS Puros, usando Flexbox, Gradient Color Stop nas unidades de vida para a estética original do game.
- Usei os sons originals do jogo para as funções de Cura, Dano, Morte, Explosão e Reviver.
- Estudei a parte de Alertas da Stream Elements e como faria a ligação dos eventos nesse projeto.
- Usei a API Jebaited para comunicação após determinado evento para enviar uma mensagem no chat, contendo o Nome, se Curou ou infligiu Dano e o HP atual.
- Ao Curar, no OBS, a tela pista em branco, e ao receber Dano, treme.
- Quando o HP chega a Zero, envia uma mensagem, que o Streamer Bot, e ativa gatilho, criando a parte da explosão na Webcam.
- Após a exploão, que simula uma Chroma Key genérico, revivo e o Widget reseta, voltando ao HP inicial.

# © by Stormizinhu - 2024
