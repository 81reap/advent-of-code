import { describe, expect, test } from "bun:test";
import { DialCounter } from "@/dialCounter";

test("DailCounter should initalize with the given count", () => {
  const dail = new DialCounter(10, 20);
  expect(dail.getCount()).toBe(10);
})

test("DialCounter should pass 0 twice and land on 0", () => {
  const dial = new DialCounter(1, 2);
  expect(dial.increment(5)).toBe(3);
  expect(dial.decrement(5)).toBe(2);
})

describe("DailCounter should pass README example", () => {
  test("L68", () => {
    const dail = new DialCounter(50, 100);
    expect(dail.decrement(68)).toBe(1);
    expect(dail.getCount()).toBe(82);
  })

  test("L30", () => {
    const dail = new DialCounter(82, 100);
    expect(dail.decrement(30)).toBe(0);
    expect(dail.getCount()).toBe(52);
  })

  test("R48", () => {
    const dail = new DialCounter(52, 100);
    expect(dail.increment(48)).toBe(1);
    expect(dail.getCount()).toBe(0);
  })

  test("L5", () => {
    const dail = new DialCounter(0, 100);
    expect(dail.decrement(5)).toBe(0);
    expect(dail.getCount()).toBe(95);
  })

  test("R60", () => {
    const dail = new DialCounter(95, 100);
    expect(dail.increment(60)).toBe(1);
    expect(dail.getCount()).toBe(55);
  })

  test("L55", () => {
    const dail = new DialCounter(55, 100);
    expect(dail.decrement(55)).toBe(1);
    expect(dail.getCount()).toBe(0);
  })

  test("L1", () => {
    const dail = new DialCounter(0, 100);
    expect(dail.decrement(1)).toBe(0);
    expect(dail.getCount()).toBe(99);
  })

  test("L99", () => {
    const dail = new DialCounter(99, 100);
    expect(dail.decrement(99)).toBe(1);
    expect(dail.getCount()).toBe(0);
  })

  test("R14", () => {
    const dail = new DialCounter(0, 100);
    expect(dail.increment(14)).toBe(0);
    expect(dail.getCount()).toBe(14);
  })

  test("L82", () => {
    const dail = new DialCounter(14, 100);
    expect(dail.decrement(82)).toBe(1);
    expect(dail.getCount()).toBe(32);
  })
})
