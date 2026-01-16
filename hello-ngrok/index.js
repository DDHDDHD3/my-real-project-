const ngrok = require('@ngrok/ngrok');

(async () => {
  try {
    const url = await ngrok.connect({
      proto: 'http',
      addr: 4200,
      auth: 'admin:admin_secure_password'
    });
    console.log('Public URL:', url);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();
