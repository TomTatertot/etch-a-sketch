const INIT_GRID_SIZE = 32;
const colorPicker = document.querySelector("#color-picker");
const clearButton = document.querySelector("#clear-board");
const gridSlider = document.querySelector("#grid-slider");
const toggleBorderButton = document.querySelector("#toggle-borders");
const shadingButton = document.querySelector("#shading-mode");
const rainbowButton = document.querySelector("#rainbow-mode");
const eraserButton = document.querySelector("#eraser");
const lightenButton = document.querySelector("#lighten");
// const buttons = document.querySelectorAll(".btn");
let isMouseDown = false;
let shadingMode = false;
let rainbowMode = false;
let eraserMode = false;
let lightenMode = false;
let bordersVisible = true; 
let currentColorHex = colorPicker.value;
console.log(currentColorHex);

createGrid(INIT_GRID_SIZE);
addBoxClickListeners();
clearButton.addEventListener("click", () => {
    resetBoard();
})

colorPicker.addEventListener("input", updateFirst);
colorPicker.addEventListener("change", watchColorPicker);
gridSlider.addEventListener("input", handleSlider);
toggleBorderButton.addEventListener("click", toggleBorders);
shadingButton.addEventListener("click", () => {shadingMode = true;})
rainbowButton.addEventListener("click", () => {
    rainbowMode = true;
    shadingMode = false;
})

function createGrid(gridSize){
    const divContainer = document.querySelector(".grid-container");

    for (let i = 0; i < gridSize; i++){
        const rowDiv = document.createElement("div");
        rowDiv.className = "rowDiv";
        divContainer.appendChild(rowDiv);
        for (let j = 0; j < gridSize; j++){
            const columnDiv = document.createElement("div");
            columnDiv.className = "columnDiv";
            rowDiv.appendChild(columnDiv);
        }
    }
}

function clearGrid(){
    const rows = document.querySelectorAll(".rowDiv");
    rows.forEach((row) => {
        const rowBoxes = row.querySelectorAll(".columnDiv");
        rowBoxes.forEach((box) => {box.remove();})
        row.remove();
    })
}

function handleSlider(event){
    const gridSize = event.target.value;
    const gridSizeText = document.querySelector(".grid-size-text");
    gridSizeText.textContent = `Grid Size: ${gridSize} x ${gridSize}`;
    clearGrid();
    createGrid(gridSize, gridSize);
    addBoxClickListeners();
}

function handleBoxHover(event){
    const box = event.target;
    if(isMouseDown)
    {
        if (shadingMode){
            // box.style.backgroundColor = "black";   
            console.log(box.style.backgroundColor);
            console.log(getComputedStyle(box).backgroundColor);
            console.log(typeof(getComputedStyle(box).backgroundColor))
            // let opacity = box.style.opacity;
            // console.log(opacity);
            // opacity = parseFloat(opacity);
            // opacity += 0.1;
            // console.log(opacity);
            // box.style.opacity = opacity.toString(); 
        }
        else if (rainbowMode){
            box.style.backgroundColor = getRandomColorRGB();
        }
        else
        {
            event.target.style.backgroundColor = "black";   
        }
    }
    
}

function handleMouseUp(event){
    isMouseDown = false;
}

function handleMouseDown(event){
    event.preventDefault(); //prevent mouse drag on screen
    isMouseDown = true;
}

function addBoxClickListeners(){
    const rows = document.querySelectorAll(".rowDiv");
    rows.forEach((row) => {
        const boxes = row.querySelectorAll(".columnDiv");
        boxes.forEach((box) => {
            box.addEventListener("mouseover", handleBoxHover);
            box.addEventListener("mouseup", handleMouseUp);
            box.addEventListener("mousedown", handleMouseDown);
        })
    })
}

function resetBoard(){
    const rows = document.querySelectorAll(".rowDiv");
    rows.forEach((row) => {
        const boxes = row.querySelectorAll(".columnDiv");
        boxes.forEach((box) => {box.style.backgroundColor = "white";})
    })
}

function toggleBorders(){
    const columnBoxes = document.querySelectorAll(".columnDiv");

    if (bordersVisible){
        columnBoxes.forEach((box) => { box.style.borderWidth = "0";})
        bordersVisible = false;
    }
    else {
        columnBoxes.forEach((box) => {box.style.borderWidth = "1px";})
        bordersVisible = true;
    }
}

function getRandomColorRGB() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
}

function updateFirst(event) {
    currentColorHex = event.target.value;
}

function watchColorPicker(event) {
    currentColorHex = event.target.value;
}
