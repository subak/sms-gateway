define(['urijs'], (URI) => {
  "use strict";
  
  const amiUri = new URI(process.env.AMI_URI);
  
  return {
    amiUri: amiUri,
    ariEventsUrl: process.env.ARI_EVENTS_URL,
    inboxArgs: JSON.parse(process.env.INBOX_ARGS),
    sendmailPath: process.env.SENDMAIL_PATH,
    mailTo: process.env.MAIL_TO
  }
});