/*
 * Get all the details of each earthquake
 * 
 */

"use strict";

var http = require('https');
var fs = require('fs');


function getAllData(sDate, eDate) {

    let startDate = sDate;
    let endDate = eDate;

    let diff = (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24);
    let doneCount = 0;

    let allData = "";

    let writeDataToFile = function (data) {

        fs.appendFileSync("../data/detailed-data-" + process.argv[2] + ".csv", data);

    }

    while (startDate.getTime() !== endDate.getTime()) {

        let startDateYear = startDate.getFullYear();
        let startDateMonth = startDate.getMonth() + 1;
        let startDateDate = startDate.getDate();

        let startDateString = startDateYear + "-" + startDateMonth + "-" + startDateDate;
        startDate.setTime(startDate.getTime() + (24 * 60 * 60 * 1000));
        let nextDateString = startDate.getFullYear() + "-" + parseInt(startDate.getMonth() + 1) + "-" + startDate.getDate();

        let options = {
            host: 'earthquake.usgs.gov',
            path: '/fdsnws/event/1/query?format=geojson&starttime=' + startDateString + '&endtime=' + nextDateString
        };

        let callback = function (repsonse) {
            let str = '';

            repsonse.on('data', function (chunk) {
                str += chunk;
            });

            repsonse.on('end', function () {
                let response = JSON.parse(str).features;

                response.forEach(function (e) {
                    let prop = e.properties;
                    let coords = e.geometry.coordinates;
                    allData += (startDateYear + ";" + startDateMonth + ";" + startDateDate + ";"
                        + prop.mag + ";" + prop.place + ";" + prop.time + ";" + prop.tz + ";"
                        + prop.alert + ";" + prop.status + ";" + prop.tsunami + ";" + prop.sign + ";"
                        + prop.dmin + ";" + prop.rms + ";" + prop.gap + ";" + prop.magType + ";"
                        + prop.type + ";" + coords[0] + ";" + coords[1] + ";" + coords[2] + "\n");
                });

                doneCount++;
                if (doneCount == diff) {
                    writeDataToFile(allData);
                    // console.log(allData);
                }
            });
        }

        http.get(options, callback);
    }
}

let year = process.argv[2];
for (let j = 0; j < 12; j++) {

    let startDate = new Date(year, j, 1);
    let endDate = new Date(year, j + 1, 1);

    getAllData(startDate, endDate);

}