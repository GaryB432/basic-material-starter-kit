import { MDCTabIndicator } from '@material/tab-indicator';
import { addClasses, dcreateElement } from './dom';

export function makeButton(
  textContent: string,
  tabIndex: number,
  className: string
): HTMLButtonElement {
  const button = addClasses(
    document.createElement('button'),
    ['mdc', className].map((c) => `${c}-tab`)
  ) as HTMLButtonElement;
  button.tabIndex = tabIndex;
  button.setAttribute('role', 'tab');
  const labelSpan = addClasses(
    dcreateElement(
      'span',
      addClasses(dcreateElement('span', button), ['mdc-tab__content'])
    ),
    ['mdc-tab__text-label']
  );
  labelSpan.textContent = textContent;
  const tabIndicatorSpan = addClasses(
    dcreateElement('span', button),
    ['mdc', className].map((c) => `${c}-tab-indicator`)
  );
  addClasses(dcreateElement('span', tabIndicatorSpan), [
    'mdc-tab-indicator__content',
    'mdc-tab-indicator__content--underline',
  ]);
  addClasses(dcreateElement('span', button), ['mdc-tab__ripple']);
  void new MDCTabIndicator(tabIndicatorSpan);
  return button;
}

export function makeCard(
  textContent: string,
  tabIndex: number,
  className: string
): HTMLDivElement {
  return addClasses(document.createElement('div'), [
    'mdc-card--outlined',
    ...['mdc', className].map((c) => `${c}-card`),
  ]) as HTMLDivElement;
}
