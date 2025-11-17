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
      <div className="flex items-center justify-center min-h-screen bg-[#F5F0E8]">
        <div className="text-2xl font-bold text-[#1A1A1A]">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F0E8]">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Simple Header */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-black text-[#1A1A1A] mb-2">
            Artifact Vault
          </h1>
          <p className="text-lg text-[#4A4A4A]">
            Manage your Claude artifacts
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 mb-8">
          <button
            onClick={() => {
              setShowCreateArtifact(!showCreateArtifact);
              setShowCreateCategory(false);
            }}
            className="bg-[#1A1A1A] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#2A2A2A] transition-colors"
          >
            {showCreateArtifact ? 'Cancel' : '+ New Artifact'}
          </button>

          <button
            onClick={() => {
              setShowCreateCategory(!showCreateCategory);
              setShowCreateArtifact(false);
            }}
            className="bg-[#003566] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#004477] transition-colors"
          >
            {showCreateCategory ? 'Cancel' : '+ New Category'}
          </button>
        </div>

        {/* Forms */}
        {showCreateArtifact && (
          <div className="mb-8">
            <CreateArtifactForm
              onSuccess={() => setShowCreateArtifact(false)}
              onCancel={() => setShowCreateArtifact(false)}
            />
          </div>
        )}

        {showCreateCategory && (
          <div className="mb-8">
            <CreateCategoryForm
              onSuccess={() => setShowCreateCategory(false)}
              onCancel={() => setShowCreateCategory(false)}
            />
          </div>
        )}

        {/* Filter and Count */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div>
            <label htmlFor="category-filter" className="block text-sm font-semibold text-[#1A1A1A] mb-2">
              Filter
            </label>
            <select
              id="category-filter"
              value={selectedCategory || ''}
              onChange={(e) => setSelectedCategory(e.target.value ? e.target.value as Id<"categories"> : undefined)}
              className="px-4 py-2 border border-gray-300 rounded-lg bg-white font-medium"
            >
              <option value="">All Categories</option>
              {categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          
          <div className="text-sm text-[#4A4A4A]">
            {artifacts.length} {artifacts.length === 1 ? 'artifact' : 'artifacts'}
          </div>
        </div>

        {/* Artifacts List */}
        <div className="space-y-6">
          {artifacts.length === 0 ? (
            <div className="bg-white p-12 rounded-2xl text-center">
              <div className="text-5xl mb-4">📦</div>
              <h3 className="text-2xl font-bold text-[#1A1A1A] mb-2">No artifacts yet</h3>
              <p className="text-[#4A4A4A] mb-6">
                Create your first artifact to get started
              </p>
              <button
                onClick={() => setShowCreateArtifact(true)}
                className="bg-[#FFD60A] text-[#1A1A1A] px-8 py-3 rounded-xl font-semibold hover:bg-[#FFC700] transition-colors"
              >
                Create First Artifact
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