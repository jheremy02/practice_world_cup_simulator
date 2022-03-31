const teams=[ 'EEUU', 'Suecia', 'Ecuador', 'España' ]

const clasiffied=[ 'Ecuador', 'EEUU' ]


const difference=teams.filter(x=>clasiffied.indexOf(x)===-1)

console.log(difference)