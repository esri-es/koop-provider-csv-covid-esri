const fs = require('fs');
const neatCsv = require('neat-csv');
const request = require('request');
const config = require('../config/default.json');
const provinces = require('../es_ine_provinces_simplified.json');

function Model (koop) {}

Model.prototype.getData = function (req, callback) {
  const geojson = {
    type: 'FeatureCollection',
    features: []
  };

  Step01_LoadFile(function (items) {

    var strFields = ["province","ccaa", "source","comments"];
    var intFields = ["id","idField","new_cases","activos","hospitalized","intensive_care","deceased","cases_accumulated","recovered","poblacion","ine_code","cases_per_cienmil","intensive_care_per_1000000","deceassed_per_100000"];
    var fields = [];
    strFields.forEach(val => fields.push({ name: val, type: 'String', alias: val},))
    intFields.forEach(val => fields.push({ name: val, type: 'Integer', alias: val},))
    fields.push({ name: 'date', type: 'Date', alias: 'Fecha'});

    geojson.features = items;

    geojson.metadata = {
        name: "Afectados",
        idField: "id",
        geometryType: "MultiPolygon",
        fields: fields
        /*,
        drawingInfo: require('./symbologyDefinition/heatmap_restaurant.js')*/
    }
    //fs.writeFileSync('./example.json',JSON.stringify(geojson));

    callback(null, geojson)
  });

};
async function Step01_LoadFile(callback) {

  request(config.url, function (err, response, body) {
    var items = [];
    if (err) {
      console.error(err);
      callback(items);
    } else {
      Step02_ConvertData(body,callback);
    }
  });
}
async function Step02_ConvertData(rows,callback){
  
  var cols = ["province","date","ccaa","new_cases","activos","hospitalized","intensive_care","deceased","cases_accumulated","recovered","source","comments","poblacion","ine_code","cases_per_cienmil","intensive_care_per_1000000","deceassed_per_100000"];
  rows = await neatCsv(rows);
  var items = [];
  for (var row in rows) {
    var properties = {id:parseInt(row)+1,idField:parseInt(row)+1};
    for(var x = 0; x < cols.length; x++){
      if(!isNaN(rows[row][cols[x]])){
        properties[cols[x]] = parseInt(rows[row][cols[x]]);
      }else if(rows[row][cols[x]] == "NA"){
        properties[cols[x]] = -1
      }else{
        properties[cols[x]] = rows[row][cols[x]];  
      }
      if(cols[x] == "date"){
       properties[cols[x]] =  new Date(rows[row][cols[x]]);
      }
      
    }

    var feature = {
      type: 'Feature',
      properties: properties,
      geometry: provinces[properties.ine_code]?provinces[properties.ine_code]:{}
    };
    items.push(feature)
  }

  callback(items);
}

module.exports = Model;
