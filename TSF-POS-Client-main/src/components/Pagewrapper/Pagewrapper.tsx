import Sidebar from "../Sidebar/Sidebar";
import { PagewrapperTypes } from "./types";

const Pagewrapper = ({
  children,
  title,
  hideBar = false,
}: PagewrapperTypes) => {
  return (
    <Sidebar hideBar={hideBar} title={title}>
      {/* <p style={{ color: "red" }} className="my-4">
        রিমাইন্ডার : এই সফটওয়্যারটির সম্পূর্ণ পেমেন্ট এখনো করা হয়নি, এটি একটি
        স্বয়ংক্রিয় সিস্টেম এবং ১৫ সেপ্টেম্বর এর মধ্যে পেমেন্ট না হলে স্বয়ংক্রিয়
        ভাবে সিস্টেম সার্ভারটি বন্ধ হয়ে যাবে{" "}
      </p> */}
      {children}
    </Sidebar>
  );
};

export default Pagewrapper;
