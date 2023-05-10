// Arrays and tuples
// One flexible and one fixed
// Choose your adventure
// JavaScript arrays are wildly flexible and can hold any mixture of values
// inside:
// const elements = [true, null, undefined, 42];
// elements.push("even", ["more"]);
// Value of elements: [true, null, undefined, 42, "even", ["more"]]


// TypeScript respects the best practice of keeping to one data type per array
// by remembering what type of data is initially inside an array, and only
// allowing the array to operate on that kind of data.
// In this example, TypeScript knows the warriors array initially contains
// string typed values, so while adding more string typed values is allowed,
// adding any other type of data is not:
const warriors = ["Artemisia", "Boudica"];
// Ok: "Zenobia" is a string
warriors.push("Zenobia");
warriors.push(true);
// ~~~~
// Argument of type 'boolean' is not assignable to parameter of type 'string


// Array Types
// As with other variable declarations, variables meant to store arrays don’t
// need to have an initial value. The variables can start off undefined and
// receive an array value later.
// TypeScript will want you to let it know what types of values are meant to
// go in the array by giving the variable a type annotation. The type annotation
// for an array requires the type of elements in the array followed by a []:
// let arrayOfNumbers: number[];
// arrayOfNumbers = [4, 8, 15, 16, 23, 42];

// Array and Function Types

// The createStrings type here, which is a function type, is not the same as
// stringCreators, which is an array type:
// // Type is a function that returns an array of strings
// let createStrings: () => string[];

//  Type is an array of functions that each return a string
// let stringCreators: (() => string)[];


// Union-Type Arrays
// You can use a union type to indicate that each element of an array can be
// one of multiple select types.


// Using parentheses in array union types is important
// —the following two types are not the same:
// // Type is either a number or an array of strings
// let stringOrArrayOfNumbers: string | number[];
// // Type is an array of elements that are each either a number or a string
// let arrayOfStringOrNumbers: (string | number)[];

// TypeScript will understand from an array’s declaration that it is a uniontype array if it contains more than one type of element. In other words, the
// type of an array’s elements is the union of all possible types for elements in
// the array.
// Here, namesMaybe is (string | undefined)[] because it has both
// string values and an undefined value:
// // Type is (string | undefined)[]
// const namesMaybe = [
// "Aqualtune",
// "Blenda",
// undefined,
// ];


// Evolving Any Arrays
// If you don’t include a type annotation on a variable initially set to an empty
// array, TypeScript will treat the array as evolving any[], meaning it can
// receive any content. As with evolving any variables, we don’t like evolving
// any[] arrays. They partially negate the benefits of TypeScript’s type
// checker by allowing you to add potentially incorrect values.
// This values array starts off containing any elements, evolves to contain
// string elements, then again evolves to include number | string
// elements:
// Type: any[]
let values = [];
// Type: string[]
values.push('');
// Type: (number | string)[]
values[0] = 0;

// Multidimensional Arrays
// A 2D array, or an array of arrays, will have two “[]”s:
// let arrayOfArraysOfNumbers: number[][];
// arrayOfArraysOfNumbers = [
// [1, 2, 3],
// [2, 4, 6],
// [3, 6, 9],
// ];

// A 3D array, or an array of arrays of arrays, will have three “[]”s. 4D arrays
// have four “[]”s. 5D arrays have five “[]”s. You can guess where this is
// going for 6D arrays and beyond.

Array Members

// TypeScript understands typical index-based access for retrieving members
// of an array to give back an element of that array’s type.
// This defenders array is of type string[], so defender is a string:
// const defenders = ["Clarenza", "Dina"];
// Type: string
// const defender = defenders[0];

// const soldiersOrDates = ["Deborah Sampson", new Date(1782, 6, 3)];
// // Type: Date | string
// const soldierOrDate = soldiersOrDates[0];


// Caveat: Unsound Members
// This code gives no complaints with the default TypeScript compiler
// settings:
// function withElements(elements: string[]) {
// console.log(elements[9001].length); // No type error
// }
// withElements(["It's", "over"]);

