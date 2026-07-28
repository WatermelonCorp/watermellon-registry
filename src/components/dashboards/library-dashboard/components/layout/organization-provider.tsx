"use client"

import { createContext, useContext, useState } from "react"

import { organizations } from "../../data"

type OrganizationContextType = {
  selectedOrg: string
  setSelectedOrg: (org: string) => void
}

const OrganizationContext = createContext<OrganizationContextType | undefined>(
  undefined
)

export function OrganizationProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [selectedOrg, setSelectedOrg] = useState<string>(organizations[0])

  return (
    <OrganizationContext.Provider value={{ selectedOrg, setSelectedOrg }}>
      {children}
    </OrganizationContext.Provider>
  )
}

export function useOrganization() {
  const context = useContext(OrganizationContext)
  if (!context) {
    throw new Error("useOrganization must be used within OrganizationProvider")
  }
  return context
}
