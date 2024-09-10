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

async function logRollResult(characterName, block, diceResult, attribute) {
    console.log(`${characterName} 🎲 rolou o dado de ${block} ${diceResult} + ${attribute} = ${diceResult + attribute}`);
}

async function playRaceEngine(character1, character2) {
    for(let round = 1; round <= 5; round++){
        console.log(`🏁 Rodada ${round} `);

        // sortear bloco
        let block = await getRandomBlock();
        console.log(`Bloco: ${block}`);

        //Rolar os dados
        let diceResult1 = await rollDice();
        let diceResult2 = await rollDice();

        //Teste de Habilidade
        let testSkill1 = 0;
        let testSkill2 = 0;

        if(block === "RETA"){
            testSkill1 = diceResult1 + character1.VELOCIDADE;
            testSkill2 = diceResult2 + character2.VELOCIDADE;

            await logRollResult(character1.NOME, "velocidade", diceResult1, character1.VELOCIDADE)
            await logRollResult(character2.NOME, "velocidade", diceResult2, character2.VELOCIDADE)
            
        };

        if(block === "CURVA"){
            testSkill1 = diceResult1 + character1.MANOBRABILIDADE;
            testSkill2 = diceResult2 + character2.MANOBRABILIDADE;

            await logRollResult(character1.NOME, "manobrabilidade", diceResult1, character1.MANOBRABILIDADE)
            await logRollResult(character2.NOME, "manobrabilidade", diceResult2, character2.MANOBRABILIDADE)
            
        };

        if(block === "CONFRONTO"){
            let powerResult1 = diceResult1 + character1.PODER;
            let powerResult2 = diceResult2 + character2.PODER;

            console.log(`${character1.NOME} confrontou com ${character2.NOME}! 🥊`);

            await logRollResult(character1.NOME, "poder", diceResult1, character1.PODER);
            await logRollResult(character2.NOME, "poder", diceResult2, character2.PODER);

            // Utilizando If ternario para diminuir a quantidade de ifs no código
            if(powerResult1 > powerResult2 && character2.PONTOS > 0){
                console.log(`${character1.NOME} venceu o confronto! ${character2.NOME} perder 1 ponto 🐢!`);
                character2.PONTOS --;
            };

            if (powerResult2 > powerResult1 && character1.PONTOS > 0) {
                console.log(`${character2.NOME} venceu o confronto! ${character1.NOME} perder 1 ponto 🐢!`);
                character1.PONTOS --;
            };
            
            console.log(
                powerResult2 === powerResult1 
                    ? "Confronto empatado! Nenhum ponto perdido" : "");
        };

        //Vericando o vencedor
        if(testSkill1 > testSkill2){
            console.log(`${character1.NOME} marcou 1 ponto!`);
            character1.PONTOS++;

        }else if(testSkill2 > testSkill1){
            console.log(`${character2.NOME} marcou 1 ponto!`);
            character2.PONTOS++;
        }

        console.log("*----------------------------------------------------------*");
        
    };

};

async function declareWinner(character1, character2) {
    console.log("Resultado Final:");
    console.log(`${character1.NOME}: ${character1.PONTOS} ponto(S)`)
    console.log(`${character2.NOME}: ${character2.PONTOS} ponto(S)`)
    
    // Da para usar o if encadeado sem chaves;
    if(character1.PONTOS > character2.PONTOS)
        console.log(`\n ${character1.NOME} venceu a corrida! Parabéns 🏆🏆`);
        
    else if(character2.PONTOS > character1.PONTOS)
        console.log(`\n ${character2.NOME} venceu a corrida! Parabéns 🏆🏆`);
    
    else
        console.log("A corrida terminou em empate!");
    
}


async function getRandomBlock() {
    let random = Math.random();
    let result;

    switch (true) {
        case random < 0.33:
            result = "RETA";
            break;

        case random < 0.66:
            result = "CURVA";
            break;
        default:
            result = "CONFRONTO";
            break;
    }

    return result
}


//Função auto-invocavel
(async function main() {
    console.log(`🏁 🚨 Corrida entre ${player1.NOME} e ${player2.NOME} começando...\n`);

    await playRaceEngine(player1, player2); // Espera a função playRaceEngine executar
    await declareWinner(player1, player2)
})();
