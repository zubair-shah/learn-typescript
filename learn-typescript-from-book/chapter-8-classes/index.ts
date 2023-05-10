// Class Methods
// TypeScript generally understands methods the same way it understands
// standalone functions.Parameter types default to any unless given a type or
// default value; calling the method requires an acceptable number of
// arguments; return types can generally be inferred if the function is not
// recursive.

class Greeter {
    greet(name: string) {
        console.log('greeting', name);
    }
}

new Greeter().greet("zubair")

class Greeted {
    constructor(name: string) {
        console.log('greeting', name)
    }
}
// new Greeted();     // error Expected 1 argument but got 0
new Greeted("zubair");

// Class Properties

class FieldTrip {
    destination: string;    // --> property of FieldTrip class
    constructor(destination: string) {
        this.destination = destination; // Ok
        console.log(`We're going to ${this.destination}!`);

        // this.nonexistent = destination;
        // ~~~~~~~~~~~
        // Error: Property 'nonexistent' does not exist on type 'FieldTrip'.
    }
}

// Explicitly declaring class properties allows TypeScript to quickly
// understand what is or is not allowed to exist on instances of classes

const trip = new FieldTrip("planetarium");
trip.destination; // Ok
// trip.nonexistent;
// ~~~~~~~~~~~
// Error: Property 'nonexistent' does not exist on type 'FieldTrip'.

// Function Properties
// .JavaScript
// contains two syntaxes for declaring a member on a class to be a callable
// function: method and property.
// This WithMethod class declares a myMethod method that all instances are
// able to refer to:
class WithMethod {
    myMethod() { }
}
new WithMethod().myMethod === new WithMethod().myMethod; // true

// The other syntax is to declare a property whose value happens to be a
// function.
// This creates a new function per instance of the class, which can be
// useful with () => arrow functions whose this scope should always point
// to the class instance (at the time and memory cost of creating a new
//     function per class instance)

class WithProperty {
    myProperty: () => {}
}
// new WithMethod().myProperty === new WithMethod().myProperty; // false


class WithPropertyParameters {
    takesParameters = (input: boolean) => input ? "Yes" : "No";
}
const instance = new WithPropertyParameters();
instance.takesParameters(true); // Ok
// instance.takesParameters(123);
// ~~~
// Error: Argument of type 'number' is not
// assignable to parameter of type 'boolean'


// Initialization Checking
// With strict compiler settings enabled, TypeScript will check that each
// property declared whose type does not include undefined is assigned a
// value in the constructor.This strict initialization checking is useful because
// it prevents code from accidentally forgetting to assign a value to a class
//     property.

class WithValue {
    immediate = 0; // Ok
    later: number; // Ok (set in the constructor)
    mayBeUndefined: number | undefined; // Ok (allowed to be undefined)
    unused: number;
    // Error: Property 'unused' has no initializer
    // and is not definitely assigned in the constructor.
    constructor() {
        this.later = 1;
    }
}

// This example would compile happily if strict initialization checking didn’t
// happen, but the resultant JavaScript would crash at runtime:
class MissingInitializer {
    property: string;
}
new MissingInitializer().property.length;
// TypeError: Cannot read property 'length' of undefined
// The billion - dollar mistake strikes again!
// Configuring strict property initialization checking with TypeScript’s
// strictPropertyInitialization compiler option is covered in

// Definitely assigned properties
// Although strict initialization checking is useful most of the time, you may
// come across some cases where a class property is intentionally able to be
// unassigned after the class constructor
// This ActivitiesQueue class is meant to be re - initialized any number of
// times separately from its constructor, so its pending property must be
// asserted with a!:
class ActivitiesQueue {
    pending!: string[]; // Ok
    initialize(pending: string[]) {
        this.pending = pending;
    }
    next() {
        return this.pending.pop();
    }
}
const activities = new ActivitiesQueue();

//warning dont recommeded this avoid assertion and reducing type safety

// Optional Properties
// Much like interfaces, classes in TypeScript may declare a property as
//     optional by adding a ? after its declaration name.

class MissingInitializer {
    property?: string;
}
new MissingInitializer().property?.length; // Ok
new MissingInitializer().property.length;
// Error: Object is possibly 'undefined'.

// Read - Only Properties
// Properties declared as readonly may only be assigned initial values where
// they are declared or in a constructor.Any other location—including
// methods on the class itself—may only read from the properties, not write to
// them.

