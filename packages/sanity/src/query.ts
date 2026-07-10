import { defineQuery } from "next-sanity";

const imageFields = /* groq */ `
  "id": asset._ref,
  "preview": asset->metadata.lqip,
  hotspot {
    x,
    y
  },
  crop {
    bottom,
    left,
    right,
    top
  },
  "alt": coalesce(alt, asset->altText, asset->originalFilename, "Image"),
  "blurData": asset->metadata.lqip,
  "dominantColor": asset->metadata.palette.dominant.background,
`;

const imageFragment = /* groq */ `
  image {
    ${imageFields}
  }
`;

/** Sponsor documents store the asset on `logo`; project it as `image` for frontend components. */
const sponsorLogoFragment = /* groq */ `
  "image": logo {
    ${imageFields}
  }
`;

/** Prefer orderRank (drag-and-drop); fall back to legacy sortOrder. */
const documentOrder = /* groq */ `order(orderRank asc, sortOrder asc)`;

const sponsorLevelFragment = /* groq */ `
  level->{
    _id,
    name,
    "slug": slug.current,
    price,
    availability,
    perks,
    ctaLabel,
    ctaEmail,
    showInPackages,
    orderRank,
    sortOrder
  }
`;

const sponsorCardFragment = /* groq */ `
  _id,
  name,
  url,
  featured,
  ${sponsorLevelFragment},
  "tier": coalesce(level->name, tier),
  ${sponsorLogoFragment}
`;

/** Sponsors follow their level's desk order, then name within the level. */
const sponsorOrder = /* groq */ `order(level->orderRank asc, level->sortOrder asc, name asc)`;

const sponsorPackageFragment = /* groq */ `
  _id,
  name,
  "slug": slug.current,
  price,
  availability,
  perks,
  ctaLabel,
  ctaEmail,
  showInPackages
`;

const customLinkFragment = /* groq */ `
  ...customLink{
    openInNewTab,
    "href": select(
      type == "internal" => internal->slug.current,
      type == "external" => external,
      "#"
    ),
  }
`;

const markDefsFragment = /* groq */ `
  markDefs[]{
    ...,
    ${customLinkFragment}
  }
`;

const richTextFragment = /* groq */ `
  richText[]{
    ...,
    ${markDefsFragment}
  }
`;

const blogAuthorFragment = /* groq */ `
  authors[0]->{
    _id,
    name,
    position,
    ${imageFragment}
  }
`;

const blogCardFragment = /* groq */ `
  _type,
  _id,
  title,
  description,
  "slug": slug.current,
  category,
  richText,
  ${imageFragment},
  publishedAt,
  ${blogAuthorFragment}
`;

const customUrlFragment = /* groq */ `
  "openInNewTab": openInNewTab,
  "href": select(
    type == "internal" => select(
      internal->_type == "homePage" => "/",
      internal->slug.current
    ),
    type == "external" => external,
    "#"
  )
`;

const buttonsFragment = /* groq */ `
  buttons[]{
    text,
    variant,
    _key,
    _type,
    "openInNewTab": url.openInNewTab,
    "href": select(
      url.type == "internal" => select(
        url.internal->_type == "homePage" => "/",
        url.internal->slug.current
      ),
      url.type == "external" => url.external,
      url.href
    ),
  }
`;

const programFields = /* groq */ `
  _id,
  name,
  "id": slug.current,
  tagline,
  level,
  summary,
  accent,
  description,
  expectations,
  requirements,
  equipment,
  sessions,
  ${imageFragment}
`;

const facilityFields = /* groq */ `
  _id,
  name,
  subtitle,
  description,
  longDescription,
  address,
  phone,
  hours,
  features,
  amenities,
  mapUrl,
  citySiteUrl,
  disclaimer,
  isPrimary,
  sortOrder,
  ${imageFragment}
`;

const ctaBlock = /* groq */ `
  _type == "cta" => {
    ...,
    ${richTextFragment},
    ${buttonsFragment},
    ${imageFragment},
  }
`;

const imageLinkCardsBlock = /* groq */ `
  _type == "imageLinkCards" => {
    ...,
    ${richTextFragment},
    ${buttonsFragment},
    "cards": array::compact(cards[]{
      ...,
      "openInNewTab": url.openInNewTab,
      "href": select(
        url.type == "internal" => select(
          url.internal->_type == "homePage" => "/",
          url.internal->slug.current
        ),
        url.type == "external" => url.external,
        url.href
      ),
      ${imageFragment},
    })
  }
`;

