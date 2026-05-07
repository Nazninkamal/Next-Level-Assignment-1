// Problem 1: Create a TypeScript function filterEvenNumbers that accepts an array of numbers and returns a new array containing only the even numbers.

function filterEvenNumbers(numbers: number[]): number[] {
    return numbers.filter(num=> num % 2 === 0);
};

const result1 = filterEvenNumbers([1, 2, 3, 4, 5, 6]);





//Problem 2: Write a function reverseString that takes a string as input and returns the reversed version of that string.

function reverseString(word: string): string {
    return word.split('').reverse().join('');
}

const result2 = reverseString("typescript");





// Problem 3: Define a union type StringOrNumber and create a function checkType that uses type guards to return "String" if the input is a string or "Number" if the input is a number.

type StringOrNumber = string | number;

function checkType (input: StringOrNumber): string {
    if (typeof input === 'string') {
        return "String";
    } else {
        return "Number";
    }
};

const result3a = checkType("Hello");
const result3b = checkType(42);





// Problem 4: Write a generic function getProperty that takes an object and a key, then returns the value of that key. Use constraints to ensure the key exists on the object.

function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
    return obj[key];
}

const user = { ID: 1, Name: "John Doe", Age: 21 };
const result4 = getProperty(user, "Name");






//Problem 5:Define an interface Book with properties title, author, and publishedYear. Create a function toggleReadStatus that accepts a Book object and returns a new object with an added isRead property (boolean), defaulting to true.

interface Book {
    title: string;
    author: string;
    publishedYear: number;
}

function toggleReadStatus(book: Book): Book & { isRead: boolean } {
    return { 
        ...book,
         isRead: true 
        };
}

const myBook = { title: "TypeScript Guide", author: "Jane Doe", publishedYear: 2024 };

const result5 = toggleReadStatus(myBook);






// Problem 6: Create a class Person with a name and age. Then, create a subclass Student that adds a grade property. Include a method getDetails in the Student class that returns a string with the student's name, age, and grade.

class Person {
    name: string;
    age: number;    

    constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
    }
};

class Student extends Person {
    grade: string;      

    constructor(name: string, age: number, grade: string) {
        super(name, age);
        this.grade = grade;
    }

    getDetails(): string {
        return `Name: ${this.name}, Age: ${this.age}, Grade: ${this.grade}`;
    }

}

const student = new Student("Alice", 20, "A");
const result6= student.getDetails();






//Problem 7: Create a function getIntersection that takes two arrays of numbers and returns a new array containing only the elements that are present in both arrays.


function getIntersection(arr1: number[], arr2: number[]): number[] {
    return arr1.filter(num => arr2.includes(num));
}

const result7 = getIntersection([1, 2, 3, 4, 5], [3, 4, 5, 6, 7])



