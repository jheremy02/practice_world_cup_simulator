//TODO: mostrar mensaje de comienzo del torneo

console.log(
`===============================================
===== COMIENZO DE LA FASE DE ELIMINATORIAS ====
===============================================`
);

//TODO:mostrar equipos participantes por pantala

let teams=['Brasil', 'Ecuador', 'Japón', 'Francia', 'EEUU', 'Inglaterra', 'Argentina', 'Holanda',
    'Alemania', 'Islas Feroe', 'España', 'Jamaica', 'Portugal', 'Polonia', 'Suecia',
    'Finlandia']

console.log(`\nEquipos que van a participar en el playoff:`)
console.log(`\n${teams}`)

//TODO: mostrar resultados de los partidos por cada ronda eliminatoria


class Tournament {
    constructor (name,teams) {
        this.name=name;
        this.teams=teams;
        this.name_fases=['octavos de final','cuartos de final','semifinal','final']
        this.match=[]
        this.fases=[{name:'octavos de final',numberMatches:8},
                   {name:'cuartos de final',numberMatches:4},
                   {name:'semifinal',numberMatches:2},
                   {name:'final',numberMatches:1}               
    
    ]

        this.matchDaySchedule=[]
    
        this.results={}
        this.fixture
    }


    createKnockoutRound() {
        const knockoutRound=[];
        this.initSchedule(knockoutRound)
        this.setTeamCrossing(knockoutRound)

        return knockoutRound
    }


    draw_teams(){

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

    initSchedule(knockoutRound) {

        // planificar las fases del torneo  octavos , cuartos , semifinal , final
        // de acuerdo a la fase habra un numero de partidos 
        // se sortean los cruzes, en este caso se comienza por los octavos de final

        const numberRounds= 4
        const numberMatchesPerPhase=teams.length/2

        for (const fase of this.fases) {
            
            // ronda vacia

            const matchknockout=[];

            for (let j = 0; j < fase.numberMatches; j++) {
                
                let match={team01:'team01', team02:'team02'};

                matchknockout.push(match)
                
            }

            knockoutRound.push(matchknockout)
            
        }
        
        



    }

    scheduleKnockoutRound(){

    }

    cross_teams(bombo1,bombo2) {
        
        // sortear los equipos en 2 bombos
        let secuence=bombo1.length
        
        for (let index = 0; index < secuence; index++) {
            let team01=bombo1[index]
            console.log(team01)
            let team02=bombo2[index]
    
            let match={
                team01:team01,
                team02:team02,
            }
    
            this.matches.push(match)
    
        }
    
    }

    setTeamCrossing(knockoutRound) {
        const bombos=this.draw_teams();
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

    generateGoals(){
        return Math.floor(Math.random() * 10);
    }

    play(match) {
        const team01Goals=this.generateGoals();
        const team02Goals=this.generateGoals();

        return {
            team01Name:match.team01,
            team01Goals,
            team02Name:match.team02,
            team02Goals
        }
    }

    
}



let world_cup= new Tournament('World Cup',teams);

world_cup.createKnockoutRound()
