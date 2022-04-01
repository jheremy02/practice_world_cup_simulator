
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
                    {name:'tercer y cuarto puesto', numberMatches:1},
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

    const teamsTemp=[...teams]

    this.shuffleArray(teamsTemp)
    
    let bombo1 = [...teamsTemp.slice(0,teamsTemp.length/2)]
    
    let bombo2 = [...teamsTemp.slice(teamsTemp.length/2)]
    
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
    let j=0;
// recorrermos cada fase y sorteamos los cruces con los equipos clasificados

for (const round of this.schedulePhases) {

    
    
    if (this.summaries.length==0) {

    let bombos=this.draw_teams(this.teams);
    
    this.setTeamCrossing(bombos,round)
    
    } else if (j==this.schedulePhases.length-2){
        let bombos=this.draw_teams(this.play_third_place());
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
        matchRoundSummary.results.push(result)
        matchRoundSummary.classified.push(classified_team)
        
    }

    
    this.summaries.push(matchRoundSummary)

    j++;
    
}
}

//metodo para obtener los perdedores de las semifinales y jugar el tercer y cuarto puesto
play_third_place () {
    
    const lastIndex=this.summaries.length-1
    let loserTeams=this.summaries[lastIndex-1].classified.filter(team=>this.summaries[lastIndex].classified.indexOf(team)===-1)
    const match={team01:loserTeams[0],team02:loserTeams[1]}
    let result=this.play(match)
    return loserTeams
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

// se juegan los partidos de la fase eliminatoria
qatar.start()
console.log('=============================')
console.log('Inicio de la fase de eliminación')
console.log('=============================')

// se mostrara los resultados, los clasificados y el campeòn
qatar.summaries.forEach((summary,roundIndex)=>{
    console.log('\n============')
    console.log(qatar.phases[roundIndex].name)
    console.log('============')
    summary.results.forEach((result,matchIndex)=>{
        console.log(`${result.team01Name} ${result.team01Goals} - ${result.team02Goals} ${result.team02Name} ===> ${summary.classified[matchIndex]}`)
       if (roundIndex==qatar.summaries.length-1) {
           console.log(`\n ${summary.classified[matchIndex]} campeón del mundo !!!!!!`)
       }
    } )
})

