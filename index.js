import WorldCup from "./WorldCup.js";

let teams=['Brasil', 'Ecuador', 'Japón', 'Francia', 'EEUU', 'Inglaterra', 'Argentina', 'Holanda',
'Alemania', 'Islas Feroe', 'España', 'Jamaica', 'Portugal', 'Polonia', 'Suecia',
'Finlandia']

let qatar= new WorldCup('Qatar',teams)

// se juegan los partidos de la fase eliminatoria
qatar.start()
console.log('=============================')
console.log('Inicio de la fase de eliminación')
console.log('=============================')

console.log('\nEquipos que participarán en la fase de eliminatorias :')

//mostrar por consola los equipos participantes
console.log(`\n${qatar.get_team_names()}`)


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