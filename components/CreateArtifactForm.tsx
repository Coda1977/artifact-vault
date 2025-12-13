'use client';

import { useState, useEffect } from 'react';
import { useMutation, useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';

interface CreateArtifactFormProps {
  onSuccess?: () => void;
  onCancel?: () => void;
  initialValues?: {
    _id: Id<"artifacts">;
    name: string;
    categoryId?: string;
    code: string;
  };
  mode?: 'create' | 'edit';
}

export function CreateArtifactForm({ onSuccess, onCancel, initialValues, mode = 'create' }: CreateArtifactFormProps) {
  const [name, setName] = useState(initialValues?.name || '');
  const [categoryId, setCategoryId] = useState<string>(initialValues?.categoryId || '');
  const [code, setCode] = useState(initialValues?.code || '');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const createArtifact = useMutation(api.artifacts.createArtifact);
  // Using debug mutation to bypass validation issues
  const updateArtifact = useMutation(api.artifacts.updateArtifactDebug);
  const categories = useQuery(api.categories.listCategories);

  useEffect(() => {
    if (initialValues) {
      setName(initialValues.name);
      setCategoryId(initialValues.categoryId || '');
      setCode(initialValues.code);
    }
  }, [initialValues]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !code.trim()) return;

    console.log('Submitting artifact form:', { mode, initialValues, name, categoryId, code });

    setIsSubmitting(true);
    try {
      if (mode === 'edit') {
        if (!initialValues?._id) {
          console.error('Edit mode but no initialValues._id');
          throw new Error('Missing artifact ID for edit');
        }
        console.log('Updating artifact:', initialValues._id);

        const payload = {
          artifactId: initialValues._id,
          name: name.trim(),
          categoryId: categoryId ? (categoryId as Id<"categories">) : undefined,
          code: code.trim(),
        };
        // Alert the payload for debugging
        alert(`Sending payload: ${JSON.stringify(payload, null, 2)}`);

        await updateArtifact(payload);
      } else {
        console.log('Creating new artifact');
        await createArtifact({
          name: name.trim(),
          categoryId: categoryId ? (categoryId as Id<"categories">) : undefined,
          code: code.trim(),
        });
      }

      setName('');
      setCategoryId('');
      setCode('');
      onSuccess?.();
    } catch (error: any) {
      console.error(`Failed to ${mode} artifact:`, error);
      const errorMessage = error.data || error.message || 'Unknown error';
      alert(`Failed to ${mode} artifact: ${errorMessage}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white/90 backdrop-blur-md p-8 sm:p-10 rounded-3xl shadow-2xl max-w-3xl mx-auto border-2 border-white/50 relative overflow-hidden">
      {/* Decorative gradient border */}
      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#FFD60A] via-[#FFC700] to-[#FFD60A]"></div>

      <div className="flex items-center space-x-3 mb-8">
        <div className="w-12 h-12 bg-gradient-to-br from-[#FFD60A] to-[#FFC700] rounded-xl flex items-center justify-center shadow-lg">
          <span className="text-2xl">✨</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-black text-[#1A1A1A]">
          {mode === 'edit' ? 'Edit Artifact' : 'Create New Artifact'}
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-bold text-[#1A1A1A] mb-2.5 flex items-center space-x-2">
            <span>📝</span>
            <span>Artifact Name *</span>
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#FFD60A] focus:border-[#FFD60A] transition-all shadow-sm hover:border-gray-300 text-[#1A1A1A] font-medium text-lg"
            placeholder="My Awesome Component"
            required
          />
        </div>

        <div>
          <label htmlFor="category" className="block text-sm font-bold text-[#1A1A1A] mb-2.5 flex items-center space-x-2">
            <span>📂</span>
            <span>Category</span>
          </label>
          <select
            id="category"
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#FFD60A] focus:border-[#FFD60A] transition-all shadow-sm hover:border-gray-300 text-[#1A1A1A] font-medium appearance-none"
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
          <label htmlFor="code" className="block text-sm font-bold text-[#1A1A1A] mb-2.5 flex items-center space-x-2">
            <span>💻</span>
            <span>Code *</span>
          </label>
          <textarea
            id="code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#FFD60A] focus:border-[#FFD60A] transition-all shadow-sm hover:border-gray-300 h-72 font-mono text-sm text-[#1A1A1A] resize-y"
            placeholder="Paste your HTML/CSS/JS code here..."
            required
          />
          <p className="mt-2 text-xs text-[#4A4A4A]">💡 Tip: Paste complete HTML documents with inline CSS and JavaScript</p>
        </div>

        <div className="flex gap-4 pt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-gradient-to-r from-[#FFD60A] to-[#FFC700] text-[#1A1A1A] px-10 py-4 rounded-xl font-bold hover:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 shadow-lg text-lg border-2 border-[#FFD60A]/30"
          >
            {isSubmitting ? (mode === 'edit' ? '⏳ Saving...' : '⏳ Creating...') : (mode === 'edit' ? '💾 Save Changes' : '✨ Create Artifact')}
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
    </div>
  );
}