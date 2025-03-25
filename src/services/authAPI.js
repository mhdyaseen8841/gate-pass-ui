import { USER_INSTANCE } from "./axiosInstance";




export async function createUserAPI(data) {
    try {
      const response = await USER_INSTANCE.post('register', data);
      return response.data;
    } catch (error) {
      throw error;
    }
}


export async function signInUserAPI(data) {
  try {
    const response = await USER_INSTANCE.post('login', data);
    return response.data;
  } catch (error) {
    throw error;
  }
}

