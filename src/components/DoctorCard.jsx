// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { Badge, Avatar, AvatarImage, AvatarFallback } from '@/components/ui';
// @ts-ignore;
import { User, Mail, Phone, Award, Calendar, MapPin } from 'lucide-react';

export function DoctorCard({
  doctor,
  isSelected,
  onSelect
}) {
  const getStatusBadge = status => {
    const badges = {
      pending: {
        label: '待审核',
        color: 'bg-yellow-100 text-yellow-800'
      },
      approved: {
        label: '已审核',
        color: 'bg-green-100 text-green-800'
      },
      rejected: {
        label: '已拒绝',
        color: 'bg-red-100 text-red-800'
      },
      frozen: {
        label: '已冻结',
        color: 'bg-gray-100 text-gray-800'
      }
    };
    return badges[status] || badges.pending;
  };
  const getSpecialtyColor = specialty => {
    const colors = {
      '内科': 'bg-blue-100 text-blue-800',
      '外科': 'bg-red-100 text-red-800',
      '儿科': 'bg-green-100 text-green-800',
      '妇产科': 'bg-pink-100 text-pink-800',
      '眼科': 'bg-purple-100 text-purple-800',
      '耳鼻喉科': 'bg-indigo-100 text-indigo-800',
      '皮肤科': 'bg-orange-100 text-orange-800',
      '精神科': 'bg-teal-100 text-teal-800'
    };
    return colors[specialty] || 'bg-gray-100 text-gray-800';
  };
  return <div className={`p-4 border rounded-lg transition-all ${isSelected ? 'ring-2 ring-primary' : ''}`}>
      <div className="flex items-center space-x-4">
        <input type="checkbox" checked={isSelected} onChange={() => onSelect(doctor._id)} className="w-4 h-4" />
        
        <Avatar className="h-12 w-12">
          <AvatarImage src={doctor.avatar_url} alt={doctor.name} />
          <AvatarFallback>
            <User className="h-6 w-6" />
          </AvatarFallback>
        </Avatar>
        
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">{doctor.name}</h4>
              <p className="text-sm text-muted-foreground">{doctor.email}</p>
            </div>
            <Badge className={getStatusBadge(doctor.status).color}>
              {getStatusBadge(doctor.status).label}
            </Badge>
          </div>
          
          <div className="mt-2 flex items-center space-x-4 text-sm text-muted-foreground">
            <div className="flex items-center">
              <Award className="h-3 w-3 mr-1" />
              <span>{doctor.license_number}</span>
            </div>
            <div className="flex items-center">
              <MapPin className="h-3 w-3 mr-1" />
              <span>{doctor.hospital}</span>
            </div>
            <div className="flex items-center">
              <Calendar className="h-3 w-3 mr-1" />
              <span>{new Date(doctor.created_at).toLocaleDateString()}</span>
            </div>
          </div>
          
          <div className="mt-2">
            <Badge className={getSpecialtyColor(doctor.specialty)}>
              {doctor.specialty}
            </Badge>
          </div>
        </div>
      </div>
    </div>;
}