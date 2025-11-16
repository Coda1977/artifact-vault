'use client';

import { useState } from 'react';
import { useMutation, useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';

interface CreateArtifactFormProps {
  onSuccess?: () => void;
  onCancel?: () => void;
}

export function CreateArtifactForm({ onSuccess, onCancel }: CreateArtifactFormProps) {
  const [name, setName] = useState('');
  const [categoryId, setCategoryId] = useState<string>('');
  const [code, setCode] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const createArtifact = useMutation(api.artifacts.createArtifact);
  const categories = useQuery(api.categories.listCategories);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !code.trim()) return;

    setIsSubmitting(true);
    try {
      await createArtifact({
        name: name.trim(),
        categoryId: categoryId ? (categoryId as Id<"categories">) : undefined,
        code: code.trim(),
      });
      
      setName('');
      setCategoryId('');
      setCode('');
      onSuccess?.();
    } catch (error) {
      console.error('Failed to create artifact:', error);
      alert('Failed to create artifact. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white p-8 rounded-2xl shadow-lg max-w-2xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-[#1A1A1A]">Create New Artifact</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-semibold text-[#1A1A1A] mb-2">
            Name *
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FFD60A] focus:border-transparent"
            placeholder="My Awesome Component"
            required
          />
        </div>

        <div>
          <label htmlFor="category" className="block text-sm font-semibold text-[#1A1A1A] mb-2">
            Category
          </label>
          <select
            id="category"
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FFD60A] focus:border-transparent"
          >
            <option value="">No Category</option>
            {categories?.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="code" className="block text-sm font-semibold text-[#1A1A1A] mb-2">
            Code *
          </label>
          <textarea
            id="code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FFD60A] focus:border-transparent h-64 font-mono text-sm"
            placeholder="Paste your HTML/CSS/JS code here..."
            required
          />
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-[#1A1A1A] text-[#F5F0E8] px-8 py-3 rounded-full font-semibold hover:-translate-y-0.5 hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Creating...' : 'Create Artifact'}
          </button>
          
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="bg-gray-300 text-[#1A1A1A] px-8 py-3 rounded-full font-semibold hover:bg-gray-400 transition-colors"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}