const LINHAS = 20;
const COLUNAS = 10;

let tabuleiro = [];
let tipoPeca = 0;
const PECAS = [

    // I
    [
        [1],
        [1],
        [1],
        [1]
    ],

    // O
    [
        [1, 1],
        [1, 1]
    ],

    // T
    [
        [0, 1, 0],
        [1, 1, 1]
    ],

    // L
    [
        [1, 0],
        [1, 0],
        [1, 1]
    ],

    // J
    [
        [0, 1],
        [0, 1],
        [1, 1]
    ],

    // S
    [
        [0, 1, 1],
        [1, 1, 0]
    ],

    // Z
    [
        [1, 1, 0],
        [0, 1, 1]
    ]

];
const CORES = [
    "cyan",     // I
    "yellow",   // O
    "purple",   // T
    "orange",   // L
    "blue",     // J
    "lime",     // S
    "red"       // Z
];
let corPeca = "cyan";


let pecaLinha = 0;
let pecaColuna = 9;

function criarTabuleiro() {

    for (let linha = 0; linha < LINHAS; linha++) {

        tabuleiro[linha] = [];

        for (let coluna = 0; coluna < COLUNAS; coluna++) {

            tabuleiro[linha][coluna] = 0;

        }
    }
}

function desenharTabuleiro() {

    const elemento = document.getElementById("tabuleiro");

    elemento.innerHTML = "";

    for (let linha = 0; linha < LINHAS; linha++) {

        for (let coluna = 0; coluna < COLUNAS; coluna++) {

            let ocupada = tabuleiro[linha][coluna] !== 0;

            for (let pLinha = 0; pLinha < peca.length; pLinha++) {

                for (let pColuna = 0; pColuna < peca[pLinha].length; pColuna++) {

                    if (peca[pLinha][pColuna] === 1) {

                        let linhaPeca = pecaLinha + pLinha;
                        let colunaPeca = pecaColuna + pColuna;

                        if (
                            linha === linhaPeca &&
                            coluna === colunaPeca
                        ) {
                            ocupada = true;
                        }
                    }
                }
            }

            const celula = document.createElement("div");

            celula.classList.add("celula");

            if (ocupada) {

                celula.classList.add("peca");

                if (tabuleiro[linha][coluna] !== 0) {
                    celula.style.backgroundColor =
                        obterCor(tabuleiro[linha][coluna]);
                } else {
                    celula.style.backgroundColor = corPeca;
                }
            }

            elemento.appendChild(celula);
        }
    }
}

function escolherPeca() {

    tipoPeca = Math.floor(Math.random() * PECAS.length);

    corPeca = CORES[tipoPeca];

    return PECAS[tipoPeca];
}


function moverPecaParaBaixo() {

    if (podeMover(pecaLinha + 1, pecaColuna)) {

        pecaLinha++;

    } else {

        fixarPeca();
        removerLinhas();
        novaPeca();

    }

    desenharTabuleiro();
}


function fixarPeca() {

    for (let pLinha = 0; pLinha < peca.length; pLinha++) {

        for (let pColuna = 0; pColuna < peca[pLinha].length; pColuna++) {

            if (peca[pLinha][pColuna] === 1) {

                let linha = pecaLinha + pLinha;
                let coluna = pecaColuna + pColuna;

                tabuleiro[linha][coluna] = tipoPeca + 1;
            }
        }
    }
}

function novaPeca() {

    peca = escolherPeca();

    pecaLinha = 0;

    pecaColuna = Math.floor(
        (COLUNAS - peca[0].length) / 2
    );
}

function podeMover(novaLinha, novaColuna, novaPeca = peca) {

    for (let pLinha = 0; pLinha < novaPeca.length; pLinha++) {

        for (let pColuna = 0; pColuna < novaPeca[pLinha].length; pColuna++) {

            if (novaPeca[pLinha][pColuna] === 1) {

                let linha = novaLinha + pLinha;
                let coluna = novaColuna + pColuna;

                if (linha >= LINHAS) {
                    return false;
                }

                if (coluna < 0 || coluna >= COLUNAS) {
                    return false;
                }

                if (tabuleiro[linha][coluna] !== 0) {
                    return false;
                }
            }
        }
    }

    return true;
}


function girarPeca() {

    let novaPeca = [];

    for (let coluna = 0; coluna < peca[0].length; coluna++) {

        novaPeca[coluna] = [];

        for (let linha = peca.length - 1; linha >= 0; linha--) {

            novaPeca[coluna].push(peca[linha][coluna]);

        }
    }

    return novaPeca;
}

function rotacionarPeca() {

    let novaPeca = girarPeca();

    if (podeMover(pecaLinha, pecaColuna, novaPeca)) {

        peca = novaPeca;

    }

    desenharTabuleiro();
}

function moverPecaParaEsquerda() {

    if (podeMover(pecaLinha, pecaColuna - 1)) {
        pecaColuna--;
    }

    desenharTabuleiro();
}

function moverPecaParaDireita() {

    if (podeMover(pecaLinha, pecaColuna + 1)) {
        pecaColuna++;
    }

    desenharTabuleiro();
}

function obterCor(valor) {

    return CORES[valor - 1];
}

document.addEventListener("keydown", function(event) {

    if (
        event.key === "ArrowLeft" ||
        event.key === "ArrowRight" ||
        event.key === "ArrowDown" ||
        event.key === "ArrowUp"
    ) {
        event.preventDefault();
    }

    if (event.key === "ArrowLeft") {
        moverPecaParaEsquerda();
    }

    if (event.key === "ArrowRight") {
        moverPecaParaDireita();
    }

    if (event.key === "ArrowDown") {
        moverPecaParaBaixo();
    }

    if (event.key === "ArrowUp") {
        rotacionarPeca();
    }
});

function linhaCompleta(linha) {

    return linha.every(celula => celula !== 0);

};

function verificarLinhas() {

    for (let linha = 0; linha < LINHAS; linha++) {

        if (linhaCompleta(tabuleiro[linha])) {

            console.log("Linha completa:", linha);

        }
    }
}

function removerLinhas() {

    for (let linha = LINHAS - 1; linha >= 0; linha--) {

        if (linhaCompleta(tabuleiro[linha])) {

            tabuleiro.splice(linha, 1);

            tabuleiro.unshift(
                Array(COLUNAS).fill(0)
            );

            linha++;
        }
    }
}

criarTabuleiro();
novaPeca();
desenharTabuleiro();

setInterval(moverPecaParaBaixo, 1000);

