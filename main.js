document.addEventListener("DOMContentLoaded", () => {
  //  Set the target date: October 31st of the current year at midnight.
  //  Magic numbers
  const month = 9; //october
  const day = 31;
  const now = new Date();
  let targetYear = now.getFullYear();
  let targetDate = new Date(targetYear, month, day, 0, 0, 0);

  // If the date has already passed this year -> use the following year
  if (targetDate.getTime() < now.getTime()) {
    targetDate = new Date(targetYear + 1, month, day, 0, 0, 0);
  }

  // Time constants in milliseconds for calculations
  const MS_PER_SECOND = 1000;
  const MS_PER_MINUTE = MS_PER_SECOND * 60;
  const MS_PER_HOUR = MS_PER_MINUTE * 60;
  const MS_PER_DAY = MS_PER_HOUR * 24;

  // DOM Element Caching
  // It's a good practice to get references only once.
  const dom = {
    days: document.getElementById("days-value"),
    hours: document.getElementById("hours-value"),
    minutes: document.getElementById("minutes-value"),
    seconds: document.getElementById("seconds-value"),
    ticketButton: document.getElementById("ticket-button"),
    messageBox: document.getElementById("message-box"),
    spookyText: document.getElementById("spooky-text"),
  };

  // Utility Function
  // Ensures numbers always have two digits (e.g., 8 -> 08)
  const formatNumber = (num) => String(num).padStart(2, "0");

  // Main Countdown Logic
  function updateCountdown() {
    const now = new Date().getTime();
    let distance = targetDate - now;

    if (distance < 0) {
      // The event has passed, stop the counter and update the message
      distance = 0;
      // Safely clear the interval, regardless of whether setInterval was assigned yet
      clearInterval(countdownInterval);

      // Display end message (Keep display text in Spanish)
      dom.spookyText.textContent = "¡La Noche de Brujas ha llegado!";

      // Update DOM to show 00
      const zero = "00";
      dom.days.textContent = zero;
      dom.hours.textContent = zero;
      dom.minutes.textContent = zero;
      dom.seconds.textContent = zero;
      return;
    }

    // Calculation of time units
    const days = Math.floor(distance / MS_PER_DAY);
    distance %= MS_PER_DAY;

    const hours = Math.floor(distance / MS_PER_HOUR);
    distance %= MS_PER_HOUR;

    const minutes = Math.floor(distance / MS_PER_MINUTE);
    distance %= MS_PER_MINUTE;

    const seconds = Math.floor(distance / MS_PER_SECOND);

    // Update DOM with formatted values
    dom.days.textContent = formatNumber(days);
    dom.hours.textContent = formatNumber(hours);
    dom.minutes.textContent = formatNumber(minutes);
    dom.seconds.textContent = formatNumber(seconds);
  }

  // Countdown Initialization

  // 1. Execute immediately to show correct values upon page load (or check if passed)
  updateCountdown();

  // 2. Start the interval and assign the reference to the declared variable
  countdownInterval = setInterval(updateCountdown, MS_PER_SECOND);

  // Button Event Handler
  if (dom.ticketButton) {
    dom.ticketButton.addEventListener("click", () => {
      // Show notification message
      dom.messageBox.classList.remove("hidden");
      dom.messageBox.classList.add("opacity-100", "translate-y-0");

      // Hide the message after 3 seconds
      setTimeout(() => {
        dom.messageBox.classList.add("hidden", "opacity-0", "translate-y-2");
      }, 3000);
    });
  }
});
