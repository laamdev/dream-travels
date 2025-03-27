import { expect, test } from "vitest";
import { render, screen } from "@testing-library/react";

import { Header } from "@/components/home/header";

beforeAll(() => {
  if (typeof window === "undefined") {
    global.window = {} as Window & typeof globalThis;
  }
});

test("Home page heading", () => {
  render(<Header />);
  expect(
    screen.getByRole("heading", { level: 1, name: /the places you dream of/i })
  ).toBeDefined();
});
