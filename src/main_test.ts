import {
  assertEquals,
  rehypeParse,
  rehypeRemark,
  remarkStringify,
  unified,
} from "../deps.ts";
import remarkRemoveEmptyInline from "./main.ts";

const pipeline = unified()
  .use(rehypeParse, { fragment: true })
  .use(rehypeRemark)
  .use(remarkRemoveEmptyInline)
  .use(remarkStringify, {
    bullet: "-",
    emphasis: "_",
    fences: true,
    listItemIndent: "one",
    resourceLink: true,
    rule: "-",
  });

Deno.test("one strong", async () => {
  const input = "foo<strong></strong>bar";
  const expected = "foobar\n";

  const actual = (await pipeline
    .process(input)).toString();

  assertEquals(actual, expected);
});

Deno.test("two strong", async () => {
  const input = "foo<strong></strong><strong></strong>bar";
  const expected = "foobar\n";

  const actual = (await pipeline
    .process(input)).toString();

  assertEquals(actual, expected);
});

Deno.test("two nested strong", async () => {
  const input = "foo<strong><strong></strong></strong>bar";
  const expected = "foobar\n";

  const actual = (await pipeline
    .process(input)).toString();

  assertEquals(actual, expected);
});

Deno.test("one link", async () => {
  const input = 'foo<a href="https://example.com/foo"></a>bar';
  const expected = "foobar\n";

  const actual = (await pipeline
    .process(input)).toString();

  assertEquals(actual, expected);
});

Deno.test("one link nested in strong", async () => {
  const input = 'foo<strong><a href="https://example.com/foo"></a></strong>bar';
  const expected = "foobar\n";

  const actual = (await pipeline
    .process(input)).toString();

  assertEquals(actual, expected);
});
