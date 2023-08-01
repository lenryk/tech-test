export default async function fetchFromAPI(endpoint) {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/${endpoint}`, {
    method: "GET",
    mode: "cors",
    headers: {
      Authorization: process.env.REACT_APP_AUTH_SECRET,
    },
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error(`An error has occurred, status code: ${response.status}`);
  }

  if (endpoint === "time") {
    return await response.json();
  }
  if (endpoint === "metrics") {
    return await response.text();
  }

  // try {
  //   return await response.json();
  // } catch (err) {
  //   return await response.text();
  // }
}
