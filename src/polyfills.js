import { Buffer } from 'buffer';
import process from 'process/browser.js';

if (typeof window !== 'undefined') {
  window.Buffer = Buffer;
  window.process = process;
}

export { Buffer, process }; 