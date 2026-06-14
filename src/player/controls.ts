export interface ControlsConfig {
  showPlayPause?: boolean;
  showVolume?: boolean;
  showProgress?: boolean;
  showFullscreen?: boolean;
  showTime?: boolean;
}

export function formatTime(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);
  if (h > 0) return `${h}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  return `${m}:${String(s).padStart(2, "0")}`;
}

export function createProgressBar(container: HTMLElement, onSeek: (pct: number) => void): HTMLElement {
  const bar = document.createElement("div");
  bar.className = "zynu-progress";
  bar.style.cssText = "width:100%;height:4px;background:#333;cursor:pointer;position:relative;";

  const fill = document.createElement("div");
  fill.className = "zynu-progress-fill";
  fill.style.cssText = "height:100%;background:#1a56ff;width:0%;transition:width 0.1s;";
  bar.appendChild(fill);

  bar.addEventListener("click", (e: MouseEvent) => {
    const rect = bar.getBoundingClientRect();
    const pct = (e.clientX - rect.left) / rect.width;
    onSeek(Math.min(1, Math.max(0, pct)));
  });

  container.appendChild(bar);
  return fill;
}
