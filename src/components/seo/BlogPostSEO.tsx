import { Helmet } from "react-helmet-async";

interface BlogPostSEOProps {
  title: string;
  description: string;
  slug: string;
  author: string;
  datePublished: string;
  dateModified?: string;
  category: string;
  readTime: string;
  ogImage?: string;
}

const BASE_URL = "https://nextbillionlab.com";
const DEFAULT_OG_IMAGE = `${BASE_URL}/og-image.png`;

export function BlogPostSEO({
  title,
  description,
  slug,
  author,
  datePublished,
  dateModified,
  category,
  readTime,
  ogImage = DEFAULT_OG_IMAGE,
}: BlogPostSEOProps) {
  const canonicalUrl = `${BASE_URL}/blog/${slug}`;
  const fullTitle = `${title} | NEXT_ Blog`;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description: description,
    author: {
      "@type": "Person",
      name: author,
    },
    publisher: {
      "@type": "Organization",
      name: "Next Billion Lab",
      logo: {
        "@type": "ImageObject",
        url: `${BASE_URL}/favicon.svg`,
      },
    },
    datePublished: datePublished,
    dateModified: dateModified || datePublished,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": canonicalUrl,
    },
    image: ogImage,
    articleSection: category,
    wordCount: parseInt(readTime) * 200, // Estimate based on read time
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: BASE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: `${BASE_URL}/blog`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: title,
        item: canonicalUrl,
      },
    ],
  };

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="article" />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content="Next Billion Lab" />
      <meta property="article:published_time" content={datePublished} />
      <meta property="article:modified_time" content={dateModified || datePublished} />
      <meta property="article:author" content={author} />
      <meta property="article:section" content={category} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@nextbillionlab" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {/* JSON-LD */}
      <script type="application/ld+json">
        {JSON.stringify(articleSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(breadcrumbSchema)}
      </script>
    </Helmet>
  );
}

export default BlogPostSEO;
