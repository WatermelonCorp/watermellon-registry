import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

const healthServices = [
  {
    name: 'Telehealth',
    value: 'telehealth',
    doctor: 'Dr. Sarah Connor',
    specialty: 'General Practice',
    content:
      'Connect with board-certified physicians from the comfort of your home. Consultations, prescriptions, and follow-ups available 24/7 via secure video calls.',
    status: 'Available Now'
  },
  {
    name: 'Therapy',
    value: 'therapy',
    doctor: 'Dr. James Wilson',
    specialty: 'Clinical Psychology',
    content:
      'Access confidential mental health support. Schedule weekly therapy sessions with our licensed counselors and psychiatrists to manage stress and anxiety.',
    status: 'By Appointment'
  },
  {
    name: 'Nutrition',
    value: 'nutrition',
    doctor: 'Dr. Emily Chen',
    specialty: 'Dietetics',
    content:
      'Get personalized meal plans and dietary advice. Work with our nutrition experts to achieve your fitness goals and manage dietary restrictions safely.',
    status: 'Waitlist'
  }
]

const Tabs17 = () => {
  return (
    <div className='w-full max-w-xl px-1'>
      <Tabs defaultValue='telehealth' orientation='vertical' className='flex gap-3 sm:gap-6'>
        <TabsList className='bg-background h-full flex-col shrink-0 gap-1'>
          {healthServices.map(tab => (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              className='data-[state=active]:bg-emerald-100/50 data-[state=active]:text-emerald-700 dark:data-[state=active]:text-emerald-400 dark:data-[state=active]:bg-emerald-900/20 w-full justify-start data-[state=active]:shadow-none! dark:data-[state=active]:border-transparent rounded-lg px-2 sm:px-4 text-[11px] sm:text-sm'
            >
              {tab.name}
            </TabsTrigger>
          ))}
        </TabsList>

        <div className='flex-1'>
          {healthServices.map(tab => (
            <TabsContent key={tab.value} value={tab.value} className='m-0 animate-in slide-in-from-bottom-2 fade-in duration-500'>
              <div className='rounded-3xl border border-emerald-100 bg-emerald-50/50 p-4 sm:p-6 dark:border-emerald-900/30 dark:bg-emerald-900/10'>
                <div className='mb-4 flex flex-col gap-1 sm:gap-2 sm:flex-row sm:items-center sm:justify-between'>
                  <div>
                    <h4 className='text-sm sm:text-lg font-semibold tracking-tight text-emerald-950 dark:text-emerald-50'>
                      {tab.doctor}
                    </h4>
                    <span className='text-[11px] sm:text-sm font-medium text-emerald-600 dark:text-emerald-400'>
                      {tab.specialty}
                    </span>
                  </div>
                </div>
                <p className='text-[13px] sm:text-sm text-emerald-900/70 dark:text-emerald-100/60'>
                  {tab.content}
                </p>
                <div className='mt-4 flex items-center gap-1.5 sm:gap-3 border-t border-emerald-200/30 pt-4 dark:border-emerald-800/30'>
                  <button className='rounded-lg bg-emerald-600 px-2.5 py-1.5 text-[10px] sm:px-4 sm:py-2 sm:text-xs font-semibold text-white shadow-sm transition-colors hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600'>
                    Book Session
                  </button>
                  <button className='rounded-lg px-2.5 py-1.5 text-[10px] sm:px-4 sm:py-2 sm:text-xs font-semibold text-emerald-700 transition-colors hover:bg-emerald-100 dark:text-emerald-400 dark:hover:bg-emerald-800/40'>
                    View Profile
                  </button>
                </div>
              </div>
            </TabsContent>
          ))}
        </div>
      </Tabs>
    </div>
  )
}

export default Tabs17
