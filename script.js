const MAX_HEIGHT = 16;
const MAX_WIDTH = 16;

const divContainer = document.querySelector(".container");


createGrid(MAX_HEIGHT, MAX_WIDTH);

function createGrid(height, width){
    for (let i = 0; i < MAX_WIDTH; i++){
        const rowDiv = document.createElement("div");
        rowDiv.className = "rowDiv";
        divContainer.appendChild(rowDiv);
        for (let j = 0; j < MAX_HEIGHT; j++){
            const columnDiv = document.createElement("div");
            columnDiv.className = "columnDiv";
            rowDiv.appendChild(columnDiv);
        }
    }
}
