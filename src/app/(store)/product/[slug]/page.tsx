import React from 'react';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { ALL_PRODUCTS, getProductBySlug } from '@/lib/products';
import { ProductDetailClient } from './ProductDetailClient';

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  return ALL_PRODUCTS.map((product) => ({
    slug: product.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = getProductBySlug(params.slug);
  if (!product) {
    return {
      title: 'Product Not Located // KINETIQ',
    };
  }

  const title = `${product.name} — ${product.subtitle} | KINETIQ`;
  const description = `${product.description} Weighs only ${product.weight}g with ${product.drop}mm drop. Complimentary domestic dispatch in India.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
      images: [
        {
          url: product.primaryImage,
          width: 800,
          height: 1000,
          alt: product.name,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [product.primaryImage],
    },
  };
}

export default function ProductPage({ params }: Props) {
  const product = getProductBySlug(params.slug);

  if (!product) {
    notFound();
  }

  // Related products from same collection
  const relatedProducts = ALL_PRODUCTS.filter(
    (p) => p.collection === product.collection && p.id !== product.id
  ).slice(0, 4);

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://kinetiq.run';

  // Structured Data (JSON-LD)
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: [product.primaryImage, product.hoverImage],
    sku: `KNQ-${product.slug.toUpperCase()}`,
    brand: {
      '@type': 'Brand',
      name: 'KINETIQ',
    },
    offers: {
      '@type': 'Offer',
      priceCurrency: 'INR',
      price: product.price,
      itemCondition: 'https://schema.org/NewCondition',
      availability: product.inStock
        ? 'https://schema.org/InStock'
        : 'https://schema.org/OutOfStock',
      url: `${siteUrl}/product/${product.slug}`,
      seller: {
        '@type': 'Organization',
        name: 'KINETIQ Footwear Labs',
      },
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: product.rating,
      reviewCount: product.ratingCount,
      bestRating: 5,
      worstRating: 1,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProductDetailClient product={product} relatedProducts={relatedProducts} />
    </>
  );
}
