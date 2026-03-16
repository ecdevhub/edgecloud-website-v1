import SlugifyLib from "slugify";

export function slugify(text: string): string {
  return SlugifyLib(text, {
    lower: true,
    strict: true,
    trim: true,
  });
}

export function generateUniqueSlug(title: string, existing: string[] = []): string {
  let slug = slugify(title);
  if (!existing.includes(slug)) return slug;
  let i = 2;
  while (existing.includes(`${slug}-${i}`)) i++;
  return `${slug}-${i}`;
}
