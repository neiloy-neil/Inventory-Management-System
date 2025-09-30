import { TextField } from "@mui/material";
import "./paymentDue.scss";
import { Button } from "react-bootstrap";

const PaymentDue = () => {
  return (
    <div
      className="payment__due-page"
      style={{ padding: "50px", textAlign: "center" }}
    >
      <img
        className="image"
        src="https://media.istockphoto.com/id/1410750503/vector/fail-payment-in-hand-illustration-in-flat-style-declined-money-vector-illustration-on.jpg?s=612x612&w=0&k=20&c=LgL7lHs-W6Nt39M33xzlkSE07Q9-rY6zM5_OXCldzWI="
        alt=""
      />
      <p>
        সফটওয়্যারটির সম্পূর্ণ পেমেন্ট প্রদান ডিপ্লয়মেন্ট ডেট হতে ৪৫ দিনের মধ্যে
        ব্যার্থ হওয়ায়, স্বয়ংক্রিয় ভাবে সফটওয়্যারটির কার্যক্রম বন্ধ করা হয়েছে।
      </p>

      <p>
        আপনার বকেয়া ইনভয়েস দেখতে এখানে{" "}
        <a
          href="https://i.ibb.co/wwB86Vh/White-Simple-Invoice-1.png"
          target="_blank"
        >
          {" "}
          ক্লিক করুন{" "}
        </a>
      </p>
      <p className="mt-4">
        পুনরায় একটিভ করতে, পেমেন্ট কমপ্লিট হওয়ার পরে ইনভয়েসের সাথে রেফারেন্স
        নম্বরটি এখানে প্রদান করুন
      </p>
      <TextField
        className="mt-4"
        type="text"
        name="reference"
        placeholder="রেফারেন্স নম্বর"
        title="রেফারেন্স নম্বর"
        style={{ width: 300 }}
      />

      <Button className="mt-2" style={{ width: 300 }}>
        সাবমিট করুন
      </Button>
    </div>
  );
};

export default PaymentDue;
