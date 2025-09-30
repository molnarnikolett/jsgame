function showGameOver(score) {
    const modal = document.getElementById("game-over-modal");
    const scoreDisplay = document.getElementById("final-score");
    scoreDisplay.textContent = `Pontszám: ${score}`;
    modal.style.display = "flex";
}

function findParentName(searchName) {
    for (let i = 0; i < evolutions.length; i++) {
        const steps = evolutions[i].steps;
        for (let j = 0; j < steps.length; j++) {
            if (steps[j].name === searchName) {
                return evolutions[i].name;
            }
        }
    }
}

function countScore(id) {
    modifiedid = id.replace(/\s+/g, "");
    let scoreboard = document.querySelector("#" + modifiedid);
    let text = scoreboard?.innerHTML;
    let allind = text.length;
    let num = parseInt(text[allind - 1]);
    num = num + parseInt(text[allind - 2]) * 10;
    let evolution = evolutions.find(evolution => evolution.name === id);
    let point = parseInt(evolution.points);
    num = num + point;
    let newText;

    if (num < 10) {
        newText = text.slice(0, -2) + "0" + num;
    }
    else {
        newText = text.slice(0, -2) + num
    }

    scoreboard.innerHTML = newText;


    let score = document.querySelector("#score");
    let scoretext = score?.innerHTML;
    let scorelength = scoretext.length;
    let scorenum = point + parseInt(scoretext[scorelength - 1]);
    scorenum = scorenum + parseInt(scoretext[scorelength - 2]) * 10;
    scorenum = scorenum + parseInt(scoretext[scorelength - 3]) * 100;
    scorenum = scorenum + parseInt(scoretext[scorelength - 4]) * 1000;
    scorenum = scorenum + parseInt(scoretext[scorelength - 5]) * 10000;

    let newScoreText;

    if (scorenum < 10) {
        newScoreText = scoretext.slice(0, -6) + "00000" + scorenum;
    }
    if (scorenum < 100 && scorenum >= 10) {
        newScoreText = scoretext.slice(0, -6) + "0000" + scorenum;
    }
    if (scorenum < 1000 && scorenum >= 100) {
        newScoreText = scoretext.slice(0, -6) + "000" + scorenum;
    }
    if (scorenum < 10000 && scorenum >= 1000) {
        newScoreText = scoretext.slice(0, -6) + "00" + scorenum;
    }
    if (scorenum >= 10000) {
        newScoreText = scoretext.slice(0, -6) + scorenum;
    }

    console.log(scorenum);

    score.innerHTML = newScoreText;
}

let hoverTimeout;

function showImage(imgSrc, description, name, event) {
    const tooltip = document.createElement("div");
    tooltip.style.position = "absolute";
    tooltip.style.zIndex = "1000";
    tooltip.style.left = `${event.pageX + 15}px`;
    tooltip.style.top = `${event.pageY + 15}px`;
    tooltip.style.backgroundColor = "white";
    tooltip.style.border = "1px solid #ccc";
    tooltip.style.padding = "10px";
    tooltip.style.borderRadius = "8px";
    tooltip.style.boxShadow = "0 0 10px rgba(0,0,0,0.2)";
    tooltip.style.pointerEvents = "none";

    const popImage = new Image();
    popImage.src = imgSrc;
    popImage.style.width = "500px";
    popImage.style.display = "block";
    popImage.style.marginBottom = "8px";

    const nm = document.createElement("p");
    nm.textContent = name;
    nm.style.margin = "0";
    nm.style.fontSize = "16px";
    nm.style.color = "#333";

    const desc = document.createElement("p");
    desc.textContent = description;
    desc.style.margin = "0";
    desc.style.fontSize = "12px";
    desc.style.color = "#333";

    tooltip.appendChild(nm);
    tooltip.appendChild(desc);
    tooltip.appendChild(popImage);

    document.body.appendChild(tooltip);
    window._currentTooltip = tooltip;
}

function hideImage() {
    if (window._currentTooltip) {
        document.body.removeChild(window._currentTooltip);
        window._currentTooltip = null;
    }
}

