export function createSlug(name) {
    return name
        .toLowerCase()          // Convert to lowercase
        .replace(/\s+/g, '-')   // Replace spaces with hyphens
        .replace(/[^a-z0-9\-]/g, ''); // Remove any non-alphanumeric characters except hyphens
}