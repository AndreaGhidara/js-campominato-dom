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
    
    while(bombs.length !== 16) {
        const bomb = getRandomNumber(min, max);
        if (!bombs.includes(bomb)) {
            bombs.push(bomb)
        }
    }
}

function clicked(box) {
    
    let numberSquere = Number(box.innerText);
    
    if (bombs.includes(numberSquere)) {
        let test = document.querySelectorAll(".bomb");
        test.forEach(box => {
            box.style.backgroundColor = 'red';
        })
        
        square.removeEventListener("click", function() {
            
        });
        
        console.log("Hai perso totalizzando " + points + " punti");
    } else {
        points ++;
        console.log(points);
    }

    box.classList.replace("unclicked","clicked");
    
    if (points == difficulty - 16) {
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
    
    generateBombs(1, difficulty);
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

        if (bombs.includes(i)) {
            square.classList.add("bomb")
        }

        container.append(square);

        square.addEventListener("click", function(){
            clicked(square);
            // console.log(i);
        })
        
    }
})


