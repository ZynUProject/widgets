# @zynu/widgets

Embeddable video player and subscribe button for the [ZynU](https://zynu.net) platform.

![license](https://img.shields.io/badge/license-MIT-blue)
![build](https://img.shields.io/badge/build-passing-brightgreen)

## Installation

```bash
npm install @zynu/widgets
```

## Video Player

```html
<div id="player" style="width:640px;height:360px"></div>

<script type="module">
  import { createPlayer } from "@zynu/widgets";

  createPlayer({
    containerId: "player",
    videoId: "your-video-id",
    autoplay: false,
    theme: "dark",
    onReady: () => console.log("ready"),
  });
</script>
```

## Subscribe Button

```html
<div id="sub-btn"></div>

<script type="module">
  import { createSubscribeButton } from "@zynu/widgets";

  createSubscribeButton({
    containerId: "sub-btn",
    channelId: "channel-id",
    apiKey: "zynu_your_api_key",
  });
</script>
```

## Auto Embed (data attributes)

```html
<div id="p1" data-zynu-player="video-id"></div>
<div id="s1" data-zynu-subscribe="channel-id" data-zynu-key="zynu_..."></div>

<script src="https://cdn.zynu.net/widgets/latest/zynu-widgets.umd.js"></script>
```

## License

MIT © [ZynU](https://zynu.net)
