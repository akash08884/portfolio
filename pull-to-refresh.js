// Pull to refresh animation functionality

document.addEventListener('DOMContentLoaded', function() {
    // Create pull-to-refresh container and elements
    const container = document.createElement('div');
    container.className = 'pull-to-refresh-container';
    
    // Add hand SVG
    const hand = document.createElement('div');
    hand.className = 'pull-hand';
    hand.innerHTML = `<img src="hand.svg" alt="Pull to refresh" width="80" height="80">`;
    
    // Add pull indicator
    const indicator = document.createElement('div');
    indicator.className = 'pull-indicator';
    indicator.textContent = 'पुल करके रिफ्रेश करें';
    
    // Add refresh spinner
    const spinner = document.createElement('div');
    spinner.className = 'refresh-spinner';
    
    // Append elements to container
    container.appendChild(hand);
    container.appendChild(indicator);
    container.appendChild(spinner);
    
    // Append container to body
    document.body.appendChild(container);
    
    // Variables for touch handling
    let startY = 0;
    let currentY = 0;
    let pulling = false;
    let pullThreshold = 150; // Minimum pull distance to trigger refresh
    
    // Touch start event
    document.addEventListener('touchstart', function(e) {
        // Only enable pull to refresh when at the top of the page
        if (window.scrollY === 0) {
            startY = e.touches[0].clientY;
            pulling = true;
            hand.style.top = '-80px'; // Show hand slightly
        }
    }, { passive: false });
    
    // Touch move event
    document.addEventListener('touchmove', function(e) {
        if (!pulling) return;
        
        currentY = e.touches[0].clientY;
        let pullDistance = currentY - startY;
        
        // Only activate when pulling down
        if (pullDistance > 0 && window.scrollY === 0) {
            // Prevent default scrolling
            e.preventDefault();
            
            // Calculate hand position (with resistance)
            let handPosition = Math.min(pullDistance * 0.5, 100);
            hand.style.top = (handPosition - 80) + 'px';
            
            // Show indicator when pulling enough
            if (pullDistance > 30) {
                indicator.classList.add('visible');
                hand.classList.add('grabbing');
            }
            
            // Change indicator text when pulling enough to refresh
            if (pullDistance > pullThreshold) {
                indicator.textContent = 'छोड़ें और रिफ्रेश करें';
            } else {
                indicator.textContent = 'पुल करके रिफ्रेश करें';
            }
        }
    }, { passive: false });
    
    // Touch end event
    document.addEventListener('touchend', function() {
        if (!pulling) return;
        
        let pullDistance = currentY - startY;
        
        if (pullDistance > pullThreshold && window.scrollY === 0) {
            // Trigger refresh animation
            hand.classList.add('releasing');
            indicator.classList.remove('visible');
            spinner.classList.add('visible');
            
            // Actual page refresh after animation
            setTimeout(() => {
                window.location.reload();
            }, 1000);
        } else {
            // Reset without refreshing
            hand.classList.remove('grabbing');
            hand.classList.add('releasing');
            indicator.classList.remove('visible');
            
            // Reset hand position after animation
            setTimeout(() => {
                hand.style.top = '-100px';
                hand.classList.remove('releasing');
            }, 500);
        }
        
        pulling = false;
    });
});