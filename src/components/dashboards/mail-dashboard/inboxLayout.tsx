import { WorkspaceLayout } from "./components/mail/workspace-layout"
import { MailList } from "./components/mail/mail-list"
import { mails } from "./data"

export default function InboxLayout({ children }: { children: React.ReactNode }) {
  return (
    <WorkspaceLayout
      list={<MailList mails={mails} />}
      content={children}
    />
  )
}
