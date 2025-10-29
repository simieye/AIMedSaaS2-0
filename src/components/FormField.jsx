// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { Label, Input, Textarea, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui';

export function FormField({
  label,
  name,
  type = 'text',
  value,
  onChange,
  options,
  required = false,
  placeholder,
  rows = 3,
  className = ''
}) {
  const handleChange = e => {
    onChange(name, type === 'number' ? parseFloat(e.target.value) : e.target.value);
  };
  return <div className={`space-y-2 ${className}`}>
      <Label htmlFor={name} className={required ? 'after:content-["*"] after:text-red-500' : ''}>
        {label}
      </Label>
      
      {type === 'textarea' ? <Textarea id={name} name={name} value={value || ''} onChange={handleChange} placeholder={placeholder} rows={rows} required={required} /> : type === 'select' ? <Select value={value || ''} onValueChange={value => onChange(name, value)}>
          <SelectTrigger>
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
          <SelectContent>
            {options.map(option => <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>)}
          </SelectContent>
        </Select> : <Input id={name} name={name} type={type} value={value || ''} onChange={handleChange} placeholder={placeholder} required={required} />}
    </div>;
}