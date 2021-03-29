import clock from "clock";
import { display } from "display";
import { HeartRateSensor } from "heart-rate";
import { battery } from 'power';
import document from "document";
import { preferences } from "user-settings";
import * as util from "../common/utils";

import { FitFont } from 'fitfont'


// Get a handle on the <text> element
const _date = document.getElementById("date-label");
const _heartRate = document.getElementById("heart-rate-label");
const _batteryLevel = document.getElementById("battery-label");
const _clock = new FitFont({
  id: 'clock-label',
  font: 'Bungee_Inline_80',
  halign: 'middle'
})


// const _bgImage = document.getElementById("background-image");

// Update the clock every minute. This can be seconds, minutes, or hours
clock.granularity = "minutes";

// Update the <text> element every tick with the current time
clock.ontick = (evt) => {

  updateHeartRateSensor();
  checkAndUpdateBatteryLevel();
  updateTime(evt.date);
  updateDate(evt.date);
}

// Create a new instance of the HeartRateSensor object
let _hrm = new HeartRateSensor();
_hrm.onreading = function () {
  // Peek the current sensor values
  _heartRate.text = _hrm.heartRate;
}

function updateHeartRateSensor() {
  // Begin monitoring the sensor
  _hrm.start();
}

function stopHeartRateSensor() {
  // Stop monitoring the sensor
  _hrm.stop();
}

display.addEventListener('change', function () {
  if (this.on) {
    updateHeartRateSensor();
    checkAndUpdateBatteryLevel();
  } else {
    stopHeartRateSensor();
  }
});

/**
 * Parses current datetime and sets into the date placeholder. e.g. Thu, 7 Jan
 * @param {Date} currentTime 
 */
function updateDate(currentTime) {

  let _dayIndex = currentTime.getDay();
  let _dayOfMonth = currentTime.getDate();
  let _monthIndex = currentTime.getMonth();
  // set the actual date to the placeholder
  _date.text = `${util.getDayName(_dayIndex)}, ${_dayOfMonth} ${util.getMontName(_monthIndex)}`;
}

/**
 * Parses current datetime and sets into the time placeholder in format HH:MM. e.g. 22:43
 * @param {Date} currentTime 
 */
function updateTime(currentTime) {

  let hours = util.getHour(preferences.clockDisplay, currentTime.getHours());
  hours = util.zeroPad(hours);
  let mins = util.zeroPad(currentTime.getMinutes());

  _clock.text = `${hours}:${mins}`;

  // updates the background after 18:00
  updateBackground(hours);
}

/**
 * Updates the background image depends on the given hour.
 * @param {Integer} hours 
 */
function updateBackground(hours) {
  // if (hours >= 18) {
  //   _bgImage.href = "images/dot.png"
  // } else {
  //   _bgImage.href = "images/mountain.png"
  // }
}

/**
 * Updates the battery level
 */
function checkAndUpdateBatteryLevel() {
  _batteryLevel.text = battery.chargeLevel + '%';
}