class Quote {
    readonly text: string;
    constructor(text: string) {
        this.text = ;
    }
    emphasize() {
        this.text += "!";
        // ~~~~
        // Error: Cannot assign to 'text' because it is a read-only property.
    }
}
const quote = new Quote(
    "There is a brilliant child locked inside every student."
);
Quote.text = "Ha!";
// Error: Cannot assign to 'text' because it is a read-only property.

class RandomQuote {
    readonly explicit: string = "Home is the nicest word there is.";
    readonly implicit = "Home is the nicest word there is.";
    constructor() {
        if (Math.random() > 0.5) {
            this.explicit = "We start learning the minute we're born." // Ok;
            this.implicit = "We start learning the minute we're born.";
            // Error: Type '"We start learning the minute we're born."' is
            // not assignable to type '"Home is the nicest word there is."'.
        }
    }
}
const quote = new RandomQuote();
quote.explicit; // Type: string
quote.implicit; // Type: "Home is the nicest word there is."


// Classes as Types
// Classes are relatively unique in the type system in that a class declaration
// creates both a runtime value—the class itself—as well as a type that can be
// used in type annotations.
class Teacher {
    sayHello() {
        console.log("Take chances, make mistakes, get messy!");
    }
}
let teacher: Teacher;
teacher = new Teacher(); // Ok
teacher = "Wahoo!";
// Error: Type 'string' is not assignable to type 'Teacher'.

class SchoolBus {
    getAbilities() {
        return ["magic", "shapeshifting"];
    }
}
function withSchoolBus(bus: SchoolBus) {
    console.log(bus.getAbilities());
}
withSchoolBus(new SchoolBus()); // Ok
// Ok
withSchoolBus({
    getAbilities: () => ["transmogrification"],
});
withSchoolBus({
    getAbilities: () => 123,
    // ~~~
    // Error: Type 'number' is not assignable to type 'string[]'.
});





// Classes and Interfaces
 TypeScript that instances of the
class should be assignable to each of those interfaces.Any mismatches
would be called out as type errors by the type checker.

interface Learner {
    name: string;
    study(hours: number): void;
}
class Student implements Learner {
    name: string;
    constructor(name: string) {
        this.name = name;
    }
    study(hours: number) {
        for (let i = 0; i < hours; i += 1) {
            console.log("...studying...");
        }
    }
}
class Slacker implements Learner {
    // ~~~~~~~
    // Error: Class 'Slacker' incorrectly implements interface 'Learner'.
    // Property 'study' is missing in type 'Slacker'
    // but required in type 'Learner'.
    name = "Rocky";
}

class Student implements Learner {
    name;
    // Error: Member 'name' implicitly has an 'any' type.
    study(hours) {
        // Error: Parameter 'hours' implicitly has an 'any' type.
    }
}

// Implementing an interface is purely a safety check.It does not copy any
// interface members onto the class definition for you.Rather, implementing
// an interface signals your intention to the type checker and surfaces type
// errors in the class definition, rather than later on where class instances are
// used.It’s similar in purpose to adding a type annotation to a variable even
// though it has an initial value


// Implementing Multiple Interfaces
// Classes in TypeScript are allowed to be declared as implementing multiple
// interfaces.The list of implemented interfaces for a class may be any
// number of interface names with commas in -between

interface Graded {
    grades: number[];
}
interface Reporter {
    report: () => string;
}
class ReportCard implements Graded, Reporter {
    grades: number[];
    constructor(grades: number[]) {
        this.grades = grades;
    }
    report() {
        return this.grades.join(", ");
    }
}

// class Empty implements Graded, Reporter { }
// ~~~~~
// Error: Class 'Empty' incorrectly implements interface 'Graded'.
// Property 'grades' is missing in type 'Empty'
// but required in type 'Graded'.
// ~~~~~
// Error: Class 'Empty' incorrectly implements interface 'Reporter'.
// Property 'report' is missing in type 'Empty'
// but required in type 'Reporter'.

