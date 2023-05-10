//interfaces

// type aliases and interfaces

// type Poet = {
//     name: string;
//     born:number
// }

// interface Poet {
//     name: string;
//     born:number;
// }

// The recommended one is interface use it whenever is possible untill you need union types for aliases
// Interfaces are generally speedier for the TypeScript type checker to
// work with: they declare a named type that can be cached more easily
// internally, rather than a dynamic copy-and-paste of a new object literal
// the way type aliases do

// Optional Properties
// As with object types, interface properties don’t all have to be required in the
// object. You can indicate an interface’s property is optional by including a ?
//     before the: in its type annotation


interface Book {
    author?: string,
    pages: number
}

// const ok: Book = {
//     author: "zubair",
//     pages: 1
// }
// const missing: Book = {
//     pages:0
// }
// Read-Only Properties

// For example, the text property in the below Page interface gives back a
// string when accessed, but causes a type error if assigned a new value:
interface Page {
    readonly text: string;
}
function read(page: Page) {
    // Ok: reading the text property doesn't attempt to modify it
    // console.log(page.text);
    // page.text += "!";
    // ~~~~
    // Error: Cannot assign to 'text'
    // because it is a read-only property.
}

// Functions and Methods

interface BothFunctionsTypes {
    method(): void;
    property: () => void;
}

const both: BothFunctionsTypes = {
    method() {
        return ""
    },
    property: () => ""
}

both.method();
both.property();
// Use a method function if you know the underlying function may refer
// to this, most commonly for instances of classes
// Use a property function otherwise.

// Call Signatures
// The following FunctionAlias and CallSignature types both describe the
// same function parameters and return type:
type FunctionAlias = (input: string) => number;
interface CallSignature {
    (input: string): number;
}
// Type: (input: string) => number
const typedFunctionAlias: FunctionAlias = (input) => input.length; // Ok
// Type: (input: string) => number
const typedCallSignature: CallSignature = (input) => input.length; // Ok

// Call signatures can be used to describe functions that additionally have
// some user-defined property on them. TypeScript will recognize a property
// added to a function declaration as adding to that function declaration’s type

// Index Signatures

interface WordCounts {
    [i: string]: number;
}
const counts: WordCounts = {};
counts.apple = 0; // Ok
counts.banana = 1; // Ok
counts.cherry = false;
// Error: Type 'boolean' is not assignable to type 'number'.

// Mixing properties and index signatures
// Here, HistoricalNovels declares that all properties are type number, and
// additionally the Oroonoko property must exist to begin with:
interface HistoricalNovels {
    Oroonoko: number;
    [i: string]: number;
}
// Ok
const novels: HistoricalNovels = {
    Outlander: 1991,
    Oroonoko: 1688,
};
const missingOroonoko: HistoricalNovels = {
    Outlander: 1991,
};
// Error: Property 'Oroonoko' is missing in type
// '{ Outlander: number; }' but required in type 'HistoricalNovels'.

// Here, ChapterStarts declares that a property under preface must be 0
// and all other properties have the more general number. That means any
// object adhering to ChapterStarts must have a preface property equal to
// 0:
interface ChapterStarts {
    preface: 0;
    [i: string]: number;
}
const correctPreface: ChapterStarts = {
    preface: 0,
    night: 1,
    shopping: 5
};
const wrongPreface: ChapterStarts = {
    preface: 1,
    // Error: Type '1' is not assignable to type '0'.
};

// Numeric index signatures
// The following MoreNarrowNumbers interface would be allowed because
// string is assignable to string | undefined, but MoreNarrowStrings
// would not because string | undefined is not assignable to string:

// Ok
interface MoreNarrowNumbers {
    [i: number]: string;
    [i: string]: string | undefined;
}
// Ok
const mixesNumbersAndStrings: MoreNarrowNumbers = {
    0: '',
    key1: '',
    key2: undefined,
}
interface MoreNarrowStrings {
    [i: number]: string | undefined;
    // Error: 'number' index type 'string | undefined'
    // is not assignable to 'string' index type 'string'.
    [i: string]: string;
}


// Nested Interfaces

// Just like object types can be nested as properties of other object types,
// interface types can also have properties that are themselves interface types
// (or object types).

interface Novel {
    author: {
        name: string;
    };
    setting: Setting;
}
interface Setting {
    place: string;
    year: number;
}
let myNovel: Novel;
// Ok
myNovel = {
    author: {
        name: 'Jane Austen',
    },
    setting: {
        place: 'England',
        year: 1812,
    }
};
myNovel = {
    author: {
        name: 'Emily Brontë',
    },
    setting: {
        place: 'West Yorkshire',
    },
    // Error: Property 'year' is missing in type
    // '{ place: string; }' but required in type 'Setting'.
};


// Interface Extensions

// TypeScript allows an interface to extend another interface, which declares it
// as copying all the members of another.An interface may be marked as
//     extending another interface by adding the extends keyword after its name
//         (the “derived” interface), followed by the name of the interface to extend
//             (the “base” interface)

interface Writing {
    title: string;
}
interface Novella extends Writing {
    pages: number;
}
// Ok
let myNovella: Novella = {
    pages: 195,
    title: "Ethan Frome",
};
let missingPages: Novella = {
    // ~~~~~~~~~~~~
    // Error: Property 'pages' is missing in type
    // '{ title: string; }' but required in type 'Novella'.
    title: "The Awakening",
}
let extraProperty: Novella = {
    // ~~~~~~~~~~~~~
    // Error: Type '{ genre: string; name: string; strategy: string; }'
    // is not assignable to type 'Novella'.
    // Object literal may only specify known properties,
    // and 'genre' does not exist in type 'Novella'.
    pages: 300,
    strategy: "baseline",
    style: "Naturalism"
};

// Overridden Properties
interface WithNullableName {
    name: string | null;
}
interface WithNonNullableName extends WithNullableName {
    name: string;
}
interface WithNumericName extends WithNullableName {
    name: number | string;
}
// Error: Interface 'WithNumericName' incorrectly
// extends interface 'WithNullableName'.
// Types of property 'name' are incompatible.
// Type 'string | number' is not assignable to type 'string | null'.
// Type 'number' is not assignable to type 'string'.

// Extending Multiple Interfaces

// Interfaces in TypeScript are allowed to be declared as extending multiple
// other interfaces

interface GiveNumber {
    giveNumber(): number;
}
interface GiveString {
    giveString(): string;
}
interface GiveBothAndEither extends GiveNumber , GiveString {
    giveBoth(): string | number;
}

function useGiveBoth(instance: GiveBothAndEither) {
    instance.giveBoth()
    instance.giveNumber()
    instance.giveString()
}

// By marking an interface as extending multiple other interfaces, you can
// both reduce code duplication and make it easier for object shapes to be
// reused across different areas of code.


// Interface Merging
// One of the important features of interfaces is their ability to merge with
// each other

interface Merged {
    fromFirst: string;
}
interface Merged {
    fromSecond: number;
}
// Equivalent to:
// interface Merged {
// fromFirst: string;
// fromSecond: number;
// }

// Interface merging isn’t a feature used very often in day - to - day TypeScript
// development.I would recommend avoiding it when possible, as it can be
// difficult to understand code where an interface is declared in multiple
// places