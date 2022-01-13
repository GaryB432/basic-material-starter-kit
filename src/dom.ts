export function addClasses(element: Element, tokens: string[]): Element {
  element.classList.add(...tokens);
  return element;
}

export function dcreateElement(
  tagName: string,
  parent: Element | null
): Element {
  const ele = document.createElement(tagName);
  if (parent) {
    parent.appendChild(ele);
  }
  return ele;
}
