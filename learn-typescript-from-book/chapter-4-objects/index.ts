// Declaring Object Types
// Object types may be described using a syntax that looks similar to object
// literals but with types instead of values for fields. It’s the same syntax that
// TypeScript shows in error messages about type assignability.

// let poetLater: {
//     name: string,
//     born: number,
// }

//  poetLater = {
//      name: "zubair shah",
//      born:2000
// }
// poetLater = "sappho" error

// Aliased Object Types

// type Poet = {
//     born: number,
//     name: string
// }

// var poetLater: Poet;

// poetLater = {
//     born: 2000,
//     name: "zubair shah"
// }

// poetLater = "Emily Dickinson";     Error

// Structural Typing
type WithFirstName = {
firstName: string;
};
type WithLastName = {
lastName: string;
};
// const hasBoth = {
// firstName: "Lucille",
// lastName: "Clifton",
// };
// Ok: `hasBoth` contains a `firstName` property of type `string`
// let withFirstName: WithFirstName = hasBoth;
// Ok: `hasBoth` contains a `lastName` property of type `string`
// let withLastName: WithLastName = hasBoth;


// Usage Checking

// When providing a value to a location annotated with an object type,
// TypeScript will check that the value is assignable to that object type. To
// start, the value must have the object type’s required properties. If any
// member required on the object type is missing in the object, TypeScript will
// issue a type error

type FirstandLastNames = {
    firstName: string,
    lastName: string
}

const hasBoth2: FirstandLastNames = {
    firstName: "zubair",
    lastName: "shah"
}

// const hasOnlyOne: FirstandLastNames = {
//     firstName: "Lucille",
// }


// Excess Property Checking

// Typescript will report a type error if a variable is declared with an object
// type and its initial value has more fields than its type describes. Therefore,
// declaring a variable to be of an object type is a way of getting the type
// checker to make sure it has only the expected fields on that type.

type Poet = {
    name: string,
    age: number,
}

const newPoet: Poet = {
    name: "ali hasan",
    age:30
}
const newPoet1: Poet = {
    name: "ali hasan",
    age: 30,
    // extraProperty: "extra",         //error
}

const extraProperty = {
    name: "adil",
    age: 224,
    extra: "extra but ok"
}

const extraPropertyButOk: Poet = extraProperty


// Nested Object Types
// As JavaScript objects can be nested as members of other objects,
// TypeScript’s object types must be able to represent nested object types in
// the type system. The syntax to do so is the same as before but with a { ...
// } object type instead of a primitive name.

// type Poem = {
//     author: {
//         firsName: string,
//         lastName: string
//     },
//     book: {
//         name: string
//     }
// }

// const poemMatch: Poem = {
//     author: {
//         firsName: "zubair",
//         lastName:"shah"
//     },
//     book: {
//         name:"the crown"
//     }
// }

// ============mismatched===============
//  -----------------------> it gives Error
// const misMatchedPoeM : Poem ={
//     author: {
//         name:"zubair"
//     },
//     book: {
//         firstName:"the Crown"
//     }
// }

// Optional Properties
// Object type properties don’t all have to be required in the object. You can
// include a ? before the : in a type property’s type annotation to indicate that
// it’s an optional property.

type Book = {
    author?: string,
    name: string
}

const matchBook: Book = {
    name: "the crown"
}
console.log(matchBook)

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

const poem2 : poem1 = Math.random() > 0.5
? { name: "The Double Image", pages: 7 }
: { name: "Her Kind", rhymes: true };
type poem1 ={
name: string;
pages: number;
rhymes?: undefined;
}|{
name: string;
pages?: undefined;
rhymes: boolean;
}
poem2.name; // string
poem2.pages; // number | undefined
poem2.rhymes; // booleans | undefined



// Explicit Object-Type Unions
// Alternately, you can be more explicit about your object types by being
// explicit with your own union of object types. Doing so requires writing a bit
// more code but comes with the advantage of giving you more control over
// your object types

// type PoemWithPages = {
//     name: string,
//     pages:number
// }

// type PoemWithRhymes = {
//     name: string,
//     rhymes: boolean
// }

// type Poem = PoemWithPages | PoemWithRhymes;

// const poem :  Poem = Math.random() > 0.5 ? { name: "The Double Image", pages: 2 }
//     : { name: "Her Kind", rhymes: true }



    // console.log(poem.pages)
    // console.log(poem.rhymes)
    
    // Narrowing Object Types

//     if ("pages" in poem) {
// console.log(poem.pages); // Ok: poem is narrowed to PoemWithPages
// } else {
// console.log(poem.rhymes); // Ok: poem is narrowed to PoemWithRhymes
// }
// Note that TypeScript won’t allow truthiness existence checks like if
// (poem.pages). Attempting to access a property of an object that might not
// exist is considered a type error, even if used in a way that seems to behave
// like a type guard

// Discriminated Unions


type PoemWithPages = {
name: string;
pages: number;
type: 'pages';
};
type PoemWithRhymes = {
name: string;
rhymes: boolean;
type: 'rhymes';
};
type Poem = PoemWithPages | PoemWithRhymes;
const poem: Poem = Math.random() > 0.5
? { name: "The Double Image", pages: 7, type: "pages" }
: { name: "Her Kind", rhymes: true, type: "rhymes" };
if (poem.type === "pages") {
console.log(`It's got pages: ${poem.pages}`); // Ok
} else {
console.log(`It rhymes: ${poem.rhymes}`);
}
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