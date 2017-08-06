define([
  'lib/sms2mail',
  'lib/mail2sms',
  'instances/ari',
  'instances/ami',
  'instances/imap',
  'observers/ari/sms',
  'config/params'
], (SMS2Mail, Mail2SMS, ari, ami, imap, sms, params) => class Main {
  constructor() {
    new SMS2Mail(sms, params.sendmailPath, params.mailTo);
    new Mail2SMS(imap, ami);

    ari.on('open').subscribe(value => console.info('connected to ari.'));
    
    imap.connect();
    ari.connect(true);
  }
});