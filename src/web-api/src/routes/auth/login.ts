import {
  loginUser,
  logLogin,
  transformUserToResponse,
  validateAuthPayload,
} from './common';

export const loginEndpoint = [
  validateAuthPayload,
  loginUser,
  logLogin,
  transformUserToResponse,
];
