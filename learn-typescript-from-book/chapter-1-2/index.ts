console.log("Hello")

let bestSong = Math.random() > 0.5 ? "chain of fools" : "respect"
let firstName = "Whitney";
console.log(firstName.length);

// let rocker; // Type: any
// rocker = "Joan Jett"; // Type: string
// rocker.toUpperCase(); // Ok
// rocker = 19.58; // Type: number
// rocker.toPrecision(1); // Ok
// rocker.toUpperCase();  // ok but not ok
// console.log(rocker)

// This snippet assigns a number to a rocker variable previously declared as
// type string, causing a type error:
// let rockerNew: string;
// rockerNew = 19.58;
// console.log(rockerNew)
// Error: Type 'number' is not assignable to type 'string'.

// let cher = {
// firstName: "Cherilyn",
// lastName: "Sarkisian",
// };
// function oddNumbers(l, r) {
//     // Write your code here
//     for(let i=l; i <=r;i++){
//         if(i%2 == 1){
//             console.log(i)
//         }
//     }

// }
// oddNumbers(2,9)
// cher.middleName;   Error