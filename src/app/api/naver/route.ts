import axios from 'axios';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { sourceText } = await request.json();
  if (!sourceText) return new Error('sourceText 가 비었습니다.');
  const res = await axios
    .post(
      'https://openapi.naver.com/v1/papago/n2mt',
      {
        source: 'ko',
        target: 'en',
        text: sourceText,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'X-Naver-Client-Id': process.env.DB_PAPAGO_CLIENT_ID,
          'X-Naver-Client-Secret': process.env.DB_PAPAGO_CLIENT_SECRET,
        },
      }
    )
    .then((res) => res.data.message.result.translatedText);
  // console.log(res);
  return new Response(res, {
    status: 200,
  });
}
