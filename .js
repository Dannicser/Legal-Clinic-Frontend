// const myFn = () => {
//   console.log("start");

//   const v = new Promise((res) => {
//     console.log("1");
//     setTimeout(() => {
//       console.log("2");
//       res(2);
//     }, 0);
//   });

//   console.log(v + 1);
//   console.log("end");
// };

// myFn();

// Свой forEach
// thisArg - this который будет использоваться при вызове func

// Array.prototype.forEach2 = function (func, thisArg) {
//   for (let i = 0; i < this.length; i++) {
//     func.call(thisArg, this[i]);
//   }
// };

// [1, 2, 3, 4, 5].forEach2((el) => el);

// const myFn = (a) => {
//   return (num) => {
//     return a + num;
//   };
// };

// const calc = myFn(12);

// console.log(calc(11));

// const getGoods = (() => {
//   console.log("start");
// })();

// Возведение числа в степень через рекурсию

// const myFn = (a, b) => {
//   if (b === 0) return 1;
//   return a * myFn(a, b - 1);
// };

// console.log(myFn(5, 3));

//Подсчет length number через рекурсию

// const sumOfDigits = num => num / 10 < 1 ? 1 : 1 + sumOfDigits(num / 10);

const myFn = (number) => {
  return number / 10 < 1 ? 1 : 1 + myFn(number / 10);
};

console.log(myFn(112));
