// Language Selector Functionality
(function() {
   // Language configuration (no URLs - language is now state-based)
   const languages = {
      'en': { flag: '🇬🇧', name: 'English' },
      'fr': { flag: '🇫🇷', name: 'Français' },
      'pl': { flag: '🇵🇱', name: 'Polski' },
      'ro': { flag: '🇷🇴', name: 'Română' },
      'bn': { flag: '🇧🇩', name: 'বাংলা' }
   };
   
   // Get current language with priority: URL ?lang > localStorage > path detection > default
   function getCurrentLanguage() {
      // Check URL query parameter first (highest priority)
      const params = new URLSearchParams(window.location.search);
      const urlLang = params.get('lang');
      if (urlLang === 'en' || (urlLang && languages[urlLang])) {
         return urlLang;
      }
      
      // Check localStorage (persistent preference)
      try {
         const stored = localStorage.getItem('gb_lang');
         if (stored && languages[stored]) {
            return stored;
         }
      } catch (e) {
         // localStorage might not be available
      }
      
      // Fallback: detect from current path (for country folders accessed directly)
      const path = window.location.pathname;
      if (path.includes('/fr.gamesbeat.top')) return 'fr';
      if (path.includes('/pl.gamesbeat.top')) return 'pl';
      if (path.includes('/ro.gamesbeat.top')) return 'ro';
      if (path.includes('/bd.gamesbeat.top')) return 'bn';
      
      // Default to English (main domain)
      return 'en';
   }
   
   // Set language state (localStorage + URL parameter)
   function setLanguage(langCode) {
      if (!languages[langCode]) return;
      
      // Always save to localStorage for persistence
      if (langCode === 'en') {
         // For English, remove from localStorage (default language)
         localStorage.removeItem('gb_lang');
      } else {
         // For other languages, save to localStorage
         localStorage.setItem('gb_lang', langCode);
      }
      
      // Update URL with ?lang parameter, staying on same path
      const url = new URL(window.location.href);
      if (langCode === 'en') {
         // Remove lang parameter for English
         url.searchParams.delete('lang');
      } else {
         url.searchParams.set('lang', langCode);
      }
      
      // Reload page with new language parameter
      window.location.href = url.toString();
   }
   
   // Update current language display
   function updateCurrentLanguageDisplay(currentLang) {
      const lang = languages[currentLang];
      if (!lang) return;
      
      const flagEl = document.getElementById('currentFlag');
      const flagElMobile = document.getElementById('currentFlagMobile');
      const adminFlagEl = document.getElementById('adminCurrentFlag');
      const btnEl = document.getElementById('languageDropdown');
      const btnElMobile = document.getElementById('languageDropdownMobile');
      const adminBtnEl = document.getElementById('adminLanguageDropdown');
      
      if (flagEl) flagEl.textContent = lang.flag;
      if (flagElMobile) flagElMobile.textContent = lang.flag;
      if (adminFlagEl) adminFlagEl.textContent = lang.flag;
      if (btnEl) btnEl.setAttribute('data-lang-name', lang.name);
      if (btnElMobile) btnElMobile.setAttribute('data-lang-name', lang.name);
      if (adminBtnEl) adminBtnEl.setAttribute('data-lang-name', lang.name);
      
      // Update active state in dropdown
      document.querySelectorAll('.language-option').forEach(function(option) {
         option.classList.remove('active');
         if (option.getAttribute('data-lang') === currentLang) {
            option.classList.add('active');
         }
      });
      
      // Update HTML lang attribute for accessibility/SEO
      const htmlEl = document.documentElement;
      if (htmlEl) {
         htmlEl.setAttribute('lang', currentLang);
      }
   }
   
   // Handle language selection
   document.addEventListener('DOMContentLoaded', function() {
      const currentLang = getCurrentLanguage();
      updateCurrentLanguageDisplay(currentLang);
      
      // Trigger translation if language is not English
      if (currentLang !== 'en' && typeof window.translatePage === 'function') {
         // Small delay to ensure DOM is ready
         setTimeout(function() {
            window.translatePage();
         }, 100);
      }
      
      // Intercept clicks on language options to prevent navigation to subfolders
      document.querySelectorAll('.language-option').forEach(function(option) {
         const langCode = option.getAttribute('data-lang');
         
         option.addEventListener('click', function(e) {
            // Always prevent default navigation - use state-based switching
            e.preventDefault();
            
            // Update UI immediately
            updateCurrentLanguageDisplay(langCode);
            
            // Change language state (will reload page with ?lang parameter)
            setLanguage(langCode);
         });
      });
   });
   
   // Also handle case when page loads with ?lang parameter already in URL
   if (document.readyState === 'complete' || document.readyState === 'interactive') {
      const currentLang = getCurrentLanguage();
      if (currentLang !== 'en') {
         updateCurrentLanguageDisplay(currentLang);
         if (typeof window.translatePage === 'function') {
            setTimeout(function() {
               window.translatePage();
            }, 200);
         }
      }
   }
   
   // Expose getCurrentLanguage for use by other scripts
   window.getCurrentLanguage = getCurrentLanguage;
})();

