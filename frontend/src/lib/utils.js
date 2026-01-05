import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"
import { toast } from 'react-toastify';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const handleError = (err) => {
  toast.error(err, {
    position: "top-right",
    autoClose: 3000,
  });
}

export const handleSuccess = (msg) => {
  toast.success(msg, {
    position: "top-right",
    autoClose: 3000,
  });
}
