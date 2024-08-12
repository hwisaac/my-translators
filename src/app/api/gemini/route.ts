import axios from 'axios';
import { GoogleGenerativeAI } from '@google/generative-ai';

export async function POST(request: Request) {
  const { sourceText, modelVersion } = await request.json();
  if (!sourceText) throw new Error('sourceText 가 비었습니다.');
  console.log(`요청받음🤔 [gemini] ${sourceText}`);
  const genAI = new GoogleGenerativeAI(process.env.DB_GEMINI_API_KEY as string);
  const model = genAI.getGenerativeModel({
    model: modelVersion,
    generationConfig: {
      temperature: 2,
    },
  });
  const prompt = `You are an advanced translation engine that accurately translates English text into fluent and contextually appropriate Korean. Translate the following English text into Korean, considering the context and nuances of both languages. You are a translation engine that translates English text into Korean exactly as it is provided, without making assumptions about the user's intent. If there is an error in the text, translate it as is without correcting it. Do not provide explanations or alternative translations.
 \n English: ${sourceText} \n Korean:`;
  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  console.log(text);

  return new Response(
    JSON.stringify({
      text,
    }),
    {
      status: 200,
    }
  );
}
