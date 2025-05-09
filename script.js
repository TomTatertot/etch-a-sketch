const INIT_GRID_SIZE = 32;
const BUTTON_SELECTED_COLOR = "rgb(172, 172, 172)";
const BACKGROUND_COLOR = "rgb(255, 255, 255)";
const colorPicker = document.querySelector("#color-picker");
const clearButton = document.querySelector("#clear-board");
const gridSlider = document.querySelector("#grid-slider");
const toggleBorderButton = document.querySelector("#toggle-borders");
const brushButton = document.querySelector("#brush-mode");
const shadingButton = document.querySelector("#shading-mode");
const rainbowButton = document.querySelector("#rainbow-mode");
const eraserButton = document.querySelector("#eraser");
const lightenButton = document.querySelector("#lighten");
const buttons = document.querySelectorAll(".btn");
const modeButtons = document.querySelectorAll(".btn.mode");


let isMouseDown = false;
let shadingMode = false;
let rainbowMode = false;
let eraserMode = false;
let lightenMode = false;
let bordersVisible = true; 
let currentColorHex = colorPicker.value;

toggleBorderButton.style.backgroundColor = BUTTON_SELECTED_COLOR;
createGrid(INIT_GRID_SIZE);
addBoxClickListeners();

colorPicker.addEventListener("input", updateFirst);
colorPicker.addEventListener("change", watchColorPicker);

buttons.forEach((button) => {
    addButtonEffects(button);
});

modeButtons.forEach((button) => {
    addModeButtonEffects(button);
})

toggleBorderButton.addEventListener("click", handleToggleBorders);

shadingButton.addEventListener("click", () => {
    shadingMode = true;
})
rainbowButton.addEventListener("click", () => {
    rainbowMode = true;
})
eraserButton.addEventListener("click", () => {
    eraserMode = true;
})
lightenButton.addEventListener("click", () => {
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
    if (!isMouseDown)
        return;
    if (shadingMode){
        if (isClear(box)){
            box.style.backgroundColor = currentColorHex;
            addOpacity(box, 0.1);
        }
        else{
            incrementOpacity(box);
        }   
    }
    else if (lightenMode){
        decrementOpacity(box);
    }
    else if (rainbowMode){
        box.style.backgroundColor = getRandomColorRGBA();
    }
    else if (eraserMode){
        box.style.backgroundColor = BACKGROUND_COLOR;
    }
    else
    {
        box.style.backgroundColor = currentColorHex;   
    }

}

function handleBoxMouseUp(event){
    isMouseDown = false;
}

function handleBoxMouseDown(event){
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

function addModeButtonEffects(button){
    button.addEventListener("click", () => {
        setAllModesOff();
        button.style.backgroundColor = BUTTON_SELECTED_COLOR;
    });
}
function addButtonEffects(button){
    button.addEventListener("mouseenter", () => {
        button.classList.add("float-effect");
    });
    button.addEventListener("mouseleave", () => {
        button.classList.remove("float-effect");
    });
}
function addBoxClickListeners(){
    const rows = document.querySelectorAll(".rowDiv");
    rows.forEach((row) => {
        const boxes = row.querySelectorAll(".columnDiv");
        boxes.forEach((box) => {
            box.addEventListener("mouseover", handleBoxHover);
            box.addEventListener("mouseup", handleBoxMouseUp);
            box.addEventListener("mousedown", handleBoxMouseDown);
            box.addEventListener("click", handleBoxClick);
        })
    })
}

function resetBoard(){
    const rows = document.querySelectorAll(".rowDiv");
    rows.forEach((row) => {
        const boxes = row.querySelectorAll(".columnDiv");
        boxes.forEach((box) => {box.style.backgroundColor = BACKGROUND_COLOR;})
    })
}

function handleToggleBorders(){
    const columnBoxes = document.querySelectorAll(".columnDiv");
    if (bordersVisible){
        toggleBorderButton.style.backgroundColor = BACKGROUND_COLOR;
        columnBoxes.forEach((box) => { box.style.borderWidth = "0";})
    }
    else {
        columnBoxes.forEach((box) => {box.style.borderWidth = "1px";})
        toggleBorderButton.style.backgroundColor = BUTTON_SELECTED_COLOR;
    }
    bordersVisible = !bordersVisible;
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

function isClear(box){
    let colorString = getComputedStyle(box).backgroundColor;
    let opacity = getOpacity(colorString);    
    
    //white box
    if (opacity == 1 && colorString == BACKGROUND_COLOR){
        return true;
    }
    else if (opacity == 0){ //fully lightened box
        return true;
    }
    else{
        return false;
    }        
}

function setAllModesOff(){
    console.log(modeButtons);
    modeButtons.forEach((button) => {
        button.style.backgroundColor = BACKGROUND_COLOR;
    });
    isMouseDown = false;
    shadingMode = false;
    rainbowMode = false;
    eraserMode = false;
    lightenMode = false;
}
