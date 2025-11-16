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
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  const artifacts = useQuery(api.artifacts.listArtifacts, {
    categoryId: selectedCategory || undefined,
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
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-2xl font-bold text-[#1A1A1A]">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F0E8] py-12 px-5 md:px-10">
      <div className="max-w-6xl mx-auto">
        <header className="mb-12">
          <h1 className="text-5xl md:text-6xl font-black text-[#1A1A1A] mb-4 tracking-tight">
            Artifact Vault
          </h1>
          <p className="text-xl text-[#4A4A4A] max-w-2xl">
            Manage your Claude artifacts with ease. Create, organize, and share code blocks securely.
          </p>
        </header>

        <div className="flex flex-wrap gap-4 mb-8">
          <button
            onClick={() => {
              setShowCreateArtifact(!showCreateArtifact);
              setShowCreateCategory(false);
            }}
            className="bg-[#1A1A1A] text-[#F5F0E8] px-8 py-3 rounded-full font-semibold hover:-translate-y-0.5 hover:shadow-lg transition-all duration-300"
          >
            {showCreateArtifact ? 'Close Form' : 'Create Artifact'}
          </button>

          <button
            onClick={() => {
              setShowCreateCategory(!showCreateCategory);
              setShowCreateArtifact(false);
            }}
            className="bg-[#003566] text-white px-8 py-3 rounded-full font-semibold hover:-translate-y-0.5 hover:shadow-lg transition-all duration-300"
          >
            {showCreateCategory ? 'Close Form' : 'Create Category'}
          </button>
        </div>

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

        <div className="mb-8">
          <label htmlFor="category-filter" className="block text-sm font-semibold text-[#1A1A1A] mb-2">
            Filter by Category
          </label>
          <select
            id="category-filter"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FFD60A] focus:border-transparent bg-white"
          >
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <p className="text-[#4A4A4A]">
            {artifacts.length} artifact{artifacts.length !== 1 ? 's' : ''} found
          </p>
        </div>

        <div className="space-y-8">
          {artifacts.length === 0 ? (
            <div className="bg-white p-12 rounded-2xl text-center">
              <h3 className="text-2xl font-bold text-[#1A1A1A] mb-4">No artifacts yet</h3>
              <p className="text-[#4A4A4A] mb-6">
                Create your first artifact to get started!
              </p>
              <button
                onClick={() => setShowCreateArtifact(true)}
                className="bg-[#FFD60A] text-[#1A1A1A] px-8 py-3 rounded-full font-semibold hover:-translate-y-0.5 hover:shadow-lg transition-all duration-300"
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