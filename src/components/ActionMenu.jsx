// @ts-ignore;
import React, { useState, useRef, useEffect } from 'react';
// @ts-ignore;
import { MoreVertical, Edit, Trash, Eye, Download } from 'lucide-react';
// @ts-ignore;
import { Button } from '@/components/ui';

export function ActionMenu({
  actions,
  onAction
}) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = event => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  const handleAction = action => {
    onAction(action);
    setIsOpen(false);
  };
  const getIcon = iconName => {
    switch (iconName) {
      case 'edit':
        return <Edit className="h-4 w-4" />;
      case 'delete':
        return <Trash className="h-4 w-4" />;
      case 'view':
        return <Eye className="h-4 w-4" />;
      case 'download':
        return <Download className="h-4 w-4" />;
      default:
        return <MoreVertical className="h-4 w-4" />;
    }
  };
  return <div className="relative" ref={menuRef}>
      <Button variant="ghost" size="sm" onClick={() => setIsOpen(!isOpen)}>
        <MoreVertical className="h-4 w-4" />
      </Button>
      
      {isOpen && <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border z-50">
          {actions.map((action, index) => <button key={index} onClick={() => handleAction(action)} className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2">
              {getIcon(action.icon)}
              <span>{action.label}</span>
            </button>)}
        </div>}
    </div>;
}