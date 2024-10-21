import { SignUp } from '@clerk/nextjs'

export default function Page() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md">
        <SignUp appearance={{
          elements: {
            rootBox: "mx-auto",
            card: "mx-auto",
          }
        }} />
      </div>
    </div>
  )
}
