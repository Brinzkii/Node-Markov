/** Command-line tool to generate Markov text. */

const fs = require('fs');
const axios = require('axios');
const { MarkovMachine } = require('./markov');
const args = process.argv;

if (args.includes('file')) {
	fs.readFile(args[3], 'utf8', (err, data) => {
		if (err) {
			console.error(err);
			process.exit(1);
		}
		let mm = new MarkovMachine(data);
		console.log(mm.makeText());
	});
} else if (args.includes('url')) {
	try {
		let resp = axios.get(args[3]);

		resp.then((resp) => {
			let mm = new MarkovMachine(resp.data);
			console.log(mm.makeText());
		});
	} catch (err) {
		console.error(err);
		process.exit(1);
	}
}

