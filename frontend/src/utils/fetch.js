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
    throw new Error(`An error has occurred: ${response.status}`);
  }

  try {
    return await response.json();
  } catch (err) {
    throw new Error(`Failed to parse JSON: ${err.message}`);
  }
}
