import { useState } from 'react';
import { Modal } from './components/modal/Modal';
import SubmissionCard from './components/submission-card/SubmissionCard';
import { useFormStore } from './store/useFormStore';
import Header from './components/header/Header';
import { UncontrolledForm } from './components/uncontrolled-form/UncontrolledForm';
import { ReactHookForm } from './components/react-hook-form/ReactHookForm';

export default function App() {
  const [isUncontrolledOpen, setIsUncontrolledOpen] = useState(false);
  const [isRHFOpen, setIsRHFOpen] = useState(false);

  const submissions = useFormStore((state) => state.submissions);
  const newSubmissionId = useFormStore((state) => state.newSubmissionId);

  return (
    <>
      <Header
        setIsUncontrolledOpen={setIsUncontrolledOpen}
        setIsRHFOpen={setIsRHFOpen}
      />
      <main className="flex flex-col items-center justify-between gap-2 max-w-6xl mx-auto w-full px-2 py-12">
        <h2>Submission History ({submissions.length})</h2>

        {submissions.length === 0 ? (
          <p className="text-foreground/40">
            No submissions yet. Please fill out the form!
          </p>
        ) : (
          <div className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-4 w-full">
            {submissions.map((item) => (
              <SubmissionCard
                key={item.id}
                item={item}
                isNew={item.id === newSubmissionId}
              />
            ))}
          </div>
        )}
      </main>

      <Modal
        isOpen={isUncontrolledOpen}
        onClose={() => setIsUncontrolledOpen(false)}
        title="Uncontrolled Form"
      >
        <UncontrolledForm onSuccess={() => setIsUncontrolledOpen(false)} />
      </Modal>

      <Modal
        isOpen={isRHFOpen}
        onClose={() => setIsRHFOpen(false)}
        title="React Hook Form"
      >
        <ReactHookForm onSuccess={() => setIsRHFOpen(false)} />
      </Modal>
    </>
  );
}
