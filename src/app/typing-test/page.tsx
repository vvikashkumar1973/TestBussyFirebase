import { TypingTestClient } from "./typing-test-client";

export default function TypingTestPage() {
  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
        <div className="space-y-2 mb-8 text-center">
            <h1 className="text-3xl font-bold font-headline tracking-tighter sm:text-4xl">Typing Test</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
                Hone your typing skills. Choose a test duration and start typing to see your speed and accuracy in real-time.
            </p>
        </div>
        <TypingTestClient />
    </div>
  )
}
