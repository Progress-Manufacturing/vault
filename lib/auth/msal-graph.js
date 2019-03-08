const graph = require("@microsoft/microsoft-graph-client");
const fs = require("fs");

function getAuthenticatedClient(accessToken) {
  // Initialize Graph client
  const client = graph.Client.init({
    // Use the provided access token to authenticate
    // requests
    authProvider: (done) => {
      done(null, accessToken);
    }
  });

  return client;
}

export async function getUserDetails(accessToken) {
  const client = getAuthenticatedClient(accessToken);

  try {
    
    const user = await client.api("/me").get();
    const manager = await client.api("/me/manager").get();
    await client.api("/me/photo/$value").getStream((err, downloadStream) => {
      let writeStream = fs.createWriteStream(`static/users/myPhoto.jpg`);
      downloadStream.pipe(writeStream).on("error", console.log);
    });
    console.log(user)
    
    return {
      me: user,
      manager: manager
    }
  } catch (err) {
    throw err
  }
}