// ===unions=== allow one or more types to be

// let mathematician = Math.random() > 0.5 ? undefined : "Mathematician";
// console.log(mathematician)

// let thinker : string | null = null;
// if (Math.random() > 0.5) {
// thinker = "Susanne Langer"; // Ok
// }
// console.log(thinker);
// let inventor: number | string = "Hedy Lamarr";
// inventor.toUpperCase(); // Ok: string
// inventor.toFixed();


// Type of scientist: number | string
// let scientist = Math.random() > 0.5 ? "Rosalind Franklin"
// : 51;
// if (scientist === "Rosalind Franklin") {
// // Type of scientist: string
// scientist.toUpperCase(); // Ok
// }
// Type of scientist: number | string
// scientist.toUpperCase();
// // scientist.toFixed();
// console.log(scientist)
// ~~~~~~~~~~~
// Error: Property 'toUpperCase' does not exist on type 'string | number'.
// Property 'toUpperCase' does not exist on type 'number'.

// =======================Narrowing================
// let admiral: number | string;
// admiral = "Grace Hopper";   //typescript now know this is a string
// admiral.toUpperCase(); // Ok: string
// admiral.toFixed();


// let inventor : number | string = "Hedy Lamarr";
// inventor.toUpperCase(); // Ok: string
// inventor = 3;
// inventor.toFixed();

//A common way to get TypeScript to narrow a variable’s value is to write an
//if statement

// let scientist = Math.random() > 0.5 ? "Zubair" : 99;

// if (scientist === "Zubair") { 
//     scientist.toUpperCase(); // Ok: string
// }
// else if (scientist === 99) {
    
//     scientist.toFixed(); // Ok: string
// }

// console.log(scientist)

// =============with typeof logical statements =====================
// if (!(typeof scientist === "string")) {
// scientist.toFixed(); // Ok: number
// } else {
// scientist.toUpperCase(); // Ok: string
// }
// console.log(scientist)

// //ternary operator
// typeof scientist === "string"
// ? scientist.toUpperCase() // Ok: string
// : scientist.toFixed(); // Ok: number


// =============literal-types============
// let specificallyAda: "Ada";
// specificallyAda = "Ada"; // Ok
// specificallyAda = "Byron";
 // Error: Type '"Byron"' is not assignable to type '"Ada"'.
// let someString = ""; // Type: string
// specificallyAda = someString;
// Error: Type 'string' is not

// Truthiness Narrowing

let geneticist = Math.random() > 0.5 ? "zubair" : undefined;
if (geneticist) {
geneticist.toUpperCase(); // Ok: string
console.log(geneticist)
}
geneticist && geneticist.toUpperCase();
geneticist?.toUpperCase();
console.log(geneticist)

let math: string;
math?.length;
console.log(math)

// Type Aliases

// let rawDataFirst: boolean | number | string | null | undefined;
// let rawDataSecond: boolean | number | string | null | undefined;
// let rawDataThird: boolean | number | string | null | undefined;


type RawData = boolean | number | string | null | undefined;

let rawDataFirst: RawData;
let rawDataSecond: RawData;
let rawDataThird: RawData;
// type SomeType = string | undefined;
// console.log(SomeType);


// Because type aliases are purely in the type system, you cannot reference
// them in runtime code. TypeScript will let you know with a type error if you
// are trying to access something that won’t exist at runtime:
// type SomeType = string | undefined;
// console.log(SomeType);
// // ~~~~~~~~
// // Error: 'SomeType' only refers to a type, but is being used as a value here.
// Type aliases exist purely as a development-time construct.

type IdMaybe = RawData | undefined | null;

// it copy all the types from Rawdata and add undefined and null
// Type aliases don’t have to be declared in order of usage. You can have a
// type alias declared earlier in a file reference an alias declared later in the
// file

// Tuple Inferences
function firstCharAndSize(input: string) {
return [input[0], input.length];
}
// const [firstChar, size] = firstCharAndSize("zubair");

// Explicit tuple types
// Return type: [string, number]
function firstCharAndSizeExplicit(input: string): [string, number] {
return [input[0], input.length];
}
const [firstChar, size] = firstCharAndSizeExplicit("zubair shah")
// Const asserted tuples
//  TypeScript provides an as const operator known as a
// const assertion that can be placed after a value

// Type: (string | number)[]
const unionArray = [1157, "Tomoe"];
// Type: readonly [1157, "Tomoe"]
const readonlyTuple = [1157, "Tomoe"] as const;

// read-only and cannot be used in a place that expects it should be allowed to
// modify the value.

// const pairMutable: [number, string] = [1157, "Tomoe"];
// pairMutable[0] = 1247; // Ok
// const pairAlsoMutable: [number, string] = [1157, "Tomoe"] as const;
// // ~~~~~~~~~~~~~~~
// // Error: The type 'readonly [1157, "Tomoe"]' is 'readonly'
// // and cannot be assigned to the mutable type '[number, string]'.
// const pairConst = [1157, "Tomoe"] as const;
// pairConst[0] = 1247;
// This firstCharAndSizeAsConst returns a readonly [string, number],
// but the consuming code only cares about retrieving the values from that
// tuple:
// Return type: readonly [string, number]
// function firstCharAndSizeAsConst(input: string) {
// return [input[0], input.length] as const;
// }
// firstChar type: string
// size type: number
// const [firstChar, size] = firstCharAndSizeAsConst("Ching Shih");