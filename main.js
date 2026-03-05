const fs = require("fs");
const { get } = require("http");

// ============================================================
// Function 1: getShiftDuration(startTime, endTime)
// startTime: (typeof string) formatted as hh:mm:ss am or hh:mm:ss pm
// endTime: (typeof string) formatted as hh:mm:ss am or hh:mm:ss pm
// Returns: string formatted as h:mm:ss
// ============================================================
function getShiftDuration(startTime, endTime) {
    let duration = '';
    let hours = 0;
    let minutes = 0;
    let seconds = 0;

const endTimes = endTime.split(':');
const startTimes = startTime.split(':');

    startTimes[2] = startTimes[2].split(' ')[0];
    endTimes[2] = endTimes[2].split(' ')[0];

   
    if (parseInt(endTimes[0]) > 12 || parseInt(startTimes[0]) > 12
        || parseInt(endTimes[1]) > 59 || parseInt(startTimes[1]) > 59
        || parseInt(endTimes[2]) > 59 || parseInt(startTimes[2]) > 59
        || parseInt(endTimes[0]) < 1 || parseInt(startTimes[0]) < 1) {
          return 'Invalid يا حبيبي';
    }

  
    if (startTime.toLowerCase().includes('am') && endTime.toLowerCase().includes('am')) {
       let startHour = parseInt(startTimes[0]);
        let endHour = parseInt(endTimes[0]);

        if(startHour == 12) startHour = 0;
        if(endHour == 12) endHour = 0;

        hours = endHour - startHour;
        minutes = parseInt(endTimes[1]) - parseInt(startTimes[1]);
        seconds = parseInt(endTimes[2]) - parseInt(startTimes[2]);

        

    } else if (startTime.toLowerCase().includes('am') && endTime.toLowerCase().includes('pm')) {

    let startHour = parseInt(startTimes[0]);
    let endHour = parseInt(endTimes[0]);

    if(startHour == 12) startHour = 0;
    if(endHour != 12) endHour += 12;

    hours = endHour - startHour;
    minutes = parseInt(endTimes[1]) - parseInt(startTimes[1]);
    seconds = parseInt(endTimes[2]) - parseInt(startTimes[2]);

       
     

    } else if (startTime.toLowerCase().includes('pm') && endTime.toLowerCase().includes('pm')) {

    let startHour = parseInt(startTimes[0]);
    let endHour = parseInt(endTimes[0]);

    if(startHour != 12) startHour += 12;
    if(endHour != 12) endHour += 12;

    hours = endHour - startHour;
    minutes = parseInt(endTimes[1]) - parseInt(startTimes[1]);
    seconds = parseInt(endTimes[2]) - parseInt(startTimes[2]);
        

    } else if (startTime.toLowerCase().includes('pm') && endTime.toLowerCase().includes('am')) {

    let startHour = parseInt(startTimes[0]);
    let endHour = parseInt(endTimes[0]);

    if(startHour != 12) startHour += 12;
    if(endHour == 12) endHour = 0;

    hours = (24 - startHour) + endHour;
    minutes = parseInt(endTimes[1]) - parseInt(startTimes[1]);
    seconds = parseInt(endTimes[2]) - parseInt(startTimes[2]);
    }

        if (seconds < 0) {
        minutes--;
        seconds += 60;
        }
        if (minutes < 0) {
        hours--;
        minutes += 60;
        }
        if (hours < 0) {
        hours += 24; 
        }
    
    if (minutes.toString().length < 2) 
        minutes = '0' + minutes;
    if (seconds.toString().length < 2) 
        seconds = '0' + seconds;

    
    duration = hours + ':' + minutes + ':' + seconds;
    return duration;
}
// ============================================================
// Function 2: getIdleTime(startTime, endTime)
// startTime: (typeof string) formatted as hh:mm:ss am or hh:mm:ss pm
// endTime: (typeof string) formatted as hh:mm:ss am or hh:mm:ss pm
// Returns: string formatted as h:mm:ss
// ============================================================
function getIdleTime(startTime, endTime) {
    // TODO: Implement this function
}

// ============================================================
// Function 3: getActiveTime(shiftDuration, idleTime)
// shiftDuration: (typeof string) formatted as h:mm:ss
// idleTime: (typeof string) formatted as h:mm:ss
// Returns: string formatted as h:mm:ss
// ============================================================
function getActiveTime(shiftDuration, idleTime) {
    // TODO: Implement this function
}

// ============================================================
// Function 4: metQuota(date, activeTime)
// date: (typeof string) formatted as yyyy-mm-dd
// activeTime: (typeof string) formatted as h:mm:ss
// Returns: boolean
// ============================================================
function metQuota(date, activeTime) {
    // TODO: Implement this function
}

// ============================================================
// Function 5: addShiftRecord(textFile, shiftObj)
// textFile: (typeof string) path to shifts text file
// shiftObj: (typeof object) has driverID, driverName, date, startTime, endTime
// Returns: object with 10 properties or empty object {}
// ============================================================
function addShiftRecord(textFile, shiftObj) {
    // TODO: Implement this function
}

// ============================================================
// Function 6: setBonus(textFile, driverID, date, newValue)
// textFile: (typeof string) path to shifts text file
// driverID: (typeof string)
// date: (typeof string) formatted as yyyy-mm-dd
// newValue: (typeof boolean)
// Returns: nothing (void)
// ============================================================
function setBonus(textFile, driverID, date, newValue) {
    // TODO: Implement this function
}

// ============================================================
// Function 7: countBonusPerMonth(textFile, driverID, month)
// textFile: (typeof string) path to shifts text file
// driverID: (typeof string)
// month: (typeof string) formatted as mm or m
// Returns: number (-1 if driverID not found)
// ============================================================
function countBonusPerMonth(textFile, driverID, month) {
    // TODO: Implement this function
}

// ============================================================
// Function 8: getTotalActiveHoursPerMonth(textFile, driverID, month)
// textFile: (typeof string) path to shifts text file
// driverID: (typeof string)
// month: (typeof number)
// Returns: string formatted as hhh:mm:ss
// ============================================================
function getTotalActiveHoursPerMonth(textFile, driverID, month) {
    // TODO: Implement this function
}

// ============================================================
// Function 9: getRequiredHoursPerMonth(textFile, rateFile, bonusCount, driverID, month)
// textFile: (typeof string) path to shifts text file
// rateFile: (typeof string) path to driver rates text file
// bonusCount: (typeof number) total bonuses for given driver per month
// driverID: (typeof string)
// month: (typeof number)
// Returns: string formatted as hhh:mm:ss
// ============================================================
function getRequiredHoursPerMonth(textFile, rateFile, bonusCount, driverID, month) {
    // TODO: Implement this function
}

// ============================================================
// Function 10: getNetPay(driverID, actualHours, requiredHours, rateFile)
// driverID: (typeof string)
// actualHours: (typeof string) formatted as hhh:mm:ss
// requiredHours: (typeof string) formatted as hhh:mm:ss
// rateFile: (typeof string) path to driver rates text file
// Returns: integer (net pay)
// ============================================================
function getNetPay(driverID, actualHours, requiredHours, rateFile) {
    // TODO: Implement this function
}

module.exports = {
    getShiftDuration,
    getIdleTime,
    getActiveTime,
    metQuota,
    addShiftRecord,
    setBonus,
    countBonusPerMonth,
    getTotalActiveHoursPerMonth,
    getRequiredHoursPerMonth,
    getNetPay
};
