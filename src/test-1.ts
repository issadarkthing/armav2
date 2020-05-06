import { createPassword } from "./parser";

export interface Profile {
	upperCaseLetters: boolean;
	lowerCaseLetters: boolean;
	numbers: boolean;
	symbols: boolean;
	recursionLayer: number;
	length: number;
}

const profile = {
	upperCaseLetters: true,
	lowerCaseLetters: true,
	numbers: true,
	symbols: true,
	recursionLayer: 1,
	length: 12
};

const length = 10;

const rclyr = Array.from({ length }, (_, i) => i + 1).map(v => ({
	...profile,
	recursionLayer: v
}));

const multiplePassw = rclyr.map(profile => createPassword("habbo.com", "terra", profile)) 

function isDifferent<T>(arr: T[]) {

	return arr.length === (new Set(arr)).size

}

function permute(permutation: any) {

	let length = permutation.length, result = permutation.slice(), c = new Array(length).fill(0), i = 1, k, p;

	while(i < length) {

		if(c[i] < i) {
			k = i % 2 && c[i];
			p = permutation[i];
			permutation[i] = permutation[k];
			permutation[k] = p;
			++c[i];
			i = 1;
			result.push(permutation.slice());
		} else {
			c[i] = 0;
			++i;
		}
	
	}

	return result.filter((a: any) => Array.isArray(a));
}

console.log(permute([1,2,3]))










