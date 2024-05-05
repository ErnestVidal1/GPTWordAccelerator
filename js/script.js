document.addEventListener('DOMContentLoaded', function() {
  loadLanguage('en'); // Load English by default or use 'navigator.language' to detect browser's language
});

function loadLanguage(lang) {
  fetch(`lang/${lang}.json`)
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
