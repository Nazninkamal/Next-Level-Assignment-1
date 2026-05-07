## Title: # Why `any` is a Type Safety Hole and Why `unknown` is the Safer Choice in TypeScript

## Introduction 

TypeScript-এ টাইপ সেফটি মানে হলো—ভুল টাইপ ব্যবহার করলে আগেই error ধরা পড়া। any কে type safety hole বলা হয় ,অন্যদিকে unknown কে  Safer বলা হয়। 


## ❌ any কেন unsafe?

any ব্যবহার করলে TypeScript কোনো type checking করে না। ফলে যেকোনো operation করা যায়, যা runtime error ঘটায়।

let data: any;

data = "hello";
data.toUpperCase(); // ঠিক আছে

data = 17;
data.toUpperCase(); // runtime error, কিন্তু compile time এ ধরা পড়ে না


## ✅ unknown কেন বেশি নিরাপদ?

 unknown বেশি নিরাপদ কারণ এটি বাধ্য করে আগে type check (type narrowing) করতে, তারপরই value ব্যবহার করতে দেয়।


let data: unknown;

data = "hello";
data = 123;

data.toUpperCase(); // ❌ Error


## Type Narrowing কী?

Type narrowing হলো এমন একটি প্রক্রিয়া যেখানে আমরা আগে condition দিয়ে টাইপ নিশ্চিত করি, তারপর ব্যবহার করি।

সহজভাবে: আগে check → তারপর ব্যবহার 

let data: unknown;

data = "hello";

if (typeof data === "string") {
  console.log(data.toUpperCase()); // ✅ এখন safe
}

প্রথমে check করা হলো এটি string কিনা
TypeScript বুঝে নিল এখন এটি string
তারপর string method ব্যবহার করা গেল



## Conclusion

any কে type safety hole বলা হয় কারণ এটি TypeScript-এর সব ধরনের safety check বন্ধ করে দেয়, ফলে ভুল কোডও সহজে চলে যায় এবং runtime error তৈরি হয়।

অন্যদিকে unknown ব্যবহার করলে TypeScript বাধ্য করে আগে type check করতে। সরাসরি value use করা যায় না। 

বাস্তব প্রজেক্টে safe, scalable এবং maintainable code লেখার জন্য unknown ব্যবহার করা সবচেয়ে ভালো পদ্ধতি।

