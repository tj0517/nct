# Editing the site in Studio

This is a short guide to editing the website's text, photos and SEO details
yourself, without a developer. It covers logging in, where to find each part
of the site, how long a change takes to show up, and what not to touch.

## Logging in

The editor is called **Sanity Studio**. It lives at `/studio` on the site's
own address (ask whoever manages the Sanity project for the exact URL and for
an invite if you don't have a login yet — Studio access is separate from the
website itself and is granted per person).

Once invited, you sign in with your own email or Google account — there is no
shared password.

## Where to edit what

Studio's sidebar is grouped to match the site. Click a document, change the
field you need, then press **Publish** (top right) — a saved draft that isn't
published does not appear on the live site.

### Pages

One document per page, each split into tabs/groups so you only see fields
relevant to that part (Hero, Testimonial, SEO, etc.):

| Studio document | Site page |
|---|---|
| Homepage | `/` |
| Children & Teens | `/children` |
| Adults | `/adults` |
| University applications | `/university` |
| Business English | `/business` |
| Maths in English | `/maths` |
| FAQ | `/faq` |

On each course page (Children & Teens, Adults, University applications,
Business English, Maths in English) you can edit:
- **Hero** — the big headline, subtitle, button text and the illustration's
  description (the illustration image itself is not editable here)
- **Testimonial** — the pull-quote, the person's name and role, their photo
  (or a company logo — there's a "Photo or logo" switch; a logo is shown
  as-is, a photo is cropped round), and the photo's description
- **Help** — the "We can help you with" heading and list
- **SEO** — the page title and description shown in Google and the browser
  tab

The **FAQ** document has its own list of questions and answers, plus its own
SEO tab.

The **Homepage** document has its own tabs for the hero, the "About us"
section, the two trust badges, the "Who we teach" cards, the teachers and
testimonials section headings (the people themselves are separate — see
below), pricing, and the map section.

### Teachers and Testimonials (homepage)

Two lists, each its own item in the sidebar:
- **Teachers** — one document per teacher (name, credential, bio, photo),
  shown in "Meet your native speakers" on the homepage
- **Testimonials** — one document per quote (quote, author, role, photo),
  shown in the homepage testimonials section

Add, remove or reorder documents in either list and the homepage follows.

### Site-wide

- **Header** — the "Courses" dropdown links, the top navigation links, and
  the "Book now" button text
- **Footer** — the column labels (Phone, Email, Social, Visit us, "Designed
  in Warsaw"). The phone number, email address, physical address and social
  links themselves are not editable here yet — ask your developer
- **Forms & booking** — the free-assessment booking popup and the contact
  form that appears on every page, including its placeholder text and the
  consent line
- **Site settings** — the page title and description for the **homepage**
  (it has no SEO fields of its own), and the fallback used for any other page
  that doesn't have its own SEO filled in

## How long a change takes

Press **Publish** and the change appears on the live site within about
**60 seconds** — no redeploy, no developer needed. Refresh the page after a
minute if you don't see it right away.

If Sanity is ever unreachable, or you leave a field empty, the site quietly
shows its original built-in text instead of a blank space — it will never
break the page.

## What not to touch

- **Don't delete** a Teacher, Testimonial or FAQ document unless you mean to
  remove that person or question from the site — there's no undo for a
  deleted document.
- **Don't change a document's type or structure** — only edit the fields
  inside it.
- The **"Watch intro" button** under a teacher's card isn't editable here —
  ask your developer if that needs to change.
- The brand name, phone number, email, address and `PL`/`EN` language
  switcher in the header and footer are still fixed in the code, not in
  Studio — ask your developer to change these.
- The **Vision** tool (a query playground, if you see it in development) is
  for developers — it can read data but you won't need it for everyday
  editing.
