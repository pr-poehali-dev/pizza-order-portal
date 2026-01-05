import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import { useNavigate } from 'react-router-dom';

type Order = {
  id: number;
  customer_phone: string;
  customer_name: string;
  total_price: number;
  bonus_used: number;
  status: string;
  created_at: string;
  items?: OrderItem[];
};

type OrderItem = {
  item_name: string;
  item_size?: string;
  item_price: number;
  quantity: number;
};

export default function Admin() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    setLoading(true);
    
    const mockOrders: Order[] = [
      {
        id: 1,
        customer_phone: '+7 (999) 123-45-67',
        customer_name: 'Иван Петров',
        total_price: 1450,
        bonus_used: 0,
        status: 'new',
        created_at: new Date().toISOString(),
        items: [
          { item_name: 'Пепперони', item_size: '30', item_price: 750, quantity: 1 },
          { item_name: 'Маргарита', item_size: '25', item_price: 450, quantity: 1 },
          { item_name: 'Лимонад Классический', item_price: 120, quantity: 2 }
        ]
      },
      {
        id: 2,
        customer_phone: '+7 (999) 987-65-43',
        customer_name: 'Анна Сидорова',
        total_price: 890,
        bonus_used: 100,
        status: 'preparing',
        created_at: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
        items: [
          { item_name: '4 Сыра', item_size: '25', item_price: 590, quantity: 1 },
          { item_name: 'Картофель фри', item_price: 180, quantity: 1 },
          { item_name: 'Лимонад Мятный', item_price: 140, quantity: 1 }
        ]
      }
    ];

    setOrders(mockOrders);
    setLoading(false);
  };

  const updateOrderStatus = (orderId: number, newStatus: string) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, { label: string; variant: 'default' | 'secondary' | 'destructive' | 'outline' }> = {
      new: { label: 'Новый', variant: 'default' },
      preparing: { label: 'Готовится', variant: 'secondary' },
      delivering: { label: 'Доставляется', variant: 'outline' },
      completed: { label: 'Завершён', variant: 'outline' },
      cancelled: { label: 'Отменён', variant: 'destructive' }
    };
    
    const { label, variant } = variants[status] || variants.new;
    return <Badge variant={variant}>{label}</Badge>;
  };

  const filterOrders = (status?: string) => {
    if (!status) return orders;
    return orders.filter(order => order.status === status);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-card border-b border-border sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" onClick={() => navigate('/')}>
                <Icon name="ArrowLeft" size={20} />
              </Button>
              <h1 className="text-2xl font-black">Панель администратора</h1>
            </div>
            <Button variant="outline" onClick={loadOrders}>
              <Icon name="RefreshCw" size={16} className="mr-2" />
              Обновить
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm text-muted-foreground">Всего заказов</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-black">{orders.length}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm text-muted-foreground">Новые</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-black text-primary">
                {filterOrders('new').length}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm text-muted-foreground">В работе</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-black text-secondary">
                {filterOrders('preparing').length + filterOrders('delivering').length}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm text-muted-foreground">Выручка сегодня</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-black text-accent">
                {orders.reduce((sum, o) => sum + o.total_price, 0)} ₽
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="all">Все заказы</TabsTrigger>
            <TabsTrigger value="new">Новые</TabsTrigger>
            <TabsTrigger value="preparing">Готовятся</TabsTrigger>
            <TabsTrigger value="delivering">Доставляются</TabsTrigger>
            <TabsTrigger value="completed">Завершённые</TabsTrigger>
          </TabsList>

          {['all', 'new', 'preparing', 'delivering', 'completed'].map(tab => (
            <TabsContent key={tab} value={tab}>
              <Card>
                <CardContent className="p-0">
                  {loading ? (
                    <div className="text-center py-12">
                      <Icon name="Loader2" size={32} className="animate-spin mx-auto mb-2" />
                      <p className="text-muted-foreground">Загрузка заказов...</p>
                    </div>
                  ) : filterOrders(tab === 'all' ? undefined : tab).length === 0 ? (
                    <div className="text-center py-12 text-muted-foreground">
                      Заказов нет
                    </div>
                  ) : (
                    <div className="divide-y">
                      {filterOrders(tab === 'all' ? undefined : tab).map(order => (
                        <div key={order.id} className="p-6 hover:bg-muted/50 transition-colors">
                          <div className="flex items-start justify-between mb-4">
                            <div>
                              <div className="flex items-center gap-3 mb-2">
                                <h3 className="text-xl font-bold">Заказ #{order.id}</h3>
                                {getStatusBadge(order.status)}
                              </div>
                              <div className="text-sm text-muted-foreground space-y-1">
                                <p><Icon name="User" size={14} className="inline mr-1" />{order.customer_name}</p>
                                <p><Icon name="Phone" size={14} className="inline mr-1" />{order.customer_phone}</p>
                                <p><Icon name="Clock" size={14} className="inline mr-1" />{formatDate(order.created_at)}</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-2xl font-black text-primary mb-2">
                                {order.total_price} ₽
                              </div>
                              {order.bonus_used > 0 && (
                                <Badge variant="outline" className="mb-2">
                                  Бонусы: -{order.bonus_used} ₽
                                </Badge>
                              )}
                            </div>
                          </div>

                          {order.items && order.items.length > 0 && (
                            <div className="mb-4 bg-muted/50 rounded-lg p-4">
                              <h4 className="font-bold mb-2 text-sm">Состав заказа:</h4>
                              <div className="space-y-2">
                                {order.items.map((item, idx) => (
                                  <div key={idx} className="flex justify-between text-sm">
                                    <span>
                                      {item.item_name} 
                                      {item.item_size && ` (${item.item_size}см)`} 
                                      × {item.quantity}
                                    </span>
                                    <span className="font-bold">{item.item_price * item.quantity} ₽</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          <div className="flex gap-2 flex-wrap">
                            {order.status === 'new' && (
                              <Button 
                                size="sm" 
                                onClick={() => updateOrderStatus(order.id, 'preparing')}
                              >
                                Начать готовить
                              </Button>
                            )}
                            {order.status === 'preparing' && (
                              <Button 
                                size="sm" 
                                onClick={() => updateOrderStatus(order.id, 'delivering')}
                              >
                                Отправить на доставку
                              </Button>
                            )}
                            {order.status === 'delivering' && (
                              <Button 
                                size="sm" 
                                onClick={() => updateOrderStatus(order.id, 'completed')}
                              >
                                Завершить заказ
                              </Button>
                            )}
                            {order.status !== 'cancelled' && order.status !== 'completed' && (
                              <Button 
                                size="sm" 
                                variant="destructive"
                                onClick={() => updateOrderStatus(order.id, 'cancelled')}
                              >
                                Отменить
                              </Button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      </main>
    </div>
  );
}
