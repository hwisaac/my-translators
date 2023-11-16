import axios from 'axios';
import https from 'https';

const ketiurl = process.env.DB_KETI_URL as string;

export async function POST(request: Request) {
  const { sourceText } = await request.json();
  if (!sourceText) throw new Error('sourceText 가 비었습니다.');
  console.log(`요청받음🤔 [keti-0] ${sourceText}, `);
  const agent = new https.Agent({
    rejectUnauthorized: false,
  });

  console.log('try', ketiurl);
  const response = await axios
    .post(
      'https://ketiair.com:10050/api/task',
      {
        text: sourceText,
        direction: 'en2ko',
        split_line: 'True',
      },
      {
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
        },
      }
    )
    .then((res) => res.data)
    .catch(console.error);

  console.log(response);
  // console.log(`[keti-0] : ${response.choices[0].message.content}`);

  return new Response(response, { status: 200 });
}
