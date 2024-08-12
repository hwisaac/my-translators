import { Snackbar } from '@mui/material';
import React, { Dispatch, SetStateAction } from 'react';

type Props = {
  title: string;
  text: string;
  isLoading: boolean;
  isTurnOn: boolean;
};

export default function TranslatorBlock({
  title,
  text,
  isLoading,
  isTurnOn,
}: Props) {
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    copyToClipboard();
    setOpen(true);
  };

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        // Optional: Display a message or execute some action on successful copy
        console.log('Text copied to clipboard');
      })
      .catch((err) => {
        // Optional: Handle the error case
        console.error('Failed to copy text: ', err);
      });
  };
  if (!isTurnOn) return null;

  return (
    <section className='flex flex-col w-full py-2 px-4 rounded shadow-lg'>
      <h3 className='font-semibold text-sky-500 mb-3'>{title}</h3>
      <p className='p-1 bg-blue-50 text-blue-900'>
        {isLoading ? '로딩중...' : text ? text : 'null'}
      </p>
      <button
        onClick={handleClick}
        className='mt-1 text-sm text-gray-700 border hover:bg-gray-50'>
        copy
      </button>
      <Snackbar
        open={open}
        autoHideDuration={2000}
        onClose={handleClose}
        message={`Copied : ${text}`}
      />
    </section>
  );
}
