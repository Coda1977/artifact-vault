import { v } from "convex/values";
import { mutation, query, QueryCtx, MutationCtx } from "./_generated/server";
import { Id } from "./_generated/dataModel";
import { ConvexError } from "convex/values";

// Generate a slug from a name
function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .substring(0, 100);
}

// Ensure slug is unique by appending a counter if needed
async function ensureUniqueSlug(ctx: QueryCtx | MutationCtx, baseSlug: string): Promise<string> {
  let slug = baseSlug;
  let counter = 1;

  while (true) {
    const existing = await ctx.db
      .query("artifacts")
      .withIndex("by_slug", (q) => q.eq("slug", slug))
      .first();

    if (!existing) {
      return slug;
    }

    slug = `${baseSlug}-${counter}`;
    counter++;
  }
}

export const listArtifacts = query({
  args: {
    categoryId: v.optional(v.id("categories")),
  },
  handler: async (ctx: QueryCtx, args) => {
    let artifacts;

    if (args.categoryId) {
      artifacts = await ctx.db
        .query("artifacts")
        .withIndex("by_category", (q) => q.eq("categoryId", args.categoryId))
        .collect();
    } else {
      artifacts = await ctx.db.query("artifacts").collect();
    }

    // Fetch categories for the artifacts
    const categories = await ctx.db.query("categories").collect();
    const categoryMap = new Map(categories.map(c => [c._id, c]));

    return artifacts.map(artifact => ({
      ...artifact,
      category: artifact.categoryId ? categoryMap.get(artifact.categoryId) : null,
    }));
  },
});

export const deleteArtifact = mutation({
  args: {
    artifactId: v.id("artifacts"),
  },
  handler: async (ctx: MutationCtx, args) => {
    await ctx.db.delete(args.artifactId);
    return { success: true };
  },
});

export const getArtifactBySlug = query({
  args: {
    slug: v.string(),
  },
  handler: async (ctx: QueryCtx, args) => {
    const artifact = await ctx.db
      .query("artifacts")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .first();

    if (!artifact) {
      return null;
    }

    const category = artifact.categoryId
      ? await ctx.db.get(artifact.categoryId)
      : null;

    return {
      ...artifact,
      category,
    };
  },
});

export const createArtifact = mutation({
  args: {
    name: v.string(),
    categoryId: v.optional(v.id("categories")),
    code: v.string(),
  },
  handler: async (ctx: MutationCtx, args) => {
    const baseSlug = generateSlug(args.name);
    const slug = await ensureUniqueSlug(ctx, baseSlug);

    const artifactId = await ctx.db.insert("artifacts", {
      name: args.name,
      categoryId: args.categoryId,
      slug,
      code: args.code,
    });

    const artifact = await ctx.db.get(artifactId);
    return artifact;
  },
});

export const updateArtifact = mutation({
  args: {
    artifactId: v.id("artifacts"),
    name: v.string(),
    categoryId: v.optional(v.id("categories")),
    code: v.string(),
  },
  handler: async (ctx: MutationCtx, args) => {
    console.log("updateArtifact called with args:", args);
    try {
      const existing = await ctx.db.get(args.artifactId);
      if (!existing) {
        throw new ConvexError("Artifact not found");
      }

      // Prepare patch data
      const patchData: any = {
        name: args.name,
        code: args.code,
      };
      if (args.categoryId !== undefined) {
        patchData.categoryId = args.categoryId;
      }

      console.log("Applying patch:", patchData);
      await ctx.db.patch(args.artifactId, patchData);

      return await ctx.db.get(args.artifactId);
    } catch (e: any) {
      console.error("Failed to update artifact:", e);
      // Ensure it's a ConvexError to be visible to client
      if (e instanceof ConvexError) {
        throw e;
      }
      throw new ConvexError(`Failed to update artifact: ${e.message || e.toString()}`);
    }
  },
});

export const updateArtifactDebug = mutation({
  args: v.any(),
  handler: async (ctx: MutationCtx, args: any) => {
    console.log("updateArtifactDebug called with args:", args);
    try {
      const artifactId = args.artifactId as Id<"artifacts">;
      const existing = await ctx.db.get(artifactId);
      if (!existing) {
        throw new ConvexError("Artifact not found");
      }

      // Prepare patch data
      const patchData: any = {
        name: args.name,
        code: args.code,
      };
      // Handle categoryId
      if (args.categoryId && typeof args.categoryId === 'string' && args.categoryId.length > 0) {
        patchData.categoryId = args.categoryId as Id<"categories">;
      }

      console.log("Applying patch in debug mode:", patchData);
      await ctx.db.patch(artifactId, patchData);

      return await ctx.db.get(artifactId);
    } catch (e: any) {
      console.error("Failed to update artifact (DEBUG):", e);
      if (e instanceof ConvexError) throw e;
      throw new ConvexError(`Debug update failed: ${e.message || e.toString()}`);
    }
  },
});