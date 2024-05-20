export default function getDayName(dateString) {
  // Create a Date object from the date string
  const date = new Date(dateString);

  // Array of day names
  const days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];

  // Get the day index (0-6)
  const dayIndex = date.getDay();

  // Return the corresponding day name
  return days[dayIndex];
}