const staffCardFragment = /* groq */ `
  _id,
  name,
  position,
  "role": coalesce(
    role,
    select(
      tier in ["head", "assistant"] => "coaching",
      tier == "staff" => "operations",
      "coaching"
    )
  ),
  "featured": coalesce(featured, tier == "head"),
  "tier": coalesce(
    select(featured == true => "head", role == "operations" => "staff", "assistant"),
    tier
  ),
  email,
  bio,
  certifications,
  specialties,
  sortOrder,
  ${imageFragment}
`;

const teamBlock = /* groq */ `
  _type == "team" => {
    ...,
    "roleFilter": coalesce(roleFilter, "coaching"),
    "teamMembers": select(
      count(teamMembers) > 0 => teamMembers[]->{
        ${staffCardFragment}
      },
      coalesce(roleFilter, "coaching") == "all" => *[_type == "staff"] | ${documentOrder}{
        ${staffCardFragment}
      },
      // ^.roleFilter: parent scope — bare roleFilter is undefined inside *[...]
      *[_type == "staff" && coalesce(
        role,
        select(
          tier in ["head", "assistant"] => "coaching",
          tier == "staff" => "operations",
          "coaching"
        )
      ) == coalesce(^.roleFilter, "coaching")] | ${documentOrder}{
        ${staffCardFragment}
      }
    )
  }
`;

const heroBlock = /* groq */ `
  _type == "hero" => {
    ...,
    "variant": coalesce(variant, layout),
    ${imageFragment},
    ${buttonsFragment},
    ${richTextFragment}
  }
`;

const splitContentBlock = /* groq */ `
  _type == "splitContent" => {
    ...,
    "imagePlacement": coalesce(imagePlacement, select(imagePosition == "left" => "start", "end")),
    ${richTextFragment},
    ${buttonsFragment},
    ${imageFragment}
  }
`;

const statsBlock = /* groq */ `
  _type == "stats" => {
    ...,
    ${imageFragment}
  }
`;

const programsPreviewBlock = /* groq */ `
  _type == "programsPreview" => {
    ...,
    viewAllUrl{
      ${customUrlFragment}
    },
    "programs": select(
      count(programs) > 0 => programs[]->{
        ${programFields}
      },
      *[_type == "program"] | ${documentOrder}{
        ${programFields}
      }
    )
  }
`;

const latestNewsBlock = /* groq */ `
  _type == "latestNews" => {
    ...,
    "posts": select(
      count(posts) > 0 => posts[]->{
        ${blogCardFragment}
      },
      *[_type == "blog" && (seoHideFromLists != true)] | order(publishedAt desc)[0...12]{
        ${blogCardFragment}
      }
    )[0...3]
  }
`;

const programsListBlock = /* groq */ `
  _type == "programsList" => {
    ...,
    "programs": select(
      count(programs) > 0 => programs[]->{
        ${programFields}
      },
      *[_type == "program"] | ${documentOrder}{
        ${programFields}
      }
    )
  }
`;

const sponsorsHeroBlock = /* groq */ `
  _type == "sponsorsHero" => {
    ...
  }
`;

const sponsorTiersBlock = /* groq */ `
  _type == "sponsorTiers" => {
    ...,
    "tiers": select(
      count(tiers) > 0 => tiers[]->{
        ${sponsorPackageFragment}
      },
      *[_type == "sponsorLevel" && showInPackages != false] | ${documentOrder}{
        ${sponsorPackageFragment}
      }
    )
  }
`;

const sponsorsGridBlock = /* groq */ `
  _type == "sponsorsGrid" => {
    ...,
    "sponsors": select(
      count(sponsors) > 0 => sponsors[]->{
        ${sponsorCardFragment}
      },
      *[_type == "sponsor"] | ${sponsorOrder}{
        ${sponsorCardFragment}
      }
    )
  }
`;

const checklistSplitBlock = /* groq */ `
  _type == "checklistSplit" => {
    ...,
    ${buttonsFragment},
    ${imageFragment}
  }
`;

const sponsorsMarqueeBlock = /* groq */ `
  _type == "sponsorsMarquee" => {
    ...,
    viewAllUrl{
      ${customUrlFragment}
    },
    "sponsors": select(
      count(sponsors) > 0 => sponsors[]->{
        ${sponsorCardFragment}
      },
      *[_type == "sponsor" && featured != false] | order(name asc){
        ${sponsorCardFragment}
      }
    )
  }
`;

