const priceList = require('../priceList.json');

/**
 * 
 * @param {Input taps CSV} csv 
 * @returns Trips CSV
 */
const generateTripsFromTaps = (csv) => {
    let csvLines = csv.split("\r\n")
    csvLines = csvLines.slice(1, csvLines.length)
    return createTripsCSV(csvLines)
}

/**
 * 
 * @param {from stop ID} from 
 * @param {to stop ID} to 
 * @returns Fare for the travel between the stops
 */
function getFare(from, to) {
    // Calculates the maximum fare from source stop
    if (to === null) {
        const fares = []
        priceList.forEach(price => {
            if (price.stops.includes(from)) {
                fares.push(price.fare)
            }
        });
        return Math.max(...fares)
    }
    // Cancelled trip
    else if (from == to) {
        return 0;
    }
    // Normal fare calculation
    else {
        return priceList.find(price => {
            if (price.stops.includes(from) && price.stops.includes(to)) {
                return price
            }
        }).fare
    }
}

/**
 * 
 * @param {taps CSV lines in list form} csvLines 
 * @returns Trips CSV Lines
 */
function createTripsCSV(csvLines) {
    let tripsList = extractTrips(csvLines)
    tripsList = tripsList.map(trip => {
        return {
            ...trip,

            // Cancelled and Incomplete trips handled
            chargeAmount: trip.status === "" ? getFare(trip.fromStopId, trip.toStopId) : trip.chargeAmount,
            status: trip.status === "" ? "INCOMPLETE" : trip.status
        }
    });

    return tripsList
}

/**
 * 
 * @param {Date String} utcStr 
 * @returns JavaScript Date Object
 */
function covertUTCStrToDate(utcStr) {
    utcStr = utcStr.replace(/ /g, "-");
    utcStr = utcStr.replace(/:/g, "-");
    const [day, month, year, hours, minutes, seconds] = utcStr.split("-")
    return new Date(
        year,
        month,
        day,
        hours,
        minutes,
        seconds
    )
}

/**
 * 
 * @param {JavaScript Date 1} d1 
 * @param {JavaScript Date 2} d2 
 * @returns Difference in Seconds
 */
function getDateDiffInSec(d1, d2) {
    const diff = d1.getTime() - d2.getTime();
    return Math.abs(diff / 1000);
}

/**
 * 
 * @param {tap Object} tap 
 * @returns Trip Object
 */
function createTripFromTap(tap) {
    return {
        started: covertUTCStrToDate(tap.dateTimeUTC),
        finished: null,
        durationSecs: 0,
        fromStopId: tap.stopId,
        toStopId: null,
        chargeAmount: 0,
        companyId: tap.companyId,
        busId: tap.busId,
        pan: tap.pan,
        status: ""
    }
}

/**
 * 
 * @param {tap attributes in List form} tapJson 
 * @returns Tap Object
 */
function getTapFromTapsJson(tapJson) {
    return {
        id: tapJson[0],
        dateTimeUTC: tapJson[1],
        tapType: tapJson[2],
        stopId: tapJson[3],
        companyId: tapJson[4],
        busId: tapJson[5],
        pan: tapJson[6],
    }
}

/**
 * 
 * @param {Taps in List Form} tapsJson 
 * @returns Trips List
 */
function extractTrips(tapsJson) {
    let tripsList = []

    tapsJson.forEach(line => {

        const tap = getTapFromTapsJson(line.split(","))

        let tripModified = false;

        // Completing a trip
        if (tap.tapType === "OFF") {
            tripsList = tripsList.map(trip => {
                // Verifying with TAP ON
                if (
                    (trip.pan === tap.pan) &&
                    (trip.status === "") &&
                    (trip.companyId === tap.companyId) &&
                    (trip.busId === tap.busId) &&
                    getDateDiffInSec(trip.started, covertUTCStrToDate(tap.dateTimeUTC)) < 86400
                ) {
                    tripModified = true
                    return {
                        ...trip,
                        // Updating TRIP Status
                        finished: covertUTCStrToDate(tap.dateTimeUTC),
                        durationSecs: getDateDiffInSec(trip.started, covertUTCStrToDate(tap.dateTimeUTC)),
                        toStopId: tap.stopId,
                        chargeAmount: getFare(trip.fromStopId, tap.stopId),
                        status: trip.fromStopId === tap.stopId ? "CANCELLED" : "COMPLETED"
                    }
                }
                return trip
            })
        }

        // For new Trips
        if (!tripModified) {
            tripsList.push(createTripFromTap(tap))
        }
    })

    return tripsList;
}

module.exports = {
    generateTripsFromTaps,
    getFare,
    getDateDiffInSec,
    covertUTCStrToDate
};