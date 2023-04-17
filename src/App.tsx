import React, { useEffect, useState } from "react";
import { RiSendPlane2Line } from "react-icons/ri";
import { BsFillMicFill } from "react-icons/bs";
import { FaPause } from "react-icons/fa";
import { useSpeechRecognition, useSpeechSynthesis } from "react-speech-kit";
import { sendMessage } from "./utils/gpt";
import Message from "./components/Message";

type Props = {};

export type Message = {
  text: string;
  user: number;
};

const App = (props: Props) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [message, setMessage] = useState("");
  const [voice, setVoice] = useState<any>(null);
  const { speak, voices, cancel } = useSpeechSynthesis();
  const { listen, listening, stop } = useSpeechRecognition({
    onResult: (result: string) => {
      setMessage(result);
    },
    onEnd: () => {
      handleSubmit();
    },
  });

  const handleSpeaks = async (text: string) => {
    speak({ text, voice });
  };

  const handleSubmit = async () => {
    setMessages((messages) => [...messages, { text: message, user: 0 }]);
    const { data } = await sendMessage(message);
    const [answer] = data.choices as any;
    const text = answer.text;
    handleSpeaks(text);
    setMessages((messages) => [...messages, { text, user: 1 }]);
    setMessage("");
  };

  const handleVoiceChange = (event: { target: { value: any } }) => {
    const voiceName = event.target.value;
    const voice = voices.find((v: { name: any }) => v.name === voiceName);
    setVoice(voice);
  };

  useEffect(() => {
    const [voice] = voices;
    if (voices.length) setVoice(voice);
  }, [voices]);

  return (
    <div className="h-screen p-4 max-w-screen-xl mx-auto flex flex-col">
      <select
        className="border rounded-md p-3 border-blue-600 w-full focus:outline-blue-600"
        value={voice?.name || ""}
        onChange={handleVoiceChange}
      >
        {voices.map((voice: any) => (
          <option key={voice.name} value={voice.name}>
            {voice.name} ({voice.lang})
          </option>
        ))}
      </select>
      <div className="mt-3 flex items-start flex-col flex-1 w-full border border-blue-600 rounded-md focus:outline-blue-600 resize-none p-3 overflow-y-scroll">
        {messages.map(({ text, user }, index) => (
          <Message key={index} text={text} user={user} />
        ))}
      </div>
      <div className="flex items-center mt-3">
        <input
          className="flex-1 p-3 border border-blue-600 rounded-md focus:outline-blue-600"
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          onClick={
            listening ? stop : message.length ? () => handleSubmit() : listen
          }
          className="p-3 rounded-full bg-blue-600 text-white ml-3"
        >
          {listening ? (
            <FaPause size={25} />
          ) : message.length ? (
            <RiSendPlane2Line size={25} />
          ) : (
            <BsFillMicFill size={25} />
          )}
        </button>
      </div>
    </div>
  );
};

export default App;
