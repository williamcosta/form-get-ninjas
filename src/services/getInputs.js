export default function getInputs(){
    return fetch('../fields.json')
        .then(data => data.json())
		.then(data => data._embedded);
}

