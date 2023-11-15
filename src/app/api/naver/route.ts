import axios from 'axios';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { sourceText } = await request.json();
  if (!sourceText) throw new Error('sourceText 가 비었습니다.');
  console.log(`요청받음🤔 [papago] ${sourceText}`);
  const response = await axios
    .post(
      'https://openapi.naver.com/v1/papago/n2mt',
      {
        source: 'en',
        target: 'ko',
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
    .then((res) => res.data);

  return new Response(
    JSON.stringify({
      text: response.message.result.translatedText,
    }),
    {
      status: 200,
    }
  );
}
