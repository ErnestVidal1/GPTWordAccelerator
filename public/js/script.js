document.addEventListener('DOMContentLoaded', function() {
    loadLanguage('en'); // Carga el inglés por defecto o usa 'navigator.language' para detectar el idioma del navegador
});

function loadLanguage(lang) {
    fetch('lang/${lang}.json')
        .then(response => response.json())
        .then(data => {
            document.getElementById("welcome").textContent = data.welcome;
            document.getElementById("description").textContent = data.description;
            document.getElementById("installation-title").textContent = data.installation.title;
            document.getElementById("installation-description").textContent = data.installation.description;
            document.getElementById("definition-needs-title").textContent = data.definitionNeeds.title;
            document.getElementById("definition-needs-description").textContent = data.definitionNeeds.description;
            document.getElementById("search-previous-macros-title").textContent = data.searchPreviousMacros.title;
            document.getElementById("search-previous-macros-description").textContent = data.searchPreviousMacros.description;
            document.getElementById("macro-development-title").textContent = data.macroDevelopment.title;
            document.getElementById("macro-development-description").textContent = data.macroDevelopment.description;
            document.getElementById("finalization-archive-title").textContent = data.finalizationArchive.title;
            document.getElementById("finalization-archive-description").textContent = data.finalizationArchive.description;
        })
        .catch(error => console.error('Error loading the language file:', error));
}

function showPage(pageNumber) {
  // Oculta todas las páginas
  document.querySelectorAll("#definition-needs > div").forEach((page) => {
    page.style.display = "none";
  });
  // Muestra la página específica
  document.getElementById("page-" + pageNumber).style.display = "block";
  // Muestra el círculo y restablece su clase
  const circle = document.getElementById("circle1");
  circle.style.display = "flex"; // 'block' puede no mantener el formato, usar 'flex' para centrar el texto
  circle.classList.add("circle");
}



function openDefineAutomationPrompt(event) {
  event.preventDefault();
  alert("Open prompt or form to define automation requirements.");
}

function openSearchMacrosUpload(event) {
  event.preventDefault();
  const uploadInput = document.createElement("input");
  uploadInput.type = "file";
  uploadInput.accept = ".xml";
  uploadInput.onchange = event => {
    const file = event.target.files[0];
    if (file) {
      alert("File " + file.name + " uploaded successfully to Documents.");
      // Aquí puedes agregar el código para procesar el archivo y guardarlo en el servidor
    }
  };
  uploadInput.click();
}
