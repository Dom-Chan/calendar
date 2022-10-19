export const createUser = ({ username }) => {
  console.log(`creating user...${username}`);
  fetch(`http://localhost:3005/user/create`, {
    method: "POST",
    body: JSON.stringify({
      user: username,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  }).catch((err) => console.log(err));
};

export const getUsers = () => {
  fetch(`http://localhost:3005/user`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((users) => console.log(users))
    .catch((err) => console.log(err));
};
