"use client";

import { createContext, useContext, useState } from "react";

import { organizations } from "../../data";

type Organization = (typeof organizations)[number];

type OrganizationContextValue = {
  selectedOrg: Organization;
  setSelectedOrg: (organization: Organization) => void;
};

const OrganizationContext = createContext<OrganizationContextValue | null>(
  null,
);

export function OrganizationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [selectedOrg, setSelectedOrg] = useState<Organization>(
    organizations[0],
  );

  return (
    <OrganizationContext.Provider value={{ selectedOrg, setSelectedOrg }}>
      {children}
    </OrganizationContext.Provider>
  );
}

export function useOrganization() {
  const context = useContext(OrganizationContext);

  if (!context) {
    throw new Error("useOrganization must be used within OrganizationProvider");
  }

  return context;
}
