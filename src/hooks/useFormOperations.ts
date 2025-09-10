import { useState } from "react";
import { request } from "../repositories";
import { AddModalProps } from "../types";
import { notification } from "antd";

function useFormOperations({
  open,
  cbSuccess,
  updateData,
  url,
}: AddModalProps & { url: string }) {
  const [loading, setLoading] = useState(false);
  const handleFinish = async (body: Record<string, never | unknown>) => {
    try {
      setLoading(true);
      const executionContext = await request(url, open)
        .setBody(body, "json")
        // @ts-expect-error @ts-ignore
        .onSuccess(cbSuccess)
        .onFailure(({ data }) => {
          if (Array.isArray(data.message)) {
            data.message.forEach((message: string) => {
              notification.error({
                message: "Validation Message",
                description: message,
              });
            });
          }
        });
      if (open === "patch")
        executionContext.setRouteParams(`${updateData?._id}`);
      executionContext.call();
    } catch (error) {
      console.log("error", error);
    } finally {
      setLoading(false);
    }
  };
  return { handleFinish, loading };
}
export default useFormOperations;
