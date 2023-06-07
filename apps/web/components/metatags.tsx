import Head from "next/head";

export interface Props {
  title?: string;
  description?: string;
  canonical?: string;
  keywords?: string;
  imgUrl?: string;
  viewport?: string;
}

export const MetaTags = ({
  title,
  description,
  canonical,
  keywords,
  imgUrl,
  viewport,
}: Props) => {
  return (
    <Head>
      {title && <title>{title}</title>}

      {canonical && (
        <link rel="canonical" href={canonical} key="defaultCanonical" />
      )}

      {description && (
        <meta
          name="description"
          content={description}
          key="defaultDescription"
        />
      )}

      {keywords && (
        <meta name="keywords" content={keywords} key="defaultKeywords" />
      )}

      {/* FACEBOOK META-TAGS */}
      <meta property="og:type" content="website" key="defaultWebsite" />
      <meta property="og:site_name" content="Nostrum" key="defaultSiteName" />

      <meta property="og:title" key="defaultOgTitle" content={title} />

      {description && (
        <meta
          property="og:description"
          key="defaultOgDescription"
          content={description}
        />
      )}

      {imgUrl && (
        <meta property="og:image" content={imgUrl} key="defaultOgImage" />
      )}

      {canonical && (
        <meta property="og:url" content={canonical} key="defaultOgCanonical" />
      )}

      {/* TWITTER META-TAGS */}
      <meta
        name="twitter:card"
        content="summary_large_image"
        key="defaultTwitterCard"
      />

      <meta name="twitter:title" content={title} key="defaultTwitterTitle" />

      {description && (
        <meta
          name="twitter:description"
          content={description}
          key="defaultTwitterDescription"
        />
      )}

      {imgUrl && (
        <meta
          property="twitter:image"
          content={imgUrl}
          key="defaultTwitterImage"
        />
      )}

      {viewport && <meta name="viewport" content={viewport} />}

      {/* DEFAULT META-TAGS */}
      <meta name="author" content="" key="defaultAuthor" />
      <meta name="robots" content="all" key="defaultRobots" />
      <meta name="distribution" content="global" key="defaultDistribution" />

      {/* Website */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            alternateName: "Nostrum",
            url: "https://nostrum.network",
          }),
        }}
      />
    </Head>
  );
};
