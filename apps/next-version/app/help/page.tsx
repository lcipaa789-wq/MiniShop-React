// help page — FAQ accordion + contact form.
// FAQ uses client-side accordion for smooth open/close animation.
import ContactForm from "@/components/help/ContactForm";
import FAQAccordion from "@/components/help/FAQAccordion";
import { HelpCircle, MessageCircle } from "lucide-react";

// FAQ data
// add new questions here — no JSX changes needed
const faqs = [
  {
    question: "How do I track my order?",
    answer:
      "Go to My Orders page to see the status of all your orders. You'll see a progress timeline showing Placed → Confirmed → Shipped → Delivered.",
  },
  {
    question: "Can I cancel my order?",
    answer:
      "You can cancel an order if it's still in Pending status. Once confirmed or shipped, cancellation is no longer possible.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept all major credit cards, debit cards, and PayPal. All payments are processed securely.",
  },
  {
    question: "How long does shipping take?",
    answer:
      "Standard shipping takes 3-5 business days. Express shipping (1-2 days) is available at checkout for an additional fee.",
  },
  {
    question: "What is your return policy?",
    answer:
      "We offer a 30-day return policy. Items must be in original condition with tags attached. Contact us to initiate a return.",
  },
  {
    question: "How do I create an account?",
    answer:
      "Click Log in in the top right corner and sign up with your Google account or email. Your account is created automatically on first login.",
  },
];

export default function HelpPage() {
  return (
    <main className="max-w-2xl mx-auto px-4 py-8">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
          <HelpCircle size={20} className="text-blue-500" />
        </div>
        <div>
          <h1 className="text-[20px] font-semibold text-slate-800">
            Help Center
          </h1>
          <p className="text-[13px] text-slate-400">
            Find answers to common questions
          </p>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-[16px] font-semibold text-slate-800 mb-4">
          Frequently Asked Questions
        </h2>
        <FAQAccordion faqs={faqs} />
      </div>

      <div className="bg-white rounded-2xl border border-blue-100 p-6">
        <div className="flex items-center gap-2 mb-5">
          <MessageCircle size={18} className="text-blue-500" />
          <h2 className="text-[16px] font-semibold text-slate-800">
            Contact Us
          </h2>
        </div>
        <ContactForm />
      </div>
    </main>
  );
}
