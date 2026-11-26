'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {
  Package,
  Search,
  Filter,
  Plus,
  Edit2,
  Trash2,
  Upload,
  Check,
  X,
  AlertCircle,
  Eye,
} from 'lucide-react';
import { ALL_PRODUCTS, type ProductItem } from '@/lib/products';
import { Button } from '@/components/ui/button';
import { useToast } from '@/providers/ToastProvider';

export function AdminProductsClient() {
  const [products, setProducts] = useState<ProductItem[]>(ALL_PRODUCTS);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCollection, setSelectedCollection] = useState<string>('all');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<ProductItem | null>(null);
  const [managingStockProduct, setManagingStockProduct] = useState<ProductItem | null>(null);
  const { toast } = useToast();

  // Form State for Add/Edit
  const [form, setForm] = useState({
    name: '',
    slug: '',
    collection: 'pulse' as 'pulse' | 'terra' | 'form',
    price: 14999,
    compareAtPrice: 17500,
    weight: 210,
    drop: 4,
    description: '',
    subtitle: '',
  });

  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.slug.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCollection =
      selectedCollection === 'all' || p.collection === selectedCollection;
    return matchesSearch && matchesCollection;
  });

  const handleOpenAdd = () => {
    setEditingProduct(null);
    setForm({
      name: '',
      slug: '',
      collection: 'pulse',
      price: 14999,
      compareAtPrice: 17500,
      weight: 210,
      drop: 4,
      description: 'Engineered mesh with dual-density foam midsole.',
      subtitle: 'Technical Running Flagship',
    });
    setIsAddModalOpen(true);
  };

  const handleOpenEdit = (p: ProductItem) => {
    setEditingProduct(p);
    setForm({
      name: p.name,
      slug: p.slug,
      collection: p.collection,
      price: p.price,
      compareAtPrice: p.compareAtPrice || 0,
      weight: p.weight,
      drop: p.drop,
      description: p.description,
      subtitle: p.subtitle,
    });
    setIsAddModalOpen(true);
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.slug || form.price <= 0) {
      toast({ title: 'INVALID SPECIFICATIONS', description: 'Name, slug, and positive price are required.', type: 'warn' });
      return;
    }

    if (editingProduct) {
      setProducts((prev) =>
        prev.map((p) =>
          p.id === editingProduct.id
            ? {
                ...p,
                name: form.name,
                slug: form.slug,
                collection: form.collection,
                price: Number(form.price),
                compareAtPrice: Number(form.compareAtPrice) || null,
                weight: Number(form.weight),
                drop: Number(form.drop),
                description: form.description,
                subtitle: form.subtitle,
              }
            : p
        )
      );
      toast({ title: 'PRODUCT UPDATED', description: `${form.name} saved to catalog.`, type: 'success' });
    } else {
      const newProduct: ProductItem = {
        id: `prod-${Date.now()}`,
        name: form.name,
        slug: form.slug,
        collection: form.collection,
        price: Number(form.price),
        compareAtPrice: Number(form.compareAtPrice) || null,
        weight: Number(form.weight),
        drop: Number(form.drop),
        stack: 32,
        rating: 5.0,
        ratingCount: 1,
        primaryImage: ALL_PRODUCTS[0].primaryImage,
        hoverImage: ALL_PRODUCTS[0].hoverImage,
        sizes: [8.0, 8.5, 9.0, 9.5, 10.0, 10.5, 11.0],
        colors: [{ name: 'Mono Acid', hex: '#D9FF43' }],
        isFeatured: false,
        isNew: true,
        inStock: true,
        description: form.description,
        subtitle: form.subtitle,
        upper: 'Engineered Kinetic Mono-Mesh',
        outsole: 'Micro-Lugged Grip Compound',
      };

      setProducts((prev) => [newProduct, ...prev]);
      toast({ title: 'NEW SILHOUETTE ADDED', description: `${form.name} cataloged.`, type: 'success' });
    }

    setIsAddModalOpen(false);
  };

  const handleDelete = (id: string, name: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    toast({ title: 'PRODUCT DELETED', description: `${name} removed from active catalog.`, type: 'default' });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-line pb-4">
        <div>
          <span className="micro-label text-smoke">CATALOG & INVENTORY ENGINE</span>
          <h2 className="font-display font-bold text-2xl uppercase tracking-tight">
            FOOTWEAR SILHOUETTES ({products.length})
          </h2>
        </div>
        <Button variant="primary" size="sm" onClick={handleOpenAdd} className="h-10 text-xs font-bold">
          <Plus className="w-3.5 h-3.5 mr-1.5" />
          NEW SILHOUETTE
        </Button>
      </div>

      {/* Search & Filters Strip */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-smoke absolute left-3 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by silhouette name, SKU, or slug..."
            className="w-full pl-9 pr-4 py-2 text-xs font-mono bg-paper border border-line focus:outline-none focus:border-ink"
          />
        </div>

        <div className="flex gap-2 font-mono text-xs">
          {['all', 'pulse', 'terra', 'form'].map((col) => (
            <button
              key={col}
              onClick={() => setSelectedCollection(col)}
              className={`px-3 py-2 uppercase border transition-colors ${
                selectedCollection === col
                  ? 'border-ink bg-ink text-paper font-bold'
                  : 'border-line bg-paper text-smoke hover:text-ink'
              }`}
            >
              {col}
            </button>
          ))}
        </div>
      </div>

      {/* Products Table */}
      <div className="border border-line bg-paper overflow-x-auto shadow-sm">
        <table className="w-full text-left font-mono text-xs">
          <thead className="bg-bone border-b border-line text-[10px] text-smoke uppercase tracking-wider">
            <tr>
              <th className="p-3 pl-4">SILHOUETTE</th>
              <th className="p-3">COLLECTION</th>
              <th className="p-3">PRICE (INR)</th>
              <th className="p-3">WEIGHT / DROP</th>
              <th className="p-3">STOCK STATUS</th>
              <th className="p-3 pr-4 text-right">ACTIONS</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {filteredProducts.map((prod) => (
              <tr key={prod.id} className="hover:bg-bone/20 transition-colors">
                {/* Thumbnail & Title */}
                <td className="p-3 pl-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-bone border border-line relative shrink-0">
                      <Image
                        src={prod.primaryImage}
                        alt={prod.name}
                        fill
                        className="object-contain p-1"
                        sizes="48px"
                      />
                    </div>
                    <div>
                      <p className="font-display font-bold text-sm text-ink">{prod.name}</p>
                      <p className="text-[10px] text-smoke">{prod.slug}</p>
                    </div>
                  </div>
                </td>

                {/* Collection */}
                <td className="p-3">
                  <span className="micro-label px-2 py-0.5 border border-line uppercase bg-bone">
                    {prod.collection}
                  </span>
                </td>

                {/* Price */}
                <td className="p-3 font-bold text-ink">
                  ₹{prod.price.toLocaleString('en-IN')}
                  {prod.compareAtPrice && (
                    <span className="block text-[10px] text-smoke line-through font-normal">
                      ₹{prod.compareAtPrice.toLocaleString('en-IN')}
                    </span>
                  )}
                </td>

                {/* Weight / Drop */}
                <td className="p-3 text-smoke">
                  {prod.weight}g / {prod.drop}mm
                </td>

                {/* Stock Status */}
                <td className="p-3">
                  <button
                    onClick={() => setManagingStockProduct(prod)}
                    className="inline-flex items-center gap-1.5 px-2 py-0.5 border border-emerald-300 bg-emerald-50 text-emerald-800 text-[10px] font-bold uppercase hover:bg-emerald-100 transition-colors"
                  >
                    <Check className="w-3 h-3 text-emerald-600" />
                    <span>IN STOCK ({prod.sizes.length} SIZES)</span>
                  </button>
                </td>

                {/* Actions */}
                <td className="p-3 pr-4 text-right space-x-2">
                  <button
                    onClick={() => handleOpenEdit(prod)}
                    className="p-1.5 border border-line hover:border-ink text-smoke hover:text-ink transition-colors"
                    title="Edit specs"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDelete(prod.id, prod.name)}
                    className="p-1.5 border border-line hover:border-clay text-smoke hover:text-clay transition-colors"
                    title="Delete product"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add / Edit Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-paper border border-line w-full max-w-xl max-h-[90vh] overflow-y-auto shadow-2xl p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between border-b border-line pb-4">
              <h3 className="font-display font-bold text-xl uppercase tracking-tight">
                {editingProduct ? `EDIT ${editingProduct.name}` : 'NEW FOOTWEAR SILHOUETTE'}
              </h3>
              <button onClick={() => setIsAddModalOpen(false)} className="p-1.5 text-smoke hover:text-ink">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="space-y-4 font-mono text-xs">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="micro-label text-smoke block mb-1">SILHOUETTE NAME</label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="PULSE SPEED CARBON"
                    className="w-full px-3 py-2 bg-bone border border-line focus:outline-none focus:border-ink"
                  />
                </div>
                <div>
                  <label className="micro-label text-smoke block mb-1">URL SLUG</label>
                  <input
                    type="text"
                    required
                    value={form.slug}
                    onChange={(e) => setForm({ ...form, slug: e.target.value })}
                    placeholder="pulse-speed-carbon"
                    className="w-full px-3 py-2 bg-bone border border-line focus:outline-none focus:border-ink"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="micro-label text-smoke block mb-1">COLLECTION</label>
                  <select
                    value={form.collection}
                    onChange={(e) => setForm({ ...form, collection: e.target.value as any })}
                    className="w-full px-3 py-2 bg-bone border border-line uppercase focus:outline-none focus:border-ink"
                  >
                    <option value="pulse">PULSE</option>
                    <option value="terra">TERRA</option>
                    <option value="form">FORM</option>
                  </select>
                </div>

                <div>
                  <label className="micro-label text-smoke block mb-1">RETAIL PRICE (₹)</label>
                  <input
                    type="number"
                    required
                    value={form.price}
                    onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-bone border border-line font-bold focus:outline-none focus:border-ink"
                  />
                </div>

                <div>
                  <label className="micro-label text-smoke block mb-1">COMPARE AT (₹)</label>
                  <input
                    type="number"
                    value={form.compareAtPrice}
                    onChange={(e) => setForm({ ...form, compareAtPrice: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-bone border border-line focus:outline-none focus:border-ink"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="micro-label text-smoke block mb-1">WEIGHT (GRAMS)</label>
                  <input
                    type="number"
                    value={form.weight}
                    onChange={(e) => setForm({ ...form, weight: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-bone border border-line focus:outline-none focus:border-ink"
                  />
                </div>
                <div>
                  <label className="micro-label text-smoke block mb-1">HEEL-TO-TOE DROP (MM)</label>
                  <input
                    type="number"
                    value={form.drop}
                    onChange={(e) => setForm({ ...form, drop: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-bone border border-line focus:outline-none focus:border-ink"
                  />
                </div>
              </div>

              <div>
                <label className="micro-label text-smoke block mb-1">SUBTITLE</label>
                <input
                  type="text"
                  value={form.subtitle}
                  onChange={(e) => setForm({ ...form, subtitle: e.target.value })}
                  placeholder="Propulsion Racing Flagship"
                  className="w-full px-3 py-2 bg-bone border border-line focus:outline-none focus:border-ink"
                />
              </div>

              <div>
                <label className="micro-label text-smoke block mb-1">DESCRIPTION & SPECS</label>
                <textarea
                  rows={3}
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  className="w-full px-3 py-2 bg-bone border border-line focus:outline-none focus:border-ink resize-none"
                />
              </div>

              {/* Supabase Storage Mock / Asset Notice */}
              <div className="p-3 border border-line bg-bone flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Upload className="w-4 h-4 text-smoke" />
                  <span className="text-[11px] text-smoke">SUPABASE STORAGE BUCKET // &apos;products&apos;</span>
                </div>
                <span className="micro-label text-emerald-700 font-bold">CONNECTED</span>
              </div>

              <div className="pt-2 flex gap-3">
                <Button type="submit" variant="primary" className="flex-1 h-11 text-xs font-bold">
                  {editingProduct ? 'UPDATE SPECIFICATIONS' : 'CREATE SILHOUETTE'}
                </Button>
                <Button type="button" variant="secondary" onClick={() => setIsAddModalOpen(false)} className="h-11 text-xs">
                  CANCEL
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Stock Matrix Modal */}
      {managingStockProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-paper border border-line w-full max-w-md shadow-2xl p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between border-b border-line pb-4">
              <div>
                <span className="micro-label text-smoke">INVENTORY MATRIX</span>
                <h3 className="font-display font-bold text-xl uppercase tracking-tight mt-0.5">
                  {managingStockProduct.name}
                </h3>
              </div>
              <button onClick={() => setManagingStockProduct(null)} className="p-1.5 text-smoke hover:text-ink">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 font-mono text-xs max-h-[300px] overflow-y-auto pr-1">
              {managingStockProduct.sizes.map((sz) => (
                <div key={sz} className="p-2.5 bg-bone border border-line flex items-center justify-between">
                  <span>SIZE US {sz.toFixed(1)}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-smoke text-[10px]">UNITS:</span>
                    <input
                      type="number"
                      defaultValue={12}
                      className="w-16 px-2 py-1 bg-paper border border-line text-center font-bold focus:outline-none focus:border-ink"
                    />
                  </div>
                </div>
              ))}
            </div>

            <Button
              variant="primary"
              className="w-full h-11 text-xs font-bold"
              onClick={() => {
                toast({ title: 'STOCK ALLOCATIONS SAVED', type: 'success' });
                setManagingStockProduct(null);
              }}
            >
              SAVE INVENTORY ALLOCATIONS
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
