const documentContainer = document.createElement('div');
documentContainer.setAttribute('style', 'display: none;');

documentContainer.innerHTML = `
  <dom-module id="shared-styles">
    <template>
      <style>
      :host {
      --app-primary-color: var(--paper-light-blue-400);
      --primary-color: var(--app-primary-color);
      --app-dark: var(--paper-grey-100);
      --app-grey-1: var(--paper-grey-100);
      --app-grey-2: var(--paper-grey-300);
      --app-grey-3: var(--paper-grey-500);
      --app-grey-4: var(--paper-grey-800);
      --app-text-color: var(--paper-grey-700);
      color: var(--app-text-color);
      }
      </style>
    </template>
  </dom-module>`;

document.head.appendChild(documentContainer);