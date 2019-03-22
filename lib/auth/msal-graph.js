const graph = require("@microsoft/microsoft-graph-client");

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


export async function getUserAvatar(accessToken) {
  const client = getAuthenticatedClient(accessToken);

  try {
    const avatar = await client.api("/me/photo/$value").responseType(graph.ResponseType.BLOB).get();

    return { avatar }
  } catch (err) {
    throw err
  }
}

export async function getUserSupervisor(accessToken) {
  const client = getAuthenticatedClient(accessToken);

  try {
    const supervisor = await client.api("/me/manager").get();

    return { supervisor }
  } catch (err) {
    throw err
  }
}

export async function getUserById(accessToken, userId) {
  const client = getAuthenticatedClient(accessToken);

  try {
    const user = await client.api(`/users/${userId}`).get();
    return user
  } catch (err) {
    throw err
  }
}

export async function getAllUsers(accessToken) {
  const client = getAuthenticatedClient(accessToken);

  try {
    const users = await client.api("/users").get();
    let allUsers = []
    for (let user of users.value) {
      if (user.officeLocation === null && user.id != "d8f5843d-53a4-4374-9e2d-29044b3dd9f8" && user.id != "1b92df1b-450e-43cb-a0c7-1b4b12e9d291") {
        allUsers.push(user)
      }
    }

    return allUsers
  } catch (err) {
    throw err
  }
}


export async function getUserDetails(accessToken) {
  const client = getAuthenticatedClient(accessToken);

  try {
    const user = await client.api("/me").get();
    const groups = await client.api("/me/memberOf").get();

    return {
      me: user,
      groups: groups
    }
  } catch (err) {
    throw err
  }
}