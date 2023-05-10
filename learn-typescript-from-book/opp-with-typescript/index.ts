// Object - oriented programming is a programming paradigm based on classes and objects
// rather than functions and logic.The software programs in object - oriented programming
// are structured into reusable pieces of code known as classes

// Classes
// A class is a blueprint used to create an instance of an object.It is made up of
// variables(called instance variables) and methods.

class Car {
    model: string;
    year: number;
    price: string;

    drive() {
        console.log('The Car has Started driving');
    }

    stop() {
        console.log('The car has stopped');
    }
}
// Objects are instantiated from a class using the new keyword, and any object instantiated from a class will contain all the class
//     properties.

const tesla = new Car();
// The object tesla is an instance of the Car class.Thus, it contains all the properties present in the Car class. The properties can be accessed and set using the
// dot(.) Operator.
tesla.model = "Model X"
tesla.year = 2022
tesla.price = "$114,990"
tesla.drive()
tesla.stop()

// Classes are used in object - oriented programming to avoid code duplication, create and manage new objects, and support inheritance.

// Constructor Functions
// A constructor function is a class function responsible for initializing a class’s instance variables.
// Constructors in TypeScript are defined using the constructor keyword.The constructor function takes all class’s instance variables as parameters, initializes them, and assigns their values in its body.

// Inheritance
// Inheritance in object - oriented programming refers to a mechanism where a class (subclass) inherits properties from an existing class (superclass).

// class Person {
//     name: string;
//     age: number;

//     constructor(name: string, age: number) {
//         this.name = name;
//         this.age = age;
//     }

//     eat() {
//         console.log(`What's for dinner?`);
//     }

//     speak() {
//         console.log(`My name is ${this.name}, I am ${this.age} years old`);
//     }
// }

// To inherit from a class (superclass), the extends keyword is used by affixing it after the subclass's name followed by the superclass's name.

// Note that if the superclass has properties defined in its constructor, the subclass has to initialize these properties in its constructor using the super keyword.The super keyword is used to reference a superclass’ properties in a subclass.


// class Chef extends Person {
//     occupation: string;

//     constructor(name: string, age: number, occupation: string) {
//         super(name, age)
//         this.occupation = occupation;
//     }

//     speak(): void {
//         console.log(`I am a ${this.occupation}`);
//     }

//     cook() {
//         console.log(`I am cooking`);
//     }
// }

// Sometimes, a subclass needs to follow a superclass’s implementation but not inherit its properties.These cases require the implements keyword instead of the extends keyword.

// Extends vs Implements
// The extends keyword enables the subclass to benefit from inheritance, giving it access to the properties and methods of its superclass.
// The implements keyword, however, treats the superclass as an interface, ensuring that the subclass conforms to the shape of its superclass.

// An interface is a TypeScript structure that acts as a contract by enforcing a particular shape on a class or a specific type on a function or variable.
// Classes that “implement” another class must declare all the properties present in the class they implement.


class Human {
    name: string;
    gender: string;

    constructor(name: string, gender: string) {
        this.name = name;
        this.gender = gender;
    }

    speak() {
        return `I am speaking`;
    }
}
class Doctor implements Human {

    name: string;
    gender: string;

    constructor(name: string, gender: string) {
        this.name = name;
        this.gender = gender;
    }

    speak() {
        return 'I am a doctor';
    }
}
// If the subclass that implements a superclass doesn’t completely mirror its superclass, TypeScript will throw an error.

// Overriding and Extending Inherited Properties
// When subclasses inherit properties and methods from their superclass, the inherited properties can be modified or extended.This process of modifying an inherited property is known as overriding.

// Overriding is implemented if a subclass has to execute logic that differs from that of its superclass when the same method is invoked.

// A superclass’s property can be overridden by re - declaring the same property in a subclass.

class A {
    print() {
        console.log('I am class A');
    }
}

class B extends A {
    print() {
        console.log('I am class B');
    }
}

// Other scenarios might exist where the functionality needs to be “extended,” not completely overridden.In these scenarios, you must call the method with the super keyword first, then implement its new functionality

// class B extends A {
//     print() {
//         super.print(); //I am class A
//         console.log('I am class B');
//     }
// }

const object = new B();
object.print();// I am class A, I am class B
// The super.<method>() method first executes the command from the superclass and then executes the command on the subclass.\

// Deadly Diamond of Death
// The deadly diamond of death is a problem that arises when two classes inherit from one superclass, and another class inherits from the child classes that are under the previously created superclass
// class A { };
// class B extends A { };
// class C extends A { };
// class D extends B, C { };// This will throw an error

// For context, assume that B and C override a method inherited from A, and then the method is called on an object of D.Which method will be executed ? A's method, B's method, or C’s method ?

//     The workaround for multiple inheritance is using interfaces instead of classes, so the subclass doesn't “extend” the superclasses; rather, it “implements” them.

// class A { };
// interface B extends A { };
// interface C extends A { };
// class D implements B, C { };


// Encapsulation
// Encapsulation in object - oriented programming refers to restricting unauthorized access and mutation of specific properties of an object.

// In TypeScript, access modifiers are used to achieve encapsulation.

// By default, all class properties in a class are public.This default behavior can be overridden by prefixing the properties with access modifiers.


// Access Modifiers
// An access modifier is a keyword that changes the accessibility of a property or method in a class.

//     In addition to the main three, TypeScript has two more access modifiers:

// static: Properties or methods prefixed with static can only be accessed directly on the class and not on an object instantiated from the class. They also can’t be inherited.
// class A {
//     static index: number = 1;
// };

// A.index;

// readonly:
//  Properties prefixed with readonly can’t be modified; their values can only be read.Since read - only properties cannot be modified, they must be set at the class declaration or inside a constructor function.


// Setters and Getters
// A setter is a method inside a class that sets the value of an instance variable.

// A getter is a method inside a class that returns the value of an instance variable.

// class A {
//     private _variable: string;

//     constructor(variable: string) {
//         this._variable = variable;
//     }

//     get variable(): string {
//         return this._variable;
//     }

//     set variable(value: string) {
//         if (value === '') throw new Error("Variable cannot be an empty string");
//         this._variable = value;
//     }
// }

// const object = new A('string')

// //setting the variable
// object.variable = 'different string'

// //getting the variable
// console.log(object.variable)

// Encapsulation plays a considerable role in object - oriented programming.It prevents unauthorized access to an object's properties, giving you better control over properties and methods, thereby increasing code quality and making code easier to maintain.


//     Polymorphism
// Polymorphism in object - oriented programming refers to a situation where multiple classes inherit from a parent and override a particular functionality, i.e.the ability of a method or property to exist in different forms.

// When you override inherited methods or properties, that's polymorphism.