import { KendoNotification } from '../../types/kendo';
import { mockUsers } from './users';

export const mockNotifications: KendoNotification[] = [
  { id: 1, type: 'new_request', opponent: mockUsers[1], read: false },
  {
    id: 2,
    type: 'declined',
    opponent: mockUsers[2],
    message: '죄송합니다. 그날은 선약이 있어서 어려울 것 같습니다.',
    read: false,
  },
];
