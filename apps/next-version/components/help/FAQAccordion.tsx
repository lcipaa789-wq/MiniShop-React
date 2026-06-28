// Animated FAQ accordion — click to expand/collapse each question.
"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface FAQ {
  question: string;
  answer: string;
}

export default function FAQAccordion({ faqs }: { faqs: FAQ[] }) {
  // track which FAQ is currently open — null means all closed
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  function toggle(index: number) {
    setOpenIndex(openIndex === index ? null : index);
  }

  return (
    <div className="flex flex-col gap-2">
      {faqs.map((faq, index) => (
        <div
          key={index}
          className="bg-white rounded-xl border border-blue-100 overflow-hidden"
        >
          <button
            onClick={() => toggle(index)}
            className="w-full flex items-center justify-between px-5 py-4
                       text-left hover:bg-blue-50 transition-colors"
          >
            <span className="text-[14px] font-medium text-slate-800 pr-4">
              {faq.question}
            </span>

            <ChevronDown
              size={18}
              className={`text-slate-400 shrink-0 transition-transform duration-200
                         ${openIndex === index ? "rotate-180" : ""}`}
            />
          </button>

          {openIndex === index && (
            <div className="px-5 pb-4 border-t border-blue-50">
              <p className="text-[13px] text-slate-500 leading-relaxed pt-3">
                {faq.answer}
              </p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
