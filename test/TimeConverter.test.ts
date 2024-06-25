import {maxTimeOfWeek, TimeConverter, unixAtGpsZero} from "../src/TimeConverter";


describe('TimeConverter', () => {
  const timeStampsAtLeapSecondsChange = [
    {
      utc: '1981-07-01T00:00:00.000Z',
      unixTime: 362793600,
      gnssTime: { week: 77, timeOfWeek: 259201 },
      leapSeconds: 1
    },
    {
      utc: '1982-07-01T00:00:00.000Z',
      unixTime: 394329600,
      gnssTime: { week: 129, timeOfWeek: 345602 },
      leapSeconds: 2
    },
    {
      utc: '1983-07-01T00:00:00.000Z',
      unixTime: 425865600,
      gnssTime: { week: 181, timeOfWeek: 432003 },
      leapSeconds: 3
    },
    {
      utc: '1985-07-01T00:00:00.000Z',
      unixTime: 489024000,
      gnssTime: { week: 286, timeOfWeek: 86404 },
      leapSeconds: 4
    },
    {
      utc: '1988-01-01T00:00:00.000Z',
      unixTime: 567993600,
      gnssTime: { week: 416, timeOfWeek: 432005 },
      leapSeconds: 5
    },
    {
      utc: '1990-01-01T00:00:00.000Z',
      unixTime: 631152000,
      gnssTime: { week: 521, timeOfWeek: 86406 },
      leapSeconds: 6
    },
    {
      utc: '1991-01-01T00:00:00.000Z',
      unixTime: 662688000,
      gnssTime: { week: 573, timeOfWeek: 172807 },
      leapSeconds: 7
    },
    {
      utc: '1992-07-01T00:00:00.000Z',
      unixTime: 709948800,
      gnssTime: { week: 651, timeOfWeek: 259208 },
      leapSeconds: 8
    },
    {
      utc: '1993-07-01T00:00:00.000Z',
      unixTime: 741484800,
      gnssTime: { week: 703, timeOfWeek: 345609 },
      leapSeconds: 9
    },
    {
      utc: '1994-07-01T00:00:00.000Z',
      unixTime: 773020800,
      gnssTime: { week: 755, timeOfWeek: 432010 },
      leapSeconds: 10
    },
    {
      utc: '1996-01-01T00:00:00.000Z',
      unixTime: 820454400,
      gnssTime: { week: 834, timeOfWeek: 86411 },
      leapSeconds: 11
    },
    {
      utc: '1997-07-01T00:00:00.000Z',
      unixTime: 867715200,
      gnssTime: { week: 912, timeOfWeek: 172812 },
      leapSeconds: 12
    },
    {
      utc: '1999-01-01T00:00:00.000Z',
      unixTime: 915148800,
      gnssTime: { week: 990, timeOfWeek: 432013 },
      leapSeconds: 13
    },
    {
      utc: '2006-01-01T00:00:00.000Z',
      unixTime: 1136073600,
      gnssTime: { week: 1356, timeOfWeek: 14 },
      leapSeconds: 14
    },
    {
      utc: '2009-01-01T00:00:00.000Z',
      unixTime: 1230768000,
      gnssTime: { week: 1512, timeOfWeek: 345615 },
      leapSeconds: 15
    },
    {
      utc: '2012-07-01T00:00:00.000Z',
      unixTime: 1341100800,
      gnssTime: { week: 1695, timeOfWeek: 16 },
      leapSeconds: 16
    },
    {
      utc: '2015-07-01T00:00:00.000Z',
      unixTime: 1435708800,
      gnssTime: { week: 1851, timeOfWeek: 259217 },
      leapSeconds: 17
    },
    {
      utc: '2016-12-31T00:00:00.000Z',
      unixTime: 1483142400,
      gnssTime: { week: 1929, timeOfWeek: 518418 },
      leapSeconds: 18
    }
  ];

  describe('convert with leap seconds', () => {
    const timeConverter = new TimeConverter();
    describe('convertUnixTime', () => {
      it('to throw an error if unix timestamp is invalid', () => {
        const invalidUnixTime = -1;
        expect(() => timeConverter.convertUnixTime(invalidUnixTime)).toThrowError();
      });

      it('to convert initial unix timestamp correctly to utc and keep gnss time undefined', () => {
        const initialUnixTime = 0;
        const expectedTimeConversionResult = {
          gnssTime: undefined,
          utc: new Date('1970-01-01T00:00:00.000Z'),
          unixTime: initialUnixTime,
          leapSeconds: 0,
          leapYear: false,
          nextLeapYear: 1972
        };

        const timeConversionResult = timeConverter.convertUnixTime(initialUnixTime);

        expect(timeConversionResult).toStrictEqual(expectedTimeConversionResult);
      });

      it('to convert initial gnss timestamp correctly', () => {
        const unixTime = unixAtGpsZero;
        const expectedTimeConversionResult = {
          gnssTime: { week: 0, timeOfWeek: 0 },
          utc: new Date('1980-01-06T00:00:00.000Z'),
          unixTime,
          leapSeconds: 0,
          leapYear: true,
          nextLeapYear: 1984
        };

        const timeConversionResult = timeConverter.convertUnixTime(unixTime);

        expect(timeConversionResult).toStrictEqual(expectedTimeConversionResult);
      });
    });

    describe('convertGnssTime', () => {
      it('to throw an error if week is invalid', () => {
        const invalidGnssTime = { week: -1, timeOfWeek: 1000 };
        expect(() => timeConverter.convertGnssTime(invalidGnssTime)).toThrowError();
      });

      it('to throw an error if timeOfWeek is invalid', () => {
        const invalidGnssTime = { week: 1000, timeOfWeek: -1 };
        expect(() => timeConverter.convertGnssTime(invalidGnssTime)).toThrowError();
      });

      it('convert initial gnss timestamp correctly', () => {
        const initialGnssTime = { week: 0, timeOfWeek: 0 };
        const expectedTimeConversionResult = {
          gnssTime: initialGnssTime,
          utc: new Date('1980-01-06T00:00:00.000Z'),
          unixTime: unixAtGpsZero,
          leapSeconds: 0,
          leapYear: true,
          nextLeapYear: 1984
        };

        const timeConversionResult = timeConverter.convertGnssTime(initialGnssTime);

        expect(timeConversionResult).toStrictEqual(expectedTimeConversionResult);
      });
    });

    describe('convertUtc', () => {
      it('to convert utc without throwing an error although timestamp is older than initial unix time', () => {
        const utc = new Date('1960-01-01T00:00:00.000Z');
        const expectedTimeConversionResult = {
          gnssTime: undefined,
          utc,
          unixTime: undefined,
          leapSeconds: 0,
          leapYear: true,
          nextLeapYear: 1964
        };

        const timeConversionResult = timeConverter.convertUtc(utc);

        expect(timeConversionResult).toStrictEqual(expectedTimeConversionResult);
      });

      it('should correctly determine that the current year is not a leap year and the next occurring one', () => {
        const utc = new Date('1899-01-01T00:00:00.000Z');
        const timeConversionResult = timeConverter.convertUtc(utc);

        expect(timeConversionResult).toMatchObject({leapYear: false, nextLeapYear: 1904});
      })

      it('should correctly determine that the current year is a leap year and the next occurring one', () => {
        const utc = new Date('1960-01-01T00:00:00.000Z');
        const timeConversionResult = timeConverter.convertUtc(utc);

        expect(timeConversionResult).toMatchObject({leapYear: true, nextLeapYear: 1964});
      });

      it('should correctly determine that the current year is not a leap year and the next occurring one is special', () => {
        const utc = new Date('1998-01-01T00:00:00.000Z');
        const timeConversionResult = timeConverter.convertUtc(utc);

        expect(timeConversionResult).toMatchObject({leapYear: false, nextLeapYear: 2000});
      });
    });

    describe('convertUnixToGnssTime', () => {
      it('to throw an error if unix timestamp is invalid', () => {
        const invalidUnixTimestamp = -1;
        expect(() => timeConverter.convertUnixToGnssTime(invalidUnixTimestamp)).toThrowError();
      });

      it('to return undefined if unix timestamp is older than GPS', () => {
        const unixTimestampOlderThanGnss = unixAtGpsZero - 1;

        const gnssTime = timeConverter.convertUnixToGnssTime(unixTimestampOlderThanGnss);

        expect(gnssTime).toBe(undefined);
      });

      it('convert initial gnss time correctly', () => {
        const unixTime = unixAtGpsZero;
        const expectedGnssTime = { week: 0, timeOfWeek: 0 };

        const gnssTime = timeConverter.convertUnixToGnssTime(unixTime);
        expect(gnssTime).toEqual(expectedGnssTime);
      });

      it.each(timeStampsAtLeapSecondsChange)('that leap seconds are applied at $utc', ({ gnssTime, unixTime }) => {
        const convertedGnssTime = timeConverter.convertUnixToGnssTime(unixTime);
        expect(convertedGnssTime).toStrictEqual(gnssTime);
      });

      it.each(timeStampsAtLeapSecondsChange)(
        'that leap seconds where not applied before $utc',
        ({ gnssTime, unixTime }) => {
          const convertedGnssTimeBeforeChange = timeConverter.convertUnixToGnssTime(unixTime - 1);
          expect(convertedGnssTimeBeforeChange).toStrictEqual({ ...gnssTime, timeOfWeek: gnssTime.timeOfWeek - 1 });
        }
      );
    });

    describe('convertGnssToUnixTime', () => {
      it('to throw an error for weeks smaller than 0', () => {
        const initialGnssTime = { week: -1, timeOfWeek: 0 };

        expect(() => timeConverter.convertGnssToUnixTime(initialGnssTime)).toThrowError();
      });

      it('to throw an error for timeOfWeek smaller than 0', () => {
        const initialGnssTime = { week: 0, timeOfWeek: -1 };

        expect(() => timeConverter.convertGnssToUnixTime(initialGnssTime)).toThrowError();
      });

      it('to throw an error for timeOfWeek greater than maximum number', () => {
        const initialGnssTime = { week: 0, timeOfWeek: maxTimeOfWeek + 1 };

        expect(() => timeConverter.convertGnssToUnixTime(initialGnssTime)).toThrowError();
      });

      it('to convert initial GNSS time correctly', () => {
        const initialGnssTime = { week: 0, timeOfWeek: 0 };
        const expectedUnixTime = unixAtGpsZero;

        const unixTime = timeConverter.convertGnssToUnixTime(initialGnssTime);

        expect(unixTime).toBe(expectedUnixTime);
      });

      it.each(timeStampsAtLeapSecondsChange)('that leap seconds are applied at $utc', ({ gnssTime, unixTime }) => {
        const convertedUnixTimeAtChange = timeConverter.convertGnssToUnixTime(gnssTime);
        expect(convertedUnixTimeAtChange).toBe(unixTime);
      });

      it.each(timeStampsAtLeapSecondsChange)(
        'that leap seconds were not applied before $utc',
        ({ gnssTime, unixTime }) => {
          const convertedUnixTimeBeforeChange = timeConverter.convertGnssToUnixTime({
            ...gnssTime,
            timeOfWeek: gnssTime.timeOfWeek - 1
          });
          expect(convertedUnixTimeBeforeChange).toBe(unixTime);
        }
      );
    });

    describe('convertUtcToGnssTime', () => {
      it('to return undefined if utc time is older than unix initial time', () => {
        const utc = new Date('1960-01-05T00:00:00.000Z');
        const gnssTime = timeConverter.convertUtcToGnssTime(utc);
        expect(gnssTime).toBe(undefined);
      });

      it('to return undefined if utc time is older than gnss initial time', () => {
        const utc = new Date('1980-01-05T00:00:00.000Z');
        const gnssTime = timeConverter.convertUtcToGnssTime(utc);
        expect(gnssTime).toBe(undefined);
      });

      it('to convert correctly to gnss initial time', () => {
        const utc = new Date('1980-01-06T00:00:00.000Z');
        const expectedGnssTime = { week: 0, timeOfWeek: 0 };

        const gnssTime = timeConverter.convertUtcToGnssTime(utc);

        expect(gnssTime).toStrictEqual(expectedGnssTime);
      });

      it.each(timeStampsAtLeapSecondsChange)(
        'utc is correctly converted to gnss time for all leap seconds',
        ({ utc, gnssTime }) => {
          const convertedGnssTime = timeConverter.convertUtcToGnssTime(new Date(utc));
          expect(convertedGnssTime).toStrictEqual(gnssTime);
        }
      );
    });

    describe('convertUtcToUnixTime', () => {
      it('to return undefined if utc timestamp is older than initial unix time', () => {
        const utc = new Date('1960-01-01T00:00:00.000Z');
        const unixTime = timeConverter.convertUtcToGnssTime(utc);
        expect(unixTime).toBe(undefined);
      });

      it('to convert utc of initial unix time correctly', () => {
        const utc = new Date('1970-01-01T00:00:00.000Z');
        const expectedUnixTime = 0;

        const unixTime = timeConverter.convertUtcToUnixTime(utc);

        expect(unixTime).toEqual(expectedUnixTime);
      });

      it('to convert utc of initial gnss time correctly', () => {
        const utc = new Date('1980-01-06T00:00:00.000Z');
        const expectedUnixTime = unixAtGpsZero;

        const unixTime = timeConverter.convertUtcToUnixTime(utc);

        expect(unixTime).toEqual(expectedUnixTime);
      });

      it.each(timeStampsAtLeapSecondsChange)(
        'utc is correctly converted to unix time for all leap seconds',
        ({ utc, unixTime }) => {
          const convertedGnssTime = timeConverter.convertUtcToUnixTime(new Date(utc));
          expect(convertedGnssTime).toStrictEqual(unixTime);
        }
      );
    });

    describe('convertUnixToUtc', () => {
      it('to throw an error if unix time stamp is smaller than zero', () => {
        expect(() => timeConverter.convertUnixToUtc(-1)).toThrowError();
      });

      it('to convert initial unix timestamp correctly to utc', () => {
        const unixTime = 0;
        const expectedUtc = new Date('1970-01-01T00:00:00.000Z');

        const utc = timeConverter.convertUnixToUtc(unixTime);

        expect(utc).toStrictEqual(expectedUtc);
      });

      it('to convert initial gnss timestamp correctly to utc', () => {
        const unixTime = unixAtGpsZero * 1000;
        const expectedUtc = new Date('1980-01-06T00:00:00.000Z');

        const utc = timeConverter.convertUnixToUtc(unixTime);

        expect(utc).toStrictEqual(expectedUtc);
      });

      it.each(timeStampsAtLeapSecondsChange)(
        'unix time is correctly converted to utc for all leap seconds',
        ({ utc, unixTime }) => {
          const convertedGnssTime = timeConverter.convertUnixToUtc(unixTime * 1000);
          expect(convertedGnssTime).toStrictEqual(new Date(utc));
        }
      );
    });

    describe('convertGnssToUtc', () => {
      it('to throw an error if week is invalid', () => {
        const invalidGnssTime = { week: -1, timeOfWeek: 1000 };
        expect(() => timeConverter.convertGnssToUtc(invalidGnssTime)).toThrowError();
      });

      it('to throw an error if timeOfWeek is invalid', () => {
        const invalidGnssTime = { week: 1000, timeOfWeek: -1 };
        expect(() => timeConverter.convertGnssToUtc(invalidGnssTime)).toThrowError();
      });

      it('to convert initial gnss time correctly to utc', () => {
        const gnssTime = { week: 0, timeOfWeek: 0 };
        const expectedUtc = new Date('1980-01-06T00:00:00.000Z');

        const utc = timeConverter.convertGnssToUtc(gnssTime);

        expect(utc).toStrictEqual(expectedUtc);
      });

      it.each(timeStampsAtLeapSecondsChange)(
        'gnss time is correctly converted to utc for all leap seconds',
        ({ gnssTime, utc }) => {
          const convertedGnssTime = timeConverter.convertGnssToUtc(gnssTime);
          expect(convertedGnssTime).toStrictEqual(new Date(utc));
        }
      );
    });
  })
  describe('convert without leap seconds', () => {
    const timeConverter = new TimeConverter(false);
    describe('convertUnixTime', () => {
      it('to throw an error if unix timestamp is invalid', () => {
        const invalidUnixTime = -1;
        expect(() => timeConverter.convertUnixTime(invalidUnixTime)).toThrowError();
      });

      it('to convert initial unix timestamp correctly to utc and keep gnss time undefined', () => {
        const initialUnixTime = 0;
        const expectedTimeConversionResult = {
          gnssTime: undefined,
          utc: new Date('1970-01-01T00:00:00.000Z'),
          unixTime: initialUnixTime,
          leapSeconds: undefined,
          leapYear: false,
          nextLeapYear: 1972
        };

        const timeConversionResult = timeConverter.convertUnixTime(initialUnixTime);

        expect(timeConversionResult).toStrictEqual(expectedTimeConversionResult);
      });

      it('to convert initial gnss timestamp correctly', () => {
        const unixTime = unixAtGpsZero;
        const expectedTimeConversionResult = {
          gnssTime: { week: 0, timeOfWeek: 0 },
          utc: new Date('1980-01-06T00:00:00.000Z'),
          unixTime,
          leapSeconds: undefined,
          leapYear: true,
          nextLeapYear: 1984
        };

        const timeConversionResult = timeConverter.convertUnixTime(unixTime);

        expect(timeConversionResult).toStrictEqual(expectedTimeConversionResult);
      });
    });

    describe('convertGnssTime', () => {
      it('to throw an error if week is invalid', () => {
        const invalidGnssTime = { week: -1, timeOfWeek: 1000 };
        expect(() => timeConverter.convertGnssTime(invalidGnssTime)).toThrowError();
      });

      it('to throw an error if timeOfWeek is invalid', () => {
        const invalidGnssTime = { week: 1000, timeOfWeek: -1 };
        expect(() => timeConverter.convertGnssTime(invalidGnssTime)).toThrowError();
      });

      it('convert initial gnss timestamp correctly', () => {
        const initialGnssTime = { week: 0, timeOfWeek: 0 };
        const expectedTimeConversionResult = {
          gnssTime: initialGnssTime,
          utc: new Date('1980-01-06T00:00:00.000Z'),
          unixTime: unixAtGpsZero,
          leapSeconds: undefined,
          leapYear: true,
          nextLeapYear: 1984
        };

        const timeConversionResult = timeConverter.convertGnssTime(initialGnssTime);

        expect(timeConversionResult).toStrictEqual(expectedTimeConversionResult);
      });
    });

    describe('convertUtc', () => {
      it('to convert utc without throwing an error although timestamp is older than initial unix time', () => {
        const utc = new Date('1960-01-01T00:00:00.000Z');
        const expectedTimeConversionResult = {
          gnssTime: undefined,
          utc,
          unixTime: undefined,
          leapSeconds: undefined,
          leapYear: true,
          nextLeapYear: 1964
        };

        const timeConversionResult = timeConverter.convertUtc(utc);

        expect(timeConversionResult).toStrictEqual(expectedTimeConversionResult);
      });
    });

    describe('convertUnixToGnssTime', () => {
      it('to throw an error if unix timestamp is invalid', () => {
        const invalidUnixTimestamp = -1;
        expect(() => timeConverter.convertUnixToGnssTime(invalidUnixTimestamp)).toThrowError();
      });

      it('to return undefined if unix timestamp is older than GPS', () => {
        const unixTimestampOlderThanGnss = unixAtGpsZero - 1;

        const gnssTime = timeConverter.convertUnixToGnssTime(unixTimestampOlderThanGnss);

        expect(gnssTime).toBe(undefined);
      });

      it('convert initial gnss time correctly', () => {
        const unixTime = unixAtGpsZero;
        const expectedGnssTime = { week: 0, timeOfWeek: 0 };

        const gnssTime = timeConverter.convertUnixToGnssTime(unixTime);
        expect(gnssTime).toEqual(expectedGnssTime);
      });

      it.each(timeStampsAtLeapSecondsChange)('that leap seconds are not applied at $utc', ({ gnssTime, unixTime, leapSeconds }) => {
        const convertedGnssTime = timeConverter.convertUnixToGnssTime(unixTime);
        expect(convertedGnssTime).toStrictEqual({ ...gnssTime, timeOfWeek: gnssTime.timeOfWeek -  leapSeconds});
      });
    });

    describe('convertGnssToUnixTime', () => {
      it('to throw an error for weeks smaller than 0', () => {
        const initialGnssTime = { week: -1, timeOfWeek: 0 };

        expect(() => timeConverter.convertGnssToUnixTime(initialGnssTime)).toThrowError();
      });

      it('to throw an error for timeOfWeek smaller than 0', () => {
        const initialGnssTime = { week: 0, timeOfWeek: -1 };

        expect(() => timeConverter.convertGnssToUnixTime(initialGnssTime)).toThrowError();
      });

      it('to throw an error for timeOfWeek greater than maximum number', () => {
        const initialGnssTime = { week: 0, timeOfWeek: maxTimeOfWeek + 1 };

        expect(() => timeConverter.convertGnssToUnixTime(initialGnssTime)).toThrowError();
      });

      it('to convert initial GNSS time correctly', () => {
        const initialGnssTime = { week: 0, timeOfWeek: 0 };
        const expectedUnixTime = unixAtGpsZero;

        const unixTime = timeConverter.convertGnssToUnixTime(initialGnssTime);

        expect(unixTime).toBe(expectedUnixTime);
      });

      it.each(timeStampsAtLeapSecondsChange)('that leap seconds are not applied at $utc', ({ gnssTime, unixTime, leapSeconds }) => {
        const convertedUnixTimeAtChange = timeConverter.convertGnssToUnixTime(gnssTime);
        expect(convertedUnixTimeAtChange).toBe(unixTime + leapSeconds);
      });
    });

    describe('convertUtcToGnssTime', () => {
      it('to return undefined if utc time is older than unix initial time', () => {
        const utc = new Date('1960-01-05T00:00:00.000Z');
        const gnssTime = timeConverter.convertUtcToGnssTime(utc);
        expect(gnssTime).toBe(undefined);
      });

      it('to return undefined if utc time is older than gnss initial time', () => {
        const utc = new Date('1980-01-05T00:00:00.000Z');
        const gnssTime = timeConverter.convertUtcToGnssTime(utc);
        expect(gnssTime).toBe(undefined);
      });

      it('to convert correctly to gnss initial time', () => {
        const utc = new Date('1980-01-06T00:00:00.000Z');
        const expectedGnssTime = { week: 0, timeOfWeek: 0 };

        const gnssTime = timeConverter.convertUtcToGnssTime(utc);

        expect(gnssTime).toStrictEqual(expectedGnssTime);
      });

      it.each(timeStampsAtLeapSecondsChange)(
        'utc is correctly converted to gnss time for all leap seconds',
        ({ utc, gnssTime, leapSeconds }) => {
          const convertedGnssTime = timeConverter.convertUtcToGnssTime(new Date(utc));
          expect(convertedGnssTime).toStrictEqual({...gnssTime, timeOfWeek: gnssTime.timeOfWeek - leapSeconds});
        }
      );
    });

    describe('convertUtcToUnixTime', () => {
      it('to return undefined if utc timestamp is older than initial unix time', () => {
        const utc = new Date('1960-01-01T00:00:00.000Z');
        const unixTime = timeConverter.convertUtcToGnssTime(utc);
        expect(unixTime).toBe(undefined);
      });

      it('to convert utc of initial unix time correctly', () => {
        const utc = new Date('1970-01-01T00:00:00.000Z');
        const expectedUnixTime = 0;

        const unixTime = timeConverter.convertUtcToUnixTime(utc);

        expect(unixTime).toEqual(expectedUnixTime);
      });

      it('to convert utc of initial gnss time correctly', () => {
        const utc = new Date('1980-01-06T00:00:00.000Z');
        const expectedUnixTime = unixAtGpsZero;

        const unixTime = timeConverter.convertUtcToUnixTime(utc);

        expect(unixTime).toEqual(expectedUnixTime);
      });

      it.each(timeStampsAtLeapSecondsChange)(
        'utc is correctly converted to unix time without leap seconds',
        ({ utc, unixTime }) => {
          const convertedGnssTime = timeConverter.convertUtcToUnixTime(new Date(utc));
          expect(convertedGnssTime).toStrictEqual(unixTime);
        }
      );
    });

    describe('convertUnixToUtc', () => {
      it('to throw an error if unix time stamp is smaller than zero', () => {
        expect(() => timeConverter.convertUnixToUtc(-1)).toThrowError();
      });

      it('to convert initial unix timestamp correctly to utc', () => {
        const unixTime = 0;
        const expectedUtc = new Date('1970-01-01T00:00:00.000Z');

        const utc = timeConverter.convertUnixToUtc(unixTime);

        expect(utc).toStrictEqual(expectedUtc);
      });

      it('to convert initial gnss timestamp correctly to utc', () => {
        const unixTime = unixAtGpsZero * 1000;
        const expectedUtc = new Date('1980-01-06T00:00:00.000Z');

        const utc = timeConverter.convertUnixToUtc(unixTime);

        expect(utc).toStrictEqual(expectedUtc);
      });

      it.each(timeStampsAtLeapSecondsChange)(
        'unix time is correctly converted to utc without leap seconds',
        ({ utc, unixTime }) => {
          const convertedGnssTime = timeConverter.convertUnixToUtc(unixTime * 1000);
          expect(convertedGnssTime).toStrictEqual(new Date(utc));
        }
      );
    });

    describe('convertGnssToUtc', () => {
      it('to throw an error if week is invalid', () => {
        const invalidGnssTime = { week: -1, timeOfWeek: 1000 };
        expect(() => timeConverter.convertGnssToUtc(invalidGnssTime)).toThrowError();
      });

      it('to throw an error if timeOfWeek is invalid', () => {
        const invalidGnssTime = { week: 1000, timeOfWeek: -1 };
        expect(() => timeConverter.convertGnssToUtc(invalidGnssTime)).toThrowError();
      });

      it('to convert initial gnss time correctly to utc', () => {
        const gnssTime = { week: 0, timeOfWeek: 0 };
        const expectedUtc = new Date('1980-01-06T00:00:00.000Z');

        const utc = timeConverter.convertGnssToUtc(gnssTime);

        expect(utc).toStrictEqual(expectedUtc);
      });

      it.each(timeStampsAtLeapSecondsChange)(
        'gnss time is correctly converted to utc without leap seconds',
        ({ gnssTime, utc, leapSeconds }) => {
          const convertedGnssTime = timeConverter.convertGnssToUtc(gnssTime);
          const newDate = new Date(utc);
          const seconds = newDate.getUTCSeconds();
          newDate.setUTCSeconds(seconds + leapSeconds)
          expect(convertedGnssTime).toStrictEqual(newDate);
        }
      );
    });
  })
});