interface AgeIsANumber {
    age: number;
}
interface AgeIsNotANumber {
    age: () => string;
}
class AsNumber implements AgeIsANumber, AgeIsNotANumber {
    age = 0;
    // ~~~
    // Error: Property 'age' in type 'AsNumber' is not assignable
    // to the same property in base type 'AgeIsNotANumber'.
    // Type 'number' is not assignable to type '() => string'.
}
class NotAsNumber implements AgeIsANumber, AgeIsNotANumber {
    age() { return ""; }
    // ~~~
    // Error: Property 'age' in type 'NotAsNumber' is not assignable
    // to the same property in base type 'AgeIsANumber'.
    // Type '() => string' is not assignable to type 'number'.
}

// Cases where two interfaces describe very different object shapes generally
// indicate you shouldn’t try to implement them with the same class.


// Extending a Class

class Teacher {
    teach() {
        console.log("The surest test of discipline is its absence.");
    }
}
class StudentTeacher extends Teacher {
    learn() {
        console.log("I cannot afford the luxury of a closed mind.");
    }
}
const teacher = new StudentTeacher();
teacher.teach(); // Ok (defined on base)
teacher.learn(); // Ok (defined on subclass)
teacher.other();
// ~~~~~
// Error: Property 'other' does not exist on type 'StudentTeacher'.

// Extension Assignability

class Lesson {
    subject: string;
    constructor(subject: string) {
        this.subject = subject;
    }
}
class OnlineLesson extends Lesson {
    url: string;
    constructor(subject: string, url: string) {
        super(subject);
        this.url = url;
    }
}
let lesson: Lesson;
lesson = new Lesson("coding"); // Ok
lesson = new OnlineLesson("coding", "oreilly.com"); // Ok
let online: OnlineLesson;
online = new OnlineLesson("coding", "oreilly.com"); // Ok
online = new Lesson("coding");
// Error: Property 'url' is missing in type
// 'Lesson' but required in type 'OnlineLesson'.


