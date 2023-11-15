import axios from 'axios';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { sourceText } = await request.json();

  if (!sourceText) throw new Error('sourceText 가 비었습니다.');
  console.log(`요청받음🤔 [deepl] ${sourceText} `);
  const response = await axios
    .post(
      'https://api-free.deepl.com/v2/translate',
      {
        text: [sourceText],
        target_lang: 'KO',
      },
      {
        headers: {
          Authorization: `DeepL-Auth-Key ${process.env.DB_DEEPL_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    )
    .then((res) => res.data);
  return new Response(JSON.stringify({ text: response.translations[0].text }), {
    status: 200,
  });
}
