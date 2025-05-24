"use client";
import { X } from "lucide-react";
import { useState, useEffect } from "react";

export default function Home() {
  const [spent, setSpent] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('spent');
      return saved ? parseFloat(saved) : 0;
    }
    return 0;
  });

  const [currentAmount, setCurrentAmount] = useState(0);
  const [reason, setReason] = useState("");

  const [expense, setExpense] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('expenses');
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });

  // Save to localStorage whenever values change
  useEffect(() => {
    localStorage.setItem('spent', spent.toString());
  }, [spent]);

  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(expense));
  }, [expense]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-24 bg-gradient-to-tr from-blue-500 to-purple-600
    font-bold text-6xl">
      ${spent}
      <div className="flex gap-10 items-center justify-center w-[48rem]">
        <input
          type="text"
          className="w-1/2 p-2 mt-4 text-3xl text-center border-2 border-gray-300 rounded-lg text-black"
          placeholder="Enter reason"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
        />
        <input
          type="number"
          className="w-1/2 p-2 mt-4 text-3xl text-center border-2 border-gray-300 rounded-lg text-black"
          placeholder="Enter amount"
          value={currentAmount || ""}
          onChange={(e) => {
            const value = parseFloat(e.target.value);
            if (!isNaN(value)) {
              setCurrentAmount(value);
            } else {
              setCurrentAmount(0);
            }
          }}
        />
      </div>
      <button
        className="w-56 p-2 mt-4 text-3xl text-center text-white bg-black rounded-lg hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        onClick={() => {
          if (reason && currentAmount) {
            setExpense([...expense, { reason, spent: currentAmount }]);
            setSpent(spent + currentAmount);
            setCurrentAmount(0);
            setReason("");
          }
        }}
      >
        Add
      </button>
      <div className="flex flex-col items-center justify-center w-[48rem] mt-10">
        {expense.map((item: any, index: any) => (
          <div
            key={index}
            className="flex items-center justify-between w-full p-2 mt-2 text-3xl text-white bg-gray-800 rounded-lg"
          >
            <span>{item.reason}</span>
            <div className="flex items-center gap-2">
              <span>{item.spent}</span>
              <X className="text-gray-400 hover:text-red-500" onClick={
                () => {
                  setSpent(spent - item.spent);
                  setExpense(expense.filter((_: any, i: number) => i !== index));
                }
              }/>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
