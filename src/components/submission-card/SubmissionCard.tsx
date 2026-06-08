import type { FormSubmission } from '../../types/form';

export default function SubmissionCard({
  item,
  isNew,
}: {
  item: FormSubmission;
  isNew?: boolean;
}) {
  return (
    <div
      className={`flex flex-col gap-6 p-5 border rounded-xl transition-colors duration-700 ${
        isNew
          ? 'bg-accent/10 border-accent'
          : 'bg-background/5 border-background/10'
      }`}
    >
      {item.image && (
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-auto aspect-square rounded-lg object-cover shrink-0 self-center"
        />
      )}

      <div className="flex flex-col justify-center gap-1 min-w-0">
        <h3 className="font-bold text-background text-lg leading-tight mb-1">
          {item.name}
        </h3>

        <div className="flex flex-col gap-0.5 text-sm">
          <Row label="Age" value={item.age} />
          <Row label="Email" value={item.email} />
          <Row label="Gender" value={item.gender} capitalize />
          <Row label="Country" value={item.country} />
          <Row
            label="Terms"
            value={item.acceptTerms ? '✓ Accepted' : '✗ Not accepted'}
            accent={item.acceptTerms}
          />
        </div>
      </div>
    </div>
  );
}

function Row({
  label,
  value,
  capitalize,
  accent,
}: {
  label: string;
  value: string | number;
  capitalize?: boolean;
  accent?: boolean;
}) {
  return (
    <div className="flex gap-2 items-baseline">
      <span className="text-background/40 w-14 shrink-0">{label}</span>
      <span
        className={`text-background/70 truncate ${capitalize ? 'capitalize' : ''} ${accent ? 'text-accent' : ''}`}
      >
        {value}
      </span>
    </div>
  );
}
