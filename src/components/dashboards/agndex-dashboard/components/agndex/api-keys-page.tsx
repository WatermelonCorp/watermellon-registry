import { useState } from 'react'
import {
  CheckIcon,
  CopyIcon,
  DocumentIcon,
  DownloadIcon,
  EyeIcon,
  EyeOffIcon,
  InfoIcon,
  ProjectIcon,
} from './icons'
import { Button } from '@/components/ui/button'
import { projectCredentials } from '../../data'

const maskedKey = '*'.repeat(projectCredentials.projectKey.length)
const envBlock = `AGNDEX_PROJECT_ID = ${projectCredentials.projectId}
AGNDEX_PROJECT_KEY = ${maskedKey}`
const envFileContents = `AGNDEX_PROJECT_ID=${projectCredentials.projectId}
AGNDEX_PROJECT_KEY=${projectCredentials.projectKey}
`

function copyText(value: string) {
  void navigator.clipboard.writeText(value)
}

function downloadEnv() {
  const blob = new Blob([envFileContents], { type: 'text/plain' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = '.env'
  link.click()
  URL.revokeObjectURL(url)
}

function SecurityNote() {
  return (
    <div className="flex items-start gap-2 text-muted-foreground">
      <InfoIcon className="mt-0.75 size-5 shrink-0" />
      <p>Keep these secure. Never expose your Project Key in client-side code.</p>
    </div>
  )
}

export function ApiKeysPage() {
  const [showKey, setShowKey] = useState(false)
  const [idCopied, setIdCopied] = useState(false)
  const [keyCopied, setKeyCopied] = useState(false)
  const [envCopied, setEnvCopied] = useState(false)

  function copyWithFeedback(
    value: string,
    setCopied: (copied: boolean) => void,
  ) {
    copyText(value)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1500)
  }

  function copyEnv() {
    copyWithFeedback(envFileContents, setEnvCopied)
  }

  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-10 p-4 md:gap-11 md:p-8">
      <div className="flex flex-col md:gap-2">
        <h1 className="text-2xl font-semibold tracking-tight">API Keys</h1>
        <p className="text-muted-foreground">Credential for Default Project</p>
      </div>

      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <ProjectIcon />
            <h2 className="font-medium">Project Credentials</h2>
          </div>
          <p className="text-sm text-muted-foreground md:pl-7">
            Use these to authenticate your API requests
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <p className="text-sm text-muted-foreground">Project ID</p>
            <div className="flex h-12 items-center gap-2 rounded-xl border bg-card px-4">
              <p className="flex-1 truncate text-sm font-medium">
                {projectCredentials.projectId}
              </p>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="size-5 text-muted-foreground"
                aria-label="Copy project ID"
                onClick={() =>
                  copyWithFeedback(projectCredentials.projectId, setIdCopied)
                }
              >
                {idCopied ? <CheckIcon /> : <CopyIcon />}
              </Button>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <p className="text-sm text-muted-foreground">Project Key</p>
            <div className="flex h-12 items-center gap-3 rounded-xl border bg-card px-4">
              <p className="flex-1 truncate font-medium tracking-tight">
                {showKey ? projectCredentials.projectKey : maskedKey}
              </p>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="size-5 text-muted-foreground"
                aria-label={showKey ? 'Hide project key' : 'Show project key'}
                onClick={() => setShowKey((value) => !value)}
              >
                {showKey ? <EyeOffIcon /> : <EyeIcon />}
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="size-5 text-muted-foreground"
                aria-label="Copy project key"
                onClick={() =>
                  copyWithFeedback(projectCredentials.projectKey, setKeyCopied)
                }
              >
                {keyCopied ? <CheckIcon /> : <CopyIcon />}
              </Button>
            </div>
          </div>

          <SecurityNote />
        </div>
      </div>

      <div className="border-t" />

      <div className="flex flex-col gap-6">
        <h2 className="font-medium">Environment Variables</h2>

        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-1 text-muted-foreground">
                <DocumentIcon />
                <span>.env</span>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  type="button"
                  variant="outline"
                  className="h-11 gap-2 px-4 font-normal"
                  onClick={copyEnv}
                >
                  {envCopied ? <CheckIcon /> : <CopyIcon />}
                  {envCopied ? 'Copied' : 'Copy'}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="h-11 gap-2 px-4 font-normal"
                  onClick={downloadEnv}
                >
                  <DownloadIcon />
                  Download
                </Button>
              </div>
            </div>

            <div className="rounded-xl border bg-card px-4 py-3 text-sm font-medium tracking-tight">
              <pre className="font-sans whitespace-pre-wrap">{envBlock}</pre>
            </div>
          </div>

          <SecurityNote />
        </div>
      </div>
    </div>
  )
}
