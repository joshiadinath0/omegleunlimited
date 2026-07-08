export const dynamic = 'force-static';
import { MetadataRoute } from 'next'

const COMPETITORS = ["ometv", "chatroulette", "monkey", "emerald-chat", "omegle-web", "chathub"];
const ROOMS = ["anime", "gaming", "kpop", "roblox", "tiktok", "snapchat", "bored", "movies"];
const POSTS = ["omegle-unban-guide", "is-omegle-coming-back", "how-to-be-safe-on-random-video-chat"];

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://omegleunlimited.com'
  
  const alternatives = COMPETITORS.map((slug) => ({
    url: `${baseUrl}/alternative/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  const rooms = ROOMS.map((slug) => ({
    url: `${baseUrl}/room/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  const blogs = POSTS.map((slug) => ({
    url: `${baseUrl}/blog/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [
    {
      url: `${baseUrl}`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/chat`,
      lastModified: new Date(),
      changeFrequency: 'always',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.4,
    },
    ...alternatives,
    ...rooms,
    ...blogs
  ]
}
