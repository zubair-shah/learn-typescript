// Class Methods
// TypeScript generally understands methods the same way it understands
// standalone functions.Parameter types default to any unless given a type or
// default value; calling the method requires an acceptable number of
// arguments; return types can generally be inferred if the function is not
// recursive.
var Greeter = /** @class */ (function () {
    function Greeter() {
    }
    Greeter.prototype.greet = function (name) {
        console.log('greeting', name);
    };
    return Greeter;
}());
new Greeter().greet("zubair");
var Greeted = /** @class */ (function () {
    function Greeted(name) {
        console.log('greeting', name);
    }
    return Greeted;
}());
// new Greeted();     // error Expected 1 argument but got 0
new Greeted("zubair");
// Class Properties
var FieldTrip = /** @class */ (function () {
    function FieldTrip(destination) {
        this.destination = destination; // Ok
        console.log("We're going to ".concat(this.destination, "!"));
        // this.nonexistent = destination;
        // ~~~~~~~~~~~
        // Error: Property 'nonexistent' does not exist on type 'FieldTrip'.
    }
    return FieldTrip;
}());
// Explicitly declaring class properties allows TypeScript to quickly
// understand what is or is not allowed to exist on instances of classes
var trip = new FieldTrip("planetarium");
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
var WithMethod = /** @class */ (function () {
    function WithMethod() {
    }
    WithMethod.prototype.myMethod = function () { };
    return WithMethod;
}());
new WithMethod().myMethod === new WithMethod().myMethod; // true
// The other syntax is to declare a property whose value happens to be a
// function.
// This creates a new function per instance of the class, which can be
// useful with () => arrow functions whose this scope should always point
// to the class instance (at the time and memory cost of creating a new
//     function per class instance)
var WithProperty = /** @class */ (function () {
    function WithProperty() {
    }
    return WithProperty;
}());
// new WithMethod().myProperty === new WithMethod().myProperty; // false
var WithPropertyParameters = /** @class */ (function () {
    function WithPropertyParameters() {
        this.takesParameters = function (input) { return input ? "Yes" : "No"; };
    }
    return WithPropertyParameters;
}());
var instance = new WithPropertyParameters();
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
var WithValue = /** @class */ (function () {
    // Error: Property 'unused' has no initializer
    // and is not definitely assigned in the constructor.
    function WithValue() {
        this.immediate = 0; // Ok
        this.later = 1;
    }
    return WithValue;
}());
// This example would compile happily if strict initialization checking didn’t
// happen, but the resultant JavaScript would crash at runtime:
var MissingInitializer = /** @class */ (function () {
    function MissingInitializer() {
    }
    return MissingInitializer;
}());
new MissingInitializer().property.length;
// TypeError: Cannot read property 'length' of undefined
