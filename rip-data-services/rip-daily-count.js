/*
 * Get the count of daily earthquakes from web service
 * 
 */

"use strict";

var http = require('https');
var fs = require('fs');

let year = 1949;

let startDate = new Date(year, 0, 1);
let endDate = new Date(year+1, 0, 1);

let diff = (endDate.getTime() - startDate.getTime())/(1000 * 60 * 60 * 24);
let doneCount = 0;

let allData = "";

let writeDataToFile = function(data) {

    fs.writeFileSync("data/daily-count-"+year+".csv", data);

}

while (startDate.getTime() !== endDate.getTime()) {

    let startDateYear = startDate.getFullYear();
    let startDateMonth = startDate.getMonth() + 1;
    let startDateDate = startDate.getDate();

    let startDateString = startDateYear + "-" + startDateMonth + "-" + startDateDate;
    startDate.setTime(startDate.getTime() + (24*60*60*1000));
    let nextDateString = startDate.getFullYear() + "-" + parseInt(startDate.getMonth() + 1) + "-" + startDate.getDate();

    let options = {
        host: 'earthquake.usgs.gov',
        path: '/fdsnws/event/1/count?format=geojson&starttime=' + startDateString + '&endtime=' + nextDateString
    };

    let callback = function (repsonse) {
        let str = '';

        repsonse.on('data', function (chunk) {
            str += chunk;
        });

        repsonse.on('end', function () {
            console.log(doneCount);
            allData += (startDateYear + ", " + startDateMonth + ", " + startDateDate + ", " + JSON.parse(str).count + "\n");
            doneCount++;
            if(doneCount == diff) {
                writeDataToFile(allData);
            }
        });
    }

    http.get(options, callback);
}