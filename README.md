# README

Remark plugin that removes empty inline nodes



## Features

- removes empty inline nodes
- inline nodes currently used: `emphasis`, `strong`, `link`



## Example

```js
import { unified, rehypeParse, rehypeRemark, remarkStringify } from "./deps.ts";
import remarkRemoveEmptyInline from "./src/main.ts";

const result = (await unified()
  .use(rehypeParse, { fragment: true })
  .use(rehypeRemark)
  .use(remarkRemoveEmptyInline)
  .use(remarkStringify)
  .process(`foo<em><a href="https://example.com"></a></em>bar`))
  .toString();
console.log(result);
```

Before

```html
foo<em><a href="https://example.com"></a></em>bar
```

After

```md
foobar
```
