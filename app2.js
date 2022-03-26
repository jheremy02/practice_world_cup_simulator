
let teams=['Brasil', 'Ecuador', 'Japón', 'Francia', 'EEUU', 'Inglaterra', 'Argentina', 'Holanda',
'Alemania', 'Islas Feroe', 'España', 'Jamaica', 'Portugal', 'Polonia', 'Suecia',
'Finlandia']

let knockoutRound=[]

let schedulePhases=[]


const phases=[{name:'octavos de final',numberMatches:8},
                   {name:'cuartos de final',numberMatches:4},
                   {name:'semifinal',numberMatches:2},
                   {name:'final',numberMatches:1}]



//iniciamos un template de los partidos de cada fase
function initSchedule() {

    // planificar las fases del torneo  octavos , cuartos , semifinal , final
    // de acuerdo a la fase habra un numero de partidos 
    // se sortean los cruzes, en este caso se comienza por los octavos de final

    const numberRounds= 4
    const numberMatchesPerPhase=teams.length/2

    for (const phase of phases) {
        
        // ronda vacia

        const knockoutRound=[];

        for (let j = 0; j < phase.numberMatches; j++) {
            
            let match={team01:'team01', team02:'team02'};

            knockoutRound.push(match)
            
        }

        schedulePhases.push(knockoutRound)
        
    }
    

}

initSchedule()

console.log(schedulePhases)


// sortear equipos en 2 bombos
function draw_teams(teams){

    const shuffleArray = array => {
        for (let i = array.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          const temp = array[i];
          array[i] = array[j];
          array[j] = temp;
        }
      }

    shuffleArray(teams)
    
    let bombo1 = [...teams.slice(0,teams.length/2)]
    let bombo2 = [...teams.slice(teams.length/2)]

    return [bombo1,bombo2]

}

let bombos=draw_teams(teams);

console.log(bombos)






// cruzar equipos para disputar partidos
function setTeamCrossing(bombos) {
    
    let teamIndex=bombos[0].length-1
    console.log(teamIndex)
    
    // definir cruzes por sorteo en octavos de final
    knockoutRound[0].forEach( function (match,matchIndex) {
            
            match.team01=bombos[0][teamIndex];
            teamIndex--
        })
    
    teamIndex=bombos[1].length-1

    knockoutRound[0].forEach( function (match,matchIndex) {
            
            match.team02=bombos[1][teamIndex];
            teamIndex--
        })

}


//funcion para jugar cada partido
function play(match) {
    const team01Goals=this.generateGoals();
    const team02Goals=this.generateGoals();

    return {
        team01Name:match.team01,
        team01Goals,
        team02Name:match.team02,
        team02Goals
    }
}



//funcion para definir cruces de equipos
function setTeamCrossing(round) {
    
    let teamIndex=bombos[0].length-1
    console.log(teamIndex)
    
    // definir cruzes por sorteo en octavos de final
    round.forEach( function (match,matchIndex) {
            
            match.team01=bombos[0][teamIndex];
            teamIndex--
        })
    
    teamIndex=bombos[1].length-1

    round.forEach( function (match,matchIndex) {
            
            match.team02=bombos[1][teamIndex];
            teamIndex--
        })

}



function generateGoals(){
    return Math.floor(Math.random() * 10);
}

function play(match) {
    const team01Goals=generateGoals();
    const team02Goals=generateGoals();

    return {
        team01Name:match.team01,
        team01Goals,
        team02Name:match.team02,
        team02Goals
    }
}



// recorrermos cada fase y sorteamos los cruces con los equipos clasificados

for (const round of schedulePhases) {


    setTeamCrossing(round)
    
    const matchRoundSummary={
        results:[]
    }

    for (const match  of round) {
        const result=play(match)
        matchRoundSummary.results.push(result)
    }

    
    console.log(matchRoundSummary)
    break

}

