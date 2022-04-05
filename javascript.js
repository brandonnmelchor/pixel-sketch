const colorPicker = document.querySelector("#color-picker");
const sketchpad = document.querySelector(".sketchpad");
const gridSize = document.querySelector("#grid-size");
const gridSizeOutput = document.querySelector("#grid-size-output");

let isDrawing = false;

gridSize.addEventListener("input", () => {
  printGridSize(gridSize.value);
  newSketchpad(gridSize.value);
});

function printGridSize(gridSize) {
  gridSizeOutput.textContent = `${gridSize} x ${gridSize}`;
}

function newSketchpad(gridSize) {
  createDivs(gridSize);
  createGrid(gridSize);
}

function createDivs(gridSize) {
  sketchpad.innerHTML = "";
  for (let i = 1; i <= Math.pow(gridSize, 2); i++) {
    const div = document.createElement("div");
    sketchpad.appendChild(div);

    div.classList.add("pixel");
    div.addEventListener("mousedown", startDrawing);
    div.addEventListener("mousemove", continueDrawing);
    div.addEventListener("mouseup", () => (isDrawing = false));
  }
}

function createGrid(gridSize) {
  sketchpad.style.gridTemplate = `repeat(${gridSize}, 1fr) / repeat(${gridSize}, 1fr)`;
}

function startDrawing() {
  isDrawing = true;
  this.style.backgroundColor = colorPicker.value;
}

function continueDrawing() {
  if (isDrawing === true) {
    this.style.backgroundColor = colorPicker.value;
  }
}

newSketchpad(gridSize.value);

VANTA.TRUNK({
  el: document.querySelector("html"),
  mouseControls: true,
  touchControls: true,
  gyroControls: false,
  minHeight: 200.0,
  minWidth: 200.0,
  scale: 1.0,
  scaleMobile: 1.0,
  color: 0x9bcac0,
  backgroundColor: 0xfcfcfc,
  spacing: 15.0,
});

const buttons = document.querySelectorAll("button");
buttons.forEach((button) => button.addEventListener("click", activateButton));

function activateButton() {
  buttons.forEach((button) => button.classList.remove("button-selected"));
  this.classList.add("button-selected");

  let buttonSelected = this.attributes["id"].nodeValue;
  if (buttonSelected === "clear") {
    newSketchpad(gridSize.value);
    setTimeout(() => this.classList.remove("button-selected"), 100);
  }
}
