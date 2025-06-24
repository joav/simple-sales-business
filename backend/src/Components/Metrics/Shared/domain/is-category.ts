import { Category } from './category';

export const isCategory = (value?: string): value is Category =>
  value && Object.values(Category).includes(value as Category);
