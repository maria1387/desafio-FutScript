const checkPassword = async (email, password) => {
  try {
    const user = await getUser(email);
    const dbPass = user.password;
    console.log(password, dbPass);
    const passwordMatch = password === dbPass;
    if (!passwordMatch) {
      throw { code: 401, message: "Email or password is incorrect" };
    }
    return user;
  } catch (error) {
    throw { code: 500, message: "Internal Server Error" };
  }
};
