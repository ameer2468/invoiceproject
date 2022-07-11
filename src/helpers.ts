import { ToastOptions } from 'react-toastify';

export function numberFormat(val: number, decimalPlaces: number) {
  const multiplier = Math.pow(10, decimalPlaces);
  return (Math.round(val * multiplier) / multiplier).toFixed(decimalPlaces);
}

export const successToast: ToastOptions = {
  autoClose: 2000,
  theme: 'dark',
  type: 'success',
  bodyStyle: {
    fontSize: '1.5rem',
  },
};

export const errorToast: ToastOptions = {
  autoClose: 2000,
  theme: 'dark',
  type: 'error',
  bodyStyle: {
    fontSize: '1.5rem',
  },
};
