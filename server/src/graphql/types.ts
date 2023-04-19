import type { Me } from '~/shared/types';
import { ObjectId } from 'mongodb';

export interface WithId {
  id: ObjectId;
}

export interface WithIds {
  ids: ObjectId[];
}

export interface ContextUser {
  user: Me | null;
}

export enum VibeType {
  VIBES = 'VIBES',
  COMMENTS = 'COMMENTS',
  SMILES = 'SMILES',
}
