document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();

    const targetID = this.getAttribute('href');
    const target = document.querySelector(targetID);
    if (!target) return;

    // Scroll offset for sticky nav height (adjust if nav height changes)
    const navHeight = document.querySelector('.navbar').offsetHeight || 70;
    const targetPosition = target.offsetTop - navHeight;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    const duration = 700; // ms duration for smooth scroll
    let startTime = null;

    function animation(currentTime) {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const run = easeInOutQuad(timeElapsed, startPosition, distance, duration);
      window.scrollTo(0, run);
      if (timeElapsed < duration) requestAnimationFrame(animation);
    }

    function easeInOutQuad(t, b, c, d) {
      t /= d/2;
      if (t < 1) return c/2*t*t + b;
      t--;
      return -c/2 * (t*(t-2) -1) + b;
    }

    requestAnimationFrame(animation);
  });
});
