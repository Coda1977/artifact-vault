'use client';

import { useState } from 'react';
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { ArtifactCard } from './ArtifactCard';
import { CreateArtifactForm } from './CreateArtifactForm';
import { CreateCategoryForm } from './CreateCategoryForm';
import { useMutation } from 'convex/react';
import { Id } from '@/convex/_generated/dataModel';

export function AdminDashboard() {
  const [showCreateArtifact, setShowCreateArtifact] = useState(false);
  const [showCreateCategory, setShowCreateCategory] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Id<"categories"> | undefined>(undefined);

  const artifacts = useQuery(api.artifacts.listArtifacts, {
    categoryId: selectedCategory,
  });
  const categories = useQuery(api.categories.listCategories);
  const deleteArtifact = useMutation(api.artifacts.deleteArtifact);

  const handleDeleteArtifact = async (id: Id<"artifacts">) => {
    if (confirm('Are you sure you want to delete this artifact?')) {
      try {
        await deleteArtifact({ artifactId: id });
      } catch (error) {
        console.error('Failed to delete artifact:', error);
        alert('Failed to delete artifact. Please try again.');
      }
    }
  };

  if (!artifacts || !categories) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#FDFCFB]">
        <div className="text-sm text-gray-500">Loading...</div>
      </div>
    );
  }

  // Group artifacts by category
  const groupedArtifacts = artifacts.reduce((acc, artifact) => {
    const categoryName = artifact.category?.name || 'Uncategorized';
    if (!acc[categoryName]) {
      acc[categoryName] = [];
    }
    acc[categoryName].push(artifact);
    return acc;
  }, {} as Record<string, typeof artifacts>);

  return (
    <div className="bg-[#FDFCFB] dark:bg-[#111827] text-gray-900 dark:text-gray-100 transition-colors duration-300 min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* Header */}
        <header className="mb-12">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 dark:text-white">
            Artifact Vault
          </h1>
          <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
            Welcome, Yonatan
          </p>
        </header>

        {/* Filter and Actions Section */}
        <section className="mb-12 p-6 rounded-lg bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200 dark:border-gray-700">
          <div className="flex flex-wrap items-center justify-between gap-6">
            <div className="flex-grow min-w-[200px]">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor="category-filter">
                Filter by Category
              </label>
              <div className="relative">
                <select
                  className="w-full appearance-none rounded-lg border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 py-2 pl-3 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  id="category-filter"
                  value={selectedCategory || ''}
                  onChange={(e) => setSelectedCategory(e.target.value ? e.target.value as Id<"categories"> : undefined)}
                >
                  <option value="">All Components</option>
                  {categories.map((category) => (
                    <option key={category._id} value={category._id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex items-center gap-4 flex-wrap">
              <button
                onClick={() => {
                  setShowCreateArtifact(!showCreateArtifact);
                  setShowCreateCategory(false);
                }}
                className="bg-[#FBBF24] text-black font-bold py-2 px-6 rounded-full hover:opacity-90 transition-opacity shadow-sm"
              >
                Create Artifact
              </button>
              <button
                onClick={() => {
                  setShowCreateCategory(!showCreateCategory);
                  setShowCreateArtifact(false);
                }}
                className="bg-blue-600 text-white font-bold py-2 px-6 rounded-full hover:bg-blue-700 transition-colors shadow-sm"
              >
                Create Category
              </button>
            </div>
          </div>
        </section>

        {/* Forms */}
        {showCreateArtifact && (
          <div className="mb-12">
            <CreateArtifactForm
              onSuccess={() => setShowCreateArtifact(false)}
              onCancel={() => setShowCreateArtifact(false)}
            />
          </div>
        )}

        {showCreateCategory && (
          <div className="mb-12">
            <CreateCategoryForm
              onSuccess={() => setShowCreateCategory(false)}
              onCancel={() => setShowCreateCategory(false)}
            />
          </div>
        )}

        {/* Artifacts by Category */}
        <main className="space-y-16">
          {artifacts.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">📦</div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">No artifacts yet</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Create your first artifact to get started
              </p>
              <button
                onClick={() => setShowCreateArtifact(true)}
                className="bg-[#FBBF24] text-black font-bold py-2 px-6 rounded-full hover:opacity-90 transition-opacity shadow-sm"
              >
                Create First Artifact
              </button>
            </div>
          ) : (
            Object.entries(groupedArtifacts).map(([categoryName, categoryArtifacts]) => (
              <section key={categoryName}>
                <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
                  {categoryName}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {categoryArtifacts.map((artifact) => (
                    <ArtifactCard
                      key={artifact._id}
                      id={artifact._id}
                      name={artifact.name}
                      category={artifact.category}
                      slug={artifact.slug}
                      code={artifact.code}
                      onDelete={() => handleDeleteArtifact(artifact._id)}
                    />
                  ))}
                </div>
              </section>
            ))
          )}
        </main>
      </div>
    </div>
  );
}