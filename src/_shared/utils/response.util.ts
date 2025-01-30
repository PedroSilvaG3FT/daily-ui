import { AxiosError } from "axios";
import { ToastUtil } from "./toast.util";

export class ResponseUtil {
  static handleError(
    error: AxiosError,
    defaultMessage = "Error on processing"
  ) {
    const data = error.response?.data as any;
    const messages = (data?.messages || []) as string[];

    if (messages.length) messages.forEach((item) => ToastUtil.error(item));
    else ToastUtil.error(defaultMessage);
  }
}
