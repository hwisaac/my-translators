import React, { Dispatch, SetStateAction } from 'react';

type Props = {
  title: string;
  text: string;
  isLoading: boolean;
};

export default function TranslatorBlock({
  title,
  text = 'null',
  isLoading,
}: Props) {
  return (
    <section className='flex flex-col max-w-sm p-5 bg-yellow-50'>
      <h3 className='font-semibold text-sky-500'>{title}</h3>
      <p className='border'>{isLoading ? '로딩중...' : text}</p>
    </section>
  );
}
