import moment from "moment";
import endpoints from "./endpoints";

// gets all data for the app
const getData = async () => {
  const response = await fetch(endpoints.getUsers);
  const json = await response.json();

  return json;
};

// counts the total number of responses from all users
const responseCount = users => {
  return users.reduce((count, user) => count + user.responses.length, 0);
};

// sorts users based on createdAt date, descending
const sortUsers = users => {
  return users.sort((a, b) => {
    if (moment(a.createdAt).unix() < moment(b.createdAt).unix()) {
      return 1;
    } else {
      return -1;
    }
  });
};

export { getData, responseCount, sortUsers };
