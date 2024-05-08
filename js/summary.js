

//Elements from DOM
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
    // Skapa HTML-strängar för varje värde
    return Object.values(data)
                 .map(value => `<div>${value}</div>`)
                 .join(''); 
  }


function uppdateraElement(element, data, fallbackText) {
    if (!element) return;

    if (typeof data === 'object' && data !== null) {
        element.innerHTML = formateraObjektTillHTML(data);
    } else {
        element.textContent = data || fallbackText;
    }
}


function hanteraData(data) {
    uppdateraElement(totalSammanfattning, data.summary.sammanfattning, 'Data saknas');
    uppdateraElement(totalTrender, data.summary.trend, 'Data saknas');
    uppdateraElement(totalLinkedin, data.summary.platforms.linkedin, 'Data saknas');
    uppdateraElement(totalFacebook, data.summary.platforms.facebook, 'Data saknas');
    uppdateraElement(totalInstagram, data.summary.platforms.instagram, 'Data saknas');
    uppdateraElement(dator, data.summary.deviceUsage.desktop, 'Data saknas');
    uppdateraElement(mobil, data.summary.deviceUsage.mobile, 'Data saknas');
    uppdateraElement(geo, data.summary.geography, 'Data saknas');


  }



  fetch('http://localhost:3001/overview/')
    .then(response => response.json())
    .then(hanteraData)
    .catch(error => {
      console.error('Error fetching data: ', error);
  
    });

