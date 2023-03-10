import IcalExpander from 'ical-expander'

describe('ical', () => {
  it('should parse ical', () => {
    const ical = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Google Inc//Google Calendar 70.9054//EN
DTSTART:19701025T030000
RRULE:FREQ=YEARLY;BYMONTH=10;BYDAY=-1SU
END:STANDARD
END:VTIMEZONE
`

    const icalExpander = new IcalExpander({ ics: ical, maxIterations: 1000 })
    const events = icalExpander.between(new Date('2020-01-01'), new Date('2020-12-31'))
  })
})
