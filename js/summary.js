// Elements from DOM
const totalSammanfattning = document.querySelector('#total-sammanfattning');
const totalTrender = document.querySelector('#sammanfattning-trender');
const totalLinkedin = document.querySelector('#total-linkedin');
const totalInstagram = document.querySelector('#total-instagram');
const totalFacebook = document.querySelector('#total-facebook');
const dator = document.querySelector('#dator');
const mobil = document.querySelector('#mobil');
const geo = document.querySelector('#geo');



// Funktion för att uppdatera HTML-innehållet i ett element
function uppdateraElement(element, data, fallbackText) {
    if (!element) return;

    // Om data är ett objekt och inte en enkel sträng eller siffra
    if (typeof data === 'object' && data !== null) {
        element.innerHTML = formateraObjektTillHTML(data);
    } else if (typeof data === 'string') {
        element.innerHTML = data || fallbackText;  // Använd innerHTML för att tolka HTML-strukturer
    } else {
        element.textContent = data || fallbackText;  // Använd textContent för icke-HTML data
    }
}


function hanteraData(data) {
  const summary = data.summary;

  // Trend data
  const clicksPercentage = summary.trend.clicksPercentage;
  const viewsPercentage = summary.trend.viewsPercentage;

  // Sammanfattning data
  const totalClicks = summary.sammanfattning.clicks;
  const totalViews = summary.sammanfattning.views;

  // Plattformsdata
  const linkedinGrowth = summary.platforms.linkedin.growthPercentage;
  const instagramGrowth = summary.platforms.instagram.growthPercentage;
  const facebookGrowth = summary.platforms.facebook.growthPercentage;

  // Enhetsanvändning
  const desktopUsage = summary.deviceUsage.desktop;
  const mobileUsage = summary.deviceUsage.mobile;

  // Geografisk information
  const sverigeProcent = summary.geography.Sverige;
  const finlandProcent = summary.geography.Finland;
  const norgeProcent = summary.geography.Norge;

  // Exempel på hur man uppdaterar HTML-elementen
  uppdateraElement(document.querySelector('#sammanfattning-trender'), `${clicksPercentage}<br>${viewsPercentage}`, 'Data saknas');

  uppdateraElement(document.querySelector('#total-sammanfattning'), `${totalClicks} <br> ${totalViews}`, 'Data saknas');
  uppdateraElement(document.querySelector('#total-linkedin'), linkedinGrowth, 'Data saknas');
  uppdateraElement(document.querySelector('#total-instagram'), instagramGrowth, 'Data saknas');
  uppdateraElement(document.querySelector('#total-facebook'), facebookGrowth, 'Data saknas');
  uppdateraElement(document.querySelector('#dator'), desktopUsage, 'Data saknas');
  uppdateraElement(document.querySelector('#mobil'), mobileUsage, 'Data saknas');
  uppdateraElement(document.querySelector('#geo'), ` ${sverigeProcent}<br>  ${finlandProcent}<br>${norgeProcent}`, 'Data saknas');
}

// Antag att fetch hämtar data som ditt objekt
fetch('http://localhost:3001/overview/')
  .then(response => response.json())
  .then(hanteraData)
  .catch(error => console.error('Error fetching data: ', error));

// Elements from DOM
// const totalSammanfattning = document.querySelector('#total-sammanfattning');
// const totalTrender = document.querySelector('#sammanfattning-trender');
// const totalLinkedin = document.querySelector('#total-linkedin');
// const totalInstagram = document.querySelector('#total-instagram');
// const totalFacebook = document.querySelector('#total-facebook');
// const dator = document.querySelector('#dator');
// const mobil = document.querySelector('#mobil');
// const geo = document.querySelector('#geo');

// // Funktion för att formatera objekt-data till HTML

// function formateraObjektTillHTML(data) {
//     // Skapa HTML-strängar för varje värde
//     return Object.values(data)
//                  .map(value => `<div>${value}</div>`)
//                  .join(''); 
//   }


// function uppdateraElement(element, data, fallbackText) {
//     if (!element) return;

//     if (typeof data === 'object' && data !== null) {
//         element.innerHTML = formateraObjektTillHTML(data);
//     } else {
//         element.textContent = data || fallbackText;
//     }
// }


// function hanteraData(data) {
//     uppdateraElement(totalSammanfattning, data.summary.sammanfattning, 'Data saknas');
//     uppdateraElement(totalTrender, data.summary.trend, 'Data saknas');
//     uppdateraElement(totalLinkedin, data.summary.platforms.linkedin, 'Data saknas');
//     uppdateraElement(totalFacebook, data.summary.platforms.facebook, 'Data saknas');
//     uppdateraElement(totalInstagram, data.summary.platforms.instagram, 'Data saknas');
//     uppdateraElement(dator, data.summary.deviceUsage.desktop, 'Data saknas');
//     uppdateraElement(mobil, data.summary.deviceUsage.mobile, 'Data saknas');
//     uppdateraElement(geo, data.summary.geography, 'Data saknas');


//   }



//   fetch('http://localhost:3001/overview/')
//     .then(response => response.json())
//     .then(hanteraData)
//     .catch(error => {
//       console.error('Error fetching data: ', error);
  
//     });

