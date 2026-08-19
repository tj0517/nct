export const homepageQuery = `*[_type == "homepage" && _id == "homepage"][0]`;
export const headerQuery = `*[_type == "header" && _id == "header"][0]`;
export const footerQuery = `*[_type == "footer" && _id == "footer"][0]`;
export const siteSettingsQuery = `*[_type == "siteSettings" && _id == "siteSettings"][0]`;

export const teachersQuery = `*[_type == "teacher"] | order(order asc) {
  name,
  "credential": credential,
  "bio": bio,
  image,
  hasVideo,
  order
}`;

export const testimonialsQuery = `*[_type == "testimonial"] | order(order asc) {
  author,
  role,
  text,
  image,
  order
}`;

export const adultsPageQuery = `*[_type == "adultsPage" && _id == "adultsPage"][0]`;
export const businessPageQuery = `*[_type == "businessPage" && _id == "businessPage"][0]`;
export const childrenPageQuery = `*[_type == "childrenPage" && _id == "childrenPage"][0]`;
export const mathsPageQuery = `*[_type == "mathsPage" && _id == "mathsPage"][0]`;
export const universityPageQuery = `*[_type == "universityPage" && _id == "universityPage"][0]`;
