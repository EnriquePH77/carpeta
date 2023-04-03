/*El evento load se agrega al objeto window, lo que significa que el código se ejecutará cuando se cargue la página.*/
window.addEventListener("load", start);

// La función aleatorio toma dos argumentos min y max y devuelve un número entero aleatorio entre ellos.
function aleatorio(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

/* Se establecen varias variables y se les asignan valores iniciales. playerAttack y enemieAttack se establecen en una cadena vacía (""), lifesPlayer y lifesEnemie se establecen en 3.*/
let playerAttack 
let enemieAttack 
let lifesPlayer = 3;
let lifesEnemie = 3;



/* La función start se ejecuta después de que se carga la página. Se obtienen varios elementos del DOM y se les asignan eventos de escucha de clic.*/
function start() {
  let sectionSelectAttack = document.getElementById('select-attack')
  sectionSelectAttack.style.display = 'none'

  let sectionReset = document.getElementById('restart')
  sectionReset.style.display = 'none'

  let buttonSelect = document.getElementById("button-select");
  buttonSelect.addEventListener("click", puppets);

  let buttonFire = document.getElementById("button-fire");
  buttonFire.addEventListener("click", fireAttack);
  let buttonWater = document.getElementById("button-water");
  buttonWater.addEventListener("click", waterAttack);
  let buttonEarth = document.getElementById("button-earth");
  buttonEarth.addEventListener("click", earthAttack);

  let buttonResetear = document.getElementById("button-reset")
  buttonResetear.addEventListener('click', resetGame)
}

// La función puppets se llama cuando se hace clic en el botón Select en la pantalla de selección de títeres. Esta función obtiene el valor del títere seleccionado por el jugador y llama a la función enemies para seleccionar un títere aleatorio para el oponente. Luego, muestra la pantalla de selección de ataque y deshabilita el botón Select.*/
function puppets() {
  let sectionSelectPuppet = document.getElementById('select-puppet')
  sectionSelectPuppet.style.display = 'none'

  let sectionSelectAttack = document.getElementById('select-attack')
  sectionSelectAttack.style.display = 'flex'
  

  let inputHipodoge = document.getElementById("hipodoge");
  let inputCapipepo = document.getElementById("capipepo");
  let inputRatigueya = document.getElementById("ratigueya");
  let spanPuppetPlayer = document.getElementById("puppet-player");
  let continu = 1;

  if (inputHipodoge.checked) {
    spanPuppetPlayer.innerHTML = "Hipodoge";
  } else if (inputCapipepo.checked) {
    spanPuppetPlayer.innerHTML = "Capipepo";
  } else if (inputRatigueya.checked) {
    spanPuppetPlayer.innerHTML = "Ratigueya";
  } else {
    continu = 0;
    alert("You have to Choose a puppet!");
  }
  if (continu == 1) {
    enemies();
    let buttonSelect = document.getElementById('button-select')
    buttonSelect.disabled = true;
  }
}

// Las funciones fireAttack, waterAttack y earthAttack establecen el valor de playerAttack en "Fire🔥", "Water💧" y "Earth🌵", respectivamente, y luego llaman a la función attackEnemie.*/
function fireAttack() {
  playerAttack = "Fire🔥";
  attackEnemie();
}

function waterAttack() {
  playerAttack = "Water💧";
  attackEnemie();
}

function earthAttack() {
  playerAttack = "Earth🌵";
  attackEnemie();
}

/* La función enemies selecciona un títere aleatorio para el oponente y lo muestra en la pantalla.*/
function enemies() {
  let shuffleNumber = aleatorio(1, 3);
  let spanPuppetEnemie = document.getElementById("puppet-enemie");
  if (shuffleNumber == 1) {
    spanPuppetEnemie.innerHTML = "Hipodoge";
  } else if (shuffleNumber == 2) {
    spanPuppetEnemie.innerHTML = "Capipepo";
  } else if (shuffleNumber == 3) {
    spanPuppetEnemie.innerHTML = "Ratigueya";
  }
}
/* La función attackEnemie selecciona un tipo de ataque aleatorio para el oponente y lo establece en enemieAttack, y luego llama a la función combat*/
function attackEnemie() {
  let shuffleAttack = aleatorio(1, 3);
  if (shuffleAttack == 1) {
    enemieAttack = "Fire🔥";
  } else if (shuffleAttack == 2) {
    enemieAttack = "Water💧";
  } else if (shuffleAttack == 3) {
    enemieAttack = "Earth🌵";
  }
  combat();
}

/* La función combat compara los ataques del jugador y del oponente y determina el resultado de la ronda (empate, victoria del jugador o victoria del oponente). Se actualiza la cantidad de vidas restantes y se muestra el resultado en la pantalla. La función checkLifes se llama para comprobar si el juego ha terminado.*/
function combat() {
  let spanLifesPlayer = document.getElementById("lifes-player");
  let spanLifesEnemie = document.getElementById("lifes-enemie");

  if (playerAttack == enemieAttack) {
    //winner = 'Tie'
    createMessage("Tie");
  } else if (
    (playerAttack == "Fire🔥" && enemieAttack == "Earth🌵") ||
    (playerAttack == "Water💧" && enemieAttack == "Fire🔥") ||
    (playerAttack == "Earth🌵" && enemieAttack == "Water💧")
  ) {
    createMessage("You Win");
    lifesEnemie--
    spanLifesEnemie.innerHTML = lifesEnemie;
  } else {
    //winner = 'You WIN!!'
    createMessage("You Lose u.u");
    lifesPlayer--;
    spanLifesPlayer.innerHTML = lifesPlayer;
  }
  checkLifes();
}

/*La función createButtonReset crea un botón para reiniciar el juego.
function createButtonReset() {
  let sectionReset = document.getElementById('restart')
  let buttonReset = document.createElement('button')
  buttonReset.innerHTML = 'Reset'

  sectionReset.appendChild(buttonReset);
  buttonReset.addEventListener('click', resetGame)
}*/

/* La función createMessage crea elementos p para mostrar el resultado de cada ronda de combate y los agrega al DOM.*/
function createMessage(result) {
  let sectionMessages = document.getElementById("resulta");
  let playerAttackss = document.getElementById("player-Attackss");
  let enemieAttackss = document.getElementById("enemie-Attackss");

  let newPlayerAttack = document.createElement("p");
  let newEnemieAttack = document.createElement("p");

  sectionMessages.innerHTML = result
  newPlayerAttack.innerHTML = playerAttack;
  newEnemieAttack.innerHTML = enemieAttack;


  playerAttackss.appendChild(newPlayerAttack);
  enemieAttackss.appendChild(newEnemieAttack);
}

/* La función createFinalMessage crea un elemento p para mostrar el resultado final del juego (ganador o empate) y lo agrega al DOM. También deshabilita los botones de ataque.*/
function createFinalMessage(final) {
  let sectionMessages = document.getElementById("resulta");

  sectionMessages.innerHTML = final;

  //Aqui deshabilitamos los bototnes de ataque cuando termina el juego
  let buttonFire = document.getElementById("button-fire");
  buttonFire.disabled = true;
  let buttonWater = document.getElementById("button-water");
  buttonWater.disabled = true;
  let buttonEarth = document.getElementById("button-earth");
  buttonEarth.disabled = true;

  let sectionReset = document.getElementById('restart')
  sectionReset.style.display = 'block'
}

// La función checkLifes comprueba si el juego ha terminado (es decir, si se han agotado las vidas del jugador o del oponente) y llama a la función createFinalMessage para mostrar el resultado final del juego. Si el juego no ha terminado, se restablecen los valores de playerAttack y enemieAttack a una cadena vacía y se muestra la pantalla de selección de ataque.
function checkLifes() {

  if (lifesEnemie == 0) {
    createFinalMessage("Congratulations!!");
    buttonResetear.style.display = 'flex'
  } else if (lifesPlayer == 0) {
    createFinalMessage("Sorry, You lose");
    buttonResetear.style.display = 'flex'
  }
}

function resetGame() {
  location.reload();
}