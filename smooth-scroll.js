// Smooth scroll behavior with acceleration, constant speed, and deceleration
document.querySelectorAll('.links a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const target = document.querySelector(this.getAttribute('href'));
        const targetPosition = target.offsetTop;
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        const duration = 1000; // Milliseconds

        let start = null;
        window.requestAnimationFrame(step);

        function step(timestamp) {
            if (!start) start = timestamp;
            const progress = timestamp - start;
            const percentage = Math.min(progress / duration, 1); // Ensure percentage does not exceed 1
            
            window.scrollTo(0, startPosition + easeInOutQuad(percentage) * distance);
            
            if (progress < duration) {
                window.requestAnimationFrame(step);
            }
        }
    });
});

// Easing function: Acceleration followed by constant speed, then deceleration
function easeInOutQuad(t) {
    return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
}
