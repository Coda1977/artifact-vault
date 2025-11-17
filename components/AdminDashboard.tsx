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
      <div className="flex items-center justify-center min-h-screen bg-white">
        <div className="text-sm text-gray-500">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-5xl mx-auto px-6 py-12">
        {/* Notion-style Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Artifact Vault
          </h1>
          <p className="text-base text-gray-500">
            Manage your Claude artifacts
          </p>
        </div>

        {/* Notion-style Action Bar */}
        <div className="flex items-center gap-2 mb-6">
          <button
            onClick={() => {
              setShowCreateArtifact(!showCreateArtifact);
              setShowCreateCategory(false);
            }}
            className="px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded transition-colors"
          >
            + New
          </button>

          <button
            onClick={() => {
              setShowCreateCategory(!showCreateCategory);
              setShowCreateArtifact(false);
            }}
            className="px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded transition-colors"
          >
            + Category
          </button>

          <div className="ml-auto flex items-center gap-2">
            <select
              value={selectedCategory || ''}
              onChange={(e) => setSelectedCategory(e.target.value ? e.target.value as Id<"categories"> : undefined)}
              className="px-3 py-1.5 text-sm text-gray-700 border border-gray-200 rounded hover:bg-gray-50 transition-colors"
            >
              <option value="">All</option>
              {categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
            
            <span className="text-sm text-gray-500">
              {artifacts.length} {artifacts.length === 1 ? 'item' : 'items'}
            </span>
          </div>
        </div>

        {/* Forms */}
        {showCreateArtifact && (
          <div className="mb-6">
            <CreateArtifactForm
              onSuccess={() => setShowCreateArtifact(false)}
              onCancel={() => setShowCreateArtifact(false)}
            />
          </div>
        )}

        {showCreateCategory && (
          <div className="mb-6">
            <CreateCategoryForm
              onSuccess={() => setShowCreateCategory(false)}
              onCancel={() => setShowCreateCategory(false)}
            />
          </div>
        )}

        {/* Notion-style Cards List */}
        <div className="space-y-2">
          {artifacts.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-sm text-gray-400 mb-4">No artifacts yet</p>
              <button
                onClick={() => setShowCreateArtifact(true)}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded transition-colors"
              >
                Create your first artifact
              </button>
            </div>
          ) : (
            artifacts.map((artifact) => (
              <ArtifactCard
                key={artifact._id}
                id={artifact._id}
                name={artifact.name}
                category={artifact.category}
                slug={artifact.slug}
                code={artifact.code}
                onDelete={() => handleDeleteArtifact(artifact._id)}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}