const INIT_GRID_SIZE = 32;
const clearButton = document.querySelector("#clear-board")
const gridSlider = document.querySelector("#grid-slider");
const toggleBorderButton = document.querySelector("#toggle-borders");
const shadingButton = document.querySelector("#shading-mode");
const rainbowButton = document.querySelector("#rainbow-mode");
const eraserButton = document.querySelector("#eraser");
const lightenButton = document.querySelector("#lighten");
let isMouseDown = false;
let shadingMode = false;
let rainbowMode = false;
let eraserMode = false;
let lightenMode = false;
let bordersVisible = true; 

createGrid(INIT_GRID_SIZE);
addBoxClickListeners();
clearButton.addEventListener("click", () => {
    resetBoard();
})
gridSlider.addEventListener("input", handleSlider);
toggleBorderButton.addEventListener("click", toggleBorders);
shadingButton.addEventListener("click", () => {shadingMode = true;})

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
    if(isMouseDown)
    {
        if (shadingMode){
            const box = event.target;
            box.style.backgroundColor = "black";   
            let opacity = box.style.opacity;
            if (opacity === ""){
                opacity = "0.1"; 
            }
            opacity = parseFloat(opacity);
            opacity += 0.1;
            console.log(opacity);
            box.style.opacity = opacity.toString(); 
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

