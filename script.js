const INIT_GRID_SIZE = 32;
const colorPicker = document.querySelector("#color-picker");
const clearButton = document.querySelector("#clear-board");
const gridSlider = document.querySelector("#grid-slider");
const toggleBorderButton = document.querySelector("#toggle-borders");
const brushButton = document.querySelector("#brush-mode");
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
let currentColorHex = colorPicker.value;

createGrid(INIT_GRID_SIZE);
addBoxClickListeners();

colorPicker.addEventListener("input", updateFirst);
colorPicker.addEventListener("change", watchColorPicker);
toggleBorderButton.addEventListener("click", toggleBorders);
brushButton.addEventListener("click", () => {
    setAllModesOff();
})
shadingButton.addEventListener("click", () => {
    setAllModesOff();
    shadingMode = true;
})
rainbowButton.addEventListener("click", () => {
    setAllModesOff();
    rainbowMode = true;
})
eraserButton.addEventListener("click", () => {
    setAllModesOff();
    eraserMode = true;
})
lightenButton.addEventListener("click", () => {
    setAllModesOff();
    lightenMode = true;
})
gridSlider.addEventListener("input", handleSlider);
clearButton.addEventListener("click", () => {
    resetBoard();
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
        console.log(getComputedStyle(box).backgroundColor);
        if (shadingMode){
            let colorString = getComputedStyle(box).backgroundColor;
            let opacity = getOpacity(colorString);    

            if (opacity == 1 && colorString == "rgb(255, 255, 255)"){
                box.style.backgroundColor = currentColorHex;
                addOpacity(box, 0.1);
            }
            else if (opacity == 0){
                box.style.backgroundColor = currentColorHex;
                addOpacity(box, 0.1);
            }
            else{
                incrementOpacity(box);
            }        
        }
        else if (lightenMode){
            let colorString = getComputedStyle(box).backgroundColor;
            let opacity = getOpacity(colorString);

            console.log(opacity);
            if (opacity > 0){
                decrementOpacity(box);
            } 
        }
        else if (rainbowMode){
            box.style.backgroundColor = getRandomColorRGBA();
        }
        else if (eraserMode){
            box.style.backgroundColor = "white";
        }
        else
        {
            box.style.backgroundColor = currentColorHex;   
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

function handleBoxClick(event){
    if (shadingMode){
        
    }
    else if (rainbowMode){
        event.target.style.backgroundColor = getRandomColorRGBA();
    }
    else {
        event.target.style.backgroundColor = currentColorHex;
    }
}
function addBoxClickListeners(){
    const rows = document.querySelectorAll(".rowDiv");
    rows.forEach((row) => {
        const boxes = row.querySelectorAll(".columnDiv");
        boxes.forEach((box) => {
            box.addEventListener("mouseover", handleBoxHover);
            box.addEventListener("mouseup", handleMouseUp);
            box.addEventListener("mousedown", handleMouseDown);
            box.addEventListener("click", handleBoxClick);
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

function getRandomColorRGBA() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r} ${g} ${b} / 100%)`;
}

function updateFirst(event) {
    currentColorHex = event.target.value;
}

function watchColorPicker(event) {
    currentColorHex = event.target.value;
}

function incrementOpacity(box){
    let colorStr = getComputedStyle(box).backgroundColor; 
    let opacity = getOpacity(colorStr);
    if (opacity < 1.0){
        let strArray = colorStr.split(",");
        strArray[3] = ` ${opacity + 0.1})`;
        box.style.backgroundColor = strArray.toString();
    }
}

function decrementOpacity(box){
    let colorStr = getComputedStyle(box).backgroundColor; 
    let opacity = getOpacity(colorStr);
    if (opacity == 1){
        addOpacity(box, 0.9);
    }
    if (opacity > 0){
        let strArray = colorStr.split(",");
        strArray[3] = ` ${opacity - 0.1})`;
        box.style.backgroundColor = strArray.toString();
    }
}

function addOpacity(box, opacity){
    let colorStr = getComputedStyle(box).backgroundColor; 
    box.style.backgroundColor = colorStr.replace(")", `, ${opacity})`);
}
function getOpacity(rgbStr){
    const numVariables = rgbStr.split(",").length;
    if (numVariables < 4)
        return 1;
    else {
        let strArray = rgbStr.split(",");
        opacityString = strArray[3].slice(0, -1);
        return parseFloat(opacityString);
    }
}

function setAllModesOff(){
    isMouseDown = false;
    shadingMode = false;
    rainbowMode = false;
    eraserMode = false;
    lightenMode = false;
}
