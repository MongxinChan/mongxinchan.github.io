import { defineCollection, z } from "astro:content";

const postsCollection = defineCollection({
	schema: z.object({
		title: z.string(),
		published: z.date(),
		updated: z.date().optional(),
		draft: z.boolean().optional().default(false),
		description: z.string().optional().default(""),
		image: z.string().optional().default(""),
		tags: z.array(z.string()).optional().default([]),
		category: z.string().optional().nullable().default(""),
		lang: z.string().optional().default(""),

		/* For internal use */
		prevTitle: z.string().default(""),
		prevSlug: z.string().default(""),
		nextTitle: z.string().default(""),
		nextSlug: z.string().default(""),
	}),
});
const specCollection = defineCollection({
	schema: z.object({}),
});
const moviesCollection = defineCollection({
	schema: z.object({
		title: z.string(),
		poster: z.string().optional().default(""),
		genre: z.string().optional().default(""),
		region: z.string().optional().default(""),
		director: z.string().optional().default(""),
		year: z.number().optional(),
		date: z.date().optional(),
	}),
});
const musicCollection = defineCollection({
	schema: z.object({
		title: z.string().optional().default(""),
		description: z.string().optional().default(""),
		category: z.string().optional().default("All"),
		albums: z.array(
			z.object({
				title: z.string(),
				artist: z.string(),
				cover: z.string(),
				audio: z.string(),
				published: z.date().optional(),
			})
		).optional().default([]),
	}),
});

export const collections = {
	posts: postsCollection,
	spec: specCollection,
	movies: moviesCollection,
	music: musicCollection,
};
