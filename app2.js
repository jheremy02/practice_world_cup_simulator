
let teams=['Brasil', 'Ecuador', 'Japón', 'Francia', 'EEUU', 'Inglaterra', 'Argentina', 'Holanda',
'Alemania', 'Islas Feroe', 'España', 'Jamaica', 'Portugal', 'Polonia', 'Suecia',
'Finlandia']

let knockoutRound=[]

let schedulePhases=[]

let summaries=[]

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




//funcion para jugar cada partido
function play(match) {
    
    const team01Goals=generateGoals();
    const team02Goals=generateGoals();

    while (true) {

        if (team01Goals!=team02Goals) {
            
            return {
                team01Name:match.team01,
                team01Goals,
                team02Name:match.team02,
                team02Goals
            }
        }
        

    }   
}



//funcion para definir cruces de equipos
function setTeamCrossing(bombos,round) {
    
    let teamIndex=bombos[0].length-1
    console.log(teamIndex)
    
    // definir cruzes por sorteo en cada fase
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



let i=0;

// recorrermos cada fase y sorteamos los cruces con los equipos clasificados

for (const round of schedulePhases) {

    console.log("Hello world")

    if (summaries.length==0) {

    let bombos=draw_teams(teams);
    
    setTeamCrossing(bombos,round)
    
    } else {
    
    let bombos=draw_teams(summaries[i].classified);
    setTeamCrossing(bombos,round)
        i++
    }


    const matchRoundSummary={
        results:[],
        classified:[]
    }


  

    for (const match  of round) {
        const result=play(match)
        const classified_team=get_classified_team(result)
        matchRoundSummary.classified.push(classified_team)
        matchRoundSummary.results.push(result)
    }

    
    console.log(matchRoundSummary)
    summaries.push(matchRoundSummary)
    
}


function get_classified_team(result) {
    const team01=teams.find(team=>team===result.team01Name);
    const team02=teams.find(team=>team===result.team02Name);

    //evaluamos quienes han ganado y clasificado a la siguiente ronda
        // la funcion play devolvera partido con marcador diferente y ya evalua el empate
    if (result.team01Goals > result.team02Goals ) {
        return team01

    } else if (result.team01Goals < result.team02Goals) {
        return team02
    }
}