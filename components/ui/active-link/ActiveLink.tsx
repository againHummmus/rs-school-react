'use client';

import type { ComponentProps, ReactNode } from 'react';
import { Link, usePathname } from '@/i18n/navigation';

type ActiveLinkProps = ComponentProps<typeof Link> & {
  children: ReactNode;
  className?: string;
  activeClassName?: string;
  inactiveClassName?: string;
};

export default function ActiveLink({
  href,
  className = '',
  activeClassName = '',
  inactiveClassName = '',
  children,
  ...rest
}: ActiveLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={`${className} ${isActive ? activeClassName : inactiveClassName}`}
      {...rest}
    >
      {children}
    </Link>
  );
}
