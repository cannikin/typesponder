// counts the total number of responses from all users
const responseCount = users => {
  return users.reduce((count, user) => count + user.responses.length, 0);
};

export { responseCount };
