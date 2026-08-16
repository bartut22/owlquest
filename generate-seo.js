import fs from 'fs';
import path from 'path'; 

// 1. Define your base URL
const BASE_URL = 'https://yourdomain.com'; 

// 2. Fetch or list your dynamic/static paths
async function getRoutes() {
// Add static paths manually
const staticRoutes = ['', '/about', '/contact']; 

// Example: Fetch dynamic paths from your API if needed
// const response = await fetch('https://api.yourdomain.com/posts');
// const posts = await response.json();
// const dynamicRoutes = posts.map(post => /posts/${post.slug});
const dynamicRoutes = []; 

return [...staticRoutes, ...dynamicRoutes];
} 

async function generate() {
const routes = await getRoutes(); 

// Generate Sitemap XML
const sitemap = `<?xml version="1.0" encoding="UTF-8"?> 

`; 

// Generate Robots.txt
const robots = `User-agent: *
Allow: / 

Sitemap: ${BASE_URL}/sitemap.xml`; 

// Ensure public directory exists and write files
const publicDir = path.resolve('public');
if (!fs.existsSync(publicDir)) {
fs.mkdirSync(publicDir);
} 

fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemap);
fs.writeFileSync(path.join(publicDir, 'robots.txt'), robots); 

console.log('✅ sitemap.xml and robots.txt generated in /public');
} 

generate();
