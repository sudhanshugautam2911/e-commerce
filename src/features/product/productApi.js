export function fetchAllProduct() {
  return new Promise(async (resolve) => {
    // TODO: we will not hard code server url, we'll chance it later
    // This temporary url is done with the help of json-server

    const response = await fetch("http://localhost:8080/products");
    const data = await response.json();
    resolve({ data });
  });
}

export function fetchAllProductByFilter(filter, sort) {
  let queryString = "";

  // TODO: on server we will supoort selecting multiple values
  for (let key in filter) {
    // filter = {"category": ["smartphone", "laptops"]};
    // sort = {_sort:"price", _order="desc"}
    // it will be appended like that, category=smartphones
    // ${key} is the current key and ${filter[key]} is the value of current key
    const catergoryValues = filter[key];
    if (catergoryValues.length > 0) {
      const lastCategoryValue = catergoryValues[catergoryValues.length - 1];
      queryString += `${key}=${lastCategoryValue}&`;
    }
    // queryString += `${key}=${filter[key]}&`
  }

  for (let key in sort) {
    queryString += `${key}=${sort[key]}&`;

  }

  return new Promise(async (resolve) => {
    // TODO: we will not hard code server url, we'll chance it later
    // This temporary url is done with the help of json-server

    const response = await fetch(
      "http://localhost:8080/products?" + queryString
    );
    const data = await response.json();
    resolve({ data });
  });
}
