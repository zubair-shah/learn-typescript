// Top Types
// A top type, or universal type, is a type that can represent any possible value
//     in a system


// any, Again

// The any type can act as a top type, in that any type can be provided to a
// location of type any.any is generally used when a location is allowed to
// accept data of any type, such as the parameters to console.log:

// let anyValue: any;
// anyValue = "Lucille Ball"; // Ok
// anyValue = 123; // Ok
// console.log(anyValue); // Ok

// The problem with any is that it explicitly tells TypeScript not to perform
// type checking on that value’s assignability or members.That lack of safety
// is useful if you’d like to quickly bypass TypeScript’s type checker, but the
// disabling of type checking reduces TypeScript’s usefulness for that value.

// function greetComedian(name: any) {
//     // No type error...
//     console.log(`Announcing ${name.toUpperCase()}!`);
// }
// greetComedian({ name: "Bea Arthur" });
// // Runtime error: name.toUpperCase is not a function


// unknown
// The key
// difference with unknown is that TypeScript is much more restrictive about
// values of type unknown:
// TypeScript does not allow directly accessing properties of unknown
// typed values.
// unknown is not assignable to types that are not a top type(any or
// unknown).

// function greetComedian(name: unknown) {
//     console.log(`Announcing ${name.toUpperCase()}!`);
//     // ~~~~
//     // Error: Object is of type 'unknown'.
// }
// The only way TypeScript will allow code to access members on a name of
// type unknown is if the value’s type is narrowed, such as using instanceof
//     or typeof, or with a type assertion.

// function greetComedianSafety(name: unknown) {
//     if (typeof value === "string") {
//         console.log(`Announcing ${name.toUpperCase()}!`); // Ok
//     } else {
//         console.log("Well, I'm off.");
//     }
// }
// greetComedianSafety("Betty White"); // Logs: 4
// greetComedianSafety({}); // Does not log

// Type Predicates

// TypeScript has a special syntax for functions that return a boolean meant to
// indicate whether an argument is a particular type.This is referred to as a
// type predicate, also sometimes called a “user - defined type guard”:

function isNumberOrString(value: unknown): value is number | string {
    return ['number', 'string'].includes(typeof value);
}
function logValueIfExists(value: number | string | null | undefined) {
    if (isNumberOrString(value)) {
        // Type of value: number | string
        value.toString(); // Ok
    } else {
        // Type of value: null | undefined
        console.log("value does not exist:", value);
    }
}

// Type Operators

// keyof
// Keyof operator humein ek object type ke keys ko retrieve karne ki ijazat deta hai.Is operator ka istemal primarily generics aur mapped types ke saath kiya jata hai
type Person = {
    name: string;
    age: number;
    address: string;
};

type PersonKeys = keyof Person; // "name" | "age" | "address"

// typeof
// Another type operator provided by TypeScript is typeof.It gives back the
// type of a provided value.This can be useful if the value’s type would be
// annoyingly complex to write manually.

// const original = {
//     medium: "movie",
//     title: "Mean Girls",
// };
// let adaptation: typeof original;
// if (Math.random() > 0.5) {
//     adaptation = { ...original, medium: "play" }; // Ok
// } else {
//     adaptation = { ...original, medium: 2 };
//     // ~~~~~~
//     // Error: Type 'number' is not assignable to type 'string'.
// }

// keyof typeof
//     typeof retrieves the type of a value, and keyof retrieves the allowed keys
// on a type.TypeScript allows the two keywords to be chained together to
// succinctly retrieve the allowed keys on a value’s type.Putting them
// together, the typeof type operator becomes wonderfully useful for working
// with keyof type operations.
// In this example, the logRating function is meant to take in one of the keys
// of the ratings value.Instead of creating an interface, the code uses keyof
// typeof to indicate key must be one of the keys on the type of the ratings
// value:
const ratings = {
    imdb: 8.4,
    metacritic: 82,
};
function logRating(key: keyof typeof ratings) {
    console.log(ratings[key]);
}
logRating("imdb"); // Ok
logRating("invalid");
// ~~~~~~~~~
// Error: Argument of type '"missing"' is not assignable
// to parameter of type '"imdb" | "metacritic"'.
// By combining keyof and typeof, we get to save ourselves the pain of
// writing out—and having to update—types representing the allowed keys on
// objects that don’t have an explicit interface type.

// Type Assertions