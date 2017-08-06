define(["asterisk-manager", "config/params"], (AsteriskManager, config) => { 
  const ami = new AsteriskManager(
    config.amiUri.port(),
    config.amiUri.hostname(),
    config.amiUri.username(),
    config.amiUri.password());
  ami.keepConnected();
  return ami;
});