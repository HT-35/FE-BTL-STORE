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
const fetchMethodPostAddCart = async (API, cart) => {
  const response = await fetch(API, {
    method: "POST", // or 'PUT'
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(cart),
  });
  const data = await response.json();
  return await data;
};

const fetchGetAllCard = async (API, token) => {
  const response = await fetch(API, {
    method: "GET", // chỉ cần method là "GET"
    headers: {
      "Content-Type": "application/json",
      Authorization: `${token}`, // Thêm token vào header nếu cần
    },
  });
  const data = await response.json();
  return data; // Không cần await ở đây
};

export {
  callAPIFunction,
  fetchMethodPost,
  fetchMethodPostAddCart,
  fetchGetAllCard,
};
