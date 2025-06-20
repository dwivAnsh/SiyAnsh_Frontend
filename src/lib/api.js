import {axiosInstance} from "./axios.js";

export const signup = async (signupData) => {
  const response = await axiosInstance.post("/auth/signup", signupData);
  return response.data;
};

// Ye backend me ek protected route hai jo check karta hai ki token valid hai ya nahi
export const getAuthUser = async () => {
  const res = await axiosInstance.get("/auth/me");  // axiosInstance is from axios.js
  return res.data;
}

export const completeOnboarding = async (userData) => {
  const response = await axiosInstance.post("/auth/onboarding", userData);
  return response.data;
};


// When we need to read in server we use queryfn and get method but using mutation func means put,post,delete
// query = read-only
// mutation = write-only
