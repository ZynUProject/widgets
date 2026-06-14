export interface SubscribeButtonOptions {
  containerId: string;
  channelId: string;
  apiKey: string;
  theme?: "dark" | "light" | "blue";
  size?: "sm" | "md" | "lg";
  onSubscribe?: (channelId: string) => void;
  onUnsubscribe?: (channelId: string) => void;
}

const SIZE_MAP = { sm: "28px", md: "36px", lg: "44px" };
const FONT_MAP = { sm: "11px", md: "13px", lg: "15px" };

export class SubscribeButton {
  private container: HTMLElement;
  private options: SubscribeButtonOptions;
  private subscribed = false;
  private button: HTMLButtonElement | null = null;

  constructor(options: SubscribeButtonOptions) {
    const el = document.getElementById(options.containerId);
    if (!el) throw new Error(`Container #${options.containerId} not found`);
    this.container = el;
    this.options = options;
    this.init();
  }

  private async init(): Promise<void> {
    await this.fetchStatus();
    this.render();
  }

  private async fetchStatus(): Promise<void> {
    try {
      const res = await fetch(
        `https://api.zynu.net/v1/users/${this.options.channelId}/subscribe/status`,
        { headers: { Authorization: `Bearer ${this.options.apiKey}` } }
      );
      if (res.ok) {
        const data = await res.json() as { subscribed: boolean };
        this.subscribed = data.subscribed;
      }
    } catch {
      this.subscribed = false;
    }
  }

  private render(): void {
    this.button = document.createElement("button");
    const size = this.options.size ?? "md";
    this.button.style.cssText = `
      height: ${SIZE_MAP[size]};
      padding: 0 16px;
      font-size: ${FONT_MAP[size]};
      font-weight: 600;
      border: none;
      cursor: pointer;
      border-radius: 4px;
      transition: background 0.2s;
    `;
    this.updateButtonStyle();
    this.button.addEventListener("click", () => this.toggle());
    this.container.appendChild(this.button);
  }

  private updateButtonStyle(): void {
    if (!this.button) return;
    this.button.textContent = this.subscribed ? "Subscribed" : "Subscribe";
    this.button.style.background = this.subscribed ? "#333" : "#1a56ff";
    this.button.style.color = "#fff";
  }

  private async toggle(): Promise<void> {
    const method = this.subscribed ? "DELETE" : "POST";
    const res = await fetch(
      `https://api.zynu.net/v1/users/${this.options.channelId}/subscribe`,
      { method, headers: { Authorization: `Bearer ${this.options.apiKey}` } }
    );
    if (res.ok) {
      this.subscribed = !this.subscribed;
      this.subscribed
        ? this.options.onSubscribe?.(this.options.channelId)
        : this.options.onUnsubscribe?.(this.options.channelId);
      this.updateButtonStyle();
    }
  }
}