const pageHeroBlock = /* groq */ `
  _type == "pageHero" => {
    ...,
    backgroundImage {
      ${imageFields}
    }
  }
`;

const timelineBlock = /* groq */ `
  _type == "timeline" => {
    ...
  }
`;

const contactInfoBlock = /* groq */ `
  _type == "contactInfo" => {
    ...,
    "settings": *[_type == "settings"][0]{
      contactEmail,
      contactPhone,
      primaryAddress,
      officeHours,
      inquiryTypes,
      mapUrl
    }
  }
`;

const facilitiesListBlock = /* groq */ `
  _type == "facilitiesList" => {
    ...,
    "facilities": select(
      count(facilities) > 0 => facilities[]->{
        ${facilityFields}
      },
      *[_type == "facility"] | ${documentOrder}{
        ${facilityFields}
      }
    )
  }
`;

const featureCardsIconBlock = /* groq */ `
  _type == "featureCardsIcon" => {
    ...,
    ${richTextFragment},
    "cards": array::compact(cards[]{
      ...,
      ${richTextFragment}
    })
  }
`;

const faqFragment = /* groq */ `
  "faqs": array::compact(faqs[]->{
    title,
    _id,
    _type,
    ${richTextFragment}
  })
`;

const faqAccordionBlock = /* groq */ `
  _type == "faqAccordion" => {
    ...,
    ${faqFragment},
    link{
      ...,
      "openInNewTab": url.openInNewTab,
      "href": select(
        url.type == "internal" => select(
          url.internal->_type == "homePage" => "/",
          url.internal->slug.current
        ),
        url.type == "external" => url.external,
        url.href
      )
    }
  }
`;

const subscribeNewsletterBlock = /* groq */ `
  _type == "subscribeNewsletter" => {
    ...,
    "subTitle": subTitle[]{
      ...,
      ${markDefsFragment}
    },
    "helperText": helperText[]{
      ...,
      ${markDefsFragment}
    }
  }
`;

const pageBuilderFragment = /* groq */ `
  pageBuilder[]{
    ...,
    _type,
    ${ctaBlock},
    ${heroBlock},
    ${splitContentBlock},
    ${statsBlock},
    ${programsPreviewBlock},
    ${programsListBlock},
    ${latestNewsBlock},
    ${sponsorsMarqueeBlock},
    ${sponsorsHeroBlock},
    ${sponsorTiersBlock},
    ${sponsorsGridBlock},
    ${checklistSplitBlock},
    ${pageHeroBlock},
    ${timelineBlock},
    ${contactInfoBlock},
    ${facilitiesListBlock},
    ${featureCardsIconBlock},
    ${faqAccordionBlock},
    ${subscribeNewsletterBlock},
    ${imageLinkCardsBlock},
    ${teamBlock}
  }
`;

export const queryHomePageData =
  defineQuery(`*[_type == "homePage" && _id == "homePage"][0]{
    ...,
    _id,
    _type,
    "slug": slug.current,
    title,
    description,
    ${pageBuilderFragment}
  }`);

export const querySlugPageData = defineQuery(`
  *[_type == "page" && slug.current == $slug][0]{
    ...,
    "slug": slug.current,
    ${pageBuilderFragment}
  }
`);

export const querySlugPagePaths = defineQuery(/* groq */ `
  *[_type == "page" && defined(slug.current) && seoNoIndex != true].slug.current
`);

export const queryBlogIndexPageData = defineQuery(`
  *[_type == "blogIndex"][0]{
    ...,
    _id,
    _type,
    title,
    description,
    "featuredBlogs": featured[]->{
      ${blogCardFragment}
    },
    ${pageBuilderFragment},
    "slug": slug.current,
    "blogs": *[_type == "blog" && (seoHideFromLists != true)] | order(publishedAt desc){
      ${blogCardFragment}
    }
  }
`);

export const queryBlogSlugPageData = defineQuery(/* groq */ `
  *[_type == "blog" && slug.current == $slug][0]{
    ...,
    "slug": slug.current,
    ${blogAuthorFragment},
    ${imageFragment},
    ${richTextFragment},
    ${pageBuilderFragment}
  }
`);

export const queryBlogPaths = defineQuery(`
  *[_type == "blog" && defined(slug.current) && seoNoIndex != true].slug.current
`);

