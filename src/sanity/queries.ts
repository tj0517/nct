export const homepageQuery = `*[_type == "homepage" && _id == "homepage"][0]`;
export const headerQuery = `*[_type == "header" && _id == "header"][0]`;
export const footerQuery = `*[_type == "footer" && _id == "footer"][0]`;
export const siteSettingsQuery = `*[_type == "siteSettings" && _id == "siteSettings"][0]`;
export const formsAndBookingQuery = `*[_type == "formsAndBooking" && _id == "formsAndBooking"][0]`;

// `hasVideo` is deliberately absent: the `teacher` schema has no such field,
// so the "Watch intro" button stays in code (docs/deferred-tasks.md, NCT-3.04).
export const teachersQuery = `*[_type == "teacher"] | order(order asc) {
  name,
  credential,
  bio,
  image
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
