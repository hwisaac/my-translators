import React, { Dispatch, SetStateAction } from 'react';

type Props = {
  inputText: string;
  setInputText: Dispatch<SetStateAction<string>>;
  onClick: () => {};
};

export default function TranslatorBlock({
  inputText,
  setInputText,
  onClick,
}: Props) {
  return (
    <section className='flex flex-col max-w-sm'>
      <h3 className='font-semibold text-cyan-800'>English</h3>
      <textarea
        className='border'
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
      />
      <button className='border bg-red-400 text-white' onClick={onClick}>
        번역하기
      </button>
    </section>
  );
}
