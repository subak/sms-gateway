define(['ws', 'rxjs'], (WebSocket, Rx) => class WebSocketRx {
  constructor(url, protocols) {
    this._subject = new Rx.Subject;
    this._url = url;
    this._protocols = protocols;
    this._numErrors = 0;

    const ready = new Rx.BehaviorSubject(0);
    ready.next(false);
    this.on('open').mapTo(true).subscribe(ready.next.bind(ready));
    this.on('close').mapTo(false).subscribe(ready.next.bind(ready));
    this._readyState = ready.distinctUntilChanged();
    this._readyState.subscribe(value => this._isReady = value);
  }

  connect(autoReconnect) {
    const ws = new WebSocket(this._url, this._protocols);

    ws.addEventListener('open', () => this._numErrors = 0);
    ws.addEventListener('error', () => this._numErrors++);

    ws.addEventListener('close', () => {
      if (autoReconnect && !this._manualAbort) {
        setTimeout(this.connect.bind(this, true), 1000);
      }
    });

    ws.addEventListener('open', this._subject.next.bind(this._subject));
    ws.addEventListener('close', this._subject.next.bind(this._subject));
    ws.addEventListener('message', this._subject.next.bind(this._subject));
    ws.addEventListener('error', this._subject.next.bind(this._subject));

    this.ws = ws;
    this._manualAbort = false;

    return this;
  }

  disconnect() {
    this._manualAbort = true;
    return this.ready && this.ws.close();
  }

  message(data) {
    return this._subject.next({type: 'message', data: JSON.stringify(data)});
  }

  on(type) {
    return this._subject.filter(ev => ev.type === type);
  }

  ready(callback) {
    return callback && this._readyState.subscribe(callback) || this._isReady;
  }

  error() {
    console.error('channel.error', this._numErrors);
  }
});
