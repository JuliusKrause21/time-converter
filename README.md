# gnns-time-converter

## Time Formats
When working with satellite navigation systems different representations of time need to be converted into one another. Most of the conversions need to be done between the three following representations.

### Coordinated Universal Time
The [Coordinated Universal Time (UTC)](https://en.wikipedia.org/wiki/Coordinated_Universal_Time) is the primary time standard globally used to regulate clocks and time. It establishes a reference for the current time, forming the basis for civil time and time zones.

### Global Satellite Navigation System Time
The Global Satellite Navigation System (GNSS) time is represented in weeks and seconds of the week, also known as time of week, since the launch of the first operable GPS satellite constellation on te 5th of January 1980.
At that time the GNSS time was in sync with the Coordinated Universal Time (UTC). Over time up to 18 [leap seconds](https://en.wikipedia.org/wiki/Leap_second) have been added to UTC to accommodate the difference between precise time (International Atomic Time (TAI), as measured by atomic clocks) and imprecise observed solar time.

### Unix Time
[The Unix time](https://en.wikipedia.org/wiki/Unix_time) is represented by the number of non-leap seconds that have elapsed since 00:00:00 UTC on 1 January 1970, the Unix epoch. The Unix time of the GNSS initial epoch is therefore `315964800`.

## How to use the library
### Installation:
> npm i @jk21/gnss-time-converter

### Usage:
```javascript
import { TimeConverter } from '@jk21/gnns-time-converter';

const timeConverter = new TimeConverter();
```

### Methods:
The gnss-time-converter provides methods to convert one time format into the other two at once or just into one specific. 
Methods that convert into several time formats return a `TimeConversionResult`.

```javascript
interface TimeConversionResult {
    utc: Date;
    leapYear: boolean;
    gnssTime: GnssTime | undefined;
    unixTime: number | undefined;
    leapSeconds: number | undefined;
    nextLeapYear: number | undefined;
}
```
with `Date` being the built-in javascript Date object and `GnssTime` being

```javascript
interface GnssTime {
  week: number;
  timeOfWeek: number;
}
```

If the time to be converted is before the initial Unix or GNSS epoch `undefined` is returned for this time format.

```javascript
convertUnixTime(unixTime: number): TimeConversionResult
convertGnssTime(gnssTime: GnssTime): TimeConversionResult
convertUtc(utc: Date): TimeConversionResult
```

Single time conversion methods just return the time format of the converted time.

```javascript
convertUnixToGnssTime(unixTime: number): GnssTime | undefined
convertUnixToUtc(unixTime: number): Date
convertUtcToGnssTime(utc: Date): GnssTime | undefined
convertUtcToUnixTime(utc: Date): number | undefined
convertGnssToUnixTime(gnssTime: GnssTime): number
convertGnssToUtc(gnssTime: GnssTime): Date
```