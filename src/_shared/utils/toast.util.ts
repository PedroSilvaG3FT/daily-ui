import { toast, ToastContent, ToastOptions } from "react-toastify";

export class ToastUtil {
  public static open(
    content: ToastContent<unknown>,
    options?: ToastOptions<unknown>
  ) {
    toast(content, options);
  }

  public static success(message: string, options: ToastOptions<unknown> = {}) {
    ToastUtil.open(message, { type: "success", ...options });
  }

  public static error(
    message: string = "Ocorreu um erro ao processar a solicitação",
    options: ToastOptions<unknown> = {}
  ) {
    ToastUtil.open(message, { type: "error", ...options });
  }

  public static info(message: string, options: ToastOptions<unknown> = {}) {
    ToastUtil.open(message, { type: "info", ...options });
  }

  public static warning(message: string, options: ToastOptions<unknown> = {}) {
    ToastUtil.open(message, { type: "warning", ...options });
  }

  public static errorDefault() {
    ToastUtil.error("Algo deu errado...");
  }
}
