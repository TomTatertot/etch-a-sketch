const INIT_GRID_SIZE = 32;
const clearButton = document.querySelector("#clear-board")
const gridSlider = document.querySelector("#grid-slider");
const toggleBorderButton = document.querySelector("#toggle-border");
const shadingButton = document.querySelector("#shading-mode");
const rainbowButton = document.querySelector("#rainbow-mode");
const eraserButton = document.querySelector("#eraser");
const lightenButton = document.querySelector("#lighten");
let isMouseDown = false;
let shadingMode = false;
let rainbowMode = false;
let eraserMode = false;
let lightenMode = false;
let toggleBorders = true; 

createGrid(INIT_GRID_SIZE);
addBoxClickListeners();

clearButton.addEventListener("click", () => {
    resetBoard();
})

gridSlider.addEventListener("input", handleSlider);



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
        rowBoxes.forEach((box) => {
            box.remove();
        })
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
    let red = true;
    if(isMouseDown)
    {
        if (shadingMode){

        }
        event.target.style.backgroundColor = "black";
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
        boxes.forEach((box) => {
            box.style.backgroundColor = "white";
        })
    })
}
