import React from "react"
import NextHead from "next/head"
import { string } from "prop-types"

const defaultDescription = "Progress Mfg. vault for all necessary information associated with the company."
const defaultOGURL = "https://vault.progressmfg.com"
const defaultOGImage = "../../static/favicons/android-chrome-512x512.png"

const Head = (props) => (
  <NextHead>
    <meta charSet="UTF-8" />
    <title>{props.title || ""}</title>
    <meta
      name="description"
      content={props.description || defaultDescription}
    />
    <meta name="viewport" content="width=device-width, initial-scale=1" />    
    <meta name="robots" content="nofollow" />
    <link rel="manifest" href="../../static/favicons/manifest.json" />

    {/* Facbook Open Graph */}
    <meta property="og:url" content={props.url || defaultOGURL} />
    <meta property="og:title" content={props.title || ""} />
    <meta
      property="og:description"
      content={props.description || defaultDescription}
    />
    <meta property="og:image" content={props.ogImage || defaultOGImage} />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />

    {/* Twitter Graph */}
    <meta name="twitter:site" content={props.url || defaultOGURL} />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:image" content={props.ogImage || defaultOGImage} />
    
  </NextHead>
)

Head.propTypes = {
  title: string,
  description: string,
  url: string,
  ogImage: string
}

export default Head
