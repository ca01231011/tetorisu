class Clock {
  private readonly clockElement: HTMLElement;

  constructor(clockId: string) {
      this.clockElement = document.getElementById(clockId) as HTMLElement;

      if (!this.clockElement) {
          throw new Error(`Element with id ${clockId} not found.`);
      }
  }

  private updateClock() {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, '0');
      const minutes = now.getMinutes().toString().padStart(2, '0');
      const seconds = now.getSeconds().toString().padStart(2, '0');

      this.clockElement.textContent = `${hours}:${minutes}:${seconds}`;
  }

  start() {
      this.updateClock();
      setInterval(() => this.updateClock(), 1000);
  }
}

const clock = new Clock('clock');
clock.start();
