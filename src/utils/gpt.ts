import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: `OPENAI_API_KEY`,
});
const openai = new OpenAIApi(configuration);

export const sendMessage = async (text: string) => {
  const completion = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: text,
  });
  return completion;
};
