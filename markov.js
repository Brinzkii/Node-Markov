/** Textual markov chain generator */


class MarkovMachine {
	/** build markov machine; read in text.*/

	constructor(text) {
		let words = text.split(/[ ,.!\r\n]+/);
		this.words = words.filter((c) => c !== '');
		this.chains = this.makeChains();
	}

	/** set markov chains:
	 *
	 *  for text of "the cat in the hat", chains will be
	 *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

	makeChains() {
		let chains = {};
		for (let i = 0; i < this.words.length; i++) {
			if (this.words[i] in chains) {
				chains[this.words[i]].push(this.words[i + 1]);
			} else {
				chains[this.words[i]] = [this.words[i + 1]];
			}
		}
		return chains;
	}

	/** return random text from chains */

	makeText(numWords = 100) {
		let count = 0;
		let text = '';
		let prev;

		while (count < numWords) {
			if (count == 0) {
				prev = this.getRandomKey();
				let caps = prev.charAt(0).toUpperCase() + prev.slice(1);
				text = text + caps + ' ';
			} else if (count == numWords - 1) {
				prev = this.getRandomValue(prev);
				text = text + prev + '.';
			} else {
				if (this.chains[prev] == false) {
					prev = this.getRandomKey();
					let caps = prev.charAt(0).toUpperCase() + prev.slice(1);
					text = text.trimEnd();
					text = text + '.' + ' ' + caps + ' ';
				} else {
					prev = this.getRandomValue(prev);
					text = text + prev + ' ';
				}
			}
			count++;
		}
		return text;
	}

	getRandomKey() {
		let keys = Object.keys(this.chains);

		return keys[Math.floor(Math.random() * keys.length)];
	}

	getRandomValue(key) {
		let values = this.chains[key];
		let val = values[Math.floor(Math.random() * values.length)];

		if (val == undefined) {
			val = values[Math.floor(Math.random() * values.length)];
		}

		return val;
	}
}

module.exports = {
	MarkovMachine,
};