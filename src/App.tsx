import { useState } from 'react';
import { Modal } from './components/modal/Modal';

export default function App() {
  const [isUncontrolledOpen, setIsUncontrolledOpen] = useState(false);
  const [isRHFOpen, setIsRHFOpen] = useState(false);

  return (
    <>
      <main className="min-h-screen p-4 max-w-6xl mx-auto flex flex-col items-center justify-center gap-6">
        <button
          className="bg-accent text-foreground cursor-pointer font-bold py-2 px-4 rounded hover:bg-accent-dark transition-colors"
          onClick={() => setIsUncontrolledOpen(true)}
        >
          Open Uncontrolled Form
        </button>

        <button
          className="bg-accent text-foreground cursor-pointer font-bold py-2 px-4 rounded hover:bg-accent-dark transition-colors"
          onClick={() => setIsRHFOpen(true)}
        >
          Open React Hook Form
        </button>
      </main>

      <Modal
        isOpen={isUncontrolledOpen}
        onClose={() => setIsUncontrolledOpen(false)}
        title="New Profile (Uncontrolled Form)"
      >
        <div style={{ padding: '20px' }}>Uncontrolled form</div>
      </Modal>

      <Modal
        isOpen={isRHFOpen}
        onClose={() => setIsRHFOpen(false)}
        title="New Profile (React Hook Form)"
      >
        <div style={{ padding: '20px' }}>React Hook Form</div>
      </Modal>
    </>
  );
}
