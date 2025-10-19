import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { generateArticleSchema } from '@/lib/seo/schema'

interface Props {
  params: Promise<{ slug: string }>
}

const articles = {
  'understanding-your-skin-type': {
    title: 'Understanding Your Skin Type',
    description:
      'Learn how to identify your skin type and choose the right products for your unique needs.',
    date: '2024-01-15',
    author: 'Dr. Priya Sharma',
    content: `
# Understanding Your Skin Type

Identifying your skin type is the first step in building an effective skincare routine. Your skin type determines which products will work best for you and helps you avoid ingredients that might cause irritation or breakouts.

## The Five Main Skin Types

### 1. Normal Skin
Normal skin is well-balanced—neither too oily nor too dry. It has a smooth texture with barely visible pores and no severe sensitivity.

### 2. Oily Skin
Oily skin produces excess sebum, leading to a shiny appearance, especially in the T-zone (forehead, nose, and chin). Pores may appear enlarged, and you might be prone to blackheads and acne.

### 3. Dry Skin
Dry skin lacks moisture and oil, feeling tight, rough, or flaky. It may show more visible lines and be prone to irritation.

### 4. Combination Skin
Combination skin is a mix of oily and dry areas. Typically, the T-zone is oily while the cheeks are dry or normal.

### 5. Sensitive Skin
Sensitive skin reacts easily to products or environmental factors, showing redness, itching, or burning.

## How to Determine Your Skin Type

**The Bare-Faced Method:**
1. Wash your face with a gentle cleanser
2. Pat dry and wait 30 minutes
3. Observe how your skin feels and looks

- **Tight and flaky?** You have dry skin
- **Shiny all over?** You have oily skin
- **Shiny T-zone, normal cheeks?** You have combination skin
- **Comfortable and smooth?** You have normal skin
- **Red or irritated?** You may have sensitive skin

## Choosing Products for Your Skin Type

Once you know your skin type, you can select products specifically formulated to address your needs. NOFILTR. products are labeled with recommended skin types to make your selection easier.

Remember, your skin type can change with seasons, age, and lifestyle factors. Re-assess periodically to ensure your routine still meets your needs.
    `,
  },
  'science-of-skincare': {
    title: 'The Science of Skincare Ingredients',
    description:
      'Discover the key ingredients that transform your skin and how they work at a cellular level.',
    date: '2024-01-10',
    author: 'Dr. Ananya Patel',
    content: `
# The Science of Skincare Ingredients

Understanding skincare ingredients empowers you to make informed choices about what you put on your skin. Let's explore the science behind some of the most effective skincare actives.

## Star Ingredients

### Hyaluronic Acid
A humectant that can hold up to 1000x its weight in water, hyaluronic acid draws moisture into the skin, plumping fine lines and creating a dewy appearance.

### Niacinamide (Vitamin B3)
This multitasking ingredient strengthens the skin barrier, reduces inflammation, regulates oil production, and fades hyperpigmentation.

### Ceramides
Lipid molecules that make up 50% of your skin's composition, ceramides reinforce the skin barrier and prevent moisture loss.

### Peptides
Short chains of amino acids that signal your skin to produce more collagen, improving firmness and reducing the appearance of wrinkles.

## Why Clean Ingredients Matter

At NOFILTR., we believe in transparency. Every ingredient serves a purpose, and we avoid:
- Parabens
- Sulfates
- Phthalates
- Synthetic fragrances
- Mineral oils

Your skin absorbs what you apply to it, so ingredient quality matters. That's why we source the finest, clinically-proven ingredients for our formulations.
    `,
  },
  'perfect-skincare-routine': {
    title: 'Building Your Perfect Skincare Routine',
    description:
      'A step-by-step guide to creating a skincare routine that works for you.',
    date: '2024-01-05',
    author: 'Kavya Reddy',
    content: `
# Building Your Perfect Skincare Routine

A consistent skincare routine is the foundation of healthy, glowing skin. Here's how to build a routine that works for you.

## Morning Routine

### 1. Cleanser
Start with a gentle cleanser to remove any overnight buildup. Our Daily Face Cleanser is perfect for all skin types.

### 2. Toner (Optional)
Toners help balance pH and prep your skin for better absorption of subsequent products.

### 3. Serum
Apply targeted serums to address specific concerns like hyperpigmentation or fine lines.

### 4. Moisturizer
Lock in hydration with a moisturizer suited to your skin type. Our Daily Moisturizer provides lightweight, all-day hydration.

### 5. Sunscreen
Never skip SPF! Sun protection is the single most important anti-aging step.

## Evening Routine

### 1. Double Cleanse
Start with an oil-based cleanser to remove makeup and SPF, followed by your regular cleanser.

### 2. Treatments
Evening is the best time for active ingredients like retinol or AHAs.

### 3. Eye Cream
The delicate eye area needs special attention. Pat, don't rub.

### 4. Moisturizer
A richer night cream can help repair and restore while you sleep.

## Pro Tips

- **Consistency is key:** Give products 4-6 weeks to show results
- **Less is more:** Don't overload your skin with too many actives
- **Listen to your skin:** Adjust your routine based on how your skin responds
- **Patch test:** Always test new products on a small area first

Start simple and build your routine gradually. The best routine is one you'll stick to!
    `,
  },
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const article = articles[slug as keyof typeof articles]

  if (!article) {
    return { title: 'Article Not Found' }
  }

  return {
    title: article.title,
    description: article.description,
  }
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params
  const article = articles[slug as keyof typeof articles]

  if (!article) {
    notFound()
  }

  const articleSchema = generateArticleSchema({
    title: article.title,
    description: article.description,
    image: `${process.env.NEXT_PUBLIC_SITE_URL}/og-image.jpg`,
    datePublished: article.date,
    dateModified: article.date,
    author: article.author,
  })

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <article className="min-h-screen bg-white pt-32 pb-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <header className="mb-12">
              <h1 className="font-display text-4xl sm:text-5xl font-bold text-ink mb-4">
                {article.title}
              </h1>
              <div className="flex items-center gap-4 text-ink/60">
                <span>{article.author}</span>
                <span>•</span>
                <time>{new Date(article.date).toLocaleDateString('en-IN')}</time>
              </div>
            </header>

            <div className="prose prose-lg max-w-none">
              <div
                className="text-ink/80 leading-relaxed space-y-6"
                dangerouslySetInnerHTML={{ __html: article.content }}
              />
            </div>
          </div>
        </div>
      </article>
    </>
  )
}

