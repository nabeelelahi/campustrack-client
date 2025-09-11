import { useState } from "react";
import { loginRoute, request } from "../repositories";
import { useNavigate } from "react-router-dom";
import { ResponseError } from "../types";
import { notification } from "antd";
import { setStorageData } from "../helper";

export const useAuth = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);

  const handleFailure = (response: ResponseError) => {
    setLoading(false);
    if (!response) return;
    response.message.forEach((message: string) => {
      notification.error({
        message: response.error,
        description: message,
      });
    });
    console.log("error", response);
  };

  const login = (values: { idenfier: string; password: string }) => {
    setLoading(true);
    request(loginRoute.url, loginRoute.method)
      .setAuth(false)
      .setBody({ ...values, device: "web", device_token: "1234567890" }, "json")
      .onSuccess((data, headers) => {
        setLoading(false);
        // @ts-ignore
        setStorageData("user", data.data);
        localStorage.setItem("access-token", headers["access-token"]);
        // @ts-ignore
        navigate(`/${data.data['role']}/dashboard`);
      })
      // @ts-expect-error @ts-ignore
      .onFailure(handleFailure)
      .call();
  };

  return {
    loading,
    login,
  };
};
