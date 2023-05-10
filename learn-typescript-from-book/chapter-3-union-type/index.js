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
// let geneticist = Math.random() > 0.5 ? "zubair" : undefined;
// if (geneticist === "zubair") {
// let uppercase = geneticist.toUpperCase(); // Ok: string
// console.log(uppercase
// )
// }
// geneticist && geneticist.toUpperCase();
// geneticist?.toUpperCase();
// console.log(geneticist)
// var math;
// math === null || math === void 0 ? void 0 : math.length;
// // console.log(math);
// var rawDataFirst;
// var rawDataSecond;
// var rawDataThird;
