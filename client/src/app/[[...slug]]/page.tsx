import { ClientOnly } from './client'

import '../../css/main.css'
import '../../css/header.css'
 
export function generateStaticParams() {
  return [{ slug: [''] }]
}
 
export default function Page() {
  return <ClientOnly />
}