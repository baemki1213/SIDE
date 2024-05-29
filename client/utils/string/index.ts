const getLastCategory = (string: string) => {
  const categories = string.split(">");
  return categories[categories.length - 1].trim();
};

export { getLastCategory };
