import { MethodNodeHandler } from "../..";

const PUNCTUATION=',:;!?.-'

export default class Excellent implements MethodNodeHandler {
	handles(): string[] {
		return [
			'first_word',
			'percent',
			'read_digits',
			'remove_fist_word',
			'word',
			'word_count',
			'word_slice',
			'is_number',
			'is_string',
			'is_bool',
		];
	}

	first_word(string : string) : string {
		return this.word(string, 1);
	}

	percent(number : number|string) : string {
		return Number(number) * 100 + "%";
	}

	read_digits($string) {
		throw new Error('Not implemented');
	}

	remove_fist_word(string : string) : string {
		const word = this.first_word(string);
		return string.substr(word.length);
	}

	word(string : string, number : number, bySpaces? :boolean) : string {
		const split = bySpaces ? string.split(' ') : this.splitByPunc(string);

		if (number < 0) {
			return split.reverse()[Math.abs(++number)];
		}
		return split[--number];
	}

	private splitByPunc(string : string) : Array<string> {
		return string.split(/\s*[,:;!?.-]\s*|\s/g)
	}

	word_count($string, $bySpaces = null) {

	}

	word_slice($string, $start, $stop = null, $bySpaces = null) {

	}

	is_number($value) {

	}

	is_string($value) {

	}

	is_bool($value) {

	}
}
