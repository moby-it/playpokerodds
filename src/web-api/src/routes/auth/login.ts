import {
  loginUser,
  transformUserToResponse,
  validateAuthPayload
} from './common';

export const loginEndpoint = [
  validateAuthPayload,
  loginUser,
  transformUserToResponse,
];
