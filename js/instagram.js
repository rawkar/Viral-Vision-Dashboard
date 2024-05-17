// Elements from DOM
const antalFoljare = document.querySelector('#antal-foljare');
const nyaFoljare = document.querySelector('#nya-foljare');
const okningFoljare = document.querySelector('#okning-foljare');
const bastaInlagg = document.querySelector('#basta-inlagg');
const klickInlagg = document.querySelector('#klick-inlagg');
const klickInlaggChange = document.querySelector('#klick-inlagg-change');
const dator = document.querySelector('#dator');
const mobil = document.querySelector('#mobil');
const geo = document.querySelector('#geo');

// Funktion för att formatera objekt-data till HTML

function formateraObjektTillHTML(data) {
    // Skapa HTML-strängar för varje värde
    return Object.values(data)
                 .map(value => `<div>${value}</div>`)
                 .join(''); // Sammanfoga utan något extra mellan div-taggar
  }
  
  
  // Funktion för att uppdatera HTML-innehållet i ett element
  function uppdateraElement(element, data, fallbackText) {
    if (!element) return;
  
    // Om data är ett objekt och inte en enkel sträng eller siffra
    if (typeof data === 'object' && data !== null) {
      element.innerHTML = formateraObjektTillHTML(data); // Använd innerHTML för att tolka HTML-strukturer
    } else {
      element.textContent = data || fallbackText;
    }
  }


// Funktion för att hantera och distribuera data
function hanteraData(data) {
    uppdateraElement(antalFoljare, data.instagram.totalFollowers, 'Kunde inte ladda antal följare');
    uppdateraElement(nyaFoljare, data.instagram.newFollowers, 'Data saknas');
    uppdateraElement(okningFoljare, data.instagram.growthPercentage, 'Data saknas');
    uppdateraElement(bastaInlagg, data.instagram.clicks.bestPost, 'Data saknas'); 
    uppdateraElement(klickInlagg, data.linkedin.clicks.allClicks, 'Data saknas');
    uppdateraElement(dator, data.instagram.deviceUsage.desktop, 'Data saknas');
    uppdateraElement(mobil, data.instagram.deviceUsage.mobile, 'Data saknas');
    uppdateraElement(geo, data.instagram.geography, 'Data saknas');

 
  }
  
  fetch('http://localhost:3000/overview/')
    .then(response => response.json())
    .then(hanteraData)
    .catch(error => {
      console.error('Error fetching data: ', error);
      // Visa ett allmänt felmeddelande eller hantera varje element individuellt om nödvändigt
    });
  