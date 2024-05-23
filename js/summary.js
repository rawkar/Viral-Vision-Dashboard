// Elements from DOM
const totalSammanfattning = document.querySelector('#total-sammanfattning');
const totalTrender = document.querySelector('#sammanfattning-trender');
const totalLinkedin = document.querySelector('#total-linkedin');
const totalInstagram = document.querySelector('#total-instagram');
const totalFacebook = document.querySelector('#total-facebook');
const dator = document.querySelector('#dator');
const mobil = document.querySelector('#mobil');
const geo = document.querySelector('#geo');

// Funktion för att formatera objekt-data till HTML
function formateraObjektTillHTML(data) {
    return Object.values(data)
                 .map(value => `<div>${value}</div>`)
                 .join(''); 
}

// Funktion för att animera siffror från 0 till slutvärde
function animeraSiffror(element, slutVarde, duration = 1000) {
  let startVarde = 0;
  let startTid = null;

  function animation(currentTime) {
    if (startTid === null) startTid = currentTime;
    const timeElapsed = currentTime - startTid;
    const progress = Math.min(timeElapsed / duration, 1);

    let currentVarde;
    if (slutVarde.toString().includes('%')) {
      currentVarde = (progress * (parseFloat(slutVarde) - startVarde) + startVarde).toFixed(2) + '%';
    } else {
      currentVarde = Math.floor(progress * (slutVarde - startVarde) + startVarde).toLocaleString();
    }
    element.textContent = currentVarde;

    if (progress < 1) {
      window.requestAnimationFrame(animation);
    }
  }

  window.requestAnimationFrame(animation);
}

// Funktion för att uppdatera HTML-innehållet i ett element med animation för specifika element
function uppdateraElement(element, data, fallbackText) {
  if (!element) return;

  if (typeof data === 'object' && data !== null) {
    element.innerHTML = formateraObjektTillHTML(data);
  } else if (element === totalLinkedin || element === totalInstagram || element === totalFacebook) {
    // Endast animera för LinkedIn, Instagram och Facebook
    const cleanData = data.replace(/[^0-9.-]/g, '');
    const isPercent = data.includes('%');
    const numericValue = isPercent ? parseFloat(cleanData) : parseInt(cleanData, 10);

    if (isNaN(numericValue)) {
      element.textContent = fallbackText;
    } else {
      animeraSiffror(element, numericValue + (isPercent ? '%' : ''), 500);
    }
  } else {
    element.textContent = data || fallbackText;
  }
}

// Funktion för att hantera och distribuera data
function hanteraData(data) {
    uppdateraElement(totalSammanfattning, data.summary.sammanfattning, 'Data saknas');
    uppdateraElement(totalTrender, data.summary.trend, 'Data saknas');
    uppdateraElement(totalLinkedin, data.summary.platforms.linkedin.growthPercentage, 'Data saknas');
    uppdateraElement(totalFacebook, data.summary.platforms.facebook.growthPercentage, 'Data saknas');
    uppdateraElement(totalInstagram, data.summary.platforms.instagram.growthPercentage, 'Data saknas');
    uppdateraElement(dator, data.summary.deviceUsage.desktop, 'Data saknas');
    uppdateraElement(mobil, data.summary.deviceUsage.mobile, 'Data saknas');
    uppdateraElement(geo, data.summary.geography, 'Data saknas');
}

// Hämtar data och hanterar den
fetch('http://localhost:3000/overview/')
  .then(response => response.json())
  .then(hanteraData)
  .catch(error => {
    console.error('Error fetching data: ', error);
  });
