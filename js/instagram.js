// Elements from DOM
const antalFoljare = document.querySelector('#antal-foljare');
const nyaFoljare = document.querySelector('#nya-foljare');
const okningFoljare = document.querySelector('#okning-foljare');
const bastaInlagg = document.querySelector('#basta-inlagg');
const klickInlagg = document.querySelector('#klick-inlagg');
const dator = document.querySelector('#dator');
const mobil = document.querySelector('#mobil');
const geo = document.querySelector('#geo');

// Funktion för att formatera objekt-data till HTML
function formateraObjektTillHTML(data) {
    return Object.values(data)
                 .map(value => `<div>${value}</div>`)
                 .join(''); // Sammanfoga utan något extra mellan div-taggar
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

// Funktion för att animera siffror från 0 till slutvärde
function uppdateraElement(element, data, fallbackText) {
  if (!element) return;

  if (element === antalFoljare || element === nyaFoljare || element === okningFoljare) {
    const cleanData = data.replace(/[^0-9.-]/g, '');
    const isPercent = data.includes('%');
    const numericValue = isPercent ? parseFloat(cleanData) : parseInt(cleanData, 10);

    if (isNaN(numericValue)) {
      element.textContent = fallbackText;
    } else {
      
      animeraSiffror(element, numericValue + (isPercent ? '%' : ''), 500);
    }
  } else if (typeof data === 'object' && data !== null) {
    element.innerHTML = formateraObjektTillHTML(data);
  } else {
    element.textContent = data || fallbackText;
  }
}

// Funktion för att hantera och distribuera data
function hanteraData(data) {
  uppdateraElement(antalFoljare, data.instagram.totalFollowers.toString(), 'Data saknas');
  uppdateraElement(nyaFoljare, data.instagram.newFollowers.toString(), 'Data saknas');
  uppdateraElement(okningFoljare, data.instagram.growthPercentage, 'Data saknas');
  uppdateraElement(bastaInlagg, data.instagram.clicks.bestPost, 'Data saknas');
  uppdateraElement(klickInlagg, data.instagram.clicks.allClicks, 'Data saknas');
  uppdateraElement(dator, data.instagram.deviceUsage.desktop, 'Data saknas');
  uppdateraElement(mobil, data.instagram.deviceUsage.mobile, 'Data saknas');
  uppdateraElement(geo, data.instagram.geography, 'Data saknas');
}

fetch('http://localhost:3000/overview/')
  .then(response => response.json())
  .then(hanteraData)
  .catch(error => {
    console.error('Error fetching data: ', error);
  });
