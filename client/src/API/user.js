export const createUser = ({username}) => {
    console.log(`creating user...${username}`);
    fetch(`http://localhost:3005/createUser`, {
      method: "POST",
      body: JSON.stringify({
        user: username,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }).catch((err) => console.log(err));
  };