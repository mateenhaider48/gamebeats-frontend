/**
 * Password Toggle Functionality
 * Toggles password visibility and updates icon
 */

(function() {
    'use strict';
    
    /**
     * Initialize password toggle for all password fields with toggle buttons
     */
    function initPasswordToggle() {
        // Find all password fields with toggle buttons
        document.querySelectorAll('[data-password-toggle]').forEach(function(toggleBtn) {
            const passwordInput = document.querySelector(toggleBtn.getAttribute('data-password-toggle'));
            const icon = toggleBtn.querySelector('i');
            
            if (!passwordInput || !icon) {
                return; // Skip if elements not found
            }
            
            // Add click event listener
            toggleBtn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                // Toggle password visibility
                if (passwordInput.type === 'password') {
                    passwordInput.type = 'text';
                    icon.classList.remove('fa-eye');
                    icon.classList.add('fa-eye-slash');
                    toggleBtn.setAttribute('aria-label', 'Hide password');
                } else {
                    passwordInput.type = 'password';
                    icon.classList.remove('fa-eye-slash');
                    icon.classList.add('fa-eye');
                    toggleBtn.setAttribute('aria-label', 'Show password');
                }
            });
        });
    }
    
    // Initialize on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initPasswordToggle);
    } else {
        initPasswordToggle();
    }
})();

