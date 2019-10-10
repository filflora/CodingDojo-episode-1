import fs from "fs";
import { RomanNumberCalculator } from '../RomanNumberCalculator';

describe("RomanNumberCalculator", function () {

    let calc: RomanNumberCalculator;

    beforeEach(function () {
        calc = new RomanNumberCalculator();
    });

    it("should be able to instantiate", function () {
        expect(calc).toBeTruthy();
    });

    it('should have a parseFile method', function () {
        expect(typeof calc.parseFile).toBe('function');
    });

    it('should parse a file by rows', function () {
        const testFileContent = 'I+I\r\nII+I';
        spyOn(fs, 'readFileSync').and.returnValue(testFileContent);

        expect(calc.parseFile('dummy.txt').length).toBe(2);
    });

    it('should parse a file and ignore empty rows', function () {
        const testFileContent = '\r\nI+I\r\n\r\nII+I\r\n';
        spyOn(fs, 'readFileSync').and.returnValue(testFileContent);

        expect(calc.parseFile('dummy.txt').length).toBe(2);
    });

    it('should parse a file and split rows by addition', function () {
        const testFileContent = 'I+I\r\nI+I+I';
        spyOn(fs, 'readFileSync').and.returnValue(testFileContent);

        expect(calc.parseFile('dummy.txt')[0].length).toBe(2);
        expect(calc.parseFile('dummy.txt')[1].length).toBe(3);
    });

    it('should parse a file and trim number values', function () {
        const testFileContent = '   II +     I \r\n I +    IV +     I';
        spyOn(fs, 'readFileSync').and.returnValue(testFileContent);

        expect(calc.parseFile('dummy.txt')[0][0]).toBe('II');
        expect(calc.parseFile('dummy.txt')[0][1]).toBe('I');
        expect(calc.parseFile('dummy.txt')[1][0]).toBe('I');
        expect(calc.parseFile('dummy.txt')[1][1]).toBe('IV');
        expect(calc.parseFile('dummy.txt')[1][2]).toBe('I');
    });

    it('should have a solve method', function () {
        expect(typeof calc.solve).toBe('function');
    });



});
