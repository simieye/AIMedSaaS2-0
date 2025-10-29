// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { Card, CardContent, CardHeader, CardTitle, Button, Badge, Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui';
// @ts-ignore;
import { MessageSquare, Eye, Plus, Clock } from 'lucide-react';

export function Tickets({
  partnerId,
  t
}) {
  // 防御式处理：确保 t 存在
  const safeT = t || (key => key);
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    loadTickets();
  }, [partnerId]);
  const loadTickets = async () => {
    try {
      setLoading(true);
      // 模拟数据加载
      setTimeout(() => {
        setTickets([{
          id: 'ticket-001',
          subject: 'API访问问题',
          priority: 'high',
          status: 'open',
          createdAt: '2024-01-15',
          lastUpdate: '2小时前'
        }, {
          id: 'ticket-002',
          subject: '账单疑问',
          priority: 'medium',
          status: 'in_progress',
          createdAt: '2024-01-10',
          lastUpdate: '1天前'
        }, {
          id: 'ticket-003',
          subject: '功能请求',
          priority: 'low',
          status: 'closed',
          createdAt: '2024-01-05',
          lastUpdate: '3天前'
        }]);
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Failed to load tickets:', error);
      setLoading(false);
    }
  };
  const getPriorityBadge = priority => {
    const variants = {
      high: 'destructive',
      medium: 'warning',
      low: 'secondary'
    };
    return variants[priority] || 'secondary';
  };
  const getStatusBadge = status => {
    const variants = {
      open: 'default',
      in_progress: 'secondary',
      closed: 'outline'
    };
    return variants[status] || 'secondary';
  };
  const getPriorityText = priority => {
    const priorityMap = {
      high: safeT('high'),
      medium: safeT('medium'),
      low: safeT('low')
    };
    return priorityMap[priority] || priority;
  };
  const getStatusText = status => {
    const statusMap = {
      open: safeT('open'),
      in_progress: safeT('inProgress'),
      closed: safeT('closed')
    };
    return statusMap[status] || status;
  };
  return <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">{safeT('tickets')}</h2>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          {safeT('createTicket')}
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{safeT('tickets')}</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? <div className="text-center py-12">
              <MessageSquare className="h-12 w-12 mx-auto text-gray-400 mb-4 animate-spin" />
              <p className="text-gray-500">{safeT('loading')}</p>
            </div> : tickets.length === 0 ? <div className="text-center py-12">
              <MessageSquare className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <p className="text-gray-500">{safeT('noData')}</p>
            </div> : <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{safeT('ticketSubject')}</TableHead>
                  <TableHead>{safeT('priority')}</TableHead>
                  <TableHead>{safeT('status')}</TableHead>
                  <TableHead>{safeT('createdAt')}</TableHead>
                  <TableHead>{safeT('lastUpdate')}</TableHead>
                  <TableHead>{safeT('actions')}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tickets.map(ticket => <TableRow key={ticket.id}>
                    <TableCell>{ticket.subject}</TableCell>
                    <TableCell>
                      <Badge variant={getPriorityBadge(ticket.priority)}>{getPriorityText(ticket.priority)}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={getStatusBadge(ticket.status)}>{getStatusText(ticket.status)}</Badge>
                    </TableCell>
                    <TableCell>{ticket.createdAt}</TableCell>
                    <TableCell>{ticket.lastUpdate}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="ghost">
                          <Eye className="h-3 w-3" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>)}
              </TableBody>
            </Table>}
        </CardContent>
      </Card>
    </div>;
}