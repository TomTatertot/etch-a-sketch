const MAX_HEIGHT = 32;
const MAX_WIDTH = 32;

createGrid(MAX_WIDTH, MAX_HEIGHT);
addHoverListeners();

const clearButton = document.querySelector("#clear-board")
const gridSlider = document.querySelector("#grid-slider");

clearButton.addEventListener("click", () => {
    resetBoard();
})

gridSlider.addEventListener("input", () => {
    const inputWidth = gridSlider.value;
    const inputHeight = inputWidth;
    const gridSizeText = document.querySelector(".grid-size-text");
    gridSizeText.textContent = `Grid Size: ${inputWidth} x ${inputHeight}`;
    clearGrid();
    createGrid(inputWidth, inputHeight);
    addHoverListeners();
})

function createGrid(width, height){
    const divContainer = document.querySelector(".grid-container");

    for (let i = 0; i < width; i++){
        const rowDiv = document.createElement("div");
        rowDiv.className = "rowDiv";
        divContainer.appendChild(rowDiv);
        for (let j = 0; j < height; j++){
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

function handleHover(event){
     event.target.style.backgroundColor = "black";
    
}

function addHoverListeners(){
    const rows = document.querySelectorAll(".rowDiv");
    rows.forEach((row) => {
        const boxes = row.querySelectorAll(".columnDiv");
        boxes.forEach((box) => {
            box.addEventListener("mouseover", handleHover);
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
