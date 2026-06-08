import { fileToBase64 } from './fileToBase64';

describe('fileToBase64', () => {
  it('resolves with data URL on success', async () => {
    const mockResult = 'data:image/png;base64,abc123';
    class MockReader {
      result = mockResult;
      onload: (() => void) | null = null;
      onerror: ((e: unknown) => void) | null = null;
      readAsDataURL() {
        setTimeout(() => this.onload?.(), 0);
      }
    }
    vi.stubGlobal('FileReader', MockReader);

    const file = new File(['content'], 'test.png', { type: 'image/png' });
    await expect(fileToBase64(file)).resolves.toBe(mockResult);

    vi.unstubAllGlobals();
  });

  it('rejects on reader error', async () => {
    const mockError = new Error('Read failed');
    class MockReader {
      result = null;
      onload: (() => void) | null = null;
      onerror: ((e: unknown) => void) | null = null;
      readAsDataURL() {
        setTimeout(() => this.onerror?.(mockError), 0);
      }
    }
    vi.stubGlobal('FileReader', MockReader);

    const file = new File(['content'], 'test.png', { type: 'image/png' });
    await expect(fileToBase64(file)).rejects.toBe(mockError);

    vi.unstubAllGlobals();
  });
});
