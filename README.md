# koop-provider-csv-covid-esri

This provider is converting [this CSV](https://code.montera34.com:4443/numeroteca/covid19/-/raw/master/data/output/spain/covid19-provincias-spain_consolidated.csv) to a GeoJSON.

> Note: this script is been used in conjuntion [with this one](https://github.com/esri-es/geovoluntarios.org/blob/master/code/solicitud-esri-espana/refresh_providencialdata19.js) to push data the CSV to a [geographic layer on ArcGIS Online](https://comunidadcovid.maps.arcgis.com/home/item.html?id=2900a255ae0f47779bf9b2036e9d0d87#visualize)

# How to install

```
git clone git@github.com:esri-es/koop-provider-csv-covid-esri.git
cd koop-provider-csv-covid-esri
npm install
koop serve
```

# How to get the GeoJSON data

Open this URLs:

* RAW data: http://localhost:8080/koop-provider-csv-cofid-esri/0/FeatureServer/0/query?f=json
* Map viewer: http://www.arcgis.com/home/webmap/viewer.html?panel=gallery&suggestField=true&url=http://localhost:8080/koop-provider-csv-cofid-esri/0/FeatureServer/0
