export function fetchProductById(id) {
  return new Promise(async (resolve) => {
    const response = await fetch("/products/" + id);
    const data = await response.json();
    resolve({ data });
  });
}
export function createProduct(product) {
  return new Promise(async (resolve) => {
    const response = await fetch("/products/", {
      method: "POST",
      body: JSON.stringify(product),
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    resolve({ data });
  });
}
export function updateProduct(update) {
  return new Promise(async (resolve) => {
    // kind of uploading data on our api
    const response = await fetch("/products/" + update.id, {
      method: "PATCH",
      body: JSON.stringify(update),
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    resolve({ data });
  });
}


export function fetchAllBrands() {
  return new Promise(async (resolve) => {
    const response = await fetch("/brands");
    const data = await response.json();
    resolve({ data });
  });
}
export function fetchAllCategory() {
  return new Promise(async (resolve) => {
    const response = await fetch("/categories");
    const data = await response.json();
    resolve({ data });
  });
}

export function fetchAllProductByFilter(filter, sort, pagination, admin) {
  let queryString = "";

  // TODO: on server we will supoort selecting multiple values
  for (let key in filter) {
    // filter = {"category": ["smartphone", "laptops"]};
    // sort = {_sort:"price", _order="desc"}
    // pagination = {_page:1, _limit=10}  // _page=1&_limit=10
    // TODO: on server we will support multi values in filter
    // TODO: on server we will filter deleted Products in case of non-admin

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
  for (let key in pagination) {
    queryString += `${key}=${pagination[key]}&`;
  }

  if(admin) {
    queryString += `admin=true`;
  }

  return new Promise(async (resolve) => {
    // TODO: we will not hard code server url, we'll chance it later
    // This temporary url is done with the help of json-server

    const response = await fetch(
      "/products?" + queryString
    );
    const data = await response.json();
    // it is a feature of api we are using
    const totalItems = await response.headers.get("X-Total-Count");
    resolve({ data: { products: data, totalItems: +totalItems } });
  });
}
