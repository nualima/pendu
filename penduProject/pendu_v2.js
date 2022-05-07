var correct_sound = new Audio("./ting.mp3");
var wrong_sound = new Audio("./foghi.mp3");
var fails = 0;
var success = 0;
let trashZone = document.querySelector("#letter_used");
let trash = document.createElement('p');
let answere = document.querySelector("#reponse");
let clavier = document.getElementById("clavier");
let resultas = document.getElementById("resultat");
let choix = document.getElementById("choix")
    // let choix = document.querySelector("#choix");
let onePlayer = document.querySelector("#solo");
let multiPlayer = document.querySelector("#multi");
let page = document.querySelector(".corps");
let word = document.querySelector("#word");
let pendu = document.querySelector("#pendu");
let valider = document.querySelector("#valider");
let modalFooter = document.querySelector(".modal-footer")


onePlayer.addEventListener("click", jeusolo);
multiPlayer.addEventListener("click", mot);
// valider.addEventListener("click", motus);

// let hide = document.querySelector(".masked");

function choice() {
    console.log("choice")
    page.style.backgroundColor = ("", "pink");
    clavier.className = ("hidden");
    choix.className = ('choix');
    resultat.className = ("hidden");
    word.className = ("hidden");
    pendu.className = ('hidden');
    console.log(clavier);


    // hide.style.visibility = "hidden";

}

function mot() {
    console.log("mot")
    choix.className = ('hidden');
    word.className = ("word");
    motus();
};

function motus() {
    do {
        newWord = "";
        modalFooter.innerHTML = "";
        modalFooter.innerHTML = '<input id="newWord" class="form-control " type="text" placeholder="Readonly input here…"></input><button id="valider" type="button" class="btn btn-primary">Valider </button>';
        var newWord = document.getElementById("newWord").value;

        console.log("test");
        console.log(newWord);
        var newWord = document.getElementById("newWord").value;
        tool_tip_str = '!#$%^&&*()<>\'\"';
    }
    // while (newWord.length < 1 | newWord.length > 10);
    while (newWord.length > 100)
    // jeusolo();
    jeumulti();
}

function jeumulti() {
    let pendu = document.querySelector("#pendu");

    let page = document.querySelector(".corps");

    choix.className = ('hidden');
    pendu.className = ('pendu');
    word.className = ('hidden');


    clavier.className = ("d-flex flex-wrap justify-content-between visible");
    resultat.className = ("visible");
    page.style.backgroundColor = ("pink ", "");

    function correct() {
        correct_sound.currentTime = 0;
        correct_sound.play();
    }

    function wrong() {
        wrong_sound.currentTime = 0;
        wrong_sound.play();
    }

    const random = DICO[Math.floor(Math.random() * DICO.length)];
    console.log(random);

    function checkSuccess(taille, nbSuccess) {
        if (taille === nbSuccess) {
            setTimeout(() => {
                alert('BRAVO ! Le mot était "' + random + '"');

                reset();
            });
        }
    }


    for (i = 0; i < random.length; i++) {
        let letter = document.createElement('p');
        let answereZone = document.createTextNode("_");

        function pendu(random) {
            answere.append(letter);
            letter.classList.add("a" + random.charCodeAt(i));
            letter.append(answereZone);
        }
        pendu(random)
    };

    var newrandom = [];

    for (let caracter of random) {
        // console.log(caracter);
        newrandom.push(caracter.charCodeAt());
    }

    function applyListener(buttonToListen, codeAscii) {
        buttonToListen.addEventListener("click", function() {
            this.setAttribute('disabled', '');
            this.style.backgroundColor = "lightgray";

            let trashLetter = document.createTextNode(String.fromCharCode(codeAscii) + "-");

            trash.append(trashLetter);
            trashZone.append(trash);

            if (newrandom.includes(parseInt(this.classList[0]))) {
                correct();

                var elements = document.querySelectorAll('.a' + this.classList[0]);

                for (let el of elements) {
                    el.innerHTML = String.fromCharCode(this.classList[0]);

                    success += 1;
                }

                checkSuccess(newrandom.length, success);
            } else {
                wrong();

                if (fails < 8) {
                    document.querySelector(".vie" + fails).style.display = "none";
                    fails += 1
                    console.log(fails)
                } else {
                    document.querySelector(".vie8").style.display = "none";

                    setTimeout(() => {
                        alert("GAME OVER ! Le mot était " + random + " !");
                        reset();
                    });

                }
            }
        });
    }

    // TODO Passer par une fonction pour créer le clavier
    function keyboard() {
        for (i = 122; i >= 97; i--) {
            let newButton = document.createElement('button');

            let alphabet = document.createTextNode(String.fromCharCode(i));
            clavier.prepend(newButton);
            newButton.append(alphabet);
            newButton.classList.add(i);
            applyListener(newButton, i);

        }

    }
    keyboard();
}

