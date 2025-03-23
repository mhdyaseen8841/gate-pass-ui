import { USER_INSTANCE } from "./axiosInstance";


// Create a new ad
export async function googleAuthentication(data) {
    try {
      const response = await USER_INSTANCE.post('authenticate-google-user', data);
      return response.data;
    } catch (error) {
      throw error;
    }
}

export async function signUpAPI(data) {
    try {
      const response = await USER_INSTANCE.post('register/', data);
      return response.data;
    } catch (error) {
      throw error;
    }
}


export async function signInAPI(data) {
  try {
    const response = await USER_INSTANCE.post('login/', data);
    return response.data;
  } catch (error) {
    throw error;
  }
}



export async function logoutUser() {
  try {
    const response = await USER_INSTANCE.get('logout');
    return response.data;
  } catch (error) {
    throw error;
  }
}