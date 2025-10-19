import { Metadata } from 'next'
import { JournalClient } from './journal-client'

export const metadata: Metadata = {
  title: 'Journal',
  description:
    'Expert skincare insights, tips, and knowledge from the NOFILTR. team.',
}

const articles = [
  {
    title: 'Understanding Your Skin Type',
    excerpt:
      'Learn how to identify your skin type and choose the right products for your unique needs.',
    slug: 'understanding-your-skin-type',
    readTime: '5 min read',
    date: 'January 15, 2024',
    category: 'Skincare Basics',
  },
  {
    title: 'The Science of Skincare Ingredients',
    excerpt:
      'Discover the key ingredients that transform your skin and how they work at a cellular level.',
    slug: 'science-of-skincare',
    readTime: '7 min read',
    date: 'January 10, 2024',
    category: 'Science',
  },
  {
    title: 'Building Your Perfect Skincare Routine',
    excerpt:
      'A step-by-step guide to creating a skincare routine that works for you.',
    slug: 'perfect-skincare-routine',
    readTime: '6 min read',
    date: 'January 5, 2024',
    category: 'Routines',
  },
]

export default function JournalPage() {
  return <JournalClient articles={articles} />
}

