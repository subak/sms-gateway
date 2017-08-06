define(['inbox','config/params'], (inbox,params) => 
  inbox.createConnection.apply(this, params.inboxArgs));