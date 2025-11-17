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
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-2xl font-bold text-[#1A1A1A]">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F0E8] py-8 md:py-12 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Card */}
        <div className="bg-white rounded-3xl p-8 md:p-12 mb-8 shadow-lg">
          <h1 className="text-4xl md:text-6xl font-black text-[#1A1A1A] mb-3 tracking-tight">
            Artifact Vault
          </h1>
          <p className="text-lg md:text-xl text-[#4A4A4A] max-w-2xl">
            Manage your Claude artifacts with ease. Create, organize, and share code blocks securely.
          </p>
          
          <div className="flex flex-wrap gap-3 mt-8">
            <button
              onClick={() => {
                setShowCreateArtifact(!showCreateArtifact);
                setShowCreateCategory(false);
              }}
              className="bg-[#1A1A1A] text-[#F5F0E8] px-8 py-3 rounded-full font-semibold hover:-translate-y-1 hover:shadow-xl transition-all duration-300"
            >
              {showCreateArtifact ? '✕ Close' : '+ Create Artifact'}
            </button>

            <button
              onClick={() => {
                setShowCreateCategory(!showCreateCategory);
                setShowCreateArtifact(false);
              }}
              className="bg-[#003566] text-white px-8 py-3 rounded-full font-semibold hover:-translate-y-1 hover:shadow-xl transition-all duration-300"
            >
              {showCreateCategory ? '✕ Close' : '+ Create Category'}
            </button>
          </div>
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

        {/* Filter Card */}
        <div className="bg-white rounded-3xl p-6 md:p-8 mb-8 shadow-lg">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex-1">
              <label htmlFor="category-filter" className="block text-sm font-bold text-[#1A1A1A] mb-3">
                Filter by Category
              </label>
              <select
                id="category-filter"
                value={selectedCategory || ''}
                onChange={(e) => setSelectedCategory(e.target.value ? e.target.value as Id<"categories"> : undefined)}
                className="w-full md:w-auto px-6 py-3 border-2 border-gray-200 rounded-full focus:ring-2 focus:ring-[#FFD60A] focus:border-[#FFD60A] bg-white font-semibold text-[#1A1A1A] transition-all"
              >
                <option value="">All Categories</option>
                {categories.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="bg-[#FFD60A] text-[#1A1A1A] px-6 py-3 rounded-full font-bold text-lg">
                {artifacts.length} {artifacts.length !== 1 ? 'Artifacts' : 'Artifact'}
              </div>
            </div>
          </div>
        </div>

        {/* Artifacts Grid */}
        <div className="grid gap-6 md:gap-8">
          {artifacts.length === 0 ? (
            <div className="bg-white p-16 rounded-3xl text-center shadow-lg">
              <div className="text-6xl mb-6">📦</div>
              <h3 className="text-3xl font-black text-[#1A1A1A] mb-4">No artifacts yet</h3>
              <p className="text-lg text-[#4A4A4A] mb-8 max-w-md mx-auto">
                Create your first artifact to get started! Store your Claude-generated code blocks here.
              </p>
              <button
                onClick={() => setShowCreateArtifact(true)}
                className="bg-[#FFD60A] text-[#1A1A1A] px-10 py-4 rounded-full font-bold text-lg hover:-translate-y-1 hover:shadow-xl transition-all duration-300"
              >
                + Create First Artifact
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