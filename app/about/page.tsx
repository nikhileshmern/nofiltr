import { Metadata } from 'next'
import { AboutClient } from './about-client'

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'Learn about NOFILTR. - our story, values, and commitment to clean, effective skincare.',
}

export default function AboutPage() {
  return <AboutClient />
}

