export class HeroAmbient {
  private paused = false;
  private visible = true;
  private readonly reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  private readonly button: HTMLButtonElement | null;

  constructor(private readonly hero: HTMLElement) {
    this.button = hero.querySelector('.motion-toggle');
    this.button?.addEventListener('click', () => this.setPaused(!this.paused));
    this.reduced.addEventListener('change', () => this.update());
    document.addEventListener('visibilitychange', () => this.update());
    new IntersectionObserver(([entry]) => {
      this.visible = entry.isIntersecting;
      this.update();
    }, { threshold: 0 }).observe(hero);
    this.update();
  }

  setPaused(paused: boolean) {
    this.paused = paused;
    this.update();
  }

  private update() {
    const stopped = this.paused || this.reduced.matches || !this.visible || document.hidden;
    this.hero.dataset.ambient = stopped ? 'paused' : 'running';
    if (this.button) {
      this.button.hidden = this.reduced.matches;
      this.button.textContent = this.paused ? 'Resume motion' : 'Pause motion';
      this.button.setAttribute('aria-pressed', String(this.paused));
    }
    document.querySelectorAll<HTMLInputElement>('[name="hero-motion"]').forEach(input => {
      input.checked = input.value === (this.paused ? 'still' : 'playful');
    });
  }
}