function jeusolo() {

    let pendu = document.querySelector("#pendu");

    let page = document.querySelector(".corps");
    choix.className = ('hidden');
    pendu.className = ('vies');

    console.log(pendu)


    clavier.className = ("d-flex flex-wrap justify-content-between visible");
    resultat.className = ("visible")
    console.log(clavier)
    page.style.backgroundColor = ("pink ", "");

    function correct() {
        correct_sound.currentTime = 0;
        correct_sound.play();
    }

    function wrong() {
        wrong_sound.currentTime = 0;
        wrong_sound.play();
    }

    const random = DICO[Math.floor(Math.random() * DICO.length)];
    console.log(random);

    function checkSuccess(taille, nbSuccess) {
        if (taille === nbSuccess) {
            setTimeout(() => {
                alert('BRAVO ! Le mot était "' + random + '"');

                reset();
                // jeusolo();
            });
        }
    }


    for (i = 0; i < random.length; i++) {
        let letter = document.createElement('p')
        let answereZone = document.createTextNode("_");

        function pendu(random) {
            answere.append(letter);
            letter.classList.add("a" + random.charCodeAt(i))
            letter.append(answereZone)
        }
        pendu(random)
    };

    var newrandom = [];

    for (let caracter of random) {
        // console.log(caracter);
        newrandom.push(caracter.charCodeAt());
    }

    function applyListener(buttonToListen, codeAscii) {
        buttonToListen.addEventListener("click", function() {
            this.setAttribute('disabled', '');
            this.style.backgroundColor = "lightgray";

            let trashLetter = document.createTextNode(String.fromCharCode(codeAscii) + "-");

            trash.append(trashLetter);
            trashZone.append(trash);

            if (newrandom.includes(parseInt(this.classList[0]))) {
                correct();

                var elements = document.querySelectorAll('.a' + this.classList[0]);

                for (let el of elements) {
                    el.innerHTML = String.fromCharCode(this.classList[0]);

                    success += 1;
                }

                checkSuccess(newrandom.length, success);
            } else {
                wrong();

                if (fails < 8) {
                    document.querySelector(".vie" + fails).style.display = "none";
                    fails += 1
                    console.log(fails)
                } else {
                    document.querySelector(".vie8").style.display = "none";

                    setTimeout(() => {
                        alert("GAME OVER ! Le mot était " + random + " !");
                        reset();
                    });

                }
            }
        });
    }

    // TODO Passer par une fonction pour créer le clavier
    function keyboard() {
        for (i = 122; i >= 97; i--) {
            let newButton = document.createElement('button');

            let alphabet = document.createTextNode(String.fromCharCode(i));
            clavier.prepend(newButton);
            newButton.append(alphabet);
            newButton.classList.add(i);
            applyListener(newButton, i);

        }

    }
    keyboard();
};

function reset() {
    console.log("reset");
    answere.innerHTML = "";
    trashZone.innerHTML = "";
    trash.innerHTML = "";
    clavier.innerHTML = "";
    console.log(clavier);
    for (let i = 0; i < 8; i++) {
        document.querySelector(".vie" + i).style.display = "";
    }
    newWord.innerHTML = "";

    fails = 0;
    success = 0;
    choice();
}

choice();
// jeusolo();


// TODO Passer par une fonction pour gérer les listeners