export function createUser(userData) {
  return new Promise(async (resolve) => {
    // kind of uploading data on our api
    // const response = await fetch("http://localhost:8080/auth/signup", {
    const response = await fetch("http://localhost:8080/auth/signup", {
      method: "POST",
      body: JSON.stringify(userData),
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    // TODO: On server it will return only relevent info of usrer (not password or confidential info)
    resolve({ data });
  });
}

export function checkUser(loginInfo) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch("http://localhost:8080/auth/login", {
        method: "POST",
        body: JSON.stringify(loginInfo),
        headers: { "content-type": "application/json" },
      });

      if(response.ok){
        const data = await response.json();
        resolve({ data });
      } else {
        const error = await response.text();
        reject(error);
      }
    } catch (error) {
      reject(error);
    }
  });
}

export function signOut(userID) {
  return new Promise(async (resolve) => {
      // TODO: On server we will remove user section info
      resolve({ data: "success" });
  });
}
