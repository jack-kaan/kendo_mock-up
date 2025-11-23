import { KendoTheoryQuestion, ScoreHistoryEntry } from '../../types/kendo';

export const kendoTheoryData: KendoTheoryQuestion[] = [
  {
    id: 1,
    title: '검도의 四戒에 대하여 설명하라.',
    questionText:
      '검도의 [BLANK](四病)이라고도 하며, 검도를 수행함에 있어서 4가지 경계하여야 할 것을 말한다. [BLANK], [BLANK], [BLANK], [BLANK] (驚,懼,疑,惑) 즉, 놀라거나, 두려워하거나, 의심하거나, 미혹되지 말아야 함을 말한다.',
    answers: ['4병', '경', '구', '의', '혹'],
  },
  {
    id: 4,
    title: '유효격자에 대하여 기술하라.',
    questionText:
      '유효격자란 한판을 인정할 수 있는 격자로서, 검도경기·심판규칙 제12조에 따르면, 「[BLANK]는, 충실한 [BLANK]와 적정한 [BLANK]로써, 죽도의 격자부로 격자부위를 칼날을 바르게 하여 격자하고 [BLANK]이 있어야 한다.」고 되어 있다. 이때 [BLANK]가 일치하여야 한다.',
    answers: ['유효격자', '기세', '자세', '존심', '기검체'],
  },
];

export const testScoreHistory: ScoreHistoryEntry[] = [
  { date: '2025-05-10', score: 70 },
  { date: '2025-07-01', score: 75 },
];
