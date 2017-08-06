define(['web-socket-rx', 'config/params'], (WebSocketRx, config) =>
  new WebSocketRx(config.ariEventsUrl));