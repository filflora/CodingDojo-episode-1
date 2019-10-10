import { RomanNumberCalculator } from './RomanNumberCalculator';
import { readFileSync } from 'fs';

const banner = readFileSync('./resources/banner.txt', 'utf8');
const calculator = new RomanNumberCalculator();
const inputArr: string[][] = calculator.parseFile("./resources/lines.txt");
const outputArr: string[][] = calculator.parseFile("./resources/result.txt");
const maxNumberCount: number = inputArr.reduce((max, input) => Math.max(max, input.length), 0);

console.log(banner);

// Calculate results
const results = inputArr
    .map((numbers: string[], index) => {
        const numberObj = Array.apply(null, Array(maxNumberCount))
            .map((_value, index) => index)
            .reduce((acc, index) => {
                acc['number' + (index + 1)] = numbers[index] || null;
                return acc;
            }, {} as { [key: string]: string | null});

        return {
            ...numberObj,
            // @ts-ignore
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

