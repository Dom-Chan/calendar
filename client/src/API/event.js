export const createEvent = ({ eventStart, eventEnd, users }) => {
  console.log(`creating event..`);
  console.log(eventStart, eventEnd, users);
  fetch(`http://localhost:3005/event/create`, {
    method: "POST",
    body: JSON.stringify({
      description: "",
      startDate: eventStart,
      endDate: eventEnd,
      users: users,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((msg) => console.log(msg))
    .catch((err) => console.log(err));
};
