export const generateProductUrl = (category: string, id: number): string => {
  // Convert category to URL-friendly format
  const urlCategory = category.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  return `/${urlCategory}/${id}`;
};
