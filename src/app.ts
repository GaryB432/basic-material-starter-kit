import './app.scss';
import { MDCRipple } from '@material/ripple';
import { MDCTabBar } from '@material/tab-bar';
import { MDCTopAppBar } from '@material/top-app-bar';
import { addClasses, dcreateElement } from './dom';
import { makeButton, makeCard } from './mdc';
import { pups } from './pup';

const topAppBarElement = document.querySelector('.mdc-top-app-bar')!;
void new MDCTopAppBar(topAppBarElement);

const tabBarElement = document.querySelector('.mdc-tab-bar')!;

const scrollContentElement = tabBarElement.querySelector(
  '.mdc-tab-scroller__scroll-content'
)!;

const tabs = ['Puppers', 'Doggos', 'Woofers'];

tabs.forEach((tab, i) => {
  scrollContentElement.appendChild(makeButton(tab, i, 'adopt-a-pup'));
});

const tabBar = new MDCTabBar(tabBarElement);

const appClassFragment = 'adopt-a-pup';

tabBar.listen('MDCTabBar:activated', (activatedEvent: CustomEvent) => {
  const cards = document.querySelector('.cards')!;
  cards.innerHTML = '';

  pups
    .filter((_pup, i) => i > activatedEvent.detail.index)
    .forEach((pup) => {
      const card = makeCard(pup.name, 0, appClassFragment);

      addClasses(dcreateElement('div', card), [
        `${appClassFragment}-image`,
        'mdc-card__media',
        'mdc-card__media--square',
      ]).setAttribute('style', `background-image: url('${pup.img}')`);

      addClasses(dcreateElement('div', card), [
        `${appClassFragment}-card__text-label`,
      ]).textContent = pup.name;

      addClasses(dcreateElement('div', card), [
        'adopt-a-pup-card__secondary',
        'mdc-typography--body2',
      ]).textContent = pup.notes;

      const button = addClasses(dcreateElement('button', null), [
        'mdc-button',
        'mdc-card__action',
        'mdc-card__action--button',
        'adopt-form__button',
      ]);

      void new MDCRipple(
        addClasses(dcreateElement('span', button), ['mdc-button__ripple'])
      );

      const i = addClasses(dcreateElement('i', button), [
        'material-icons',
        'mdc-button__icon',
        'adopt-form__button-icon',
      ]);
      i.textContent = 'pets';

      const s = addClasses(dcreateElement('span', button), [
        'mcd-button__label',
        'adopt-form__button-text',
      ]);
      s.textContent = 'Adopt';

      const buttons = addClasses(
        dcreateElement(
          'div',
          addClasses(dcreateElement('div', card), ['mdc-card__actions'])
        ),
        ['mdc-card__action-buttons']
      );

      button.addEventListener('click', (e) => {
        console.log(e);
      });
      buttons.appendChild(button);

      addClasses(dcreateElement('div', cards), [
        'mdc-layout-grid__cell',
      ]).appendChild(card);
    });
});
tabBar.activateTab(0);
