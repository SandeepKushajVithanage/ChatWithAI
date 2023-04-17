import React from "react";
import { FiUser } from "react-icons/fi";

type Props = {
  text: string;
  user: number;
};

const Message = ({ text, user }: Props) => {
  return (
    <div
      className={"flex items-start w-2/3 mt-3" + (user === 0 ? " ml-auto" : "")}
    >
      {user !== 0 && (
        <div className="p-3 rounded-full bg-blue-600 text-white">
          <FiUser size={25} />
        </div>
      )}
      <div
        className={
          "border border-blue-600 ml-3 p-3 rounded-md w-full" +
          (user === 0 ? " bg-blue-600 text-white" : "")
        }
      >
        {text}
      </div>
    </div>
  );
};

export default Message;
<div className="flex items-start ml-auto w-2/3 mt-3">
  <div className="border border-blue-600 ml-3 p-3 rounded-md bg-blue-600 text-white">
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde quam id
    exercitationem facilis et voluptas rem veritatis aut nulla sit, commodi
    earum, necessitatibus cum, deserunt eius at maxime alias assumenda.
  </div>
</div>;
