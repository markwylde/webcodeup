import ftpsync from '@markwylde/ftp-deploy';

const config = {
  verbose: true,
  tasks: [{
    hostname: process.env.DEPLOY_FTP_HOSTNAME,
    username: process.env.DEPLOY_FTP_USERNAME,
    password: process.env.DEPLOY_FTP_PASSWORD,
    source: './dist',
    destination: '',
    clearDestination: true,
  }]
}

ftpsync(config);
