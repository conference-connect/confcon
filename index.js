#!/usr/bin/env node

require ('./lib/setup-mongoose');
const app = require('./lib/app');
const port = process.env.PORT || process.argv[2] || 9000;

app.listen(port, () => {
  console.log(`server listening on port ${port}`);
});
