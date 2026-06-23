export const policies = [
  {
    initials: 'HC',
    name: 'Henderson Corp',
    type: 'Commercial Liability',
    status: 'Active',
    tone: 'green',
    price: '$12,400/yr',
    detail: 'Due: Apr 28',
  },
  {
    initials: 'PR',
    name: 'Priya Rajan',
    type: 'Vehicle Insurance',
    status: 'Claim',
    tone: 'pink',
    price: '$2,100/yr',
    detail: 'Claim open',
  },
  {
    initials: 'DS',
    name: 'Henderson Corp',
    type: 'Properties & contents',
    status: 'Review',
    tone: 'amber',
    price: '$8,750/yr',
    detail: 'Risk Flagged',
  },
  {
    initials: 'MA',
    name: 'Malik & Associates',
    type: 'Directors & Officers',
    status: 'Pending',
    tone: 'amber',
    price: '$6,200/yr',
    detail: 'Renewal draft',
  },
  {
    initials: 'GR',
    name: 'Greenfield Retail',
    type: 'Contents cover',
    status: 'Active',
    tone: 'green',
    price: '$2,100/yr',
    detail: 'Due: Jul 26',
  },
  {
    initials: 'NB',
    name: 'N Bergstrom',
    type: 'Lifetime policy',
    status: 'Lapsed',
    tone: 'red',
    price: 'Due: Apr 28',
    detail: 'Follow-up needed',
  },
];
export const activities = [
  [
    'Today - 8:42',
    'Henderson Corp renewed automatically',
    'AI processed commercial liability renewal',
  ],
  [
    'Yesterday',
    'Priya Rajan filed vehicle claim #CLM-0291',
    'Damage estimate: $3,200 · AI summary ready',
  ],
  [
    'Yesterday',
    'Del Sol risk score increased +12%',
    'Review before renewal recommended',
  ],
  [
    'Yesterday',
    'Malik & Assoc. renewal draft generated',
    'Awaiting client approval',
  ],
];
export const renewals = [
  ['GR', 'Greenfield Retail', 'Contents cover', '4 days', 'red'],
  ['MA', 'Malik & Assoc.', 'Directors & Officers', '12 days', 'amber'],
  ['DS', 'Del Sol Properties', 'Property & contents', '12 days', 'amber'],
  ['GR', 'Greenfield Retail', 'Contents cover', '31 days', 'blue'],
];
