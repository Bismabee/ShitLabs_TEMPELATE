// src/utils/slugify.js
export const validateSlug = (slug) => {
  return /^[a-z0-9-]+$/.test(slug);
};

export const slugify = (text) => {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
};
