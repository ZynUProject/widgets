import { VideoPlayer, PlayerOptions } from "../player/VideoPlayer";
import { SubscribeButton, SubscribeButtonOptions } from "../subscribe/SubscribeButton";

export function createPlayer(options: PlayerOptions): VideoPlayer {
  return new VideoPlayer(options);
}

export function createSubscribeButton(options: SubscribeButtonOptions): SubscribeButton {
  return new SubscribeButton(options);
}

export function embedAll(): void {
  document.querySelectorAll<HTMLElement>("[data-zynu-player]").forEach((el) => {
    const videoId = el.dataset.zynuPlayer;
    if (!videoId || el.id === "") return;
    createPlayer({ containerId: el.id, videoId });
  });

  document.querySelectorAll<HTMLElement>("[data-zynu-subscribe]").forEach((el) => {
    const channelId = el.dataset.zynuSubscribe;
    const apiKey = el.dataset.zynuKey;
    if (!channelId || !apiKey || el.id === "") return;
    createSubscribeButton({ containerId: el.id, channelId, apiKey });
  });
}

if (typeof window !== "undefined") {
  (window as Record<string, unknown>).ZynuWidgets = { createPlayer, createSubscribeButton, embedAll };
  document.addEventListener("DOMContentLoaded", () => embedAll());
}
