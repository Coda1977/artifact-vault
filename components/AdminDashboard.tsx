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
      <div className="flex items-center justify-center min-h-screen bg-[#F5F5F5]">
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
    <div className="min-h-screen bg-[#F5F5F5]">
      <div className="max-w-7xl mx-auto px-8 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-5xl font-black text-gray-900 mb-2">
            Artifact Vault
          </h1>
          <p className="text-xl text-gray-600">
            Welcome, Yonatan
          </p>
        </div>

        {/* Filter and Actions Bar */}
        <div className="flex items-center justify-between mb-12">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Filter by Category
            </label>
            <select
              value={selectedCategory || ''}
              onChange={(e) => setSelectedCategory(e.target.value ? e.target.value as Id<"categories"> : undefined)}
              className="px-4 py-2 pr-10 border border-gray-300 rounded-lg bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Components</option>
              {categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => {
                setShowCreateArtifact(!showCreateArtifact);
                setShowCreateCategory(false);
              }}
              className="px-6 py-2.5 bg-[#FFD60A] text-gray-900 rounded-lg font-semibold hover:bg-[#FFC700] transition-colors"
            >
              Create Artifact
            </button>

            <button
              onClick={() => {
                setShowCreateCategory(!showCreateCategory);
                setShowCreateArtifact(false);
              }}
              className="px-6 py-2.5 bg-[#1E88E5] text-white rounded-lg font-semibold hover:bg-[#1976D2] transition-colors"
            >
              Create Category
            </button>
          </div>
        </div>

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
        {artifacts.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">📦</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">No artifacts yet</h3>
            <p className="text-gray-600 mb-6">
              Create your first artifact to get started
            </p>
            <button
              onClick={() => setShowCreateArtifact(true)}
              className="px-6 py-2.5 bg-[#FFD60A] text-gray-900 rounded-lg font-semibold hover:bg-[#FFC700] transition-colors"
            >
              Create First Artifact
            </button>
          </div>
        ) : (
          Object.entries(groupedArtifacts).map(([categoryName, categoryArtifacts]) => (
            <div key={categoryName} className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                {categoryName}
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
            </div>
          ))
        )}
      </div>
    </div>
  );
}