// Creating and updating the sketchpad area.

const sketchpad = document.querySelector(".sketchpad");
const gridSize = document.querySelector("#grid-size");
const gridSizeOutput = document.querySelector("#grid-size-output");

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
    div.addEventListener("touchdown", startDrawing, { passive: false });
    div.addEventListener("mousemove", continueDrawing);
    div.addEventListener("touchmove", continueDrawing, { passive: false });
    div.addEventListener("mouseup", () => (isDrawing = false));
    div.addEventListener("touchup", () => (isDrawing = false), { passive: false });
  }
}

function createGrid(gridSize) {
  sketchpad.style.gridTemplate = `repeat(${gridSize}, 1fr) / repeat(${gridSize}, 1fr)`;
}

newSketchpad(gridSize.value);

// Changing color modes and button functionalities.

const buttons = document.querySelectorAll("button");
buttons.forEach((button) => button.addEventListener("click", activateButton));

function activateButton() {
  buttons.forEach((button) => button.classList.remove("button-selected"));
  this.classList.add("button-selected");
  let buttonSelected = this.attributes["id"].nodeValue;

  if (buttonSelected === "color") applyColorMode();
  else if (buttonSelected === "rainbow") {
    colorPicker.removeEventListener("input", updatePixelColor);
    isRainbow = true;
  } else if (buttonSelected === "transparent") applyTransparentEraserMode(buttonSelected);
  else if (buttonSelected === "eraser") applyTransparentEraserMode(buttonSelected);
  else {
    this.classList.remove("button-selected");
    newSketchpad(gridSize.value);
    document.querySelector("#color").classList.add("button-selected");
    colorPicker.value = "#263140";
    applyColorMode();
  }
}

function applyColorMode() {
  isRainbow = false;
  colorPicker.addEventListener("input", updatePixelColor);
  pixelColor = colorPicker.value;
}

function applyTransparentEraserMode(buttonSelected) {
  isRainbow = false;
  colorPicker.removeEventListener("input", updatePixelColor);
  if (buttonSelected === "eraser") pixelColor = "#fcfcfc";
  else pixelColor = buttonSelected;
}

// Updating pixelColor.

const colorPicker = document.querySelector("#color-picker");
colorPicker.addEventListener("input", updatePixelColor);

let pixelColor = colorPicker.value;
let isRainbow = false;

function updatePixelColor() {
  pixelColor = this.value;
}

function createRainbow() {
  return Math.floor(Math.random() * 16777216).toString(16);
}

// Using pixelColor to draw on sketchpad.

let isDrawing = false;

function startDrawing() {
  isDrawing = true;
  if (isRainbow === true) this.style.backgroundColor = `#${createRainbow()}`;
  else this.style.backgroundColor = pixelColor;
}

function continueDrawing() {
  if (isDrawing === true) {
    if (isRainbow === true) this.style.backgroundColor = `#${createRainbow()}`;
    else this.style.backgroundColor = pixelColor;
  }
}

// Vanta background script.

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
