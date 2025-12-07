import { describe, expect, test } from "bun:test";
import { DialCounter } from "@/dailCounter";

test("DailCounter should initalize with the given count", () => {
  const dail = new DialCounter(10, 20);
  expect(dail.getCount()).toBe(10);
})

describe("DailCounter should pass README example", () => {
  test("L68", () => {
    const dail = new DialCounter(50, 100);
    dail.decrement(68);
    expect(dail.getCount()).toBe(82);
  })

  test("L30", () => {
    const dail = new DialCounter(82, 100);
    dail.decrement(30);
    expect(dail.getCount()).toBe(52);
  })

  test("R48", () => {
    const dail = new DialCounter(52, 100);
    dail.increment(48);
    expect(dail.getCount()).toBe(0);
  })

  test("L5", () => {
    const dail = new DialCounter(0, 100);
    dail.decrement(5);
    expect(dail.getCount()).toBe(95);
  })

  test("R60", () => {
    const dail = new DialCounter(95, 100);
    dail.increment(60);
    expect(dail.getCount()).toBe(55);
  })

  test("L55", () => {
    const dail = new DialCounter(55, 100);
    dail.decrement(55);
    expect(dail.getCount()).toBe(0);
  })

  test("L1", () => {
    const dail = new DialCounter(0, 100);
    dail.decrement(1);
    expect(dail.getCount()).toBe(99);
  })

  test("L99", () => {
    const dail = new DialCounter(99, 100);
    dail.decrement(99);
    expect(dail.getCount()).toBe(0);
  })

  test("R14", () => {
    const dail = new DialCounter(0, 100);
    dail.increment(14);
    expect(dail.getCount()).toBe(14);
  })

  test("L82", () => {
    const dail = new DialCounter(14, 100);
    dail.decrement(82);
    expect(dail.getCount()).toBe(32);
  })
})
