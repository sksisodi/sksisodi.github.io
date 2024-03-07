function openNav() {
    document.getElementById("mySidebar").style.width = "40%";
    document.getElementById("mySidebar").style.display = "block";
  }
  
  function closeNav() {
    document.getElementById("mySidebar").style.display = "none";
  }
  document.addEventListener("DOMContentLoaded", function(event) { 
      document.getElementById('last-updated').textContent = document.lastModified;
    });