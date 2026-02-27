// Translation Runtime - Loads and applies translations dynamically
(function() {
   'use strict';
   
   // Determine translation path - use absolute path for staging compatibility
   const TRANSLATION_PATH = window.location.pathname.startsWith('/') 
      ? '/translations/strings/' 
      : 'translations/strings/';
   const DEFAULT_LANG = 'en';
   let translationsCache = {};
   
   // Debug: Log translation path
   if (typeof console !== 'undefined' && console.log) {
      console.log('[Translation] Translation path:', TRANSLATION_PATH);
   }
   
   // Get current page name from URL
   function getCurrentPageName() {
      const path = window.location.pathname;
      let filename = path.split('/').pop() || 'index.html';
      
      // Handle root path
      if (path === '/' || path === '' || filename === '') {
         return 'index.html';
      }
      
      // Handle PHP files and includes
      // For includes (sidebar.php, header.php), use parent directory + filename
      if (path.includes('/includes/')) {
         const parts = path.split('/');
         const includesIndex = parts.indexOf('includes');
         if (includesIndex > 0) {
            const parentDir = parts[includesIndex - 1];
            return parentDir + '/includes/' + filename;
         }
      }
      
      // For user/ and admin/ directories, include full path in page name
      if (path.includes('/user/') && !path.includes('/includes/')) {
         const userPath = path.substring(path.indexOf('/user/') + 1);
         return userPath.replace(/^\//, '');
      }
      if (path.includes('/admin/') && !path.includes('/includes/')) {
         const adminPath = path.substring(path.indexOf('/admin/') + 1);
         return adminPath.replace(/^\//, '');
      }
      
      // Debug logging
      if (typeof console !== 'undefined' && console.log) {
         console.log('[Translation] Detected page name:', filename, 'from path:', path);
      }
      
      return filename;
   }
   
   // Get current language (reuse from language-selector.js if available)
   function getCurrentLanguage() {
      // First, check URL parameter (highest priority)
      const params = new URLSearchParams(window.location.search);
      const urlLang = params.get('lang');
      if (urlLang && urlLang !== 'en') {
         if (typeof console !== 'undefined' && console.log) {
            console.log('[Translation] Language from URL parameter:', urlLang);
         }
         return urlLang;
      }
      
      // Then check if language-selector.js is available
      if (typeof window.getCurrentLanguage === 'function') {
         const lang = window.getCurrentLanguage();
         if (lang && lang !== 'en') {
            if (typeof console !== 'undefined' && console.log) {
               console.log('[Translation] Language from language-selector:', lang);
            }
            return lang;
         }
      }
      
      // Check localStorage
      try {
         const stored = localStorage.getItem('gb_lang');
         if (stored && stored !== 'en') {
            if (typeof console !== 'undefined' && console.log) {
               console.log('[Translation] Language from localStorage:', stored);
            }
            return stored;
         }
      } catch (e) {
         // localStorage might not be available
      }
      
      // Default to English
      return DEFAULT_LANG;
   }
   
   // Load translation JSON file
   async function loadTranslations(lang) {
      // Check cache first
      if (translationsCache[lang]) {
         return translationsCache[lang];
      }
      
      const translationUrl = `${TRANSLATION_PATH}${lang}.json`;
      
      try {
         if (typeof console !== 'undefined' && console.log) {
            console.log(`[Translation] Loading translations from: ${translationUrl}`);
         }
         
         const response = await fetch(translationUrl, {
            method: 'GET',
            headers: {
               'Accept': 'application/json',
               'Cache-Control': 'no-cache'
            },
            cache: 'no-cache'
         });
         
         if (!response.ok) {
            const errorText = await response.text().catch(() => 'Unknown error');
            const errorMsg = `Failed to load translations for ${lang}: HTTP ${response.status} - ${errorText.substring(0, 200)}`;
            console.error(`[Translation] ${errorMsg}`);
            console.error(`[Translation] Full URL attempted: ${window.location.origin}${translationUrl}`);
            
            // Show user-friendly error in console
            if (response.status === 404) {
               console.error(`[Translation] Translation file not found: ${translationUrl}`);
               console.error(`[Translation] Please verify the file exists at: /translations/strings/${lang}.json`);
            } else if (response.status === 403) {
               console.error(`[Translation] Access forbidden to translation file: ${translationUrl}`);
            } else if (response.status >= 500) {
               console.error(`[Translation] Server error loading translation file: ${translationUrl}`);
            }
            
            throw new Error(errorMsg);
         }
         
         const contentType = response.headers.get('content-type');
         if (!contentType || !contentType.includes('application/json')) {
            console.warn(`[Translation] Unexpected content type for ${lang}.json: ${contentType}`);
            console.warn(`[Translation] Expected: application/json, Got: ${contentType}`);
         }
         
         const data = await response.json();
         
         // Validate translation structure
         if (!data || typeof data !== 'object') {
            throw new Error(`Invalid translation data structure for ${lang}`);
         }
         
         if (!data.strings || typeof data.strings !== 'object') {
            console.warn(`[Translation] Translation file for ${lang} missing 'strings' property`);
         }
         
         translationsCache[lang] = data;
         
         if (typeof console !== 'undefined' && console.log) {
            console.log(`[Translation] Successfully loaded translations for ${lang}`);
            console.log(`[Translation] Translation file contains ${Object.keys(data.strings || {}).length} pages`);
         }
         
         return data;
      } catch (error) {
         console.error(`[Translation] Error loading translations for ${lang}:`, error);
         console.error(`[Translation] Translation file URL: ${window.location.origin}${translationUrl}`);
         console.error(`[Translation] Error details:`, {
            message: error.message,
            name: error.name,
            stack: error.stack
         });
         
         // Try to load default language as fallback
         if (lang !== DEFAULT_LANG) {
            console.log(`[Translation] Attempting to load default language (${DEFAULT_LANG}) as fallback`);
            return loadTranslations(DEFAULT_LANG);
         }
         return null;
      }
   }
   
   // Get translation value from loaded data
   function getTranslation(translations, pageName, key, element) {
      if (!translations || !translations.strings) {
         if (typeof console !== 'undefined' && console.warn) {
            console.warn('[Translation] No translations data available');
         }
         return null;
      }
      
      // Define include pages that might be on this page
      const includePages = [];
      if (pageName === 'my-account.php' || pageName.startsWith('user/')) {
         includePages.push('user/includes/sidebar.php', 'user/includes/header.php');
      }
      if (pageName === 'admin/index.php' || pageName.startsWith('admin/')) {
         includePages.push('admin/includes/sidebar.php', 'admin/includes/header.php', 'login.php');
      }
      
      // Priority 1: Try page-specific translation first (exact key match)
      const pageStrings = translations.strings[pageName];
      if (pageStrings && typeof pageStrings === 'object') {
         if (pageStrings[key]) {
            return pageStrings[key];
         }
         // Try partial key match (for keys like "dashboard.welcome" when key is "dashboard")
         for (const translationKey in pageStrings) {
            if (translationKey === key || translationKey.startsWith(key + '.')) {
               return pageStrings[translationKey];
            }
         }
      }
      
      // Priority 2: Try include pages (sidebar, header) - these are included in the main page
      for (const includePage of includePages) {
         const includeStrings = translations.strings[includePage];
         if (includeStrings && typeof includeStrings === 'object') {
            if (includeStrings[key]) {
               return includeStrings[key];
            }
            // Try partial key match
            for (const translationKey in includeStrings) {
               if (translationKey === key || translationKey.startsWith(key + '.')) {
                  return includeStrings[translationKey];
               }
            }
         }
      }
      
      // Priority 3: Try common namespace fallback
      const commonStrings = translations.strings.common;
      if (commonStrings && typeof commonStrings === 'object') {
         if (commonStrings[key]) {
            return commonStrings[key];
         }
         // Try partial key match
         for (const translationKey in commonStrings) {
            if (translationKey === key || translationKey.startsWith(key + '.')) {
               return commonStrings[translationKey];
            }
         }
      }
      
      // Log warning for missing translations
      if (typeof console !== 'undefined' && console.warn) {
         console.warn(`[Translation] Key not found: "${key}" on page "${pageName}"`);
         if (pageStrings) {
            console.warn(`[Translation] Available keys on page:`, Object.keys(pageStrings).slice(0, 10));
         }
      }
      
      return null;
   }
   
   // Apply translations to page
   async function translatePage() {
      const lang = getCurrentLanguage();
      const pageName = getCurrentPageName();
      
      // Debug logging (can be removed in production)
      if (typeof console !== 'undefined' && console.log) {
         console.log('[Translation] Language:', lang, 'Page:', pageName);
      }
      
      // Redirect if ?lang=en is present (cleanup - English should use clean URL)
      if (lang === 'en' && window.location.search.includes('lang=en')) {
         const url = new URL(window.location.href);
         url.search = ''; // Remove all query parameters
         window.location.replace(url.toString());
         return;
      }
      
      // Skip translation entirely for English (main domain is default English)
      if (lang === 'en' || lang === DEFAULT_LANG) {
         return; // Don't load or apply translations for English
      }
      
      const translations = await loadTranslations(lang);
      if (!translations) {
         if (typeof console !== 'undefined' && console.warn) {
            console.warn('[Translation] Failed to load translations for', lang);
         }
         return;
      }
      
      if (typeof console !== 'undefined' && console.log) {
         console.log('[Translation] Loaded translations, found', Object.keys(translations.strings || {}).length, 'pages');
         console.log('[Translation] Available pages:', Object.keys(translations.strings || {}));
         console.log('[Translation] Looking for page:', pageName);
         if (translations.strings && translations.strings[pageName]) {
            console.log('[Translation] Found translations for page:', pageName, 'with', Object.keys(translations.strings[pageName]).length, 'keys');
         } else {
            console.warn('[Translation] No translations found for page:', pageName);
         }
      }
      
      // Find all elements with data-i18n attribute
      const elements = document.querySelectorAll('[data-i18n]');
      
      // Find elements with data-i18n-placeholder
      const placeholderElements = document.querySelectorAll('[data-i18n-placeholder]');
      
      // Find elements with data-i18n-value
      const valueElements = document.querySelectorAll('[data-i18n-value]');
      
      if (typeof console !== 'undefined' && console.log) {
         console.log('[Translation] Found', elements.length, 'elements with data-i18n');
         console.log('[Translation] Found', placeholderElements.length, 'elements with data-i18n-placeholder');
         console.log('[Translation] Found', valueElements.length, 'elements with data-i18n-value');
      }
      
      let translatedCount = 0;
      let missingKeys = [];
      
      // Translate regular data-i18n elements
      elements.forEach(function(element) {
         const key = element.getAttribute('data-i18n');
         if (!key) return;
         
         const translation = getTranslation(translations, pageName, key, element);
         
         if (translation) {
            translatedCount++;
            // Check if element should preserve HTML or use textContent
            const preserveHtml = element.hasAttribute('data-i18n-html');
            
            if (preserveHtml) {
               element.innerHTML = translation;
            } else {
               // For links with images/icons, preserve structure but update text
               if (element.tagName === 'A' && element.children.length > 0) {
                  // Check if link has an image or icon - if so, find text node after it
                  const hasImage = element.querySelector('img, .icon, [class*="icon"]');
                  if (hasImage) {
                     // Find text node after the image/icon
                     const textNode = Array.from(element.childNodes).find(node => 
                        node.nodeType === Node.TEXT_NODE && node.textContent.trim()
                     );
                     if (textNode) {
                        textNode.textContent = ' ' + translation + ' ';
                     } else {
                        // Append translation text after children
                        element.appendChild(document.createTextNode(' ' + translation));
                     }
                  } else {
                     // Link without images - replace all content
                     element.textContent = translation;
                  }
               } else {
                  // For other elements, replace text content
                  element.textContent = translation;
               }
            }
         } else {
            missingKeys.push(key);
            if (typeof console !== 'undefined' && console.warn) {
               console.warn('[Translation] No translation found for key:', key, 'on page:', pageName);
            }
         }
      });
      
      // Translate placeholder attributes
      placeholderElements.forEach(function(element) {
         const key = element.getAttribute('data-i18n-placeholder');
         if (!key) return;
         
         const translation = getTranslation(translations, pageName, key, element);
         
         if (translation) {
            translatedCount++;
            element.placeholder = translation;
         } else {
            missingKeys.push('placeholder:' + key);
         }
      });
      
      // Translate value attributes (for input buttons, etc.)
      valueElements.forEach(function(element) {
         const key = element.getAttribute('data-i18n-value');
         if (!key) return;
         
         const translation = getTranslation(translations, pageName, key, element);
         
         if (translation) {
            translatedCount++;
            element.value = translation;
         } else {
            missingKeys.push('value:' + key);
         }
      });
      
      if (typeof console !== 'undefined' && console.log) {
         console.log('[Translation] Translated', translatedCount, 'of', elements.length, 'elements');
         if (missingKeys.length > 0) {
            console.warn('[Translation] Missing translations for', missingKeys.length, 'keys:', missingKeys.slice(0, 10));
         }
      }
      
      // Also handle title tag if it has data-i18n
      const titleElement = document.querySelector('title[data-i18n]');
      if (titleElement) {
         const key = titleElement.getAttribute('data-i18n');
         const translation = getTranslation(translations, pageName, key);
         if (translation) {
            document.title = translation;
         }
      }
      
      // Handle confirm dialogs with data-i18n-confirm
      document.querySelectorAll('[data-i18n-confirm]').forEach(function(element) {
         const key = element.getAttribute('data-i18n-confirm');
         const translation = getTranslation(translations, pageName, key);
         if (translation) {
            element.setAttribute('data-i18n-confirm-text', translation);
            // Update onclick to use translated text
            const originalOnclick = element.getAttribute('onclick');
            if (originalOnclick && originalOnclick.includes('confirm')) {
               element.setAttribute('onclick', originalOnclick.replace(/confirm\([^)]+\)/, 'confirm(\'' + translation.replace(/'/g, "\\'") + '\')'));
            }
         }
      });
   }
   
   // Force translation to run - ensures it works even with timing issues
   function forceTranslation() {
      const lang = getCurrentLanguage();
      if (lang && lang !== 'en') {
         if (typeof console !== 'undefined' && console.log) {
            console.log('[Translation] Force translating page, language:', lang);
         }
         translatePage();
      }
   }
   
   // Initialize translation when DOM is ready
   function initTranslation() {
      const lang = getCurrentLanguage();
      
      if (typeof console !== 'undefined' && console.log) {
         console.log('[Translation] Initializing translation system, detected language:', lang);
      }
      
      // Always try to translate if language is not English
      // Don't wait for language-selector.js - getCurrentLanguage() has its own fallback
      if (lang && lang !== 'en') {
         translatePage();
      }
   }
   
   // Initialize when DOM is ready
   if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', function() {
         initTranslation();
         // Also try after delays to catch any timing issues
         setTimeout(forceTranslation, 100);
         setTimeout(forceTranslation, 500);
         setTimeout(forceTranslation, 1000);
      });
   } else {
      // DOM already loaded
      initTranslation();
      setTimeout(forceTranslation, 50);
      setTimeout(forceTranslation, 300);
      setTimeout(forceTranslation, 800);
   }
   
   // Also run after window load (ensures all resources are loaded)
   window.addEventListener('load', function() {
      setTimeout(forceTranslation, 200);
      setTimeout(forceTranslation, 1000);
      setTimeout(forceTranslation, 2000);
   });
   
   // Immediate check if URL has lang parameter - run translation right away
   (function() {
      const params = new URLSearchParams(window.location.search);
      const urlLang = params.get('lang');
      if (urlLang && urlLang !== 'en') {
         // Run translation immediately if lang parameter is present
         setTimeout(function() {
            if (typeof window.translatePage === 'function') {
               window.translatePage();
            }
         }, 50);
      }
   })();
   
   // Listen for language changes
   window.addEventListener('languagechange', forceTranslation);
   
   // Also listen for hashchange (in case language is changed via hash)
   window.addEventListener('hashchange', forceTranslation);
   
   // Expose translatePage for manual triggering
   window.translatePage = translatePage;
   window.forceTranslation = forceTranslation;
   
   // Also expose getCurrentLanguage if language-selector hasn't loaded yet
   if (typeof window.getCurrentLanguage !== 'function') {
      window.getCurrentLanguage = getCurrentLanguage;
   }
})();

