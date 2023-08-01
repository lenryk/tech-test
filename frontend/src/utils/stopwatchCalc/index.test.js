import stopwatchCalc from "./stopwatchCalc";

test("it returns the correct values for 0", () => {
  expect(stopwatchCalc(0)).toStrictEqual(["00", "00", "00"]);
});

test("it returns the correct values when no argument passed", () => {
  expect(stopwatchCalc()).toStrictEqual(["00", "00", "00"]);
});

test("it returns the correct values when passed 5 seconds diff", () => {
  expect(stopwatchCalc(5)).toStrictEqual(["00", "00", "05"]);
});

test("it returns the correct values when passed 59 seconds diff", () => {
  expect(stopwatchCalc(59)).toStrictEqual(["00", "00", "59"]);
});

test("it returns the correct values when passed 61 seconds diff", () => {
  expect(stopwatchCalc(61)).toStrictEqual(["00", "01", "01"]);
});

test("it returns the correct values when passed 1000 seconds diff", () => {
  expect(stopwatchCalc(1000)).toStrictEqual(["00", "16", "40"]);
});
