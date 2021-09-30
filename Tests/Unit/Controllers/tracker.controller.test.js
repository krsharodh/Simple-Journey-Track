const { getFare, getDateDiffInSec, covertUTCStrToDate } = require('../../../src/Controllers/tracker.controllers');
var chai = require('chai');
var expect = chai.expect;


describe('Generate Trips from taps', function () {

    it('should get fare for maximum stop', async function () {

        //Actual
        const actualFare = await getFare("Stop1", null)

        //Expected
        const expectedFare = 5.5

        expect(actualFare).equal(expectedFare);
    });

    it('should get fare from stop1 to stop2', async function () {

        //Actual
        const actualFare = await getFare("Stop1", "Stop2")

        //Expected
        const expectedFare = 3.25

        expect(actualFare).equal(expectedFare);
    });

    it('should get fare from stop1 to stop1', async function () {

        //Actual
        const actualFare = await getFare("Stop1", "Stop1")

        //Expected
        const expectedFare = 0

        expect(actualFare).equal(expectedFare);
    });


    it('should get date difference', async function () {

        //Actual
        const actualDateDiff = await getDateDiffInSec(new Date(), new Date())

        //Expected
        const expectedDateDiff = 0

        expect(actualDateDiff).equal(expectedDateDiff);
    });

    it('should get JavaScript date from UTCSTR', async function () {

        //Actual
        const actualDate = await covertUTCStrToDate("22-01-2018 13:00:00")

        //Expected
        const expectedDate = new Date(2018, 01, 22, 13, 0, 0)

        expect(actualDate.getTime()).equal(expectedDate.getTime());
    });


});