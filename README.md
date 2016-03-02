# osmlint2csv

Convert [osmlint](https://github.com/osmlab/osmlint) output geojson file to csv file for uploading in to [To-Fix](https://github.com/osmlab/to-fix). This repository contain script that help convert osmlint output files to csv files readable to-fix.

## Installation

```sh
git clone https://github.com/osmlab/osmlint2csv.git
cd osmlint2csv/
npm install & npm link
```
## Test

```sh
npm test
```

## Usage

### Node Ending Near highway

```
osmlint2csv --conv=nodeendingnearhighway --type=major osmlintOutputFile.geojson > majorRoads.csv
osmlint2csv --conv=nodeendingnearhighway --type=minor osmlintOutputFile.geojson > minorRoads.csv
osmlint2csv --conv=nodeendingnearhighway --type=path osmlintOutputFile.geojson > pathRoads.csv
```

### Overlap Highways

`osmlint2csv --v=nodeendingnearhighway osmlintOutputFile.geojson peru.csv`

```
output : peru.csv ,Format: https://github.com/osmlab/to-fix/wiki/Task-sources#krakatoa

```