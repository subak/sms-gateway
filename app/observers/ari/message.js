define(['instances/ari'], channel =>
  channel.on('message').map(ev =>
    JSON.parse(ev.data)));
