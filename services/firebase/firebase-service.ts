import axiosAPI from "../axiosApi";

export async function postToSaveWebAppToken(data: any) {
  const response = await axiosAPI.post(`saveWebAppToken`, data);
  return response;
}


