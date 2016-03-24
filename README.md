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

### Unconnected Highways

```
osmlint2csv --conv=unconnectedhighways --type=major unconnectedhighways.tofix.json > unconnected-highways-major.csv

```

### Overlap Highways

```
osmlint2csv --conv=overlaphighways --type=major-major overlaphighways.tofix.json >overlaphighways-major.csv
```
### Crossing Highways

```
osmlint2csv --conv=crossinghighways --type=major-major crossinghighways.tofix.json > crossing-highways-major.csv
```

### Inslands Highways

```
osmlint2csv --conv=islandsHighways --type=major insladshighways.tofix.json > inslands-highways-major.csv
```
