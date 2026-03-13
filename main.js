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

        if (endTotal < startTotal) {
        endTotal += 24 * 3600;
    }
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
    let metQuota = false;

    let dates = date.split('-');
    let month = parseInt(dates[1]);
    let day = parseInt(dates[2]);
    
    if (month === 4 && (day >=10 && day <= 30) && parseInt(dates[0]) === 2025) {
        if(activeTotal >= quotaEid)
        metQuota = true;
    }
    else{
        if(activeTotal >= quotaTotal)
        metQuota = true;
    }
       

    return metQuota;
}

// ============================================================
// Function 5: addShiftRecord(textFile, shiftObj)
// textFile: (typeof string) path to shifts text file
// shiftObj: (typeof object) has driverID, driverName, date, startTime, endTime
// Returns: object with 10 properties or empty object {}
// ============================================================
function addShiftRecord(textFile, shiftObj) {
try{
    let data = fs.readFileSync(textFile, 'utf-8');
    let lines = data.split('\n');

    let driverID = shiftObj.driverID;
    let driverName = shiftObj.driverName;
    let date = shiftObj.date;
    let startTime = shiftObj.startTime;
    let endTime = shiftObj.endTime;

    let shiftDuration = getShiftDuration(startTime, endTime);
    let idleTime = getIdleTime(startTime, endTime);
    let activeTime = getActiveTime(shiftDuration, idleTime);
    let quotaMet = metQuota(date, activeTime);
    let hasBonus = false;

       for (let i = 1; i < lines.length; i++) {

            if (!lines[i].trim()) continue;

            let columns = lines[i].split(',');

            if (columns[0] === driverID && columns[2] === date) {
                return {};
            }
        }

        let newRecord =
        driverID + "," +
        driverName + "," +
        date + "," +
        startTime + "," +
        endTime + "," +
        shiftDuration + "," +
        idleTime + "," +
        activeTime + "," +
        quotaMet + "," +
        hasBonus + "\n";

        let insertIndex = lines.length;

        for (let i = 1; i < lines.length; i++) {

            if (!lines[i].trim()) continue;

            let columns = lines[i].split(',');

            if (columns[0] === driverID) {
                insertIndex = i + 1;
            }
        }

        lines.splice(insertIndex, 0, newRecord);

        fs.writeFileSync(textFile, lines.join('\n'));
   
           return {
            driverID,
            driverName,
            date,
            startTime,
            endTime,
            shiftDuration,
            idleTime,
            activeTime,
            quotaMet,
            hasBonus
        };

}
    
    

catch (error) {
    console.error('Error adding shift record(لامؤاخذة)', error); 
    return {};
}
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
    try{
        let data = fs.readFileSync(textFile, 'utf-8');
        let lines = data.split('\n');
        
        let isFound = false;

        for (let i = 1; i < lines.length; i++) {
            if (!lines[i].trim()) continue;
                let columns = lines[i].split(',');

                if (columns[0] === driverID && columns[2] === date) {
                    columns[9] = newValue.toString();
                    lines[i] = columns.join(',');
                    isFound = true;
                }
        }

        if (isFound) {
            fs.writeFileSync(textFile, lines.join('\n'));
        }
    } catch (error) {
         console.error('Error updating bonus(حط الفايل ياعم):', error); 
    }
}

// ============================================================
// Function 7: countBonusPerMonth(textFile, driverID, month)
// textFile: (typeof string) path to shifts text file
// driverID: (typeof string)
// month: (typeof string) formatted as mm or m
// Returns: number (-1 if driverID not found)
// ============================================================
function countBonusPerMonth(textFile, driverID, month) {
try{
        let data = fs.readFileSync(textFile, 'utf-8');
        let lines = data.split('\n');
        let date = '';
        let bounscounter = 0;
        let isExist = false;

        
        for(let i = 1 ; i<lines.length ; i++){
            if (!lines[i].trim()) continue;

            let columns = lines[i].split(',');
            date = columns[2].split('-');
            let myMonth = date[1];

            if(columns[0] === driverID ){
             isExist = true;

                if(parseInt(myMonth) === parseInt(month) && columns[9].trim() === 'true'){
                bounscounter++;
                }
            }
        }


        if(!isExist){
            return -1;
        }

        return bounscounter;
        
        } catch (error) {
        return -1;  
        }

}

