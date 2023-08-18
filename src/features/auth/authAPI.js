export function createUser(userData) {
  return new Promise(async (resolve) => {
    // kind of uploading data on our api
    const response = await fetch("http://localhost:8080/users", {
      method: "POST",
      body: JSON.stringify(userData),
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    // TODO: On server it will return only relevent info of usrer (not password or confidential info)
    resolve({ data });
  });
}
export function updateUser(update) {
  return new Promise(async (resolve) => {
    // updating existing user details - adding more details like address name and all
    const response = await fetch("http://localhost:8080/users/" + update.id, {
      method: "PATCH",
      body: JSON.stringify(update),
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    resolve({ data });
  });
}

export function checkUser(loginInfo) {
  return new Promise(async (resolve, reject) => {
    const email = loginInfo.email;
    const password = loginInfo.password;
    const response = await fetch("http://localhost:8080/users?email=" + email);
    const data = await response.json();
    if (data.length) {
      if (password === data[0].password) {
        resolve({ data: data[0] });
      } 
      else {
        reject({ message: "Wrong Credentials" });
      }
    } 
    else {
      reject({ message: "user not found" });
    }
  });
}
