function timers() {
  //  timer
  const deadline = "2022-12-31";
  function getTimeRemaining(endtime) {
    const total = Date.parse(endtime) - Date.parse(new Date()),
      days = Math.floor(total / (24 * 60 * 60 * 1000)),
      hours = Math.floor((total / (60 * 60 * 1000)) % 24),
      minutes = Math.floor((total / (60 * 1000)) % 60),
      seconds = Math.floor((total / 1000) % 60);
    // return {
    //   'total': total,
    //   'days': days,
    //   'hours': hours,
    //   'minutes': minutes,
    //   'seconds': seconds
    // }
    return {
      total,
      days,
      hours,
      minutes,
      seconds,
    };
  }

  function getZero(num) {
    if (num >= 0 && num < 10) {
      return `0${num}`;
    } else {
      return num;
    }
  }
  function setClock(selector, endtime) {
    const timer = document.querySelector(selector),
      days = timer.querySelector("#days"),
      hours = timer.querySelector("#hours"),
      minutes = timer.querySelector("#minutes"),
      seconds = timer.querySelector("#seconds"),
      timeInterval = setInterval(updateclock, 1000);

    updateclock();

    function updateclock() {
      const t = getTimeRemaining(endtime);
      days.innerHTML = getZero(t.days);
      hours.innerHTML = getZero(t.hours);
      minutes.innerHTML = getZero(t.minutes);
      seconds.innerHTML = getZero(t.seconds);
      if (t.total <= 0) {
        clearInterval(timeInterval);
      }
    }
  }
  setClock(".timer", deadline);
}

module.exports = timers;
