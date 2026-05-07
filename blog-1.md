# Topic !: How do Pick and Omit utility types prevent code duplication while creating specialized "slices" of a master interface?

## Introduction

TypeScript এ  Pick এবং Omit হলো Utility Types, যেগুলো একটি বড় interface থেকে প্রয়োজন অনুযায়ী ছোট ও বিশেষ ধরনের type তৈরি করতে সাহায্য করে।
এগুলো একটি master interface থেকে প্রয়োজন অনুযায়ী ছোট specialized “slice” তৈরি করতে সাহায্য করে। এর ফলে একই property বারবার লিখতে হয় না এবং কোড DRY (Don't Repeat Yourself) থাকে।



---

## Code Duplication সমস্যা কী?

ধরুন আমাদের একটি master interface রয়েছে:

```ts
interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
}
```

এখন application এর বিভিন্ন অংশে এই interface এর বিভিন্ন version দরকার হতে পারে।

যেমন:

- Login system এর জন্য শুধু `name` এবং `email`
- Public profile এ `password` দেখানো যাবে না
- Admin dashboard এ সব data দরকার

Utility type ব্যবহার না করলে আলাদা interface লিখতে হবে:

```ts
interface LoginUser {
  name: string;
  email: string;
}

interface PublicUser {
  id: number;
  name: string;
  email: string;
  createdAt: Date;
}
```

এতে কিছু সমস্যা তৈরি হবে:

- একই property বারবার লেখা হয়
- Maintenance কঠিন হয়ে যায়
- ভুল হওয়ার সম্ভাবনা বাড়ে
- Code consistency নষ্ট হয়



## Pick Utility Type কী?

`Pick` utility type একটি existing interface থেকে নির্দিষ্ট কিছু property নিয়ে নতুন type তৈরি করে।

### Syntax

```ts
Pick<Type, Keys>
```

### Example

```ts
interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
}

type LoginUser = Pick<User, "name" | "email">;
```

### Result

```ts
type LoginUser = {
  name: string;
  email: string;
}
```

এখানে `Pick` ব্যবহার করে `User` interface থেকে শুধু প্রয়োজনীয় property নেওয়া হয়েছে।

---

## Omit Utility Type কী?

`Omit` utility type একটি interface থেকে নির্দিষ্ট property বাদ দিয়ে নতুন type তৈরি করে।

### Syntax

```ts
Omit<Type, Keys>
```

### Example

```ts
type PublicUser = Omit<User, "password">;
```

### Result

```ts
type PublicUser = {
  id: number;
  name: string;
  email: string;
  createdAt: Date;
}
```

এখানে `password` property automatically বাদ গেছে।

---

## Specialized “Slices” তৈরি করা

একটি master interface এ সাধারণত সব data থাকে। কিন্তু application এর সব জায়গায় সব data দরকার হয় না।

`Pick` এবং `Omit` ব্যবহার করে সেই interface এর ছোট focused version তৈরি করা হয়।

যেমনঃ

```ts
interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
  supplierInfo: string;
}
```

### Customer View

```ts
type ProductCard = Pick<Product, "id" | "name" | "price">;
```

### Inventory View

```ts
type InventoryItem = Pick<Product, "id" | "stock">;
```

### Public API Response

```ts
type PublicProduct = Omit<Product, "supplierInfo">;
```

এগুলোকে specialized slices বলা হয় কারণ প্রতিটি type মূল interface এর নির্দিষ্ট অংশকে represent করে।

---

## Pick এবং Omit কীভাবে DRY Principle বজায় রাখে

DRY এর পূর্ণরূপ হলো “Don't Repeat Yourself”। অর্থাৎ একই code বারবার লেখা যাবে না।

`Pick` এবং `Omit` বিভিন্নভাবে DRY principle maintain করতে সাহায্য করে।

---

### 1. Single Source of Truth

সব property শুধু master interface এ define করা হয়।

যদি পরে কোনো property change করা হয়, তাহলে derived types গুলো automatically update হয়ে যায়।

উদাহরণ:

```ts
interface User {
  name: string;
}
```

পরে যদি এটি পরিবর্তন করা হয়:

```ts
interface User {
  name: {
    first: string;
    last: string;
  };
}
```

তাহলে `Pick` এবং `Omit` দিয়ে তৈরি সব type automatically synchronize হয়ে যাবে।

---

### 2. Maintenance সহজ হয়

Utility type ব্যবহার না করলে developers কে একাধিক interface manually update করতে হয়।

কিন্তু `Pick` এবং `Omit` ব্যবহার করলে শুধু master interface update করলেই যথেষ্ট।

এতে development time কমে যায় এবং project manage করা সহজ হয়।

---

### 3. Bug কমে যায়

Manual duplication করলে type mismatch হতে পারে।

```ts
interface UserA {
  email: string;
}

interface UserB {
  email: number;
}
```

কিন্তু utility types ব্যবহার করলে সব type একই source থেকে তৈরি হয়, তাই inconsistency কমে যায়।

---

### 4. Scalability বৃদ্ধি পায়

বড় application এ সাধারণত থাকে:

- Database models
- API response types
- Form data types
- Admin panel types
- UI display models

`Pick` এবং `Omit` ব্যবহার করলে এগুলো efficiently manage করা যায়।

---

## Real-World Use Case

একটি e-commerce application এ একটি `Product` interface ব্যবহার করে customer view, seller dashboard এবং admin panel এর জন্য আলাদা আলাদা type তৈরি করা যায়।

এর ফলে একই structure বারবার লিখতে হয় না এবং project আরও organized থাকে।

---

## Conclusion

`Pick` এবং `Omit` TypeScript এর অত্যন্ত powerful utility types যা reusable এবং maintainable application তৈরি করতে সাহায্য করে। এগুলো master interface থেকে specialized slices তৈরি করে code duplication কমায় এবং DRY principle বজায় রাখে।

বড় এবং complex project এ `Pick` এবং `Omit` ব্যবহার করলে scalability, consistency এবং overall code quality অনেক উন্নত হয়।
````
