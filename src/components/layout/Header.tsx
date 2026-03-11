import React from 'react';
import { MenuIcon} from 'lucide-react';
interface HeaderProps {
  title: string;
  isDark: boolean;
  toggleTheme: () => void;
  onMenuClick: () => void;
}
export function Header({
  title,
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

    </header>);

}