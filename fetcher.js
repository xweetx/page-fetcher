//Should take 2 command line argumants 1. a URL and 2. a local file path

const request = require('request');
const fs = require('fs');

const fetch = function(argv) {
  const url = argv[2];
  const localPath = argv[3];
  // http request and wait for the response
  request(url, (error, response, body) => {
    if (error) {
      console.log('Error:', error);
      return;
    }
    if (response.statusCode !== 200) {
      console.log('Invalid response:', response.statusCode);
      return;
    }

    fs.writeFile(localPath, body, err => {
      if (err) {
        console.error('Error saving file:', err);
        return;
      }
      // success
      console.log(`Downloaded and saved ${body.length} bytes to ${localPath}`);
    });
  });
};

fetch(process.argv);