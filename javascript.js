const sketchpad = document.querySelector(".sketchpad");
const gridSize = document.querySelector("#grid-size");
const gridSizeOutput = document.querySelector("#grid-size-output");
gridSize.addEventListener("input", () => {
  printGridSize(gridSize.value);
  createDivs(gridSize.value);
  createGrid(gridSize.value);
});

function printGridSize(gridSize) {
  gridSizeOutput.textContent = `${gridSize} x ${gridSize}`;
}

function createDivs(gridSize) {
  sketchpad.innerHTML = "";
  for (let i = 1; i <= Math.pow(gridSize, 2); i++) {
    const div = document.createElement("div");
    div.classList.add("pixel");
    sketchpad.appendChild(div);
  }
}

function createGrid(gridSize) {
  sketchpad.style.gridTemplate = `repeat(${gridSize}, 1fr) / repeat(${gridSize}, 1fr)`;
}

createDivs(gridSize.value);
createGrid(gridSize.value);
