const dino = document.querySelector('.dino');

function handleKeyup(event) {
  if (event.keyCode === 32) {
    jump();
  }
}

function jump() {
  let position = 0;
  let upInterval = setInterval(() => {
    if(position>=150) {
      // Para de subir
      clearInterval(upInterval);
      // Começa a descer
      let downInterval = setInterval(() => {
        position -= 20;
        if(position <= 0) {
          // Para de descer
          clearInterval(downInterval);
          position = 0;
        };
        dino.style.bottom = (position + 'px');
      }, 20);
    } else {
      position += 20;
    };
    dino.style.bottom = (position + 'px');
  }, 20);

  


}

document.addEventListener('keyup', handleKeyup);
