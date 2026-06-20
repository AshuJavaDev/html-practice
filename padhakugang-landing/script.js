function updateCountdown()  {
  const launch = new Date(`October 20, 2026 00:00:00`);
  const now = new Date();
  const diff = launch - now;

  const days = Math.floor(diff/(1000*60*60*24));
  const hours = Math.floor(diff%(1000*60*60*24)/(1000*60*60));
  const minutes = Math.floor((diff%(1000*60*60))/(1000*60));
  const seconds = Math.floor((diff%(1000*60))/1000);
  
  document.getElementById(`countdown`).innerHTML = 
    `Launching in: ${days}d  ${hours}h  ${minutes}m  ${seconds}s`;
}
  
  setInterval(updateCountdown, 1000);
  updateCountdown();