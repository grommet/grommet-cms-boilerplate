export function slugify(text) {
  let slug = text.toString().toLowerCase()
    .replace(/\s+/g, '-')        // Replace spaces with -
    .replace(/[^\w\-]+/g, '')    // Remove all non-word chars
    .replace(/\-\-+/g, '-')      // Replace multiple - with single -
    .replace(/^-+/, '')          // Trim - from start of text
    .replace(/-+$/, '');         // Trim - from end of text

  return slug.substring(0, 72);
};

export function slugifyFile(file) {
  const extension = file.substr(file.lastIndexOf('.')+1);
  let fileName = slugify(file.substr(0, file.lastIndexOf('.'))) || slugify(file);
  let sluggedFile = `${fileName}-${Date.now()}.${extension}`;
  return sluggedFile;
};
