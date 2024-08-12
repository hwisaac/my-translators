import axios from 'axios';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { sourceText } = await request.json();
  if (!sourceText) throw new Error('sourceText 가 비었습니다.');
  console.log(`요청받음🤔 [papago] ${sourceText}`);
  console.log(
    'process.env.DB_PAPAGO_CLIENT_ID',
    process.env.DB_PAPAGO_CLIENT_ID
  );
  console.log(
    'process.env.DB_PAPAGO_CLIENT_SECRET',
    process.env.DB_PAPAGO_CLIENT_SECRET
  );
  const response = await axios
    .post(
      'https://naveropenapi.apigw.ntruss.com/nmt/v1/translation',
      {
        source: 'en',
        target: 'ko',
        text: sourceText,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'X-NCP-APIGW-API-KEY-ID	': process.env.DB_PAPAGO_CLIENT_ID,
          'X-NCP-APIGW-API-KEY	': process.env.DB_PAPAGO_CLIENT_SECRET,
        },
      }
    )
    .then((res) => res.data)
    .catch((error) => {
      console.log(error.response.data);
      console.log(error.response.status);
    });
  
  return new Response(
    JSON.stringify({
      text: response.message.result.translatedText,
    }),
    {
      status: 200,
    }
  );
}
