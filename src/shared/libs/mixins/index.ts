import { AxiosError } from "axios";
import { toast } from "react-toastify";

export const log = (err: unknown): void => {
  console.error(JSON.stringify(err, null, 4));
  console.clear();
  console.log(Array(100).join("\n"));
};

type toastMode = "info" | "success" | "error" | "default";
export const showToast = (mode: toastMode, message: string): void => {
  switch (mode) {
    case "info":
      toast.info(message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      break;
    case "success":
      toast.success(message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      break;
    case "error":
      toast.error(message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      break;
    case "default":
      toast(message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      break;
  }
};

export const showError = (err: unknown): void => {
  let message =
    "Something is wrong. Please try again or contact us if issue persists.";
  if (
    err instanceof AxiosError &&
    typeof err.response?.data.message === "string"
  ) {
    message = err.response?.data.message;
  } else if (typeof err === "string") {
    message = err;
  }
  showToast("error", message);
  log(err);
};

export const sendRequest = async (
  setIsLoading: (v: React.SetStateAction<any>) => void,
  fn: () => Promise<void>
): Promise<void> => {
  try {
    setIsLoading(true);
    await fn();
    setIsLoading(false);
  } catch (err: unknown) {
    setIsLoading(false);
    showError(err);
  }
};

export const delayExecute = (fn: () => void, delayMs = 2000): void => {
  delayMs === 0 ? fn() : setTimeout(fn, delayMs);
};

export const isUnauthorized = (err: unknown): boolean => {
  return (
    err instanceof AxiosError && err.response?.data.message === "Unauthorized"
  );
};
