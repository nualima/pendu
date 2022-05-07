var correct_sound = new Audio("./ting.mp3");
var wrong_sound = new Audio("./foghi.mp3");
var fails = 0;
var success = 0;
let trashZone = document.querySelector("#letter_used");
let trash = document.createElement('p');
let answere = document.querySelector("#reponse");
let clavier = document.querySelector("#clavier");


function jeu() {
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
                jeu();
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
                        jeu();
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
    answere.innerHTML = "";
    trashZone.innerHTML = "";
    trash.innerHTML = "";
    clavier.innerHTML = "";
    for (let i = 0; i < 8; i++) {
        document.querySelector(".vie" + i).style.display = "";
    }

    fails = 0;
    success = 0;
}
jeu();


// TODO Passer par une fonction pour gérer les listeners