
const fs = require('fs');
const _ = require('lodash');


class RomanNumberCalculator {

    constructor() {}

    parseFile(fileName) {
        const content = fs.readFileSync(fileName, 'utf8');

        return content
            .split(/\r?\n/)
            .map(line => line.split(/\+/g))
            .map(numbers => numbers.map(number => String(number).trim()))
            .filter(line => !_.isEmpty(line[0]))
    }

    solve(firstNumber, secondNumber) {
        // TODO: implementation comes here

        return firstNumber + secondNumber;
    }

}

module.exports = RomanNumberCalculator;
