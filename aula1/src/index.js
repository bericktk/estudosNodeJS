const player1 = {
    NOME: 'MARIO',
    VELOCIDADE: 4,
    MANOBRABILIDADE: 3,
    PODER: 3,
    PONTOS: 0,
};

const player2 = {
    NOME: 'LUIGI',
    VELOCIDADE: 3,
    MANOBRABILIDADE: 4,
    PODER: 4,
    PONTOS: 0,

};

async function rollDice(){
    return Math.floor(Math.random()*6) + 1;
};

async function playRaceEngine(character1, character2) {
    for(let round = 1; round <= 5; round++){
        console.log(`🏁 Rodada ${round}`)

        // sortear bloco
        let block = await getRandomBlock()
        console.log(`Bloco: ${block}`)
    };
};

async function getRandomBlock() {
    let random = Math.random()
    let result

    switch (true) {
        case random < 0.33:
            result = "RETA"
            break;

        case random < 0.66:
            result = "CURVA"
            break;
        default:
            result = "CONFRONTO"
            break;
    }

    return result
}


//Função auto-invocavel
(async function main() {
    console.log(`🏁 🚨 Corrida entre ${player1.NOME} e ${player2.NOME} começando...\n`);

    await playRaceEngine(player1, player2); // Espera a função playRaceEngine executar
})();

