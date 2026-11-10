import { useEffect } from 'react';

export function useScrollReveal(threshold = 0.12) {
  useEffect(() => {
    const elements = document.querySelectorAll('.reveal');

    // Se IntersectionObserver non è disponibile, mostra subito i contenuti:
    // meglio rinunciare all'animazione che lasciare blocchi invisibili.
    if (typeof IntersectionObserver === 'undefined') {
      elements.forEach((el) => el.classList.add('revealed'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold, rootMargin: '0px 0px -40px 0px' }
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [threshold]);
}
