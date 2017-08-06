define(['util', 'mailparser'], (util, mailparser) => class Mail2SMS {
  constructor(imap, ami) {
    this.ami = ami;
    this.imap = imap;

    imap.on('connect', () =>
      util.promisify(imap.openMailbox).bind(imap)("INBOX")
        .then(console.log.bind(console)));

    imap.on('new', this.onNew.bind(this));
  }
  
  onNew (mail) {
    let parser = new mailparser.MailParser,
      data = new Promise(resolve =>
        parser.on('data', resolve.bind(resolve))),
      headers = new Promise(resolve =>
        parser.on('headers', resolve.bind(resolve)));

    Promise.all([headers, data])
      .then(args => {
        let headers = args[0],
          data = args[1],
          number = headers.get('to').value[0].name,
          message = data.text;

        this.sms(number,message);
      });

    this.imap.createMessageStream(mail.UID).pipe(parser);    
  }
  
  sms (number, message) {
    this.ami.action({
      Action: 'DongleSendSMS',
      Device: 'dongle0',
      Number: number,
      Message: message
    });
  }
});