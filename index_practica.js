class WorldCup {
    

    constructor (name,teams){
        this.name=name;
        this.teams=teams
        this.knockoutRound=[]
        this.schedulePhases=[]       
        this.summaries=[]
        this.phases=[{name:'octavos de final',numberMatches:8},
                    {name:'cuartos de final',numberMatches:4},
                    {name:'semifinal',numberMatches:2},
                    {name:'final',numberMatches:1}]

        this.initSchedule(this.phases)
    }



initSchedule(phases) {
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

        this.schedulePhases.push(knockoutRound)
        
    }
}

shuffleArray (array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
  }


// sortear equipos en 2 bombos
draw_teams(teams){

    this.shuffleArray(teams)
    
    let bombo1 = [...teams.slice(0,teams.length/2)]
    console.log(bombo1)
    let bombo2 = [...teams.slice(teams.length/2)]
    console.log(bombo2)
    return [bombo1,bombo2]

}

//metodo para jugar cada partido
play(match) {
    
    
    while (true) {
        const team01Goals=this.generateGoals();
        const team02Goals=this.generateGoals();

        if (team01Goals!=team02Goals) {
            
            return {
                team01Name:match.team01,
                team01Goals,
                team02Name:match.team02,
                team02Goals
            }

            break;
        }
        

    }   
}



//método para definir cruces de equipos
setTeamCrossing(bombos,round) {
    
    let teamIndex=bombos[0].length -1
    
    
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


//metodo para generar goles
generateGoals(){
    return Math.floor(Math.random() * 10);
}



start() {
    let i=0;

// recorrermos cada fase y sorteamos los cruces con los equipos clasificados

for (const round of this.schedulePhases) {

    

    if (this.summaries.length==0) {

    let bombos=this.draw_teams(this.teams);
    
    this.setTeamCrossing(bombos,round)
    
    } else {
    
    let bombos=this.draw_teams(this.summaries[i].classified);
    this.setTeamCrossing(bombos,round)
        i++
    }


    const matchRoundSummary={
        results:[],
        classified:[]
    }


  
    //recorremos cada partido de cada fase
    for (const match  of round) {
        const result=this.play(match)
        const classified_team=this.get_classified_team(result)
        matchRoundSummary.classified.push(classified_team)
        matchRoundSummary.results.push(result)
    }

    
    console.log(matchRoundSummary)
    this.summaries.push(matchRoundSummary)
    
}
}


get_classified_team(result) {
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

}

let teams=['Brasil', 'Ecuador', 'Japón', 'Francia', 'EEUU', 'Inglaterra', 'Argentina', 'Holanda',
'Alemania', 'Islas Feroe', 'España', 'Jamaica', 'Portugal', 'Polonia', 'Suecia',
'Finlandia']
let qatar= new WorldCup('Qatar',teams)
qatar.start()
