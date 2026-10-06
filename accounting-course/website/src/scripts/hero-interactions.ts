import { HeroAmbient } from './hero-ambient';

const hero = document.querySelector<HTMLElement>('.hero');
const khata = hero?.querySelector<HTMLDetailsElement>('.khata-character');

if (hero && khata) {
  const ambient = new HeroAmbient(hero);
  const summary = khata.querySelector('summary');
  const closeNote = () => { khata.open = false; };

  document.addEventListener('pointerdown', event => {
    if (event.target instanceof Node && !khata.contains(event.target)) closeNote();
  });
  khata.addEventListener('keydown', event => {
    if (event.key !== 'Escape' || !khata.open) return;
    closeNote();
    summary?.focus({ preventScroll: true });
  });
  khata.addEventListener('focusout', event => {
    if (!(event.relatedTarget instanceof Node) || !khata.contains(event.relatedTarget)) closeNote();
  });

  // The controls only exist in Astro's local development build.
  document.querySelectorAll<HTMLInputElement>('[name="hero-motion"]').forEach(input => {
    input.addEventListener('change', () => { ambient.setPaused(input.value === 'still'); });
  });
  const noteControl = document.querySelector<HTMLInputElement>('[name="khata-note"]');
  noteControl?.addEventListener('change', () => { khata.open = noteControl.checked; });
  khata.addEventListener('toggle', () => {
    if (noteControl) noteControl.checked = khata.open;
  });
}
