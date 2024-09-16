import fs from 'fs';

const envFilePath =
  process.env.NODE_ENV == 'production'
    ? `/etc/secrets/.env`
    : `${process.cwd()}/.env`;

require('dotenv').config({
  path: envFilePath,
});

if (process.env.NODE_ENV == 'development' && !fs.existsSync(envFilePath))
  process.exit(1);