function getRandomTechnology(level) {
    const matchingEvolutions = evolutions.filter(e =>
        matchEvolution(level, e.difficulty)
    );
    if (matchingEvolutions.length === 0) return null;

    const randomEvolution = matchingEvolutions[Math.floor(Math.random() * matchingEvolutions.length)];
    const step = randomEvolution.steps[0];

    return {
        name: step.name,
        img: step.img,
        currentStep: 1,
        fullSteps: randomEvolution.steps
    };
}

function generateTechnologies(level) {
    let numberOfTechnologies = 4;
    if (level === "medium") numberOfTechnologies = 6;
    else if (level === "hard") numberOfTechnologies = 8;

    const techs = [];

    while (techs.length < numberOfTechnologies) {
        const tech = getRandomTechnology(level);

        if (tech) {
            techs.push(tech);
        }
    }

    return techs;
}

function randomNumbers(level) {
    let numbers = []
    let numberOfTechnologies = 4;
    if (level === "medium") numberOfTechnologies = 6;
    else if (level === "hard") numberOfTechnologies = 8;
    for (i = 0; i < numberOfTechnologies; i++) {
        let randomnum = Math.round(Math.random() * numberOfTechnologies * numberOfTechnologies);
        while (numbers.includes(randomnum)) {
            randomnum = Math.round(Math.random() * numberOfTechnologies * numberOfTechnologies);
        }
        numbers.push(randomnum);
    }
    return numbers
}


function matchEvolution(level, evolution) {
    if (level === "easy") {
        if (evolution === "easy") {
            return true
        }
    }

    if (level === "medium") {
        if (evolution === "easy" || evolution === "medium") {
            return true
        }
    }

    if (level === "hard") {
        return true
    }
    return false
}

const currentPage = window.location.pathname;

if (currentPage.includes("login.html")) {
    const playButton = document.querySelector("#play");
    playButton.addEventListener('click', function () {
        const difficulty = document.querySelector("#difficulty").value;
        const playername = document.querySelector("#name").value;
        const encodedName = encodeURIComponent(playername);

        window.location.href = `game.html?difficulty=${difficulty}&name=${encodedName}`;
    });
}

