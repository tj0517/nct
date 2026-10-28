// `about` is re-projected so an uploaded film resolves to its CDN URL; the
// spread keeps every other homepage field exactly as it was.
export const homepageQuery = `*[_type == "homepage" && _id == "homepage"][0]{
  ...,
  about { ..., "videoUrl": coalesce(video.asset->url, videoUrl) }
}`;
export const headerQuery = `*[_type == "header" && _id == "header"][0]`;
export const footerQuery = `*[_type == "footer" && _id == "footer"][0]`;
export const siteSettingsQuery = `*[_type == "siteSettings" && _id == "siteSettings"][0]`;
export const polishLiveQuery = `*[_type == "siteSettings" && _id == "siteSettings"][0].polishLive`;
export const formsAndBookingQuery = `*[_type == "formsAndBooking" && _id == "formsAndBooking"][0]`;

// `videoUrl` drives the "Watch intro" button: empty means no button at all, so
// the card never offers a film that doesn't exist (Anthony 2026-10-07). An
// uploaded MP4 resolves to its Sanity CDN URL and wins over a pasted link.
export const teachersQuery = `*[_type == "teacher"] | order(order asc) {
  name,
  credential,
  bio,
  image,
  "videoUrl": coalesce(video.asset->url, videoUrl)
}`;

export const testimonialsQuery = `*[_type == "testimonial"] | order(order asc) {
  author,
  role,
  quote,
  image
}`;

export const adultsPageQuery = `*[_type == "adultsPage" && _id == "adultsPage"][0]`;
export const businessPageQuery = `*[_type == "businessPage" && _id == "businessPage"][0]`;
export const childrenPageQuery = `*[_type == "childrenPage" && _id == "childrenPage"][0]`;
export const mathsPageQuery = `*[_type == "mathsPage" && _id == "mathsPage"][0]`;
export const universityPageQuery = `*[_type == "universityPage" && _id == "universityPage"][0]`;
export const faqPageQuery = `*[_type == "faqPage" && _id == "faqPage"][0]`;
