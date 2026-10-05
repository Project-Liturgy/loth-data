// Ported directly from build_ordo_local.py - verified date logic.

const DOW_NAMES = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
const DOW_NAMES_LA = ["Dominica","Feria II","Feria III","Feria IV","Feria V","Feria VI","Sabbato"];
const MONTH_NAMES = {8:"August",9:"September",10:"October",11:"November"};
const SEASON_NAMES_EN = {1:"Septuagesima Week",2:"Sexagesima Week",3:"Quinquagesima Week"};
const SEASON_NAMES_LA = {1:"Hebdomada in Septuagesima",2:"Hebdomada in Sexagesima",3:"Hebdomada in Quinquagesima"};
const MONTHSUP = [0,31,59,90,120,151,181,212,243,273,304,334];

function fdiv(a, b) { return Math.floor(a / b); }

function easterDate(year) {
  const a = year % 19;
  const b = fdiv(year, 100);
  const c = year % 100;
  const d = fdiv(b, 4);
  const e = b % 4;
  const f = fdiv(b + 8, 25);
  const g = fdiv(b - f + 1, 3);
  const h = (19*a + b - d - g + 15) % 30;
  const i = fdiv(c, 4);
  const k = c % 4;
  const l = (32 + 2*e + 2*i - h - k) % 7;
  const m = fdiv(a + 11*h + 22*l, 451);
  const month = fdiv(h + l - 7*m + 114, 31);
  const day = ((h + l - 7*m + 114) % 31) + 1;
  return new Date(year, month - 1, day);
}

function dowSun0(d) { return d.getDay(); } // JS getDay(): 0=Sunday..6=Saturday, matches Python's day_of_week_sun0

function addDays(d, n) {
  const r = new Date(d);
  r.setDate(r.getDate() + n);
  return r;
}
function diffDays(a, b) { // a - b, in days
  return Math.round((a.setHours(0,0,0,0) - new Date(b).setHours(0,0,0,0)) / 86400000);
}

function getAdvent(year) {
  const christmas = new Date(year, 11, 25);
  const dow = christmas.getDay() || 7;
  return addDays(christmas, -(dow + 21));
}

function leapYear(year) {
  return (year % 4 === 0) && (year % 100 !== 0 || year % 400 === 0);
}
function dateToYdays(day, month, year) {
  return MONTHSUP[month - 1] + day + ((month > 2 && leapYear(year)) ? 1 : 0);
}

function monthday(day, month, year) {
  if (month < 7) return null;
  const ly = leapYear(year);
  const dayOfYear = dateToYdays(day, month, year);
  let litMonth = 0;
  const firstSundayDayOfYear = [];
  for (let m = 8; m <= 12; m++) {
    const firstOfMonth = MONTHSUP[m - 1] + 1 + (ly ? 1 : 0);
    const dofweek = dowSun0(new Date(year, m - 1, 1));
    let fs = firstOfMonth - dofweek;
    if (dofweek >= 4) fs += 7;
    firstSundayDayOfYear.push(fs);
    if (dayOfYear >= fs) {
      litMonth = m;
    } else {
      break;
    }
  }
  if (!litMonth) return null;
  let advent = null;
  if (litMonth > 10) {
    advent = getAdvent(year);
    const adventYday = (advent.getFullYear() === year)
      ? dateToYdays(advent.getDate(), advent.getMonth() + 1, year)
      : 367;
    if (dayOfYear >= adventYday) return null;
  }
  let week = fdiv(dayOfYear - firstSundayDayOfYear[litMonth - 8], 7);
  if (litMonth === 11 && week > 0) {
    const adv = getAdvent(year);
    const adventYday = dateToYdays(adv.getDate(), adv.getMonth() + 1, year);
    week = 4 - Math.floor((adventYday - dayOfYear - 1) / 7);
  }
  const dow = dowSun0(new Date(year, month - 1, day));
  return {month: litMonth, week: week + 1, dow: dow};
}

function aestivaKey(d, year) {
  const easter = easterDate(year);
  const pentecost = addDays(easter, 49);
  if (d < pentecost) return null;
  const n = fdiv(diffDays(d, pentecost), 7);
  if (n > 15) return null;
  const dow = dowSun0(d);
  return {n: n, dow: dow};
}

function vernaKey(d, year) {
  const easter = easterDate(year);
  const t = diffDays(d, easter);
  const dow = dowSun0(d);
  if (t < -63) return null;
  if (t < -56) return {season: "Quadp", n: 1, dow: dow};
  if (t < -49) return {season: "Quadp", n: 2, dow: dow};
  if (t < -42) return {season: "Quadp", n: 3, dow: dow};
  if (t < 0) {
    const n = 1 + fdiv(t - (-42), 7);
    return {season: "Quad", n: n, dow: dow};
  }
  if (t < 49) {
    const n = fdiv(t, 7);
    return {season: "Pasc", n: n, dow: dow};
  }
  return null;
}

