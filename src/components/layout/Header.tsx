import React from 'react';
import { MenuIcon, SunIcon, MoonIcon, BellIcon, SearchIcon } from 'lucide-react';
interface HeaderProps {
  title: string;
  isDark: boolean;
  toggleTheme: () => void;
  onMenuClick: () => void;
}
export function Header({
  title,
  isDark,
  toggleTheme,
  onMenuClick
}: HeaderProps) {
  return (
    <header className="h-16 bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-slate-800 flex items-center justify-between px-4 lg:px-8 sticky top-0 z-30">
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 text-slate-500 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-lg">

          <MenuIcon className="h-6 w-6" />
        </button>
        <h1 className="text-xl font-bold text-slate-900 dark:text-white">
          {title}
        </h1>
      </div>

      <div className="flex items-center gap-2 lg:gap-4">
        <div className="hidden md:flex items-center relative">
          <SearchIcon className="h-4 w-4 absolute left-3 text-slate-400" />
          <input
            type="text"
            placeholder="Search..."
            className="pl-9 pr-4 py-2 bg-gray-50 dark:bg-slate-800 border-none rounded-lg text-sm focus:ring-2 focus:ring-amber-500 outline-none w-64 text-slate-900 dark:text-white" />

        </div>

        <button
          onClick={toggleTheme}
          className="p-2 text-slate-500 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
          aria-label="Toggle theme">

          {isDark ?
          <SunIcon className="h-5 w-5" /> :

          <MoonIcon className="h-5 w-5" />
          }
        </button>

        <button className="p-2 text-slate-500 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-lg transition-colors relative">
          <BellIcon className="h-5 w-5" />
          <span className="absolute top-1.5 right-1.5 h-2 w-2 bg-rose-500 rounded-full border-2 border-white dark:border-slate-900"></span>
        </button>
      </div>
    </header>);

}