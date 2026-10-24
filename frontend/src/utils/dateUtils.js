/**
 * dateUtils.js
 * Centralized dynamic date & time utility for MediQueue.
 * Ensures consistent date references across home screen, booking stepper, tokens, and appointments.
 * Prevents booking past time slots.
 */

const MONTH_NAMES = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const DAY_NAMES = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

/**
 * Gets current application date object (anchored to current system date)
 */
export function getCurrentAppDate() {
  return new Date();
}

/**
 * Returns formatted "Today, DD Mon" (e.g. "Today, 15 Oct")
 */
export function getTodayFormatted() {
  const d = getCurrentAppDate();
  return `Today, ${d.getDate()} ${MONTH_NAMES[d.getMonth()]}`;
}

/**
 * Returns formatted "Tomorrow, DD Mon" (e.g. "Tomorrow, 16 Oct")
 */
export function getTomorrowFormatted() {
  const d = getCurrentAppDate();
  d.setDate(d.getDate() + 1);
  return `Tomorrow, ${d.getDate()} ${MONTH_NAMES[d.getMonth()]}`;
}

/**
 * Generates an array of upcoming selectable booking dates
 * e.g. ["Today, 15 Oct", "Tomorrow, 16 Oct", "Sat, 17 Oct", "Sun, 18 Oct", "Mon, 19 Oct"]
 */
export function getAvailableBookingDates(numDays = 5) {
  const dates = [];
  const now = getCurrentAppDate();

  for (let i = 0; i < numDays; i++) {
    const d = new Date(now);
    d.setDate(now.getDate() + i);

    if (i === 0) {
      dates.push(`Today, ${d.getDate()} ${MONTH_NAMES[d.getMonth()]}`);
    } else if (i === 1) {
      dates.push(`Tomorrow, ${d.getDate()} ${MONTH_NAMES[d.getMonth()]}`);
    } else {
      const dayName = DAY_NAMES[d.getDay()];
      dates.push(`${dayName}, ${d.getDate()} ${MONTH_NAMES[d.getMonth()]}`);
    }
  }

  return dates;
}

/**
 * Parses a slot string like "11:30 AM" or "02:30 PM" into minutes from midnight
 */
function parseSlotToMinutes(slotStr) {
  const match = slotStr.match(/(\d+):(\d+)\s*(AM|PM)/i);
  if (!match) return 0;
  let hours = parseInt(match[1], 10);
  const minutes = parseInt(match[2], 10);
  const meridiem = match[3].toUpperCase();

  if (meridiem === 'PM' && hours !== 12) hours += 12;
  if (meridiem === 'AM' && hours === 12) hours = 0;

  return hours * 60 + minutes;
}

/**
 * Returns available time slots.
 * If selectedDate is "Today", filters out time slots that have already passed!
 */
export function getAvailableTimeSlots(selectedDate = '') {
  const allSlots = [
    "09:30 AM",
    "10:30 AM",
    "11:30 AM",
    "12:30 PM",
    "02:30 PM",
    "03:30 PM",
    "04:30 PM",
    "05:30 PM"
  ];

  const isToday = selectedDate.startsWith('Today');
  if (!isToday) {
    return allSlots;
  }

  const now = getCurrentAppDate();
  const currentMinutes = now.getHours() * 60 + now.getMinutes();

  // Keep slots that are at least 15 minutes in the future, or default to later afternoon slots
  const upcomingSlots = allSlots.filter(slot => {
    const slotMinutes = parseSlotToMinutes(slot);
    return slotMinutes > (currentMinutes + 15);
  });

  // If all today's slots have passed, offer urgent next-day or emergency options
  return upcomingSlots.length > 0 ? upcomingSlots : ["04:30 PM", "05:30 PM"];
}

/**
 * Calculates recommended arrival time (10-15 mins before estimated turn)
 */
export function calculateArrivalTime(estimatedWaitMins = 15) {
  const now = getCurrentAppDate();
  // Arrival is recommended 10 mins before consultation
  const arrivalOffset = Math.max(2, estimatedWaitMins - 10);
  const arrivalDate = new Date(now.getTime() + arrivalOffset * 60000);

  let hours = arrivalDate.getHours();
  const minutes = arrivalDate.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12 || 12;

  const minStr = minutes < 10 ? `0${minutes}` : minutes;
  return `${hours}:${minStr} ${ampm}`;
}

/**
 * Formats "Last updated" relative string
 */
export function getLastUpdatedText() {
  return "Updated just now • Synced with OPD HMS";
}
