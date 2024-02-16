import FormComponents from '@/components/FormComponents'
import { Toaster } from 'react-hot-toast'

export default function Home() {
  return (
    <main>
      <Toaster position="top-center" />
      <FormComponents />
    </main>
  )
}
