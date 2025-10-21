export async function makeApiCall({ url, method, body = null, headers = {} }) {
  console.log("makeApiCall reached");
  try {
    const options = { method, headers };
    console.log(options);
    if (body) options.body = JSON.stringify(body);
    const res = await fetch(url, options);
    if (res.status === 401) throw { status: 401, message: "Unauthorized" };
    return res.json();
  } catch (error) {
    console.error("API error:", error);
    throw error;
  }
}
///----------------------------------------------
let BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
function buildQueryURL(base, endpoint, query = {}) {
  const queryString = new URLSearchParams(query).toString();
  return `${base}${endpoint}${queryString ? `?${queryString}` : ""}`;
}

//-----------------------------
export async function makeGeneralGETApiCall(
  endpoint,
  query = {},
  headers = {}
) {
  const url = buildQueryURL(`${BASE_URL}/general`, endpoint, query);
  return makeApiCall({ url, method: "GET", headers });
}

export async function makeGeneralPOSTApiCall(
  endpoint,
  body = {},
  headers = {}
) {
  const url = `${BASE_URL}/general${endpoint}`;
  return makeApiCall({ url, method: "POST", body, headers });
}
//----------------------------------
export async function makePrivateGETApiCall(
  endpoint,
  query = {},
  headers = {}
) {
  console.log("makePrivateGETApiCall reached");
  let url = `${BASE_URL}/board${endpoint}`;
  if (Object.keys(query).length > 0) {
    const queryString = new URLSearchParams(query).toString();
    url += `?${queryString}`;
  }
  console.log(url);
  return makePrivateApiCall({ url, method: "GET", headers });
}

export async function makePrivatePOSTApiCall(
  endpoint,
  body = {},
  headers = {}
) {
  const url = `${BASE_URL}/board${endpoint}`;
  return makePrivateApiCall({ url, method: "POST", body, headers });
}

export async function makePrivatePUTApiCall(endpoint, body = {}, headers = {}) {
  const url = `${BASE_URL}/board${endpoint}`;
  return makePrivateApiCall({ url, method: "PUT", body, headers });
}

export async function makePrivateDELETEApiCall(
  endpoint,
  query = {},
  headers = {}
) {
  const url = buildQueryURL(`${BASE_URL}/board`, endpoint, query);
  return makePrivateApiCall({ url, method: "DELETE", headers });
}

//---------------------------
// export async function makeGeneralApiCall(endpoint, method = "GET", body = {}, query = {}, headers = {}) {
//   const finalHeaders = { "Content-Type": "application/json", ...headers };
//   makeApiCall()
// }

export async function makePrivateApiCall({ url, method, body, headers = {} }) {
  console.log("makePrivateApiCall reached");
  const token = sessionStorage.getItem("token");
  const finalHeaders = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...headers,
  };
  console.log(finalHeaders);
  return makeApiCall({ url, method, body, headers: finalHeaders });
}
