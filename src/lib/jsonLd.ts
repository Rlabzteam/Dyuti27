export function generateConferenceJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Event',
    'name': 'DYUTI 2027 - International Academic Conference',
    'startDate': '2027-01-06',
    'endDate': '2027-01-08',
    'eventAttendanceMode': 'https://schema.org/OfflineEventAttendanceMode',
    'eventStatus': 'https://schema.org/EventScheduled',
    'location': {
      '@type': 'Place',
      'name': 'Rajagiri College of Social Sciences (Autonomous)',
      'address': {
        '@type': 'PostalAddress',
        'streetAddress': 'Rajagiri Road, South Kalamassery',
        'addressLocality': 'Kochi',
        'postalCode': '683104',
        'addressRegion': 'Kerala',
        'addressCountry': 'IN'
      }
    }
  };
}
