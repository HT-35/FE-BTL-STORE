const callAPIFunction = async (API) => {
  const response = await fetch(API);
  const data = await response.json();
  return await data;
};

const fetchMethodPost = async (API, info) => {
  const response = await fetch(API, {
    method: "POST", // or 'PUT'
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(info),
  });
  const data = await response.json();
  return await data;
};

export { callAPIFunction, fetchMethodPost };
