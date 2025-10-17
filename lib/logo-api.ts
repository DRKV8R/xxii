/**
 * Utility functions for fetching company logos from logo.dev API
 * Documentation: https://docs.logo.dev
 */

export interface CompanyLogo {
  name: string
  domain: string
  logo?: string
  claimed?: boolean
}

/**
 * Fetch company logo from logo.dev API
 * @param domain - Company domain (e.g., "google.com")
 * @returns Logo URL or null if not found
 */
export async function getCompanyLogo(domain: string): Promise<string | null> {
  try {
    // logo.dev API endpoint format: https://img.logo.dev/{domain}?token={token}
    // For free tier, we can use without token but with rate limits
    const logoUrl = `https://img.logo.dev/${domain}?format=png&size=200`

    // Verify the logo exists by attempting to fetch
    const response = await fetch(logoUrl, { method: "HEAD" })
    if (response.ok) {
      return logoUrl
    }
    return null
  } catch (error) {
    console.error(`[v0] Failed to fetch logo for ${domain}:`, error)
    return null
  }
}

/**
 * Get logo URL synchronously (for client-side rendering)
 * @param domain - Company domain
 * @returns Logo URL (may 404 if logo doesn't exist)
 */
export function getLogoUrl(domain: string): string {
  return `https://img.logo.dev/${domain}?format=png&size=200`
}

/**
 * Extract domain from company name or URL
 * @param company - Company name or URL
 * @returns Domain string
 */
export function extractDomain(company: string): string {
  // Remove common prefixes
  let domain = company
    .toLowerCase()
    .replace(/^(https?:\/\/)?(www\.)?/, "")
    .replace(/\s+/g, "")
    .trim()

  // If it looks like a company name, add .com
  if (!domain.includes(".")) {
    domain = `${domain}.com`
  }

  // Remove path if present
  domain = domain.split("/")[0]

  return domain
}

/**
 * Common data broker and tech company domains
 */
export const KNOWN_COMPANIES = {
  // Data Brokers
  "acxiom.com": "Acxiom",
  "experian.com": "Experian",
  "equifax.com": "Equifax",
  "transunion.com": "TransUnion",
  "oracle.com": "Oracle",
  "liveramp.com": "LiveRamp",
  "neustar.com": "Neustar",
  "epsilon.com": "Epsilon",
  "corelogic.com": "CoreLogic",
  "lexisnexis.com": "LexisNexis",

  // Tech Giants
  "google.com": "Google",
  "facebook.com": "Meta",
  "amazon.com": "Amazon",
  "microsoft.com": "Microsoft",
  "apple.com": "Apple",
  "twitter.com": "Twitter/X",
  "linkedin.com": "LinkedIn",
  "tiktok.com": "TikTok",

  // Ad Tech
  "doubleclick.net": "DoubleClick",
  "googleadservices.com": "Google Ads",
  "facebook.net": "Facebook Ads",
  "criteo.com": "Criteo",
  "taboola.com": "Taboola",
  "outbrain.com": "Outbrain",

  // Analytics
  "google-analytics.com": "Google Analytics",
  "mixpanel.com": "Mixpanel",
  "segment.com": "Segment",
  "amplitude.com": "Amplitude",
  "hotjar.com": "Hotjar",
}
