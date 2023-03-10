import IcalExpander from 'ical-expander'

const rawIcs = `BEGIN:VCALENDAR
VERSION:2.0
CALSCALE:GREGORIAN
BEGIN:VEVENT
SUMMARY:Access-A-Ride Pickup 1
DTSTART;TZID=America/New_York:20130802T103400
DTEND;TZID=America/New_York:20130802T110400
LOCATION:1000 Broadway Ave.\, Brooklyn
DESCRIPTION: Access-A-Ride trip to 900 Jay St.\, Brooklyn
STATUS:CONFIRMED
SEQUENCE:3
BEGIN:VALARM
TRIGGER:-PT10M
DESCRIPTION:Pickup Reminder
ACTION:DISPLAY
END:VALARM
END:VEVENT
BEGIN:VEVENT
SUMMARY:Access-A-Ride Pickup 2
DTSTART;TZID=America/New_York:20130802T200000
DTEND;TZID=America/New_York:20130802T203000
LOCATION:900 Jay St.\, Brooklyn
DESCRIPTION: Access-A-Ride trip to 1000 Broadway Ave.\, Brooklyn
STATUS:CONFIRMED
SEQUENCE:3
BEGIN:VALARM
TRIGGER:-PT10M
DESCRIPTION:Pickup Reminder
ACTION:DISPLAY
END:VALARM
END:VEVENT
END:VCALENDAR`

describe('between()', () => {
  it('should parse ical data', () => {
    // Example from the NPM docs
    // https://www.npmjs.com/package/ical-expander#Example
    const icalExpander = new IcalExpander({ ics: rawIcs, maxIterations: 1000 })
    const ical = icalExpander.between(new Date('2010-01-01'), new Date('2020-12-31'))

    const mappedEvents = ical.events.map((e: any) => ({
      startDate: e.startDate,
      summary: e.summary,
    }))
    const mappedOccurrences = ical.occurrences.map((o: any) => ({
      startDate: o.startDate,
      summary: o.item.summary,
    }))
    const allEvents: any = [].concat(mappedEvents, mappedOccurrences)

    expect(ical.events.length).toBe(2)
    expect(ical.events[0].summary).toBe('Access-A-Ride Pickup 1')
    expect(ical.events[0].startDate.toJSDate().toISOString()).toBe('2013-08-02T14:34:00.000Z')

    expect(ical.events[1].summary).toBe('Access-A-Ride Pickup 2')
    expect(ical.events[1].startDate.toJSDate().toISOString()).toBe('2013-08-03T00:00:00.000Z')

    expect(allEvents[0].summary).toBe('Access-A-Ride Pickup 1')
    expect(allEvents[0].startDate.toJSDate().toISOString()).toBe('2013-08-02T14:34:00.000Z')

    expect(allEvents[1].summary).toBe('Access-A-Ride Pickup 2')
    expect(allEvents[1].startDate.toJSDate().toISOString()).toBe('2013-08-03T00:00:00.000Z')
  })
})

describe('between()', () => {
  it('should parse ical data', () => {
    const icalExpander = new IcalExpander({ ics: rawIcs, maxIterations: 1000 })
    const ical = icalExpander.all()
    expect(ical.events.length).toBe(2)
  })
})
