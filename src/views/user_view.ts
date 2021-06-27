export default {
  render(user: any) {
    delete user.password;

    return user;
  }
}