function hiemalisKey(d) {
  const dow = dowSun0(d);
  const dYear = d.getFullYear();
  for (const seasonYear of [dYear, dYear - 1]) {
    const advent1 = getAdvent(seasonYear);
    const christmas = new Date(seasonYear, 11, 25);
    if (advent1 <= d && d < christmas) {
      const n = 1 + fdiv(diffDays(d, advent1), 7);
      return {kind: "Advent", n: n, dow: dow};
    }
    if (d >= christmas && d.getFullYear() === seasonYear) {
      return {kind: "Christmas", month: d.getMonth() + 1, day: d.getDate()};
    }
    if (d.getFullYear() === seasonYear + 1 && d.getMonth() + 1 <= 2) {
      const jan6 = new Date(seasonYear + 1, 0, 6);
      const jan6Dow = dowSun0(jan6);
      const daysToFirstSun = (7 - jan6Dow) % 7;
      const epi1Sunday = addDays(jan6, daysToFirstSun);
      if (d < epi1Sunday) {
        return {kind: "Christmas", month: d.getMonth() + 1, day: d.getDate()};
      }
      const easter = easterDate(seasonYear + 1);
      const septuagesima = addDays(easter, -63);
      if (d < septuagesima) {
        const n = 1 + fdiv(diffDays(d, epi1Sunday), 7);
        return {kind: "Epiphany", n: n, dow: dow};
      }
    }
  }
  return null;
}

function lookup(d, year) {
  const dow = dowSun0(d);

  const ak = aestivaKey(d, year);
  if (ak !== null) {
    return {
      volume: "Aestiva",
      en: `Week ${ak.n} after Pentecost \u2014 ${DOW_NAMES[dow]}`,
      la: `Hebdomada ${ak.n} post Pentecosten \u2014 ${DOW_NAMES_LA[dow]}`
    };
  }

  const vk = vernaKey(d, year);
  if (vk !== null) {
    let baseEn, baseLa;
    if (vk.season === "Quadp") {
      baseEn = SEASON_NAMES_EN[vk.n];
      baseLa = SEASON_NAMES_LA[vk.n];
    } else if (vk.season === "Quad") {
      baseEn = `Lent Week ${vk.n}`;
      baseLa = `Hebdomada ${vk.n} Quadragesim\u00e6`;
    } else {
      baseEn = `Week ${vk.n} after Easter`;
      baseLa = `Hebdomada ${vk.n} post Pascha`;
    }
    return {
      volume: "Verna",
      en: `${baseEn} \u2014 ${DOW_NAMES[dow]}`,
      la: `${baseLa} \u2014 ${DOW_NAMES_LA[dow]}`
    };
  }

  const mk = monthday(d.getDate(), d.getMonth() + 1, year);
  if (mk !== null) {
    const monthName = MONTH_NAMES[mk.month] || String(mk.month);
    return {
      volume: "Autumnalis",
      en: `${monthName}, Week ${mk.week} \u2014 ${DOW_NAMES[dow]}`,
      la: `${monthName}, Hebdomada ${mk.week} \u2014 ${DOW_NAMES_LA[dow]}`
    };
  }

  const hk = hiemalisKey(d);
  if (hk !== null) {
    if (hk.kind === "Advent") {
      return {
        volume: "Hiemalis",
        en: `Advent Week ${hk.n} \u2014 ${DOW_NAMES[dow]}`,
        la: `Hebdomada ${hk.n} Adventus \u2014 ${DOW_NAMES_LA[dow]}`
      };
    } else if (hk.kind === "Christmas") {
      const mnameEn = hk.month === 12 ? "December" : "January";
      const mnameLa = hk.month === 12 ? "Decembris" : "Ianuarii";
      return {
        volume: "Hiemalis",
        en: `${mnameEn} ${hk.day}`,
        la: `Die ${hk.day} ${mnameLa}`
      };
    } else {
      return {
        volume: "Hiemalis",
        en: `Week ${hk.n} after Epiphany \u2014 ${DOW_NAMES[dow]}`,
        la: `Hebdomada ${hk.n} post Epiphaniam \u2014 ${DOW_NAMES_LA[dow]}`
      };
    }
  }

  return {volume: "UNRESOLVED", en: "\u2014", la: "\u2014"};
}


// Parses a day heading (Latin OR English) into its structural
// components, and groups them for the Season/Week/Day picker.

