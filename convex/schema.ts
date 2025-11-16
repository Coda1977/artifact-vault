import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  artifacts: defineTable({
    name: v.string(),
    categoryId: v.optional(v.id("categories")),
    slug: v.string(),
    code: v.string(),
  })
    .index("by_slug", ["slug"])
    .index("by_category", ["categoryId"]),
  
  categories: defineTable({
    name: v.string(),
  }),
});