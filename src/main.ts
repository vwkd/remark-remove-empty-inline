import { remarkRemoveEmpty } from "../deps.ts";

/**
 * Removes empty inline nodes
 */
const remarkRemoveEmptyInline = [[remarkRemoveEmpty, {
  nodeTest: (node) =>
    ["emphasis", "link", "strong"].includes(node.type) &&
    node.children.length == 0,
}]];

export default remarkRemoveEmptyInline;
