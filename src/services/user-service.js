import Axios from "axios";
export const getCurrentUserService = async () => {
  const userResponse = await Axios.get("http://localhost:4000/api/profile");
  if (userResponse !== 503) {
    return userResponse.data;
  } else {
    return null;
  }
};
