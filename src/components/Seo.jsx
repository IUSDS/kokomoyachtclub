import React from 'react';
import { Helmet } from 'react-helmet';

const DEFAULT_IMAGE = 'https://image-bucket-kokomo-yacht-club.s3.ap-southeast-2.amazonaws.com/social_preview.jpg';
const SITE_NAME     = 'Kokomo Yacht Club';
const SITE_DESC     = "Luxury yacht charters & membership on Florida's Gulf Coast.";

export default function SEO({
  title = SITE_NAME,
  description = SITE_DESC,
  image = DEFAULT_IMAGE,
  url = window.location.href
}) {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description"       content={description} />
      {/* Open Graph */}
      <meta property="og:type"        content="website" />
      <meta property="og:site_name"   content={SITE_NAME} />
      <meta property="og:url"         content={url} />
      <meta property="og:title"       content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image"       content={image} />
      <meta property="og:image:alt"   content={`${SITE_NAME} preview`} />
      {/* Twitter */}
      <meta name="twitter:card"        content="summary_large_image" />
      <meta name="twitter:site"        content="@kokomoyachtclub" />
      <meta name="twitter:title"       content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image"       content={image} />
      <meta name="twitter:image:alt"   content={`${SITE_NAME} preview`} />
    </Helmet>
  );
}
