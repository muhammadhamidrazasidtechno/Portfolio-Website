import { Helmet } from "react-helmet";

interface SEOProps {
  title: string;
  description: string;
  keywords: string;
  image: string;
  url: string;
  schema?: {
    [key: string]: any;
  };
}

const SEO: React.FC<SEOProps> = ({ title, description, keywords, image, url, schema }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      {/* Open Graph for social sharing */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      {/* Canonical URL */}
      <link rel="canonical" href={url} />
      {/* Schema Markup */}
      {schema && (
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
      )}
    </Helmet>
  );
};

export default SEO;