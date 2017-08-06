define([
  'lib/sms2mail',
  'lib/mail2sms',
  'instances/ami',
  'instances/imap',
  'observers/ari/sms',
  'config/params'
], (SMS2Mail, Mail2SMS, ami, imap, sms, params) => class Main {
  constructor() {
    new SMS2Mail(sms, params.sendMailPath);
    new Mail2SMS(imap, ami);
  }
});