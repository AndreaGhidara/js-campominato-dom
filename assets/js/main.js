const container = document.querySelector(".container");
const btnCreateTable = document.querySelector("#createTable");
const levelDifficuly = document.querySelector("#difficultyLevel");

let difficulty;
let bombs = [];
let points = 0;

//===startFunzioni==================================================================
//Genera Numeri casuali
function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}
//Crea Elementi
function createElements(tagHtml, classe, contenuto) {

    //Creiamo una cella
    const cell = document.createElement(tagHtml);
    cell.classList.add(classe);
    cell.innerText = contenuto;
    return cell;
}
//Crea delle bombe
function generateBombs(min, max) {
    
    while(bombs.length !== 48) {
        const bomb = getRandomNumber(min, max)
        if (!bombs.includes(bomb)) {
            bombs.push(bomb)
        }
    }
}

function clicked(box) {
    
    let numberSquere = Number(box.innerText);
    
    if (bombs.includes(numberSquere)) {
        alert("Hai perso totalizzando " + points + " punti");
        container.innerHTML = "";
        points = 0;
    }else {
        points ++;
        console.log(points);
    }
    box.classList.replace("unclicked","clicked");
    
    if (points == difficulty - 48) {
        let test = document.querySelectorAll(".unclicked");
        test.forEach(box => {
            box.style.backgroundColor = 'red';
            
        })
    }
}

//===endFunzioni==================================================================

//===startEvent==================================================================

btnCreateTable.addEventListener("click", function(){
    container.innerHTML = "";
    difficulty = Number(levelDifficuly.value);
    
    generateBombs(1, difficulty)
    console.log(bombs);

    for (let i = 1; i <= difficulty ; i++) {
        
        let square = createElements("div", "square", i);
        square.classList.add("unclicked");
        
        if (difficulty == 49) {
            square.classList.add("easySquere");
        }
        
        if (difficulty == 81) {
            square.classList.add("mediumSquere");
        }
        
        if (difficulty == 100) {
            square.classList.add("hardSquere");
        }

        container.append(square)
        
        square.addEventListener("click", function(){
            clicked(square);
            // console.log(i);
        })
        
    }
})



