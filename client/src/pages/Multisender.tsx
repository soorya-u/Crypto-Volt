import { useState } from "react";
import { useStateContext } from "../context";
import { useNavigate } from "react-router-dom";

export default function Multisender() {
  const [reciever1, setReciever1] = useState("");
  const [reciever2, setReciever2] = useState("");
  const [reciever3, setReciever3] = useState("");
  const [reciever4, setReciever4] = useState("");
  const [amount1, setAmount1] = useState("");
  const [amount2, setAmount2] = useState("");
  const [amount3, setAmount3] = useState("");
  const [amount4, setAmount4] = useState("");
  const navigate = useNavigate();
  const { multiSenderEqually } = useStateContext();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const a = await multiSenderEqually(
      [reciever1, reciever2, reciever3, reciever4],
      amount1
    );

    navigate("/");
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="flex gap-4">
        <input
          className="border border-black "
          type="text"
          value={reciever1}
          onChange={(e) => setReciever1(e.target.value)}
        />
        <input
          type="number"
          value={amount1}
          onChange={(e) => setAmount1(e.target.value)}
        />
      </div>
      <div className="flex gap-4">
        <input
          className="border border-black "
          type="text"
          value={reciever2}
          onChange={(e) => setReciever2(e.target.value)}
        />
        <input
          disabled
          type="number"
          value={amount2}
          onChange={(e) => setAmount2(e.target.value)}
        />
      </div>
      <div className="flex gap-4">
        <input
          className="border border-black "
          type="text"
          value={reciever3}
          onChange={(e) => setReciever3(e.target.value)}
        />
        <input
          disabled
          type="number"
          value={amount3}
          onChange={(e) => setAmount3(e.target.value)}
        />
      </div>
      <div className="flex gap-4">
        <input
          className="border border-black "
          type="text"
          value={reciever4}
          onChange={(e) => setReciever4(e.target.value)}
        />
        <input
          disabled
          type="number"
          value={amount4}
          onChange={(e) => setAmount4(e.target.value)}
        />
      </div>
      <button className="border border-red-500 text-white" type="submit">
        Submit
      </button>
    </form>
  );
}
