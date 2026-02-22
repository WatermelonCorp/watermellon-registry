export interface StreamCardProps {
    id: string
    title: string
    code: string
    avatar: string
    logo: React.ReactNode
    logoBg: string
    details: {
        origin: string
        priority: string
        handler: string
        process: string
        date: string
    }
    tags: { label: string; icon: React.ReactNode; color: string; bg: string }[]
    messages: number
    time: string
}   
