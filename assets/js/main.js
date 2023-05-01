//===FunctionStart======================================================

//Funzione per generare un numero casuale in un range.
function createRandomNumber(min, max) {
    return Math.floor(Math.random() * (min, max)+min)
}

//funzione per creare delle "bombe"
function generateBombs(numberBomb, maxCell) {
    let bombs = [];
    
    while (bombs.length < numberBomb) { //finche l' array non e maggiore del valore dato per creare le bombe
        let nuovoNumero = createRandomNumber(1, maxCell);

        if( ! bombs.includes(nuovoNumero)) { //se nel array bombs non vi è un numnero uguale a quello appena creato
            bombs.push(nuovoNumero); //allora lo pusho nel array.
        }
    }
    return bombs;
}

//Crea un elemento HTML con classe e contenuto
function createObj(tagHtml, classe, content) {
    let obj = document.createElement(tagHtml);
    obj.classList.add(classe);
    obj.innerText = content;

    return obj;
}

//===FunctionEnd======================================================

//===ElementStart======================================================
const btnStartGame = document.querySelector("#startGame");
const difficulty = document.querySelector("#difficulty");
const footer = document.querySelector(".footer");

let bombs = [];


//===ElementEnd======================================================

//===EventListStart======================================================
btnStartGame.addEventListener("click", function() {
        //Prendo il main della pagina
        const main = document.querySelector(".main");
        main.innerHTML = "";
        //prendo la difficolta del Game
        let difficulty = Number(document.querySelector("#difficulty").value);
        
        let gameOver = false;
        let point = 0;

        
        let bombe = generateBombs(16, difficulty);
        console.log(bombe);
        
        
        //Creo una DIV griglia, e gli aggiungo la classe
        let grid = document.createElement("div");
        grid.classList.add("grid");
    
        //Creiamo n celle

        let nCellTot = difficulty;
        let misura = `calc(100% / ${Math.ceil(Math.sqrt(nCellTot))})`; //radice quadrata di nCellTot
    
        for (let i = 0; i < nCellTot; i++) {
            let cella = createObj("div", "cell", i+1);
            cella.style.width = misura;
            cella.style.heigt = misura;
            if (bombe.includes(i+1)) {
                cella.classList.add("bomb")
            }
            //intanto che creo le celle gli aggiun un EventListner
            cella.addEventListener("click", function(){
                
                let currentCell = Number(this.innerText)
                
                
                if (gameOver == false) {
                    if (bombe.includes(currentCell)) {
                        this.classList.add("clicked-bomb")
                        console.log("bomba");
                        gameOver = true;
                        let allBomb = document.querySelectorAll(".bomb")
                        allBomb.forEach(cella => {
                            cella.style.backgroundColor = "red";
                        })
                        main.innerHTML += `hai totalizzato: ${ point } point <br> GAMEOVER`

                    } else if (! this.classList.contains("clicked")) {
                        this.classList.add("clicked")
                            point++
                            console.log(point);
                            let score = document.getElementById("score");
                            score.innerHTML = point;
                            
                    }                
                }
            })
        
            grid.append(cella);
        }
        //Appendo la griglia al main
        main.appendChild(grid);
})
//===EventListEnd======================================================