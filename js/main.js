const dino = document.querySelector('.dino');
const background = document.querySelector('.background');
const gameOver = document.querySelector('.game-over');

let isJumping = false;
let position = 0;

function handleKeyup(event) {
  if (event.keyCode === 32) {
    if (!isJumping) jump();
  }
}

function updatePosicao(pos, rnd) {
  gameOver.textContent = 'Posicao: ' + pos + '  -  Tempo: '+rnd;
}


function iniciaJogo() {
  createCactus();
  document.addEventListener('keyup', handleKeyup);
  dino.style.transform = 'rotate(0deg)';
  dino.style.transitionDuration = '0.1s';
}

function jump() {
  isJumping = true;

  let upInterval = setInterval(() => {
    if (position >= 200) {
      // Para de subir
      clearInterval(upInterval);
      // Começa a descer
      let downInterval = setInterval(() => {
        position -= 20;
        if (position <= 0) {
          // Para de descer
          clearInterval(downInterval);
          position = 0;
          isJumping = false;
        };
        dino.style.bottom = (position + 'px');
      }, 20);
    } else {
      position += 20;
    };
    dino.style.bottom = (position + 'px');
  }, 20);
}

function createCactus() {
  const cactus = document.createElement('div');
  cactus.classList.add('cactus');
  let cactusPosition = (window.innerWidth - 100);
  let randomTime = 100 + Math.round(Math.random() * 6000);
  background.appendChild(cactus);

  let moveInterval = setInterval(() => {
    updatePosicao(cactusPosition, randomTime);
    if (cactusPosition < -60) {
      clearInterval(moveInterval);
      background.removeChild(cactus);
    } else if (cactusPosition > 0 && cactusPosition < 60 && position < 60) {
      clearInterval(moveInterval);
      clearTimeout(timeOUT);
      background.querySelectorAll('.cactus').forEach(element => {
        background.removeChild(element);       
      });
      cactusPosition = -100;
      dino.style.transform = 'rotate(295deg)';
      gameOver.innerHTML = '<h1 class="game-over">Fim de Jogo</h1><button class="btn-iniciar" onclick="iniciaJogo()">Iniciar Jogo</button>';
      document.removeEventListener('keyup', handleKeyup);
    } else {
      cactusPosition -= 10;
      cactus.style.left = cactusPosition + 'px';
    }
  }, 20);

  let timeOUT = setTimeout(createCactus, randomTime);
}

iniciaJogo();
