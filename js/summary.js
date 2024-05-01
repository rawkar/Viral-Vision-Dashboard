fetch('http://localhost:3001/overview/')  
  .then(response => response.json())
  .then(data => console.log(data.summary)); 