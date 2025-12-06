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
  const [editingArtifact, setEditingArtifact] = useState<typeof artifacts[0] | null>(null);

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

  const handleEditArtifact = (artifact: typeof artifacts[0]) => {
    setEditingArtifact(artifact);
    setShowCreateArtifact(true);
    setShowCreateCategory(false);
  };

  if (!artifacts || !categories) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#F5F0E8] to-[#E8DFD0]">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-16 h-16 border-4 border-[#FFD60A] border-t-transparent rounded-full animate-spin"></div>
          <div className="text-lg font-medium text-[#1A1A1A]">Loading your artifacts...</div>
        </div>
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
    <div className="bg-gradient-to-br from-[#F5F0E8] to-[#E8DFD0] min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Header */}
        <header className="mb-10 sm:mb-14">
          <div className="flex items-center space-x-3 mb-3">
            <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-[#FFD60A] to-[#FFC700] rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-2xl sm:text-3xl">🏛️</span>
            </div>
            <div>
              <h1 className="text-3xl sm:text-5xl font-black text-[#1A1A1A] tracking-tight">
                Artifact Vault
              </h1>
              <p className="text-sm sm:text-base text-[#4A4A4A] font-medium mt-0.5">
                Your Claude Code Collection
              </p>
            </div>
          </div>
        </header>

        {/* Filter and Actions Section */}
        <section className="mb-8 sm:mb-12 bg-white/80 backdrop-blur-md rounded-2xl shadow-xl border border-white/50 overflow-hidden">
          <div className="p-6 sm:p-8">
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
              {/* Category Filter */}
              <div className="flex-grow max-w-md">
                <label className="block text-sm font-bold text-[#1A1A1A] mb-2.5" htmlFor="category-filter">
                  📁 Filter by Category
                </label>
                <select
                  className="w-full appearance-none rounded-xl border-2 border-gray-200 bg-white text-[#1A1A1A] py-3 pl-4 pr-10 focus:outline-none focus:ring-2 focus:ring-[#FFD60A] focus:border-[#FFD60A] transition-all shadow-sm hover:border-gray-300 font-medium"
                  id="category-filter"
                  value={selectedCategory || ''}
                  onChange={(e) => setSelectedCategory(e.target.value ? e.target.value as Id<"categories"> : undefined)}
                >
                  <option value="">✨ All Categories</option>
                  {categories.map((category) => (
                    <option key={category._id} value={category._id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3 flex-wrap">
                <button
                  onClick={() => {
                    setEditingArtifact(null);
                    setShowCreateArtifact(!showCreateArtifact);
                    setShowCreateCategory(false);
                  }}
                  className="bg-gradient-to-r from-[#FFD60A] to-[#FFC700] text-[#1A1A1A] font-bold py-3 px-8 rounded-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-200 shadow-lg border-2 border-[#FFD60A]/30"
                >
                  ✨ Create Artifact
                </button>
                <button
                  onClick={() => {
                    setShowCreateCategory(!showCreateCategory);
                    setShowCreateArtifact(false);
                  }}
                  className="bg-gradient-to-r from-[#003566] to-[#002447] text-white font-bold py-3 px-8 rounded-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-200 shadow-lg"
                >
                  📂 New Category
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Forms */}
        {showCreateArtifact && (
          <div className="mb-12">
            <CreateArtifactForm
              onSuccess={() => {
                setShowCreateArtifact(false);
                setEditingArtifact(null);
              }}
              onCancel={() => {
                setShowCreateArtifact(false);
                setEditingArtifact(null);
              }}
              initialValues={editingArtifact ? {
                _id: editingArtifact._id,
                name: editingArtifact.name,
                categoryId: editingArtifact.categoryId,
                code: editingArtifact.code,
              } : undefined}
              mode={editingArtifact ? 'edit' : 'create'}
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
        <main className="space-y-12">
          {artifacts.length === 0 ? (
            <div className="text-center py-20 sm:py-32">
              <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl border border-white/50 max-w-2xl mx-auto p-12 sm:p-16">
                <div className="text-8xl mb-6 animate-bounce">📦</div>
                <h3 className="text-3xl sm:text-4xl font-black text-[#1A1A1A] mb-4">
                  Your Vault is Empty
                </h3>
                <p className="text-lg text-[#4A4A4A] mb-8 leading-relaxed">
                  Start building your collection by creating your first artifact.<br />
                  Store and share your Claude Code creations!
                </p>
                <button
                  onClick={() => {
                    setEditingArtifact(null);
                    setShowCreateArtifact(true);
                  }}
                  className="bg-gradient-to-r from-[#FFD60A] to-[#FFC700] text-[#1A1A1A] font-bold py-4 px-10 rounded-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-200 shadow-lg text-lg border-2 border-[#FFD60A]/30"
                >
                  ✨ Create Your First Artifact
                </button>
              </div>
            </div>
          ) : (
            Object.entries(groupedArtifacts).map(([categoryName, categoryArtifacts]) => (
              <section key={categoryName}>
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-2 h-8 bg-gradient-to-b from-[#FFD60A] to-[#FFC700] rounded-full"></div>
                  <h2 className="text-2xl sm:text-3xl font-black text-[#1A1A1A]">
                    {categoryName}
                  </h2>
                  <div className="flex-grow h-0.5 bg-gradient-to-r from-gray-300 to-transparent"></div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                  {categoryArtifacts.map((artifact) => (
                    <ArtifactCard
                      key={artifact._id}
                      id={artifact._id}
                      name={artifact.name}
                      category={artifact.category}
                      slug={artifact.slug}
                      code={artifact.code}
                      onDelete={() => handleDeleteArtifact(artifact._id)}
                      onEdit={() => handleEditArtifact(artifact)}
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