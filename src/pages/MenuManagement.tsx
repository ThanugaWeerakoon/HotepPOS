import React, { useState } from 'react';
import { MenuItem, Category } from '../types';
import { PlusIcon, EditIcon, TrashIcon, SearchIcon, XIcon } from 'lucide-react';
interface MenuManagementProps {
  menuItems: MenuItem[];
  setMenuItems: React.Dispatch<React.SetStateAction<MenuItem[]>>;
}
const emptyForm = {
  name: '',
  description: '',
  price: '',
  category: 'Pizza' as Category,
  available: true
};
export function MenuManagement({
  menuItems,
  setMenuItems
}: MenuManagementProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<Category | 'All'>('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);
  const categories: (Category | 'All')[] = [
  'All',
  'Pizza',
  'Burgers',
  'Pasta',
  'Drinks',
  'Desserts'];

  const filteredItems = menuItems.filter((item) => {
    const matchesCategory =
    activeCategory === 'All' || item.category === activeCategory;
    const matchesSearch = item.name.
    toLowerCase().
    includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });
  const formatCurrency = (amount: number) =>
  `LKR ${amount.toLocaleString('en-LK', {
    minimumFractionDigits: 2
  })}`;
  const toggleAvailability = (id: string) => {
    setMenuItems((prev) =>
    prev.map((item) =>
    item.id === id ?
    {
      ...item,
      available: !item.available
    } :
    item
    )
    );
  };
  const deleteItem = (id: string) => {
    if (confirm('Are you sure you want to delete this item?')) {
      setMenuItems((prev) => prev.filter((item) => item.id !== id));
    }
  };
  const openAddModal = () => {
    setEditingId(null);
    setForm(emptyForm);
    setIsModalOpen(true);
  };
  const openEditModal = (item: MenuItem) => {
    setEditingId(item.id);
    setForm({
      name: item.name,
      description: item.description,
      price: item.price.toString(),
      category: item.category,
      available: item.available
    });
    setIsModalOpen(true);
  };
  const handleSave = () => {
    if (!form.name.trim() || !form.price) return;
    if (editingId) {
      setMenuItems((prev) =>
      prev.map((item) =>
      item.id === editingId ?
      {
        ...item,
        name: form.name.trim(),
        description: form.description.trim(),
        price: parseFloat(form.price) || 0,
        category: form.category,
        available: form.available
      } :
      item
      )
      );
    } else {
      const newItem: MenuItem = {
        id: `m${Date.now()}`,
        name: form.name.trim(),
        description: form.description.trim(),
        price: parseFloat(form.price) || 0,
        category: form.category,
        available: form.available
      };
      setMenuItems((prev) => [...prev, newItem]);
    }
    setIsModalOpen(false);
    setForm(emptyForm);
    setEditingId(null);
  };
  return (
    <div className="p-4 lg:p-8 max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="relative w-full sm:w-96">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search menu items..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:ring-2 focus:ring-amber-500 outline-none" />

        </div>
        <button
          onClick={openAddModal}
          className="w-full sm:w-auto flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-600 text-white px-6 py-2.5 rounded-lg font-medium transition-colors min-h-[44px]">

          <PlusIcon className="h-5 w-5" />
          Add New Item
        </button>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {categories.map((cat) =>
        <button
          key={cat}
          onClick={() => setActiveCategory(cat)}
          className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors min-h-[44px]
              ${activeCategory === cat ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900' : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-gray-200 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-700'}`}>

            {cat}
          </button>
        )}
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 text-sm border-b border-gray-200 dark:border-slate-700">
                <th className="p-4 font-medium">Name</th>
                <th className="p-4 font-medium">Category</th>
                <th className="p-4 font-medium">Price</th>
                <th className="p-4 font-medium">Status</th>
                <th className="p-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-slate-700">
              {filteredItems.map((item) =>
              <tr
                key={item.id}
                className="hover:bg-gray-50 dark:hover:bg-slate-800/50 transition-colors">

                  <td className="p-4">
                    <div className="font-medium text-slate-900 dark:text-white">
                      {item.name}
                    </div>
                    <div className="text-sm text-slate-500 dark:text-slate-400 truncate max-w-xs">
                      {item.description}
                    </div>
                  </td>
                  <td className="p-4 text-sm text-slate-600 dark:text-slate-300">
                    {item.category}
                  </td>
                  <td className="p-4 text-sm font-medium text-slate-900 dark:text-white">
                    {formatCurrency(item.price)}
                  </td>
                  <td className="p-4">
                    <button
                    onClick={() => toggleAvailability(item.id)}
                    className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium transition-colors min-h-[32px]
                        ${item.available ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-500/20 dark:text-emerald-400 hover:bg-emerald-200' : 'bg-rose-100 text-rose-800 dark:bg-rose-500/20 dark:text-rose-400 hover:bg-rose-200'}`}>

                      {item.available ? 'Available' : 'Out of Stock'}
                    </button>
                  </td>
                  <td className="p-4 text-right space-x-2">
                    <button
                    onClick={() => openEditModal(item)}
                    className="p-2 text-blue-600 hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-500/10 rounded-lg transition-colors min-h-[44px] min-w-[44px] inline-flex items-center justify-center">

                      <EditIcon className="h-4 w-4" />
                    </button>
                    <button
                    onClick={() => deleteItem(item.id)}
                    className="p-2 text-rose-600 hover:bg-rose-50 dark:text-rose-400 dark:hover:bg-rose-500/10 rounded-lg transition-colors min-h-[44px] min-w-[44px] inline-flex items-center justify-center">

                      <TrashIcon className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Modal */}
      {isModalOpen &&
      <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-2xl w-full max-w-lg overflow-hidden">
            <div className="flex justify-between items-center p-6 border-b border-gray-200 dark:border-slate-700">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                {editingId ? 'Edit Menu Item' : 'Add New Menu Item'}
              </h2>
              <button
              onClick={() => setIsModalOpen(false)}
              className="p-2 text-slate-500 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg">

                <XIcon className="h-5 w-5" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Item Name
                </label>
                <input
                type="text"
                value={form.name}
                onChange={(e) =>
                setForm({
                  ...form,
                  name: e.target.value
                })
                }
                placeholder="e.g. Margherita Pizza"
                className="w-full px-4 py-2.5 bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-600 rounded-lg text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-amber-500" />

              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Description
                </label>
                <input
                type="text"
                value={form.description}
                onChange={(e) =>
                setForm({
                  ...form,
                  description: e.target.value
                })
                }
                placeholder="Short description"
                className="w-full px-4 py-2.5 bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-600 rounded-lg text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-amber-500" />

              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Price (LKR)
                  </label>
                  <input
                  type="number"
                  value={form.price}
                  onChange={(e) =>
                  setForm({
                    ...form,
                    price: e.target.value
                  })
                  }
                  placeholder="0.00"
                  className="w-full px-4 py-2.5 bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-600 rounded-lg text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-amber-500" />

                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Category
                  </label>
                  <select
                  value={form.category}
                  onChange={(e) =>
                  setForm({
                    ...form,
                    category: e.target.value as Category
                  })
                  }
                  className="w-full px-4 py-2.5 bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-600 rounded-lg text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-amber-500">

                    <option value="Pizza">Pizza</option>
                    <option value="Burgers">Burgers</option>
                    <option value="Pasta">Pasta</option>
                    <option value="Drinks">Drinks</option>
                    <option value="Desserts">Desserts</option>
                  </select>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  Available
                </label>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={form.available}
                  onChange={(e) =>
                  setForm({
                    ...form,
                    available: e.target.checked
                  })
                  } />

                  <div className="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
                </label>
              </div>
            </div>
            <div className="p-6 border-t border-gray-200 dark:border-slate-700 flex gap-3">
              <button
              onClick={() => setIsModalOpen(false)}
              className="flex-1 py-3 px-4 rounded-lg font-medium border border-gray-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors min-h-[44px]">

                Cancel
              </button>
              <button
              onClick={handleSave}
              className="flex-1 py-3 px-4 rounded-lg font-medium bg-amber-500 text-white hover:bg-amber-600 transition-colors min-h-[44px]">

                {editingId ? 'Save Changes' : 'Add Item'}
              </button>
            </div>
          </div>
        </div>
      }
    </div>);

}