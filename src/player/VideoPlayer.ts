export interface PlayerOptions {
  containerId: string;
  videoId: string;
  autoplay?: boolean;
  muted?: boolean;
  loop?: boolean;
  width?: string | number;
  height?: string | number;
  theme?: "dark" | "light";
  onReady?: () => void;
  onPlay?: () => void;
  onPause?: () => void;
  onEnded?: () => void;
  onError?: (err: Error) => void;
}

export class VideoPlayer {
  private container: HTMLElement;
  private options: PlayerOptions;
  private iframe: HTMLIFrameElement | null = null;

  constructor(options: PlayerOptions) {
    const el = document.getElementById(options.containerId);
    if (!el) throw new Error(`Container #${options.containerId} not found`);
    this.container = el;
    this.options = options;
    this.render();
  }

  private buildEmbedUrl(): string {
    const base = "https://zynu.net/embed";
    const params = new URLSearchParams({
      v: this.options.videoId,
      autoplay: String(this.options.autoplay ?? false),
      muted: String(this.options.muted ?? false),
      loop: String(this.options.loop ?? false),
      theme: this.options.theme ?? "dark",
    });
    return `${base}/${this.options.videoId}?${params}`;
  }

  private render(): void {
    this.container.innerHTML = "";
    this.container.style.position = "relative";
    this.container.style.overflow = "hidden";
    this.container.style.background = "#000";

    this.iframe = document.createElement("iframe");
    this.iframe.src = this.buildEmbedUrl();
    this.iframe.width = String(this.options.width ?? "100%");
    this.iframe.height = String(this.options.height ?? "100%");
    this.iframe.frameBorder = "0";
    this.iframe.allow = "autoplay; fullscreen; picture-in-picture";
    this.iframe.allowFullscreen = true;

    this.iframe.onload = () => this.options.onReady?.();
    this.container.appendChild(this.iframe);

    window.addEventListener("message", this.handleMessage.bind(this));
  }

  private handleMessage(event: MessageEvent): void {
    if (event.origin !== "https://zynu.net") return;
    const { type } = event.data as { type: string };
    if (type === "play") this.options.onPlay?.();
    if (type === "pause") this.options.onPause?.();
    if (type === "ended") this.options.onEnded?.();
  }

  play(): void { this.postMessage("play"); }
  pause(): void { this.postMessage("pause"); }
  seek(seconds: number): void { this.postMessage("seek", { seconds }); }
  setVolume(level: number): void { this.postMessage("volume", { level: Math.min(1, Math.max(0, level)) }); }

  private postMessage(action: string, data?: object): void {
    this.iframe?.contentWindow?.postMessage({ action, ...data }, "https://zynu.net");
  }

  destroy(): void {
    window.removeEventListener("message", this.handleMessage.bind(this));
    this.container.innerHTML = "";
    this.iframe = null;
  }
}
