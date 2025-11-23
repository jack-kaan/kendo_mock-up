import assert from 'node:assert/strict';
import test from 'node:test';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

import { useKendoModals } from '@/hooks/useKendoModals';
import { useGeminiPrompt } from '@/hooks/useGeminiPrompt';

test('useKendoModals exposes initial modal state', () => {
  let modalState: ReturnType<typeof useKendoModals<'sample', number>> | undefined;

  function TestComponent() {
    modalState = useKendoModals<'sample', number>();
    return null;
  }

  renderToStaticMarkup(<TestComponent />);

  assert.ok(modalState, 'hook should initialize state');
  assert.strictEqual(modalState?.modal, null);
  assert.strictEqual(modalState?.modalPayload, null);
  assert.equal(typeof modalState?.openModal, 'function');
  assert.equal(typeof modalState?.closeModal, 'function');
});

test('useGeminiPrompt handles missing API key gracefully', async () => {
  let promptHook: ReturnType<typeof useGeminiPrompt> | undefined;

  function TestComponent() {
    promptHook = useGeminiPrompt();
    return null;
  }

  renderToStaticMarkup(<TestComponent />);

  assert.ok(promptHook, 'hook should initialize');
  assert.equal(promptHook?.isLoading, false);

  const result = await promptHook!.generatePrompt('hello', {
    missingKeyMessage: 'fallback message',
  });

  assert.deepEqual(result, {
    status: 'missing_api_key',
    message: 'fallback message',
  });
});
