# osmlint2csv

Convert [osmlint](https://github.com/osmlab/osmlint) output geojson file to csv file for uploading in to [To-Fix](https://github.com/osmlab/to-fix). This repository contain script that help convert osmlint output files to csv files readable to-fix.

#### Node Ending Near highway

`osmlint2csv --v=nodeendingnearhighway osmlintOutout.geojson peru.csv`

*output:* 
```
output : peru-majorRoads.csv ,Format https://github.com/osmlab/to-fix/wiki/Task-sources#unconnected-minor
output : peru-minorRoads.csv ,Format: https://github.com/osmlab/to-fix/wiki/Task-sources#unconnected-minor
output : peru-pathRoads.csv ,Format https://github.com/osmlab/to-fix/wiki/Task-sources#unconnected-minor
```

#### Overlap Highways

` osmlint2csv --v=nodeendingnearhighway osmlintOutout.geojson peru.csv`

```
output : peru.csv ,Format: https://github.com/osmlab/to-fix/wiki/Task-sources#krakatoa

```