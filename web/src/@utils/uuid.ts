import { v4 } from 'uuid';
import { Buffer } from 'buffer';

const array: number[] = [];

export default function suid(): string {
  v4(null, array, 0);
  return new Buffer(array).toString('base64')
    .replace(/\//g, '_').replace(/\+/g, '-').replace(/=/g, '');
}