interface ICredentials {
  username: string;
  password: string;
}

interface IUserData {
  title: string;
  credentials: ICredentials;
  successMessage: string;
}
const message = "Successfully registered! Please, click Back to return on login page";

const validTestData: IUserData[] = [
  {
    credentials: { username: "Andrei12345678 !@#$", password: "Andrei12345678 !@#$" },
    successMessage: message,
    title: "Register with smoke credentials",
  },
  {
    credentials: { username: "Emy", password: "123456Aa" },
    successMessage: message,
    title: "Register with min valid credentials",
  },
  {
    credentials: { username: "Andrei12345678 !@#$aaaaaaaaaaaaaaaaaaaaa", password: "123456Aaaaaaaaaaaaaa" },
    successMessage: message,
    title: "Register with max valid credentials",
  },
];

export default validTestData;