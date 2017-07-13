function getInputs(){
    fetch('../fields.json').then( data => data.map(input, index) )
}