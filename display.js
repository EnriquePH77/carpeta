const containers = document.querySelectorAll(".container");
const selectDisplay = document.querySelector(".js-select-display");

function changeDisplay() {
  containers.forEach((container) => {
    container.style.display = selectDisplay.value;
  });
}

selectDisplay.addEventListener("change", changeDisplay);

// Mostrar el primer display por defecto
changeDisplay();