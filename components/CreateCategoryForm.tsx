'use client';

import { useState } from 'react';
import { useMutation, useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';

interface CreateCategoryFormProps {
  onSuccess?: () => void;
  onCancel?: () => void;
}

export function CreateCategoryForm({ onSuccess, onCancel }: CreateCategoryFormProps) {
  const [name, setName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const createCategory = useMutation(api.categories.createCategory);
  const categories = useQuery(api.categories.listCategories);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    // Check if category already exists
    const existingCategory = categories?.find(
      (cat) => cat.name.toLowerCase() === name.trim().toLowerCase()
    );
    
    if (existingCategory) {
      alert('Category already exists!');
      return;
    }

    setIsSubmitting(true);
    try {
      await createCategory({
        name: name.trim(),
      });
      
      setName('');
      onSuccess?.();
    } catch (error) {
      console.error('Failed to create category:', error);
      alert('Failed to create category. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white/90 backdrop-blur-md p-8 rounded-3xl shadow-2xl max-w-2xl mx-auto border-2 border-white/50 relative overflow-hidden">
      {/* Decorative gradient border */}
      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#003566] via-[#0055AA] to-[#003566]"></div>

      <div className="flex items-center space-x-3 mb-6">
        <div className="w-12 h-12 bg-gradient-to-br from-[#003566] to-[#002447] rounded-xl flex items-center justify-center shadow-lg">
          <span className="text-2xl">📂</span>
        </div>
        <h3 className="text-2xl sm:text-3xl font-black text-[#1A1A1A]">Create New Category</h3>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="category-name" className="block text-sm font-bold text-[#1A1A1A] mb-2.5 flex items-center space-x-2">
            <span>🏷️</span>
            <span>Category Name *</span>
          </label>
          <input
            id="category-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#003566] focus:border-[#003566] transition-all shadow-sm hover:border-gray-300 text-[#1A1A1A] font-medium text-lg"
            placeholder="e.g., React Components, Games, Tools..."
            required
          />
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-gradient-to-r from-[#003566] to-[#002447] text-white px-10 py-4 rounded-xl font-bold hover:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 shadow-lg text-lg"
          >
            {isSubmitting ? '⏳ Creating...' : '📂 Create Category'}
          </button>

          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="bg-gray-200 text-[#1A1A1A] px-10 py-4 rounded-xl font-bold hover:bg-gray-300 hover:shadow-lg transition-all"
            >
              ✕ Cancel
            </button>
          )}
        </div>
      </form>

      {categories && categories.length > 0 && (
        <div className="mt-8 pt-8 border-t-2 border-gray-200">
          <h4 className="text-sm font-black text-[#1A1A1A] mb-4 uppercase tracking-wide flex items-center space-x-2">
            <span>📚</span>
            <span>Existing Categories ({categories.length})</span>
          </h4>
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <span
                key={category._id}
                className="bg-gradient-to-r from-[#003566] to-[#002447] text-white px-4 py-2 rounded-lg text-sm font-bold shadow-md hover:shadow-xl transition-shadow"
              >
                {category.name}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}