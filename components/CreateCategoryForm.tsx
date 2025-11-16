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
    <div className="bg-white p-6 rounded-2xl shadow-lg max-w-md mx-auto">
      <h3 className="text-xl font-bold mb-4 text-[#1A1A1A]">Create New Category</h3>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="category-name" className="block text-sm font-semibold text-[#1A1A1A] mb-2">
            Category Name *
          </label>
          <input
            id="category-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FFD60A] focus:border-transparent"
            placeholder="e.g., React Components"
            required
          />
        </div>

        <div className="flex gap-3">
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-[#1A1A1A] text-[#F5F0E8] px-6 py-2 rounded-full font-semibold hover:-translate-y-0.5 hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Creating...' : 'Create Category'}
          </button>
          
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="bg-gray-300 text-[#1A1A1A] px-6 py-2 rounded-full font-semibold hover:bg-gray-400 transition-colors"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      {categories && categories.length > 0 && (
        <div className="mt-6 pt-6 border-t border-gray-200">
          <h4 className="text-sm font-semibold text-[#4A4A4A] mb-3">Existing Categories:</h4>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <span
                key={category._id}
                className="bg-[#FFD60A] text-[#1A1A1A] px-3 py-1 rounded-full text-sm font-semibold"
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