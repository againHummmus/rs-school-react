const rules = [
  { label: '1 uppercase letter', re: /[A-Z]/ },
  { label: '1 lowercase letter', re: /[a-z]/ },
  { label: '1 number', re: /\d/ },
  { label: '1 special character', re: /[^a-zA-Z0-9]/ },
];

export function PasswordStrength({ password }: { password: string }) {
  if (!password) return null;

  const passed = rules.filter((r) => r.re.test(password)).length;

  return (
    <div className="flex flex-col gap-2 mt-1">
      <div className="flex gap-1">
        {rules.map((_, i) => (
          <div
            key={i}
            className={`h-1 flex-1 rounded-full transition-colors ${
              i < passed ? 'bg-accent' : 'bg-background/10'
            }`}
          />
        ))}
      </div>
      <ul className="flex flex-col gap-0.5">
        {rules.map((rule) => {
          const ok = rule.re.test(password);
          return (
            <li
              key={rule.label}
              className={`text-xs flex items-center gap-1 transition-colors ${
                ok ? 'text-accent' : 'text-background/40'
              }`}
            >
              <span>{ok ? '✓' : '○'}</span>
              {rule.label}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
