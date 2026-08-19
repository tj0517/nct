import { defineType, defineField } from "sanity";

export const homepage = defineType({
  name: "homepage",
  title: "Homepage",
  type: "document",
  fields: [
    // Meta
    defineField({
      name: "metaTitle",
      title: "Meta Title",
      type: "localizedString",
      group: "meta",
    }),
    defineField({
      name: "metaDescription",
      title: "Meta Description",
      type: "localizedText",
      group: "meta",
    }),
    // Hero
    defineField({
      name: "heroHeadlineLine1",
      title: "Hero Headline Line 1",
      type: "localizedString",
      group: "hero",
    }),
    defineField({
      name: "heroHeadlineItalic",
      title: "Hero Headline Italic Part",
      type: "localizedString",
      group: "hero",
    }),
    defineField({
      name: "heroHeadlineBold",
      title: "Hero Headline Bold Part",
      type: "localizedString",
      group: "hero",
    }),
    defineField({
      name: "heroSubtitle",
      title: "Hero Subtitle",
      type: "localizedText",
      group: "hero",
    }),
    defineField({
      name: "heroCtaPrimary",
      title: "Hero Primary CTA",
      type: "localizedString",
      group: "hero",
    }),
    defineField({
      name: "heroCtaPhone",
      title: "Hero Phone CTA",
      type: "string",
      group: "hero",
    }),
    // Trust Bar
    defineField({
      name: "trustBarBadges",
      title: "Trust Bar Badges",
      type: "array",
      group: "trustBar",
      of: [
        {
          type: "object",
          fields: [
            { name: "heading", title: "Heading", type: "localizedString" },
            { name: "cta", title: "CTA Text", type: "localizedString" },
          ],
        },
      ],
    }),
    // About
    defineField({
      name: "aboutHeading",
      title: "About Heading",
      type: "localizedString",
      group: "about",
    }),
    defineField({
      name: "aboutBody",
      title: "About Body",
      type: "localizedText",
      group: "about",
    }),
    defineField({
      name: "aboutCta",
      title: "About CTA",
      type: "localizedString",
      group: "about",
    }),
    defineField({
      name: "aboutImageAlt",
      title: "About Image Alt",
      type: "localizedString",
      group: "about",
    }),
    // Who We Teach
    defineField({
      name: "whoWeTeachLabel",
      title: "Who We Teach Label",
      type: "localizedString",
      group: "whoWeTeach",
    }),
    defineField({
      name: "whoWeTeachHeading",
      title: "Who We Teach Heading",
      type: "localizedString",
      group: "whoWeTeach",
    }),
    defineField({
      name: "whoWeTeachCategories",
      title: "Who We Teach Categories",
      type: "array",
      group: "whoWeTeach",
      of: [
        {
          type: "object",
          fields: [
            { name: "name", title: "Name", type: "localizedString" },
            { name: "href", title: "Href", type: "string" },
            { name: "description", title: "Description", type: "localizedText" },
          ],
        },
      ],
    }),
    // Teachers
    defineField({
      name: "teachersLabel",
      title: "Teachers Section Label",
      type: "localizedString",
      group: "teachers",
    }),
    defineField({
      name: "teachersHeading",
      title: "Teachers Section Heading",
      type: "localizedString",
      group: "teachers",
    }),
    // Testimonials
    defineField({
      name: "testimonialsLabel",
      title: "Testimonials Section Label",
      type: "localizedString",
      group: "testimonials",
    }),
    defineField({
      name: "testimonialsHeading",
      title: "Testimonials Section Heading",
      type: "localizedString",
      group: "testimonials",
    }),
    // Pricing
    defineField({
      name: "pricingLabel",
      title: "Pricing Label",
      type: "localizedString",
      group: "pricing",
    }),
    defineField({
      name: "pricingHeading",
      title: "Pricing Heading",
      type: "localizedString",
      group: "pricing",
    }),
    defineField({
      name: "pricingFreeLabel",
      title: "Free Label",
      type: "localizedString",
      group: "pricing",
    }),
    defineField({
      name: "pricingFreePrice",
      title: "Free Price",
      type: "localizedString",
      group: "pricing",
    }),
    defineField({
      name: "pricingFreeDesc",
      title: "Free Description",
      type: "localizedString",
      group: "pricing",
    }),
    defineField({
      name: "pricingFreeBody",
      title: "Free Body",
      type: "localizedText",
      group: "pricing",
    }),
    defineField({
      name: "pricingFreeCta",
      title: "Free CTA",
      type: "localizedString",
      group: "pricing",
    }),
    defineField({
      name: "pricingRows",
      title: "Pricing Rows",
      type: "array",
      group: "pricing",
      of: [
        {
          type: "object",
          fields: [
            { name: "name", title: "Name", type: "localizedString" },
            { name: "type", title: "Type", type: "localizedString" },
            { name: "price", title: "Price", type: "localizedString" },
          ],
        },
      ],
    }),
    // Booking
    defineField({
      name: "bookingLabel",
      title: "Booking Label",
      type: "localizedString",
      group: "booking",
    }),
    defineField({
      name: "bookingHeading",
      title: "Booking Heading",
      type: "localizedText",
      group: "booking",
    }),
    defineField({
      name: "bookingBody",
      title: "Booking Body",
      type: "localizedText",
      group: "booking",
    }),
    defineField({
      name: "bookingLocationNote",
      title: "Location Note",
      type: "localizedText",
      group: "booking",
    }),
    defineField({
      name: "bookingNamePlaceholder",
      title: "Name Placeholder",
      type: "localizedString",
      group: "booking",
    }),
    defineField({
      name: "bookingEmailPlaceholder",
      title: "Email Placeholder",
      type: "localizedString",
      group: "booking",
    }),
    defineField({
      name: "bookingPhonePlaceholder",
      title: "Phone Placeholder",
      type: "localizedString",
      group: "booking",
    }),
    defineField({
      name: "bookingInPerson",
      title: "In Person Label",
      type: "localizedString",
      group: "booking",
    }),
    defineField({
      name: "bookingOnline",
      title: "Online Label",
      type: "localizedString",
      group: "booking",
    }),
    defineField({
      name: "bookingMessagePlaceholder",
      title: "Message Placeholder",
      type: "localizedString",
      group: "booking",
    }),
    defineField({
      name: "bookingSubmitCta",
      title: "Submit CTA",
      type: "localizedString",
      group: "booking",
    }),
    defineField({
      name: "bookingModalHeading",
      title: "Modal Heading",
      type: "localizedString",
      group: "booking",
    }),
    // Map
    defineField({
      name: "mapLabel",
      title: "Map Label",
      type: "localizedString",
      group: "map",
    }),
    defineField({
      name: "mapHeading",
      title: "Map Heading",
      type: "localizedString",
      group: "map",
    }),
    defineField({
      name: "mapDescription",
      title: "Map Description",
      type: "localizedText",
      group: "map",
    }),
    // FAQ
    defineField({
      name: "faqLabel",
      title: "FAQ Label",
      type: "localizedString",
      group: "faq",
    }),
    defineField({
      name: "faqHeading",
      title: "FAQ Heading",
      type: "localizedString",
      group: "faq",
    }),
    defineField({
      name: "faqItems",
      title: "FAQ Items",
      type: "array",
      group: "faq",
      of: [
        {
          type: "object",
          fields: [
            { name: "question", title: "Question", type: "localizedText" },
            { name: "answer", title: "Answer", type: "localizedText" },
          ],
        },
      ],
    }),
  ],
  groups: [
    { name: "meta", title: "Meta" },
    { name: "hero", title: "Hero" },
    { name: "trustBar", title: "Trust Bar" },
    { name: "about", title: "About" },
    { name: "whoWeTeach", title: "Who We Teach" },
    { name: "teachers", title: "Teachers" },
    { name: "testimonials", title: "Testimonials" },
    { name: "pricing", title: "Pricing" },
    { name: "booking", title: "Booking" },
    { name: "map", title: "Map" },
    { name: "faq", title: "FAQ" },
  ],
});
