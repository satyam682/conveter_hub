import React, { useEffect } from 'react';
import type { ToolDefinition } from '../data/toolsData';

interface SEOHeadProps {
  tool?: ToolDefinition | null;
  siteName?: string;
}

export const SEOHead: React.FC<SEOHeadProps> = ({ tool, siteName = 'ConverterHub' }) => {
  const title = tool
    ? `${tool.seoTitle} | ${siteName}`
    : `${siteName} - 100% Free Online Converter & SEO Utility Suite`;

  const description = tool
    ? tool.seoDescription
    : '100% Free online tools suite: convert WebP, PNG, JPG, PDF, generate SEO meta tags, calculate loan EMI, format JSON, and check keyword density. Instant & 100% client-side privacy.';

  const keywords = tool
    ? tool.keywords.join(', ')
    : 'online converter, image converter, webp to png, pdf converter, seo meta tag generator, json formatter, emi calculator, keyword density checker';

  useEffect(() => {
    // Update Title
    document.title = title;

    // Update Meta Description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', description);

    // Update Keywords
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.setAttribute('name', 'keywords');
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.setAttribute('content', keywords);

    // OpenGraph Meta
    const ogTags = [
      { property: 'og:title', content: title },
      { property: 'og:description', content: description },
      { property: 'og:type', content: 'website' },
      { property: 'og:site_name', content: siteName },
      { property: 'twitter:card', content: 'summary_large_image' },
      { property: 'twitter:title', content: title },
      { property: 'twitter:description', content: description }
    ];

    ogTags.forEach(({ property, content }) => {
      let tag = document.querySelector(`meta[property="${property}"]`) || document.querySelector(`meta[name="${property}"]`);
      if (!tag) {
        tag = document.createElement('meta');
        if (property.startsWith('og:')) {
          tag.setAttribute('property', property);
        } else {
          tag.setAttribute('name', property);
        }
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', content);
    });

    // Inject Rich JSON-LD Schema for Google Search Snippets
    const existingSchema = document.getElementById('jsonld-schema');
    if (existingSchema) {
      existingSchema.remove();
    }

    const schemaScript = document.createElement('script');
    schemaScript.id = 'jsonld-schema';
    schemaScript.type = 'application/ld+json';

    const schemaData = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'WebSite',
          '@id': 'https://converter-hub5.netlify.app/#website',
          'url': 'https://converter-hub5.netlify.app',
          'name': siteName,
          'description': '100% Free online utility suite and format converters.'
        },
        {
          '@type': 'SoftwareApplication',
          'name': tool ? tool.name : 'ConverterHub Suite',
          'operatingSystem': 'Any',
          'applicationCategory': 'UtilityApplication',
          'offers': {
            '@type': 'Offer',
            'price': '0',
            'priceCurrency': 'USD'
          }
        },
        tool && tool.faqs.length > 0 ? {
          '@type': 'FAQPage',
          'mainEntity': tool.faqs.map(faq => ({
            '@type': 'Question',
            'name': faq.question,
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': faq.answer
            }
          }))
        } : null
      ].filter(Boolean)
    };

    schemaScript.textContent = JSON.stringify(schemaData);
    document.head.appendChild(schemaScript);
  }, [title, description, keywords, tool, siteName]);

  return null;
};
