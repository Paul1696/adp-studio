import type { Metadata } from 'next'
import { redirect } from 'next/navigation'

export const metadata: Metadata = { title: 'Bibliothèque' }

export default function ResourcesPage() {
  redirect('/bibliotheque')
}
