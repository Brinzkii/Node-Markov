const { MarkovMachine } = require('./markov');

let mm;

beforeEach(() => {
	mm = new MarkovMachine('the cat is in the hat');
});

describe('Markov Constructor', () => {
	test('create list of words', () => {
		expect(mm.words).toEqual(['the', 'cat', 'is', 'in', 'the', 'hat']);
	});

	test('create word chains', () => {
		expect(mm.chains).toEqual({
			the: ['cat', 'hat'],
			cat: ['is'],
			in: ['the'],
			the: ['cat', 'hat'],
			hat: [undefined],
			is: ['in'],
		});
	});
});

describe('Generate text using chains', () => {
	test('Should start with capital word', () => {
		result = mm.makeText();

		expect(result.charAt(0)).toEqual(result.charAt(0).toUpperCase());
	});

	test('Should return 100 words by default', () => {
		result = mm.makeText();
		words = result.split(/[ ,.!\r\n]+/);
		words = words.filter((c) => c !== '');

		expect(words.length).toEqual(100);
	});

	test('Should return user specified amount of words', () => {
		result = mm.makeText((numWords = 50));
		words = result.split(/[ ,.!\r\n]+/);
		words = words.filter((c) => c !== '');

		expect(words.length).toEqual(50);
	});

	test('Should end with a period', () => {
		result = mm.makeText();

		expect(result.charAt(result.length - 1)).toEqual('.');
	});
});
