import { readFileSync } from 'fs';
import { isEmpty } from 'lodash';


export class RomanNumberCalculator {

    constructor() {}

    parseFile(fileName: string) {
        const content = readFileSync(fileName, 'utf8');

        return content
            .split(/\r?\n/)
            .map((line: string) => line.split(/\+/g))
            .map((numbers: string[]) => numbers.map(number => String(number).trim()))
            .filter((line: string[]) => !isEmpty(line[0]))
    }

    solve(firstNumber: string, secondNumber: string) {
        // TODO: implementation comes here

        return firstNumber + secondNumber;
    }

}