// ============================================================
// Function 8: getTotalActiveHoursPerMonth(textFile, driverID, month)
// textFile: (typeof string) path to shifts text file
// driverID: (typeof string)
// month: (typeof number)
// Returns: string formatted as hhh:mm:ss
// ============================================================
function getTotalActiveHoursPerMonth(textFile, driverID, month) {
    try{
        let data = fs.readFileSync(textFile, 'utf-8');
        let lines = data.split('\n');
        let date = '';
        let totalActiveInSeconds = 0;
         for(let i = 1 ; i<lines.length ; i++){
            if (!lines[i].trim()) continue; 

            let columns = lines[i].split(',');
            date = columns[2].split('-');
            let myMonth = date[1];

            if(columns[0] === driverID ){
                if(parseInt(myMonth) === parseInt(month)){
                let activeTime = columns[7].split(':');
                activeTime[2] = activeTime[2].split(' ')[0];
                let activeHours = parseInt(activeTime[0]);
                let activeMinutes = parseInt(activeTime[1]);
                let activeSeconds = parseInt(activeTime[2]);
                totalActiveInSeconds += activeHours * 3600 + activeMinutes * 60 + activeSeconds;
                }
            }
        
        }

        let totalActiveHours = Math.floor(totalActiveInSeconds / 3600);
        let totalActiveMinutes = Math.floor((totalActiveInSeconds % 3600) / 60);
        let totalActiveSeconds = totalActiveInSeconds % 60; 

        if (totalActiveMinutes.toString().length < 2) {
            totalActiveMinutes = '0' + totalActiveMinutes;
        }
        if (totalActiveSeconds.toString().length < 2) {
            totalActiveSeconds = '0' + totalActiveSeconds;
        }

        return totalActiveHours + ':' + totalActiveMinutes + ':' + totalActiveSeconds;

    }
    catch (error) {
        return '000:00:00';
    }
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
    try{
       let dataRate = fs.readFileSync(rateFile, 'utf-8')
       let dataShift = fs.readFileSync(textFile, 'utf-8');

       let rateLines = dataRate.split('\n');
       let shiftLines = dataShift.split('\n');
       let dayOff = '';
       const days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
       let weekday = '';
       let requiredSeconds = 0;
       

       for(let i = 0 ; i <rateLines.length ; i++){
        if (!rateLines[i].trim()) continue;
        let rateColumns = rateLines[i].split(',');
        if(rateColumns[0] === driverID){
            dayOff = rateColumns[1];
            break;
        }
    }
     for(let i = 1 ; i < shiftLines.length; i++){
            if (!shiftLines[i].trim()) continue;
            let shiftColumns = shiftLines[i].split(',');
            if(shiftColumns[0] === driverID){
                let date = shiftColumns[2]
                let dateParts = shiftColumns[2].split('-');
                let myMonth = parseInt(dateParts[1]);
                let myDay = parseInt(dateParts[2]);

                
                if(myMonth === parseInt(month) ){
                    weekday = days[new Date(date).getDay()];
                    if (weekday === dayOff) {
                        continue;
                    }
                    if (myMonth === 4 && myDay >= 10 && myDay <= 30 && dateParts[0] === '2025')  {
                        requiredSeconds += 6 * 3600;
                    }
                    else {
                        requiredSeconds += (8 * 3600) + (24 * 60);
                    }

                    }
                }
        }


        requiredSeconds -= bonusCount * (2 * 3600);

        if (requiredSeconds < 0) {
        requiredSeconds = 0;
        } 
        
        let hours = Math.floor(requiredSeconds / 3600);
        let minutes = Math.floor((requiredSeconds % 3600) / 60);
        let seconds = requiredSeconds % 60;

        if (minutes.toString().length < 2) {
            minutes = '0' + minutes;
        }

        if (seconds.toString().length < 2) {
            seconds = '0' + seconds;
        }

        return hours + ':' + minutes + ':' + seconds;

}
    catch (error) {
        return '000:00:00';
    }

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
    try{
        let dataRate = fs.readFileSync(rateFile, 'utf-8')
        let lines = dataRate.split('\n');
        let basePay = 0;
        let tier = 0;

          for (let i = 0; i < lines.length; i++) {

            if (!lines[i].trim()) continue;

            let columns = lines[i].split(',');

            if (columns[0] === driverID) {
                basePay = parseInt(columns[2]);
                tier = parseInt(columns[3]);
                break;
            }
        }
        let actualParts = actualHours.split(':');
        let requiredParts = requiredHours.split(':');

         let actualSeconds =
            parseInt(actualParts[0]) * 3600 +
            parseInt(actualParts[1]) * 60 +
            parseInt(actualParts[2]);

            let requiredSeconds =
            parseInt(requiredParts[0]) * 3600 +
            parseInt(requiredParts[1]) * 60 +
            parseInt(requiredParts[2]);

             if (actualSeconds >= requiredSeconds) {
            return basePay;
        }
        let missingSeconds = requiredSeconds - actualSeconds;
        let missingHours = Math.floor(missingSeconds / 3600);

        let allowed = 0;

        if (tier === 1) 
            allowed = 50;
        if (tier === 2) 
            allowed = 20;
        if (tier === 3) 
            allowed = 10;
        if (tier === 4) 
            allowed = 3;

        let Missing = missingHours - allowed;

        if (Missing <= 0) {
            return basePay;
        }   
        
        let deductionRatePerHour = Math.floor(basePay / 185);

       
        let salaryDeduction = Missing * deductionRatePerHour;

        let netPay = basePay - salaryDeduction;

        return netPay;

    }
    catch (error) {
        return 0;
    }
    
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

