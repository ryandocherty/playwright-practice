//Simple script to log each emulatable device to the console
//Use "node list_devices.js" in the terminal to display

import { devices } from "@playwright/test";

Object.keys(devices).forEach((device) => {
  console.log(device);
});
