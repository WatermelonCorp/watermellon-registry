'use client';

import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

type DashboardNavigation = {
  pathname: string;
  navigate: (pathname: string) => void;
};

const DashboardNavigationContext = createContext<DashboardNavigation | null>(
  null,
);

export function DashboardNavigationProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [pathname, setPathname] = useState('/');
  const value = useMemo(
    () => ({ pathname, navigate: setPathname }),
    [pathname],
  );

  return (
    <DashboardNavigationContext.Provider value={value}>
      {children}
    </DashboardNavigationContext.Provider>
  );
}

export function useDashboardNavigation() {
  const context = useContext(DashboardNavigationContext);

  if (!context) {
    throw new Error(
      'useDashboardNavigation must be used within DashboardNavigationProvider',
    );
  }

  return context;
}

