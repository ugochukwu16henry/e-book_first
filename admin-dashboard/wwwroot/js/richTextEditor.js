const editors = new Map();

function notify(entry) {
  if (!entry?.dotNetRef || !entry?.element) {
    return;
  }

  entry.dotNetRef.invokeMethodAsync('HandleContentChanged', entry.element.innerHTML || '');
}

export function initializeRichTextEditor(id, dotNetRef, initialValue, placeholder) {
  const element = document.getElementById(id);
  if (!element) {
    return;
  }

  element.contentEditable = 'true';
  element.dataset.placeholder = placeholder || 'Write here...';
  element.innerHTML = initialValue || '';

  const onInput = () => notify({ element, dotNetRef });
  element.addEventListener('input', onInput);

  editors.set(id, { element, dotNetRef, onInput });
}

export function runCommand(id, command, value) {
  const entry = editors.get(id);
  if (!entry?.element) {
    return;
  }

  entry.element.focus();

  if (command === 'createLink') {
    const url = window.prompt('Enter link URL', value || 'https://');
    if (!url) {
      return;
    }

    document.execCommand('createLink', false, url);
  } else {
    document.execCommand(command, false, value || null);
  }

  notify(entry);
}

export function setContent(id, html) {
  const entry = editors.get(id);
  if (!entry?.element) {
    return;
  }

  entry.element.innerHTML = html || '';
}
