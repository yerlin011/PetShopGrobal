/* eslint-disable @typescript-eslint/naming-convention */

export interface Idea {
  id?: string;
  title: string;
  description: string;
  tags?: Array<'My idea' | 'Featured' | 'New'>;
  cover?: string;
  author: string;
  updatedAt?: string;
  createdAt?: string;
}

export const ideaTags = {
  'My idea': {
    content: 'My idea',
    color: 'tertiary',
  },
  Featured: {
    content: 'Featured',
    color: 'danger',
  },
  New: {
    content: 'New',
    color: 'warning',
  },
};
