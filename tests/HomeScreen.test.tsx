import assert from 'node:assert/strict';
import test from 'node:test';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

import { HomeScreen } from '@/features/kendo/screens/HomeScreen';
import { currentUser } from '@/data/kendo/users';
import { mockNotifications } from '@/data/kendo/notifications';
import { mockMatchHistory } from '@/data/kendo/matches';
import { initialQuestList, QUEST_COMPLETION_BONUS } from '@/data/kendo/quests';
import { mockGoals } from '@/data/kendo/goals';
import { mockPointHistory } from '@/data/kendo/points';

test('HomeScreen renders welcome message', () => {
  const html = renderToStaticMarkup(
    <HomeScreen
      user={currentUser}
      onNavigate={() => {}}
      notifications={mockNotifications}
      onSelectNotification={() => {}}
      matchHistory={mockMatchHistory}
      initialQuests={initialQuestList}
      questCompletionBonus={QUEST_COMPLETION_BONUS}
      goals={mockGoals}
      pointHistory={mockPointHistory}
    />,
  );

  assert.ok(html.includes(currentUser.name));
  assert.ok(html.includes('포인트 내역 보기'));
});
