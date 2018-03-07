function merge(left, right) {
  if (left.type === "text" && right.type === "text") {
    return [{ content: left.content + right.content, type: "text" }]
  } else {
    return [left, right]
  }
}

export function mergeTrees(trees) {
  return trees.reduceRight(
    (merged, subtree) =>
      merged.length == 0 ? [subtree] : [...merge(subtree, merged[0]), ...merged.slice(1)],
    []
  )
}

export function fixTree(tree) {
  if ('content' in tree && tree.type !== 'text') {
    const fixedSubtrees = fixTrees(tree.content)
    return { ...tree, content: fixedSubtrees }
  } else {
    return tree
  }
}

export function fixTrees(listOfTrees) {
  const fixedSubtrees = listOfTrees.map(fixTree)
  const mergedSubtrees = mergeTrees(fixedSubtrees)
  return mergedSubtrees
}
