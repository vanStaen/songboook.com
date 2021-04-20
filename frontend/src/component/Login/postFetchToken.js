export const postFetchToken = async (email, password) => {

  let requestBody = { email: email, password: password };

  const response = await fetch(process.env.REACT_APP_API_URL + "/login", {
    method: "POST",
    body: JSON.stringify(requestBody),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if ((response.status !== 200) & (response.status !== 201)) {
    const error = await response.json();
    const message = error.error;
    throw new Error(message);
  }
  const userData = await response.json();
  return userData;
}