import OpenAI from 'openai';
import axios from 'axios';

interface IRes {
  id: string;
  object: string | 'chat.completion';
  model: string | 'gpt-3.5-turbo' | 'gpt-4' | 'gpt-4-1106-preview';
  choices: {
    index: number;
    message: {
      role: 'assistant' | 'user' | 'system';
      content: string;
      finish_reason: string | 'stop';
    };
  }[];
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

export async function POST(request: Request) {
  const { sourceText, model = 'gpt-3.5-turbo' } = await request.json();
  if (!sourceText) throw new Error('sourceText 가 비었습니다.');
  console.log(`요청받음🤔 [${model}] ${sourceText}, `);

  try {
    const response: IRes = await axios
      .post(
        'https://api.openai.com/v1/chat/completions',
        {
          model,
          messages: [
            {
              role: 'system',
              content: `You are an advanced translation engine that accurately translates English text into fluent and contextually appropriate Korean. Translate the following English text into Korean, considering the context and nuances of both languages.
`,
            },
            {
              role: 'user',
              content: `English: ${sourceText} \n Korean: `,
            },
          ],
          temperature: 1,
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.DB_OPENAI_API_KEY}`,
            'Content-Type': 'application/json',
          },
        }
      )
      .then((res) => res.data);

    console.log(`[${model}] : ${response.choices[0].message.content}`);

    return new Response(
      JSON.stringify({
        text: response.choices[0].message.content,
        openai: response,
      }),
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error(error);
  }
}
