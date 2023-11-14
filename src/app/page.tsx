'use client';
import axios from 'axios';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function Home() {
  const [sourceText, setSourceText] = useState('');
  const [mtPapago, setMtPapago] = useState('');
  const onTranslate = async () => {
    await axios
      .post('/api/naver', {
        sourceText,
      })
      .then((res) => setMtPapago(res.data));
  };
  return (
    <div className='space-y-10 divide-y-2 divide-cyan-600'>
      <section className='flex flex-col max-w-sm'>
        <h3 className='font-semibold text-cyan-800'>English</h3>
        <textarea
          className='border'
          value={sourceText}
          onChange={(e) => setSourceText(e.target.value)}
        />
        <button className='border bg-red-400 text-white' onClick={onTranslate}>
          번역하기
        </button>
      </section>

      <section className='flex flex-col max-w-sm'>
        <h3>Papago</h3>
        <p className='border'>{mtPapago}</p>
        <button className='border bg-red-400' onClick={onTranslate}>
          번역하기
        </button>
      </section>
    </div>
  );
}
