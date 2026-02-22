import { MailViewer } from "./components/mail/mail-viewer"

export default async function Page({ params }: { params: { id: string } }) {

   const { id } = await params
   return <MailViewer id={id} />
}
