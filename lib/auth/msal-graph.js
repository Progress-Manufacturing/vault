const graph = require("@microsoft/microsoft-graph-client");

function getAuthenticatedClient(accessToken) {
  const client = graph.Client.init({    
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
    const supervisor = await client.api("/me/manager?$select=id,businessPhones,displayName,givenName,jobTitle,mail,officeLocation,surename,userPrincipalName,department").get();

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
    const users = await client.api("/users?$orderby=displayName").get();
    let allUsers = [{id: null, displayName: "No Lead", }]
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

export async function getDepartmentUsersCount(accessToken, dept) {
  const client = getAuthenticatedClient(accessToken);

  try {
    const departments = await client.api(`/users?$filter=department eq '${dept}'`).get();
    let deptCount = [];
    
    for (let department of departments.value) {
      if (department.officeLocation === null) {
        deptCount.push(department)
      }
    }

    return deptCount.length
  } catch (err) {
    throw err
  }
}

export async function getDepartments(accessToken) {
  const client = getAuthenticatedClient(accessToken);

  try {
    const departments = await client.api("/users?$select=department").get();
    let allDepartments = []
    for (let dept of departments.value) {
      if (dept.department !== null) {
        allDepartments.push(dept.department)
      }
    }
    allDepartments = Array.from(new Set(allDepartments));
    allDepartments.sort()
    allDepartments.unshift("All Departments")
    return allDepartments    
  } catch (err) {
    throw err
  }
}

export async function getUserDetails(accessToken) {
  const client = getAuthenticatedClient(accessToken);

  try {
    const user = await client.api("/me?$select=businessPhones,displayName,givenName,jobTitle,mail,officeLocation,surname,userPrincipalName,id,department").get();
    const groups = await client.api("/me/memberOf").get();

    return {
      me: user,
      groups: groups
    }
  } catch (err) {
    throw err
  }
}

export async function emailNotification(accessToken, mail) {
  const client = getAuthenticatedClient(accessToken);  
  
  try { 
    const notification =  await client.api("/me/sendMail").post({ message: mail });
    return notification;
  } catch (err) {
    throw err
  }
}