// Overridden Constructors
class GradeAnnouncer {
    message: string;
    constructor(grade: number) {
        this.message = grade >= 65 ? "Maybe next time..." : "You pass!";
    }
}
class PassingAnnouncer extends GradeAnnouncer {
    constructor() {
        super(100);
    }
}
class FailingAnnouncer extends GradeAnnouncer {
    constructor() { }
// ~~~~~~~~~~~~~~~~~

// As per JavaScript rules, the constructor of a subclass must call the base
// constructor before accessing this or super.TypeScript will report a type
// error if it sees a this or super being accessed before super().

class GradesTally {
    grades: number[] = [];
    addGrades(...grades: number[]) {
        this.grades.push(...grades);
        return this.grades.length;
    }
}
class ContinuedGradesTally extends GradesTally {
    constructor(previousGrades: number[]) {
        this.grades = [...previousGrades];
        // Error: 'super' must be called before accessing
        // 'this' in the constructor of a subclass.
        super();
        console.log("Starting with length", this.grades.length); // Ok
    }
}


// Overridden Methods
class GradeCounter {
    countGrades(grades: string[], letter: string) {
        return grades.filter(grade => grade === letter).length;
    }
}
class FailureCounter extends GradeCounter {
    countGrades(grades: string[]) {
        return super.countGrades(grades, "F");
    }
}
class AnyFailureChecker extends GradeCounter {
    countGrades(grades: string[]) {
        // Property 'countGrades' in type 'AnyFailureChecker' is not
        // assignable to the same property in base type 'GradeCounter'.
        // Type '(grades: string[]) => boolean' is not assignable
        // to type '(grades: string[], letter: string) => number'.
        // Type 'boolean' is not assignable to type 'number'.
        return super.countGrades(grades, "F") !== 0;
    }
}
const counter: GradeCounter = new AnyFailureChecker();
// Expected type: number
// Actual type: boolean
const count = counter.countGrades(["A", "C", "F"]);

// Overridden Properties
class Assignment {
    grade?: number;
}
class GradedAssignment extends Assignment {
    grade: number;
    constructor(grade: number) {
        super();
        this.grade = grade;
    }
}
// Expanding the allowed set of values of a property’s union type is not
// allowed, as doing so would make the subclass property no longer assignable
// to the base class property’s type.

class NumericGrade {
    value = 0;
}
class VagueGrade extends NumericGrade {
    value = Math.random() > 0.5 ? 1 : "...";
    // Error: Property 'value' in type 'NumberOrString' is not
    // assignable to the same property in base type 'JustNumber'.
    // Type 'string | number' is not assignable to type 'number'.
    // Type 'string' is not assignable to type 'number'.
}
const instance: NumericGrade = new VagueGrade();
// Expected type: number
// Actual type: number | string
instance.value;

// Abstract Classes

// It can sometimes be useful to create a base class that doesn’t itself declare
// the implementation of some methods, but instead expects a subclass to
// provide them.Marking a class as abstract is done by adding TypeScript’s
// abstract keyword in front of the class name and in front of any method
// intended to be abstract.Those abstract method declarations skip providing a
// body in the abstract base class; instead, they are declared the same way an
// interface would be.


// abstract class School {
//     readonly name: string;
//     constructor(name: string) {
//         this.name = name;
//     }
//     abstract getStudentTypes(): string[];
// }
// class Preschool extends School {
//     getStudentTypes() {
//         return ["preschooler"];
//     }
// }
// class Absence extends School { }

// An abstract class cannot be instantiated directly, as it doesn’t have
// definitions for some methods that its implementation may assume do exist.
// Only nonabstract(“concrete”) classes can be instantiated.

// let school: School;
// school = new Preschool("Sunnyside Daycare"); // Ok
// school = new School("somewhere else");
// // Error: Cannot create an instance of an abstract class.
// Abstract classes are often used in frameworks where consumers are
// expected to fill out details of a class. The class may be used as a type
// annotation to indicate values must adhere to the class—as with the earlier
// example of school: School—but creating new instances must be done
// with subclasses.


// Member Visibility
// JavaScript includes the ability to start the name of a class member with # to
// mark it as a “private” class member. Private class members may only be
// accessed by instances of that class. JavaScript runtimes enforce that privacy
// by throwing an error if an area of code outside the class tries to access the
// private method or property.

// TypeScript’s member visibilities are achieved by
// adding one of the following keywords before the declaration name of a
// class member:
// public(default )
// Allowed to be accessed by anybody, anywhere
// protected
// Allowed to be accessed only by the class itself and its subclasses
// private
// Allowed to be accessed only by the class itself

class Base {
    isPublicImplicit = 0;
    public isPublicExplicit = 1;
    protected isProtected = 2;
    private isPrivate = 3;
    #truePrivate = 4;
}
class Subclass extends Base {
    examples() {
        this.isPublicImplicit; // Ok
        this.isPublicExplicit; // Ok
        this.isProtected; // Ok
        this.isPrivate;
        // Error: Property 'isPrivate' is private
        // and only accessible within class 'Base'.
        this.#truePrivate;
        // Property '#truePrivate' is not accessible outside
        // class 'Base' because it has a private identifier.
    }
}
new Subclass().isPublicImplicit; // Ok
new Subclass().isPublicExplicit; // Ok
new Subclass().isProtected;
// ~~~~~~~~~~~
// Error: Property 'isProtected' is protected
// and only accessible within class 'Base' and its subclasses.
new Subclass().isPrivate;
// ~~~~~~~~~~~
// Error: Property 'isPrivate' is private
// and only accessible within class 'Base'.


class TwoKeywords {
    private readonly name: string;
    constructor() {
        this.name = "Anne Sullivan"; // Ok
    }
    log() {
        console.log(this.name); // Ok
    }
}
const two = new TwoKeywords();
two.name = "Savitribai Phule";
// ~~~~
// Error: Property 'name' is private and
// only accessible within class 'TwoKeywords'.
// ~~~~
// Error: Cannot assign to 'name'
// because it is a read-only property.
// Note that it is not permitted to mix TypeScript’s old member visibility
// keyword with JavaScript’s new # private fields.Private fields are always
// private by default, so there’s no need to additionally mark them with the
// private keyword.

// Static Field Modifiers
// JavaScript allows declaring members on a class itself—rather than its
// instances—using the static keyword.TypeScript supports using the
// static keyword on its own and / or with readonly and / or with one of the
// visibility keywords.When combined, the visibility keyword comes first,
//     then static, then readonly.

class Question {
    protected static readonly answer: "bash";
    protected static readonly prompt =
        "What's an ogre's favorite programming language?";
    guess(getAnswer: (prompt: string) => string) {
        const answer = getAnswer(Question.prompt);
        // Ok
        if (answer === Question.answer) {
            console.log("You got it!");
        } else {
            console.log("Try again...")
        }
    }
}
Question.answer;
