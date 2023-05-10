// Declaring Object Types
// Object types may be described using a syntax that looks similar to object
// literals but with types instead of values for fields. It’s the same syntax that
// TypeScript shows in error messages about type assignability.
var hasBoth2 = {
    firstName: "zubair",
    lastName: "shah"
};
var newPoet = {
    name: "ali hasan",
    age: 30
};
var newPoet1 = {
    name: "ali hasan",
    age: 30
};
var extraProperty = {
    name: "adil",
    age: 224,
    extra: "extra but ok"
};
var extraPropertyButOk = extraProperty;
var matchBook = {
    name: "the crown"
};
console.log(matchBook);
// Keep in mind there is a difference between optional properties and
// properties whose type happens to include undefined in a type union. A
// property declared as optional with ? is allowed to not exist. A property
// declared as required and | undefined must exist, even if the value is
// undefined.
// Unions of Object Types
// your code might want to be able to type narrow
// between those object types based on the value of a property.
// Inferred Object-Type Unions
// If a variable is given an initial value that could be one of multiple object
// types, TypeScript will infer its type to be a union of object types. That union
// type will have a constituent for each of the possible object shapes. Each of
// the possible properties on the type will be present in each of those
// constituents, though they’ll be ? optional types on any type that doesn’t
// have an initial value for them.
var poem2 = Math.random() > 0.5
    ? { name: "The Double Image", pages: 7 }
    : { name: "Her Kind", rhymes: true };
console.log(poem2.name); // string
console.log(poem2.pages); // number | undefined
console.log(poem2.rhymes); // booleans | undefined
var poem = Math.random() > 0.5 ? { name: "The Double Image", pages: 2 }
    : { name: "Her Kind", rhymes: true };
// console.log(poem.pages)
// console.log(poem.rhymes)
// Narrowing Object Types
if ("pages" in poem) {
    console.log(poem.pages); // Ok: poem is narrowed to PoemWithPages
}
else {
    console.log(poem.rhymes); // Ok: poem is narrowed to PoemWithRhymes
}
// Note that TypeScript won’t allow truthiness existence checks like if
// (poem.pages). Attempting to access a property of an object that might not
// exist is considered a type error, even if used in a way that seems to behave
// like a type guard
// Discriminated Unions
// type PoemWithPages = {
// name: string;
// pages: number;
// type: 'pages';
// };
// type PoemWithRhymes = {
// name: string;
// rhymes: boolean;
// type: 'rhymes';
// };
// type Poem = PoemWithPages | PoemWithRhymes;
// const poem: Poem = Math.random() > 0.5
// ? { name: "The Double Image", pages: 7, type: "pages" }
// : { name: "Her Kind", rhymes: true, type: "rhymes" };
// if (poem.type === "pages") {
// console.log(`It's got pages: ${poem.pages}`); // Ok
// } else {
// console.log(`It rhymes: ${poem.rhymes}`);
// }
// poem.type; // Type: 'pages' | 'rhymes'
// poem.pages;
// Intersection Types
// TypeScript’s | union types represent the type of a value that could be one of
// two or more different types. Just as JavaScript’s runtime | operator acts as a
// counterpart to its & operator, TypeScript allows representing a type that is
// multiple types at the same time: an & intersection type. Intersection types
// are typically used with aliased object types to create a new type that
// combines multiple existing object types.
// type Artwork = {
// genre: string;
// name: string;
// };
// type Writing = {
// pages: number;
// name: string;
// };
// type WrittenArt = Artwork & Writing;
// // Equivalent to:
// // {
// // genre: string;
// // name: string;
// // pages: number;
// // }
// type ShortPoem = { author: string } & (
// | { kigo: string; type: "haiku"; }
// | { meter: number; type: "villanelle"; }
// );
// // Ok
// const morningGlory: ShortPoem = {
// author: "Fukuda Chiyo-ni",
// kigo: "Morning Glory",
// type: "haiku",
// };
// const oneArt: ShortPoem = {
// author: "Elizabeth Bishop",
// type: "villanelle",
// };
// Dangers of Intersection Types
// Intersection types are a useful concept, but it’s easy to use them in ways that
// confuse either yourself or the TypeScript compiler. I recommend trying to
// keep code as simple as possible when using them.
