const gridSize = document.querySelector("#grid-size");
const gridSizeOutput = document.querySelector("#grid-size-output");
gridSize.addEventListener("input", printGridSize);

function printGridSize() {
  gridSizeOutput.textContent = `${this.value} x ${this.value}`;
}