// We as readers can deduce that it’ll crash at runtime with “Cannot read
// property 'length' of undefined”, but TypeScript intentionally does
// not make sure retrieved array members exist. It sees elements[9001] in
// the code snippet as being type string, not undefined.

// Spreads
// Arrays can be joined together using the ... spread operator. TypeScript
// understands the result array will contain values that can be from either of
// the input arrays.

// Here, the conjoined array is known to contain both values that are type
// string and values that are type number, so its type is inferred to be
// (string | number)[]:
// Type: string[]
const soldiers = ["Harriet Tubman", "Joan of Arc", "Khutulun"];
// Type: number[]
const soldierAges = [90, 19, 45];
// Type: (string | number)[]
const conjoined = [...soldiers, ...soldierAges];

// Spreading Rest Parameters

// The logWarriors function below takes in only string values for its
// ...names rest parameter. Spreading an array of type string[] is allowed,
// but a number[] is not:
// function logWarriors(greeting: string, ...names: string[]) {
// for (const name of names) {
// console.log(`${greeting}, ${name}!`);
// }
// }
// const warriors = ["Cathay Williams", "Lozen", "Nzinga"];
// logWarriors("Hello", ...warriors);
// const birthYears = [1844, 1840, 1583];
// logWarriors("Born in", ...birthYears);
// ~~~~~~~~~~~~~
// Error: Argument of type 'number' is not
// assignable to parameter of type 'string'

// Tuples
// Although JavaScript arrays may be any size in theory, it is sometimes useful
// to use an array of a fixed size—also known as a tuple. Tuple arrays have a
// specific known type at each index that may be more specific than a union
// type of all possible members of the array. The syntax to declare a tuple type
// looks like an array literal, but with types in place of element values.
// Here, the array yearAndWarrior is declared as being a tuple type with a
// number at index 0 and a string at index 1:


// let yearAndWarrior: [number, string];
// yearAndWarrior = [530, "Tomyris"]; // Ok
// yearAndWarrior = [false, "Tomyris"];
// ~~~~~
// Error: Type 'boolean' is not assignable to type 'number'.
// yearAndWarrior = [530];
// Error: Type '[number]' is not assignable to type '[number, string]'.
// Source has 1 element(s) but target requires 2.

// Tuples are often used in JavaScript alongside array destructuring to be able
// to assign multiple values at once, such as setting two variables to initial
// values based on a single condition.
// For example, TypeScript recognizes here that year is always going to be a
// number and warrior is always going to be a string:
// year type: number
// warrior type: string
let [year, warrior] = Math.random() > 0.5
? [340, "Archidamia"]
: [1828, "Rani of Jhansi"];


// Tuple Assignability
// Tuple types are treated by TypeScript as more specific than variable length
// array types. That means variable length array types aren’t assignable to
// tuple types.
// Here, although we as humans may see pairLoose as having [boolean,
// number] inside, TypeScript infers it to be the more general (boolean |
// number)[] type:
// Type: (boolean | number)[]
// const pairLoose = [false, 123];
// const pairTupleLoose: [boolean, number] = pairLoose;
// ~~~~~~~~~~~~~~
// Error: Type '(number | boolean)[]' is not
// assignable to type '[boolean, number]'.
// Target requires 2 element(s) but source may have fewer.
// If pairLoose had been declared as a [boolean, number] itself, the
// assignment of its value to pairTuple would have been permitted.
// Tuples of different lengths are also not assignable to each other, as
// TypeScript includes knowing how many members are in the tuple in tuple
// types.
// Here, tupleTwoExtra must have exactly two members, so although
// tupleThree starts with the correct members, its third member prevents it
// from being assignable to tupleTwoExtra:
// const tupleThree: [boolean, number, string] = [false, 1583, "Nzinga"];
// const tupleTwoExact: [boolean, number] = [tupleThree[0], tupleThree[1]];
// const tupleTwoExtra: [boolean, number] = tupleThree;
// ~~~~~~~~~~~~~
// Error: Type '[boolean, number, string]' is
// not assignable to type '[boolean, number]'.
// Source has 3 element(s) but target allows only 2.