if (currentPage.includes("game.html")) {
    const params = new URLSearchParams(window.location.search);
    const difficulty = params.get("difficulty");
    const playername = params.get("name");
    const table = document.querySelector("table");

    const selectedLevel = levels[difficulty];

    const { name, points, time, cols, rows } = selectedLevel;

    function drawTable(rows, cols) {
        table.innerHTML = "";
        for (let i = 0; i < rows; i++) {
            const tr = document.createElement("tr");
            for (let j = 0; j < cols; j++) {
                const td = document.createElement("td");
                tr.appendChild(td);
            }
            table.appendChild(tr);
        }
    }

    drawTable(selectedLevel.rows, selectedLevel.cols);

    document.querySelector("#playername").innerText += " " + playername;
    document.querySelector("#gamedifficulty").innerText += " " + difficulty.toUpperCase();
    document.querySelector("#time").innerText += " " + levels[difficulty].time;

    let currentLevel;
    switch (difficulty) {
        case "easy":
            currentLevel = levels.easy;
            drawTable(currentLevel.cols, currentLevel.rows);
            break;
        case "medium":
            currentLevel = levels.medium;
            drawTable(currentLevel.cols, currentLevel.rows);
            break;
        case "hard":
            currentLevel = levels.hard;
            drawTable(currentLevel.cols, currentLevel.rows);
            break;
        default:
            currentLevel = levels.easy;
            drawTable(currentLevel.cols, currentLevel.rows);
    }

    const techs = generateTechnologies(difficulty);
    const indexesToFill = randomNumbers(difficulty);


    let techCount = 0;
    let selectedTech = [];

    function drawNewTech(indexes, level, selectedTech) {
        const techs = generateTechnologies(level);
        const tableCells = table.querySelectorAll("td");
        let cellIndex = 0;
        let techCount = 0;

        tableCells.forEach(cell => {
            if (indexes.includes(cellIndex) && cell.childElementCount == 0) {
                const img = document.createElement("img");
                img.src = techs[techCount].img;
                img.alt = techs[techCount].name;
                img.title = techs[techCount].name;
                img.style.width = "50px";
                img.style.height = "50px";
                img.id = cellIndex.toString();
                img.dataset.currentStep = 1;
                cell.appendChild(img);

                img.addEventListener("mouseenter", (mouseenter) => {
                    hoverTimeout = setTimeout(() => {
                        let name = img.alt;
                        let parentname = findParentName(name);
                        let evolution = evolutions.find(evolution => evolution.name === parentname);
                        let description = evolution.description;
                        let tooltip = evolution.tooltip;
                        if (tooltip) {
                            showImage(`evolutionimg/${tooltip}`, description, name, mouseenter);
                        }
                    }, 3000);
                });

                img.addEventListener("mouseleave", () => {
                    clearTimeout(hoverTimeout);
                    hideImage();
                });

                img.addEventListener("click", () => {
                    const techName = img.alt;
                    const currentStep = parseInt(img.dataset.currentStep) || 1;

                    if (selectedTech.includes(img)) {
                        img.classList.remove("selected");
                        const index = selectedTech.indexOf(img);
                        selectedTech.pop();
                        return;
                    }

                    if (!(selectedTech.includes(img)) && selectedTech.length < 2) {

                        if (img.dataset.currentStep === "6") {
                            let id = findParentName(techName);
                            console.log(id);
                            countScore(id);
                            img.remove();
                            return
                        }
                        selectedTech.push(img);
                        img.classList.add("selected");
                    }
                    console.log(selectedTech);

                    if (selectedTech.length === 2) {
                        const [firstTech, secondTech] = selectedTech;
                        if (firstTech.alt === secondTech.alt && firstTech.dataset.currentStep === secondTech.dataset.currentStep) {
                            const evolution = evolutions.find(evolution => evolution.steps.some(step => step.name === techName && step.step === currentStep));
                            if (evolution && currentStep < evolution.steps.length) {
                                const nextStep = evolution.steps[currentStep];
                                secondTech.src = nextStep.img;
                                secondTech.alt = nextStep.name;
                                secondTech.title = nextStep.name;
                                secondTech.dataset.currentStep = currentStep + 1;
                                firstTech.classList.remove("selected");
                                secondTech.classList.remove("selected");
                                selectedTech.pop();
                                let newtechs = generateTechnologies(difficulty);

                                firstTech.src = newtechs[0].img;
                                firstTech.alt = newtechs[0].name;
                                firstTech.title = newtechs[0].name;
                                firstTech.style.width = "50px";
                                firstTech.style.height = "50px";
                                firstTech.id = cellIndex.toString();
                                firstTech.dataset.currentStep = 1;
                                selectedTech.pop();
                                console.log(selectedTech);
                            }
                        }
                    }
                });

                techCount++;
            }
            cellIndex++;

        });
    }

    drawNewTech(indexesToFill, difficulty, selectedTech)

    let draw = document.querySelector("#draw");

    draw.addEventListener("click", () => {
        let randomIndex = [];
        let randomnumber = 0;

        if (difficulty === "easy") {
            randomnumber = Math.round(Math.random() * 15);
            randomIndex.push(randomnumber);
        }

        if (difficulty === "medium") {
            randomnumber = Math.round(Math.random() * 35);
            randomIndex.push(randomnumber);
        }

        if (difficulty === "hard") {
            randomnumber = Math.round(Math.random() * 63);
            randomIndex.push(randomnumber);

        }

        drawNewTech(randomIndex, difficulty, selectedTech)
    });

    const tableCells = document.querySelectorAll("td");

    tableCells.forEach((cell, index) => {
        cell.addEventListener("click", () => {
            let indexes = [];
            indexes.push(index);
            drawNewTech(indexes, difficulty, selectedTech);
            indexes = [];
        });
    });

    let timeDisplay = document.querySelector("#time");
    let remainingTime = time * 60;

    updateDisplay();

    const timer = setInterval(() => {
        remainingTime--;

        updateDisplay();

        if (remainingTime <= 0) {
            let score = document.querySelector("#score")
            let scoretext = score.innerHTML;
            clearInterval(timer);
            showGameOver(scoretext);
        }
    }, 1000);

    function updateDisplay() {
        const minutes = Math.floor(remainingTime / 60);
        const seconds = remainingTime % 60;
        timeDisplay.innerHTML = "Time: " + `${minutes}:${seconds.toString().padStart(2, '0')}`;
    }

}