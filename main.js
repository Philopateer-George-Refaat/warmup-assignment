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
function getIdleTime(startTime, endTime) { //8:00AM and 10:00PM(inclusive)
    let idleDuration = '';
    let idleHours = 0;
    let idleMinutes = 0;
    let idleSeconds = 0;
    const workStart = 8;
    const workEnd = 22;

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

    let startHours = parseInt(startTimes[0]);
    let endHours = parseInt(endTimes[0]);
    let startMinutes = parseInt(startTimes[1]);
    let endMinutes = parseInt(endTimes[1]);
    let startSeconds = parseInt(startTimes[2]);
    let endSeconds = parseInt(endTimes[2]);

    
    if(startTime.toLowerCase().includes('am')) {
        if(startHours == 12) startHours = 0;
    }

    if(startTime.toLowerCase().includes('pm')) {
        if(startHours != 12) startHours += 12;
    }

    if(endTime.toLowerCase().includes('am')) {
        if(endHours == 12) endHours = 0;
    }

    if(endTime.toLowerCase().includes('pm')) {
        if(endHours != 12) endHours += 12;
    }

    let startTotal = startHours * 3600 + startMinutes * 60 + startSeconds;
    let endTotal = endHours * 3600 + endMinutes * 60 + endSeconds;
    let workStartTotal = workStart * 3600;
    let workEndTotal = workEnd * 3600;
    let idleTotal = 0;

        if (endTotal <= workStartTotal) {
            idleTotal = endTotal - startTotal;
        }
        else if (startTotal >= workEndTotal) {
            idleTotal = endTotal - startTotal;
        }

        else {
            if (startTotal < workStartTotal) {
                idleTotal += workStartTotal - startTotal;
            }

            if (endTotal > workEndTotal) {
                idleTotal += endTotal - workEndTotal;
            }
        }

    idleHours = Math.floor(idleTotal / 3600);
    idleMinutes = Math.floor((idleTotal % 3600) / 60);
    idleSeconds = idleTotal % 60;

  
    if (idleMinutes.toString().length < 2) 
        idleMinutes = '0' + idleMinutes;
    if (idleSeconds.toString().length < 2) 
        idleSeconds = '0' + idleSeconds;


    idleDuration = idleHours + ':' + idleMinutes + ':' + idleSeconds;
        return idleDuration;

}


// ============================================================
// Function 3: getActiveTime(shiftDuration, idleTime)
// shiftDuration: (typeof string) formatted as h:mm:ss
// idleTime: (typeof string) formatted as h:mm:ss
// Returns: string formatted as h:mm:ss
// ============================================================
function getActiveTime(shiftDuration, idleTime) {
    let activeDuration = '';

    const shiftParts = shiftDuration.split(':');
    const idleParts = idleTime.split(':');

    shiftParts[2] = shiftParts[2].split(' ')[0];
    idleParts[2] = idleParts[2].split(' ')[0];

   

    let shiftHours = parseInt(shiftParts[0]);
    let shiftMinutes = parseInt(shiftParts[1]);
    let shiftSeconds = parseInt(shiftParts[2]);
    let idleHours = parseInt(idleParts[0]);
    let idleMinutes = parseInt(idleParts[1]);
    let idleSeconds = parseInt(idleParts[2]);


    let shiftTotal = shiftHours * 3600 + shiftMinutes * 60 + shiftSeconds;
    let idleTotal = idleHours * 3600 + idleMinutes * 60 + idleSeconds;
    let activeTotal = shiftTotal - idleTotal;

    let activeHours = Math.floor(activeTotal / 3600);
    let activeMinutes = Math.floor((activeTotal % 3600) / 60);
    let activeSeconds = activeTotal % 60;

    if (activeMinutes.toString().length < 2) {
        activeMinutes = '0' + activeMinutes;
    }
    if (activeSeconds.toString().length < 2) {
        activeSeconds = '0' + activeSeconds;
    }

    activeDuration = activeHours + ':' + activeMinutes + ':' + activeSeconds;
    return activeDuration;
}

// ============================================================
// Function 4: metQuota(date, activeTime)
// date: (typeof string) formatted as yyyy-mm-dd
// activeTime: (typeof string) formatted as h:mm:ss
// Returns: boolean
// ============================================================
function metQuota(date, activeTime) {
    const activeTimes = activeTime.split(':');

    activeTimes[2] = activeTimes[2].split(' ')[0];
    let activeHours = parseInt(activeTimes[0]);
    let activeMinutes = parseInt(activeTimes[1]);
    let activeSeconds = parseInt(activeTimes[2]);

    let activeTotal = activeHours * 3600 + activeMinutes * 60 + activeSeconds;
    let quotaTotal = 8 * 3600 + 24*60;
    let quotaEid = 6 * 3600;
    let met = false;

    let dates = date.split('-');
    let month = parseInt(dates[1]);
    let day = parseInt(dates[2]);
    
    if (month === 4 && (day >=10 && day <= 30)) {
        if(activeTotal >= quotaEid)
        met = true;
    }
        if(activeTotal >= quotaTotal)
        met = true;

    return met;
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
