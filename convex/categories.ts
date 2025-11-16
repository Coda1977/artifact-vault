import { v } from "convex/values";
import { mutation, query, QueryCtx, MutationCtx } from "./_generated/server";

export const listCategories = query({
  args: {},
  handler: async (ctx: QueryCtx) => {
    const categories = await ctx.db.query("categories").collect();
    return categories;
  },
});

export const createCategory = mutation({
  args: {
    name: v.string(),
  },
  handler: async (ctx: MutationCtx, args) => {
    const categoryId = await ctx.db.insert("categories", {
      name: args.name,
    });
    
    const category = await ctx.db.get(categoryId);
    return category;
  },
});

export const deleteCategory = mutation({
  args: {
    categoryId: v.id("categories"),
  },
  handler: async (ctx: MutationCtx, args) => {
    // Check if category has artifacts
    const artifacts = await ctx.db
      .query("artifacts")
      .withIndex("by_category", (q) => q.eq("categoryId", args.categoryId))
      .collect();
    
    if (artifacts.length > 0) {
      throw new Error("Cannot delete category with artifacts");
    }
    
    await ctx.db.delete(args.categoryId);
    return true;
  },
});