const ogFieldsFragment = /* groq */ `
  _id,
  _type,
  "title": select(
    defined(ogTitle) => ogTitle,
    defined(seoTitle) => seoTitle,
    title
  ),
  "description": select(
    defined(ogDescription) => ogDescription,
    defined(seoDescription) => seoDescription,
    description
  ),
  "image": select(
    defined(image.asset) => image.asset->url + "?w=1200&h=630&dpr=2&fit=crop",
    defined(seoImage.asset) => seoImage.asset->url + "?w=1200&h=630&dpr=2&fit=crop"
  ),
  "seoImage": seoImage.asset->url + "?w=1200&h=630&dpr=2&fit=max",
  "logo": *[_type == "settings"][0].logo.asset->url + "?w=960&h=320&fit=max&q=100"
`;

export const queryHomePageOGData = defineQuery(/* groq */ `
  *[_type == "homePage" && _id == $id][0]{
    ${ogFieldsFragment}
  }
`);

export const querySlugPageOGData = defineQuery(/* groq */ `
  *[_type == "page" && _id == $id][0]{
    ${ogFieldsFragment}
  }
`);

export const queryBlogPageOGData = defineQuery(/* groq */ `
  *[_type == "blog" && _id == $id][0]{
    ${ogFieldsFragment}
  }
`);

export const queryGenericPageOGData = defineQuery(/* groq */ `
  *[ defined(slug.current) && _id == $id][0]{
    ${ogFieldsFragment}
  }
`);

export const queryFooterData = defineQuery(`
  *[_type == "footer" && _id == "footer"][0]{
    _id,
    subtitle,
    columns[]{
      _key,
      title,
      links[]{
        _key,
        name,
        "openInNewTab": url.openInNewTab,
        "href": select(
          url.type == "internal" => select(
            url.internal->_type == "homePage" => "/",
            url.internal->slug.current
          ),
          url.type == "external" => url.external,
          url.href
        ),
      }
    }
  }
`);

export const queryNavbarData = defineQuery(/* groq */ `
  *[_type == "navbar" && _id == "navbar"][0]{
    _id,
    columns[]{
      _key,
      _type == "navbarColumn" => {
        "type": "column",
        title,
        links[]{
          _key,
          name,
          icon,
          description,
          "openInNewTab": url.openInNewTab,
          "href": select(
            url.type == "internal" => select(
              url.internal->_type == "homePage" => "/",
              url.internal->slug.current
            ),
            url.type == "external" => url.external,
            url.href
          )
        }
      },
      _type == "navbarLink" => {
        "type": "link",
        name,
        description,
        "openInNewTab": url.openInNewTab,
        "href": select(
          url.type == "internal" => select(
            url.internal->_type == "homePage" => "/",
            url.internal->slug.current
          ),
          url.type == "external" => url.external,
          url.href
        )
      }
    },
    ${buttonsFragment},
    "logo": *[_type == "settings"][0].logo.asset->url + "?w=80&h=40&dpr=3&fit=max",
    "siteTitle": *[_type == "settings"][0].siteTitle,
  }
`);

export const querySitemapData = defineQuery(/* groq */ `{
  "slugPages": *[_type == "page" && defined(slug.current) && seoNoIndex != true]{
    "slug": slug.current,
    "lastModified": _updatedAt
  },
  "blogPages": *[_type == "blog" && defined(slug.current) && seoNoIndex != true]{
    "slug": slug.current,
    "lastModified": _updatedAt
  }
}`);

export const queryGlobalSeoSettings = defineQuery(`
  *[_type == "settings"][0]{
    _id,
    _type,
    siteTitle,
    logo {
      ${imageFields}
    },
    siteDescription,
    socialLinks{
      linkedin,
      facebook,
      twitter,
      instagram,
      youtube
    }
  }
`);

export const querySettingsData = defineQuery(`
  *[_type == "settings"][0]{
    _id,
    _type,
    siteTitle,
    siteDescription,
    "logo": logo.asset->url + "?w=80&h=40&dpr=3&fit=max",
    "socialLinks": socialLinks,
    "contactEmail": contactEmail,
    "contactPhone": contactPhone,
    "primaryAddress": primaryAddress,
    officeHours,
    inquiryTypes,
    mapUrl,
  }
`);

/**
 * Type-reference query for image shape inference (not for runtime fetching).
 */
export const queryImageType = defineQuery(`
  *[_type == "page" && defined(image)][0]{
    ${imageFragment}
  }.image
`);
