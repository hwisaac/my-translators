import axios from 'axios';

export async function POST(request: Request) {
  const { sourceText } = await request.json();
  if (!sourceText) throw new Error('sourceText 가 비었습니다.');
  console.log(`요청받음🤔 [google] ${sourceText}`);

  const response = await axios
    .post(
      `https://translation.googleapis.com/language/translate/v2?q=${sourceText}&target=ko&source=en&format=text&model=nmt&key=${process.env.DB_GOOGLE_API_KEY}`,
      {}
    )
    .then((res) => res.data)
    .catch((error) => {
      console.log(error.response.data);
      console.log(error.response.status);
    });
  console.log(response.data.translations[0].translatedText);
  console.log(typeof response.data.translations[0].translatedText); // string

  return new Response(
    JSON.stringify({
      text: response.data.translations[0].translatedText,
    }),
    {
      status: 200,
    }
  );
}
