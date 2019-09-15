const RomanNumberCalculator = require('./RomanNumberCalculator.js');
const _ = require('lodash');
const fs = require('fs');

const banner = fs.readFileSync('./resources/banner.txt', 'utf8');
const calculator = new RomanNumberCalculator();
const inputArr = calculator.parseFile("./resources/lines.txt");
const outputArr = calculator.parseFile("./resources/result.txt");
const maxNumberCount = inputArr.reduce((max, input) => Math.max(max, input.length), 0);

console.log(banner);

// Calculate results
const results = inputArr
    .map((numbers, index) => {
        const numberObj = Array.apply(null, Array(maxNumberCount))
            .map((value, index) => index)
            .reduce((acc, index) => {
                acc['number' + (index + 1)] = numbers[index] || null;
                return acc;
            }, {});

        return {
            ...numberObj,
            calculatedResult: calculator.solve(...numbers),
            expectedResult: outputArr[index][0]
        }
    })
    .map(result => ({
        ...result,
        testResult: result.calculatedResult === result.expectedResult ? 'success' : 'failed'
    }));


// Display results
console.table(results);
console.log('Successful test count: ', results.reduce((sum, result) => (sum + (result.testResult === 'success' ? 1 : 0)), 0));
console.log('Failed test count: ', results.reduce((sum, result) => (sum + (result.testResult === 'failed' ? 1 : 0)), 0));

