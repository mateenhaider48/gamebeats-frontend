/**
 * Game Click Interceptor
 * 
 * Intercepts clicks on game links and checks authentication/subscription status
 * Redirects to login if user is not authenticated or doesn't have active subscription
 */

(function() {
    'use strict';
    
    // Check if user is authenticated and has subscription
    async function checkAuthStatus() {
        try {
            const response = await fetch('/api/auth-check.php', {
                method: 'GET',
                credentials: 'same-origin',
                headers: {
                    'Accept': 'application/json'
                }
            });
            
            if (!response.ok) {
                return { authenticated: false, hasSubscription: false };
            }
            
            const data = await response.json();
            return {
                authenticated: data.authenticated === true,
                hasSubscription: data.hasSubscription === true
            };
        } catch (error) {
            console.error('Error checking auth status:', error);
            return { authenticated: false, hasSubscription: false };
        }
    }
    
    // Intercept game link clicks
    function interceptGameClick(event) {
        const link = event.currentTarget;
        const href = link.getAttribute('href');
        
        // Skip if it's not a game link
        if (!href || link.dataset.gameLink !== 'true') {
            return;
        }
        
        // Always prevent default navigation first
        event.preventDefault();
        event.stopPropagation();
        
        // Check if link is already being processed
        if (link.dataset.processing === 'true') {
            return;
        }
        
        // Mark as processing
        link.dataset.processing = 'true';
        
        // Show loading indicator (optional)
        const originalText = link.innerHTML;
        if (link.querySelector('.name')) {
            link.style.opacity = '0.6';
        }
        
        // Check auth status
        checkAuthStatus().then(status => {
            // Remove processing flag
            link.dataset.processing = 'false';
            link.style.opacity = '1';
            
            if (status.authenticated && status.hasSubscription) {
                // User is authenticated and has subscription, allow navigation
                window.location.href = href;
            } else {
                // User not authenticated or no subscription - redirect to login
                const returnUrl = encodeURIComponent(href);
                window.location.href = '/login.php?redirect=' + returnUrl;
            }
        }).catch(error => {
            // On error, redirect to login for safety
            console.error('Error checking auth status:', error);
            link.dataset.processing = 'false';
            link.style.opacity = '1';
            const returnUrl = encodeURIComponent(href);
            window.location.href = '/login.php?redirect=' + returnUrl;
        });
    }
    
    // Initialize interceptor when DOM is ready
    function init() {
        // Find all game links
        const gameLinks = document.querySelectorAll('a[data-game-link="true"]');
        
        if (gameLinks.length === 0) {
            console.warn('Game click interceptor: No game links found with data-game-link="true"');
        } else {
            console.log('Game click interceptor: Found', gameLinks.length, 'game links');
        }
        
        // Add click listeners with capture phase to ensure we catch the event early
        gameLinks.forEach(link => {
            // Remove any existing listeners to avoid duplicates
            link.removeEventListener('click', interceptGameClick, true);
            link.addEventListener('click', interceptGameClick, true); // Use capture phase
        });
        
        // Also intercept dynamically added links
        const observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                mutation.addedNodes.forEach(function(node) {
                    if (node.nodeType === 1) { // Element node
                        if (node.tagName === 'A' && node.dataset.gameLink === 'true') {
                            node.removeEventListener('click', interceptGameClick, true);
                            node.addEventListener('click', interceptGameClick, true);
                        }
                        // Check child elements
                        const childLinks = node.querySelectorAll && node.querySelectorAll('a[data-game-link="true"]');
                        if (childLinks) {
                            childLinks.forEach(link => {
                                link.removeEventListener('click', interceptGameClick, true);
                                link.addEventListener('click', interceptGameClick, true);
                            });
                        }
                    }
                });
            });
        });
        
        // Observe document body for changes
        if (document.body) {
            observer.observe(document.body, {
                childList: true,
                subtree: true
            });
        }
    }
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
    
    // Also initialize after delays to catch any late-loading content
    setTimeout(init, 500);
    setTimeout(init, 1000);
    setTimeout(init, 2000);
    
    // Log that interceptor is loaded
    console.log('Game click interceptor loaded');
})();

