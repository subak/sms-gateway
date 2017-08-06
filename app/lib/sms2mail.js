define(['fs'], (fs) => class SMS2Mail {
  constructor (sms, sendMailPath) {
    this.sendMailPath = sendMailPath;
    sms.subscribe(this.mail.bind(this))
  }

  mail (data) {
    const caller = data.channel.caller.number,
      from = `sms${caller}@tk84.jp`,
      subject = ``,
      body =
        `From: ${caller} <${from}>
To: notify@subak.jp
Subject: SMS from ${caller}
Reply-To: ${caller} <${from}>
Content-Type: text/plain;charset="UTF-8"
Content-Transfer-Encoding: base64

${data.value}`;

    fs.writeFile(this.sendMailPath, body);
  }
});