import FingerprintJS from '@fingerprintjs/fingerprintjs';
import { UAParser } from 'ua-parser-js';

export async function getUserData() {
  const fp = await FingerprintJS.load();
  const result = await fp.get();
  const visitorId = result.visitorId;
  

let ipAddress = '';
try {
  const ipRes = await fetch('https://api.ipify.org?format=json');
  const ipJson = await ipRes.json();
  ipAddress = ipJson.ip;
} catch (err) {
  console.error("IP fetch failed:", err);
}

let latitude = '';
let longitude = '';
let city = '';
let region = '';
let country = '';
let timezone = '';

try {
  if (navigator.geolocation) {
    const getPosition = () =>
      new Promise((resolve, reject) =>
        navigator.geolocation.getCurrentPosition(resolve, reject)
      );

    const {
      coords: { latitude: lat, longitude: lon },
    } = await getPosition();

    latitude = lat.toString();
    longitude = lon.toString();

    const geoRes = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`);
    const locationData = await geoRes.json();

    city = locationData.address?.city
        || locationData.address?.town
        || locationData.address?.village
        || locationData.address?.hamlet
        || locationData.address?.county
        || '';
    region = locationData.address?.state || '';
    country = locationData.address?.country || '';
    timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  }
} catch (err) {
  console.warn("Geolocation or reverse geocoding failed:", err);
}

  const parser = new UAParser();
  const uaResult = parser.getResult();
  const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  const guessDevice = () => {
  if (uaResult.device.model) return uaResult.device.model;
  if (uaResult.os.name === 'Windows') return 'Windows PC';
  if (uaResult.os.name === 'Mac OS') return 'MacBook / iMac';
  if (uaResult.os.name === 'Linux') return 'Linux Machine';
  return 'Unknown Device';
};


  return {
    visitorId,
    ip: ipAddress,
    city,
    region,
    country,
    timezone,
    userAgent: navigator.userAgent,
    platform: navigator.platform,
    language: navigator.language,
    screen: {
      width: window.screen.width,
      height: window.screen.height,
      colorDepth: window.screen.colorDepth,
    },
    connection: navigator.connection ? {
      downlink: navigator.connection.downlink,
      effectiveType: navigator.connection.effectiveType,
    } : null,
    touchSupport: hasTouch ? 'yes' : 'no',
    plugins: Array.from(navigator.plugins || []).map(p => p.name),
    browser: uaResult.browser,
    os: uaResult.os,
    device: guessDevice(),
    timestamp: new Date().toISOString(),
    sessionStart: new Date(),
    timezoneOffset: new Date().getTimezoneOffset(),
    referrer: document.referrer,
  };
}
