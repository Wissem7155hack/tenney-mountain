import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface SEOHeadProps {
    title?: string;
    description?: string;
    keywords?: string;
    canonical?: string;
    ogImage?: string;
    schema?: object;
    noindex?: boolean;
    articleDate?: string;
    articleModified?: string;
    articleAuthor?: string;
}

const SEOHead: React.FC<SEOHeadProps> = ({
    title = 'Tenney Mountain Landscaping & Construction LLC – Professional Landscaping Services in New Hampshire',
    description = 'Expert landscaping services in New Hampshire. We install plants, sod, mulch, rock, irrigation, and concrete. Serving all of New Hampshire. ✓ Free Consultation ✓ Quality Work ✓ Reliable Service. Call 603-481-6710!',
    keywords = 'landscaping New Hampshire, landscape company New Hampshire CO, plant installation New Hampshire, sod installation New Hampshire, mulch services New Hampshire, irrigation systems concrete work New Hampshire, landscaping New Hampshire CO',
    canonical,
    ogImage = 'https://wissem7155hack.github.io/tenney-mountain/logo_white.jpg',
    schema,
    noindex = false,
    articleDate,
    articleModified,
    articleAuthor
}) => {
    const location = useLocation();
    const baseUrl = 'https://Tenney Mountainlandscaping.com';
    const fullUrl = canonical || `${baseUrl}${location.pathname}`;

    useEffect(() => {
        // Update document title
        document.title = title;

        // Update meta tags
        const updateMetaTag = (name: string, content: string, isProperty = false) => {
            const attribute = isProperty ? 'property' : 'name';
            let meta = document.querySelector(`meta[${attribute}="${name}"]`);
            if (!meta) {
                meta = document.createElement('meta');
                meta.setAttribute(attribute, name);
                document.head.appendChild(meta);
            }
            meta.setAttribute('content', content);
        };

        // Remove meta tag if exists
        const removeMetaTag = (name: string, isProperty = false) => {
            const attribute = isProperty ? 'property' : 'name';
            const meta = document.querySelector(`meta[${attribute}="${name}"]`);
            if (meta) {
                meta.remove();
            }
        };

        // Basic meta tags
        updateMetaTag('description', description);
        updateMetaTag('keywords', keywords);

        // Robots tag
        if (noindex) {
            updateMetaTag('robots', 'noindex, nofollow');
        } else {
            updateMetaTag('robots', 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1');
        }

        // Googlebot specific
        updateMetaTag('googlebot', noindex ? 'noindex, nofollow' : 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1');

        // Open Graph tags
        updateMetaTag('og:title', title, true);
        updateMetaTag('og:description', description, true);
        updateMetaTag('og:url', fullUrl, true);
        updateMetaTag('og:image', ogImage, true);
        updateMetaTag('og:type', articleDate ? 'article' : 'website', true);
        updateMetaTag('og:locale', 'en_US', true);
        updateMetaTag('og:site_name', 'Tenney Mountain Landscaping & Construction LLC', true);
        updateMetaTag('og:image:width', '1200', true);
        updateMetaTag('og:image:height', '630', true);
        updateMetaTag('og:image:alt', 'Tenney Mountain Landscaping & Construction LLC - Professional Landscaping in New Hampshire', true);

        // Article-specific Open Graph tags
        if (articleDate) {
            updateMetaTag('article:published_time', articleDate, true);
            updateMetaTag('article:author', articleAuthor || 'Tenney Mountain Landscaping & Construction LLC Team', true);
            updateMetaTag('article:section', 'Landscaping', true);
            if (articleModified) {
                updateMetaTag('article:modified_time', articleModified, true);
            }
        } else {
            removeMetaTag('article:published_time', true);
            removeMetaTag('article:modified_time', true);
            removeMetaTag('article:author', true);
            removeMetaTag('article:section', true);
        }

        // Twitter tags
        updateMetaTag('twitter:card', 'summary_large_image');
        updateMetaTag('twitter:title', title);
        updateMetaTag('twitter:description', description);
        updateMetaTag('twitter:image', ogImage);
        updateMetaTag('twitter:site', '@Tenney Mountainlandscaping');
        updateMetaTag('twitter:creator', '@Tenney Mountainlandscaping');

        // Geo tags (for local SEO)
        updateMetaTag('geo.region', 'US-CO');
        updateMetaTag('geo.placename', 'New Hampshire');
        updateMetaTag('geo.position', '39.7392;-104.9903');
        updateMetaTag('ICBM', '39.7392, -104.9903');

        // Update canonical link
        let canonicalLink = document.querySelector('link[rel="canonical"]');
        if (!canonicalLink) {
            canonicalLink = document.createElement('link');
            canonicalLink.setAttribute('rel', 'canonical');
            document.head.appendChild(canonicalLink);
        }
        canonicalLink.setAttribute('href', fullUrl);

        // Add schema markup if provided
        if (schema) {
            let schemaScript = document.querySelector('script[data-schema="page"]');
            if (!schemaScript) {
                schemaScript = document.createElement('script');
                schemaScript.setAttribute('type', 'application/ld+json');
                schemaScript.setAttribute('data-schema', 'page');
                document.head.appendChild(schemaScript);
            }
            schemaScript.textContent = JSON.stringify(schema);
        }

        // Cleanup on unmount
        return () => {
            // Remove page-specific schema on route change
            const schemaScript = document.querySelector('script[data-schema="page"]');
            if (schemaScript) {
                schemaScript.remove();
            }
        };
    }, [title, description, keywords, fullUrl, ogImage, schema, noindex, articleDate, articleModified, articleAuthor]);

    return null;
};

export default SEOHead;
