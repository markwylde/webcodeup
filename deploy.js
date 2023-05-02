import uploadToBunny from 'upload-to-bunny';

uploadToBunny('./dist', '', {
  accessKey: process.env.DEPLOY_FTP_PASSWORD,
  cleanDestination: true,
  maxConcurrentUploads: 10,
  storageZoneName: process.env.DEPLOY_FTP_USERNAME
});
