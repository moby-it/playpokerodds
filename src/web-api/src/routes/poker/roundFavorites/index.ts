import { saveToFavorites } from './addToFavorites/saveToFavorites';
import { removeFromFavorites } from './removeFromFavorites/removeFromFavorites';
import { validatePayload } from './validatePayload';

export const addToFavoritesEndpoint = [validatePayload, saveToFavorites];
export const removeFromFavoritesEndpoint = [
  validatePayload,
  removeFromFavorites,
];
