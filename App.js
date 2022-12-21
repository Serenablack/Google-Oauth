const { google } = require("googleapis");
const path = require("path");
const fs = require("fs");
const { dirname } = require("path/posix");

const clientId = process.env.clientId;
const clientSecret = process.env.clientSecret;
const redirectURI = "https://developers.google.com/oauthplayground";

const refreshToken = process.env.refreshToken;

const oauth2client = new google.auth.OAuth2(
  clientId,
  clientSecret,
  redirectURI
);

oauth2client.setCredentials({ refresh_token: refreshToken });

const drive = google.drive({
  version: "v3",
  auth: oauth2client,
});

const filePath = path.join(__dirname, "logo.jpg");

const uploadFile = async () => {
  try {
    const response = await drive.files.create({
      requestBody: {
        name: "stones.jpg",
        mimeType: "image/jpg",
      },
      media: {
        mimeType: "image/jpg",
        body: fs.createReadStream(filePath),
      },
    });
    console.log(response.data);
  } catch (error) {}
};

uploadFile();
