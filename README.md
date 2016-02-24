# osmlint2csv

convert [osmlint](https://github.com/osmlab/osmlint) output geojson file to csv file for upload in to [To-Fix](https://github.com/osmlab/to-fix)


#### Overlap Highways

` osmlint2csv --v=nodeendingnearhighway peru.geojson peru.csv`

*output:* 
```
output : peru-minor.csv ,Format: https://github.com/osmlab/to-fix/wiki/Task-sources#unconnected-minor
output : peru-major.csv ,Format https://github.com/osmlab/to-fix/wiki/Task-sources#unconnected-minor
```