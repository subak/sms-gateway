define(['observers/ari/message'], message =>
  message.filter(data =>
    data.type === 'ChannelVarset' && data.variable === 'SMS_BASE64'));
