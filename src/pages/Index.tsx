import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import Icon from '@/components/ui/icon';

const pizzas = [
  { id: 1, name: 'Маргарита', price25: 450, price30: 650, image: 'https://cdn.poehali.dev/projects/4d513075-7e0d-458b-9619-80d7083d4059/files/e3332c1e-bb68-45fa-8cc1-8939c53a8513.jpg', description: 'Моцарелла, томатный соус, базилик' },
  { id: 2, name: 'Пепперони', price25: 550, price30: 750, image: 'https://cdn.poehali.dev/projects/4d513075-7e0d-458b-9619-80d7083d4059/files/fdf2e2af-546a-4ceb-acd2-a161bc9faaf5.jpg', description: 'Пепперони, моцарелла, томатный соус' },
  { id: 3, name: '4 Сыра', price25: 590, price30: 790, image: 'https://cdn.poehali.dev/projects/4d513075-7e0d-458b-9619-80d7083d4059/files/fdf2e2af-546a-4ceb-acd2-a161bc9faaf5.jpg', description: 'Моцарелла, пармезан, дор блю, чеддер' },
  { id: 4, name: 'Гавайская', price25: 520, price30: 720, image: 'https://cdn.poehali.dev/projects/4d513075-7e0d-458b-9619-80d7083d4059/files/e3332c1e-bb68-45fa-8cc1-8939c53a8513.jpg', description: 'Ветчина, ананасы, моцарелла' },
  { id: 5, name: 'Мясная', price25: 620, price30: 820, image: 'https://cdn.poehali.dev/projects/4d513075-7e0d-458b-9619-80d7083d4059/files/fdf2e2af-546a-4ceb-acd2-a161bc9faaf5.jpg', description: 'Говядина, бекон, ветчина, курица' },
  { id: 6, name: 'Вегетарианская', price25: 490, price30: 690, image: 'https://cdn.poehali.dev/projects/4d513075-7e0d-458b-9619-80d7083d4059/files/e3332c1e-bb68-45fa-8cc1-8939c53a8513.jpg', description: 'Томаты, перец, оливки, шампиньоны' },
  { id: 7, name: 'Барбекю', price25: 580, price30: 780, image: 'https://cdn.poehali.dev/projects/4d513075-7e0d-458b-9619-80d7083d4059/files/fdf2e2af-546a-4ceb-acd2-a161bc9faaf5.jpg', description: 'Курица, соус BBQ, красный лук, моцарелла' },
  { id: 8, name: 'Морская', price25: 690, price30: 890, image: 'https://cdn.poehali.dev/projects/4d513075-7e0d-458b-9619-80d7083d4059/files/e3332c1e-bb68-45fa-8cc1-8939c53a8513.jpg', description: 'Креветки, кальмары, лосось, моцарелла' },
  { id: 9, name: 'Острая', price25: 560, price30: 760, image: 'https://cdn.poehali.dev/projects/4d513075-7e0d-458b-9619-80d7083d4059/files/fdf2e2af-546a-4ceb-acd2-a161bc9faaf5.jpg', description: 'Халапеньо, чили, пепперони, моцарелла' },
  { id: 10, name: 'Цезарь', price25: 610, price30: 810, image: 'https://cdn.poehali.dev/projects/4d513075-7e0d-458b-9619-80d7083d4059/files/e3332c1e-bb68-45fa-8cc1-8939c53a8513.jpg', description: 'Курица, пармезан, соус цезарь, салат' },
  { id: 11, name: 'Карбонара', price25: 590, price30: 790, image: 'https://cdn.poehali.dev/projects/4d513075-7e0d-458b-9619-80d7083d4059/files/fdf2e2af-546a-4ceb-acd2-a161bc9faaf5.jpg', description: 'Бекон, сливочный соус, пармезан, яйцо' },
  { id: 12, name: 'Деревенская', price25: 540, price30: 740, image: 'https://cdn.poehali.dev/projects/4d513075-7e0d-458b-9619-80d7083d4059/files/e3332c1e-bb68-45fa-8cc1-8939c53a8513.jpg', description: 'Колбаски, картофель, бекон, лук' },
  { id: 13, name: 'Трюфельная', price25: 890, price30: 1090, image: 'https://cdn.poehali.dev/projects/4d513075-7e0d-458b-9619-80d7083d4059/files/fdf2e2af-546a-4ceb-acd2-a161bc9faaf5.jpg', description: 'Трюфельное масло, белые грибы, пармезан' }
];

const snacks = [
  { id: 101, name: 'Куриные крылышки', price: 320, image: 'https://cdn.poehali.dev/projects/4d513075-7e0d-458b-9619-80d7083d4059/files/fdf2e2af-546a-4ceb-acd2-a161bc9faaf5.jpg' },
  { id: 102, name: 'Картофель фри', price: 180, image: 'https://cdn.poehali.dev/projects/4d513075-7e0d-458b-9619-80d7083d4059/files/e3332c1e-bb68-45fa-8cc1-8939c53a8513.jpg' },
  { id: 103, name: 'Наггетсы', price: 250, image: 'https://cdn.poehali.dev/projects/4d513075-7e0d-458b-9619-80d7083d4059/files/fdf2e2af-546a-4ceb-acd2-a161bc9faaf5.jpg' },
  { id: 104, name: 'Сырные шарики', price: 280, image: 'https://cdn.poehali.dev/projects/4d513075-7e0d-458b-9619-80d7083d4059/files/e3332c1e-bb68-45fa-8cc1-8939c53a8513.jpg' }
];

const drinks = [
  { id: 201, name: 'Лимонад Классический', price: 120, image: 'https://cdn.poehali.dev/projects/4d513075-7e0d-458b-9619-80d7083d4059/files/e3332c1e-bb68-45fa-8cc1-8939c53a8513.jpg' },
  { id: 202, name: 'Лимонад Ягодный', price: 150, image: 'https://cdn.poehali.dev/projects/4d513075-7e0d-458b-9619-80d7083d4059/files/fdf2e2af-546a-4ceb-acd2-a161bc9faaf5.jpg' },
  { id: 203, name: 'Лимонад Мятный', price: 140, image: 'https://cdn.poehali.dev/projects/4d513075-7e0d-458b-9619-80d7083d4059/files/e3332c1e-bb68-45fa-8cc1-8939c53a8513.jpg' }
];

type CartItem = {
  id: number;
  name: string;
  price: number;
  size?: '25' | '30';
  quantity: number;
  image: string;
};

export default function Index() {
  const navigate = useNavigate();
  const [isDark, setIsDark] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  const addToCart = (item: any, size?: '25' | '30') => {
    const price = size ? (size === '25' ? item.price25 : item.price30) : item.price;
    const itemId = size ? `${item.id}-${size}` : item.id;
    
    setCart(prevCart => {
      const existing = prevCart.find(i => 
        i.id === item.id && i.size === size
      );
      
      if (existing) {
        return prevCart.map(i => 
          i.id === item.id && i.size === size
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      }
      
      return [...prevCart, { 
        id: item.id, 
        name: item.name, 
        price, 
        size, 
        quantity: 1,
        image: item.image 
      }];
    });
  };

  const removeFromCart = (id: number, size?: '25' | '30') => {
    setCart(prevCart => 
      prevCart.filter(item => !(item.id === id && item.size === size))
    );
  };

  const updateQuantity = (id: number, size: '25' | '30' | undefined, delta: number) => {
    setCart(prevCart => 
      prevCart.map(item => {
        if (item.id === id && item.size === size) {
          const newQty = item.quantity + delta;
          return newQty > 0 ? { ...item, quantity: newQty } : item;
        }
        return item;
      }).filter(item => item.quantity > 0)
    );
  };

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 backdrop-blur-lg bg-background/80 border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <img 
                src="https://cdn.poehali.dev/projects/4d513075-7e0d-458b-9619-80d7083d4059/files/fb1c9ae2-bc12-4fb0-9724-5c70e80e8bba.jpg" 
                alt="Пицца Мчится" 
                className="h-12 w-auto"
              />
              <h1 className="text-2xl md:text-3xl font-black text-primary">Пицца Мчится</h1>
            </div>
            
            <div className="flex items-center gap-2">
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => navigate('/admin')}
                className="rounded-full"
                title="Панель администратора"
              >
                <Icon name="Settings" size={20} />
              </Button>
              
              <Button 
                variant="ghost" 
                size="icon"
                onClick={toggleTheme}
                className="rounded-full"
              >
                <Icon name={isDark ? 'Sun' : 'Moon'} size={20} />
              </Button>
              
              <Sheet>
                <SheetTrigger asChild>
                  <Button className="relative rounded-full">
                    <Icon name="ShoppingCart" size={20} />
                    {totalItems > 0 && (
                      <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center bg-accent">
                        {totalItems}
                      </Badge>
                    )}
                  </Button>
                </SheetTrigger>
                <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
                  <SheetHeader>
                    <SheetTitle>Корзина</SheetTitle>
                  </SheetHeader>
                  
                  <div className="mt-8 space-y-4">
                    {cart.length === 0 ? (
                      <p className="text-center text-muted-foreground py-8">Корзина пуста</p>
                    ) : (
                      <>
                        {cart.map((item, idx) => (
                          <Card key={`${item.id}-${item.size}-${idx}`}>
                            <CardContent className="p-4">
                              <div className="flex gap-3">
                                <img 
                                  src={item.image} 
                                  alt={item.name}
                                  className="w-20 h-20 object-cover rounded-lg"
                                />
                                <div className="flex-1">
                                  <h4 className="font-bold">{item.name}</h4>
                                  {item.size && <p className="text-sm text-muted-foreground">Размер: {item.size}см</p>}
                                  <p className="font-bold text-primary mt-1">{item.price} ₽</p>
                                  
                                  <div className="flex items-center gap-2 mt-2">
                                    <Button 
                                      size="sm" 
                                      variant="outline"
                                      onClick={() => updateQuantity(item.id, item.size, -1)}
                                    >
                                      <Icon name="Minus" size={14} />
                                    </Button>
                                    <span className="w-8 text-center font-bold">{item.quantity}</span>
                                    <Button 
                                      size="sm" 
                                      variant="outline"
                                      onClick={() => updateQuantity(item.id, item.size, 1)}
                                    >
                                      <Icon name="Plus" size={14} />
                                    </Button>
                                    <Button 
                                      size="sm" 
                                      variant="ghost"
                                      onClick={() => removeFromCart(item.id, item.size)}
                                      className="ml-auto"
                                    >
                                      <Icon name="Trash2" size={16} />
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                        
                        <div className="sticky bottom-0 bg-background pt-4 border-t">
                          <div className="flex justify-between items-center mb-4">
                            <span className="text-lg font-bold">Итого:</span>
                            <span className="text-2xl font-black text-primary">{totalPrice} ₽</span>
                          </div>
                          <Button className="w-full h-12 text-lg font-bold">
                            Оформить заказ
                          </Button>
                        </div>
                      </>
                    )}
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <section className="mb-12 relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary via-accent to-secondary p-8 md:p-12 text-white">
          <div className="relative z-10">
            <Badge className="mb-4 bg-white/20 text-white border-white/30">🔥 Быстрая доставка</Badge>
            <h2 className="text-4xl md:text-6xl font-black mb-4">Горячая пицца за 30 минут!</h2>
            <p className="text-xl md:text-2xl mb-6 opacity-90">Или доставка бесплатно</p>
            <Button size="lg" className="bg-white text-primary hover:bg-white/90 font-bold">
              Выбрать пиццу
            </Button>
          </div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl md:text-4xl font-black mb-6 flex items-center gap-3">
            🍕 Пиццы
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pizzas.map(pizza => (
              <Card key={pizza.id} className="overflow-hidden group hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="relative overflow-hidden">
                  <img 
                    src={pizza.image} 
                    alt={pizza.name}
                    className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <CardContent className="p-5">
                  <h3 className="text-xl font-bold mb-2">{pizza.name}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{pizza.description}</p>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-primary text-lg">{pizza.price25} ₽</span>
                      <Button 
                        size="sm"
                        onClick={() => addToCart(pizza, '25')}
                      >
                        25см <Icon name="Plus" size={14} className="ml-1" />
                      </Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-primary text-lg">{pizza.price30} ₽</span>
                      <Button 
                        size="sm"
                        onClick={() => addToCart(pizza, '30')}
                      >
                        30см <Icon name="Plus" size={14} className="ml-1" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl md:text-4xl font-black mb-6 flex items-center gap-3">
            🍗 Закуски
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {snacks.map(snack => (
              <Card key={snack.id} className="overflow-hidden group hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="relative overflow-hidden">
                  <img 
                    src={snack.image} 
                    alt={snack.name}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <CardContent className="p-5">
                  <h3 className="text-lg font-bold mb-3">{snack.name}</h3>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-primary text-xl">{snack.price} ₽</span>
                    <Button 
                      size="sm"
                      onClick={() => addToCart(snack)}
                    >
                      <Icon name="Plus" size={16} />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl md:text-4xl font-black mb-6 flex items-center gap-3">
            🥤 Напитки
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {drinks.map(drink => (
              <Card key={drink.id} className="overflow-hidden group hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="relative overflow-hidden">
                  <img 
                    src={drink.image} 
                    alt={drink.name}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <CardContent className="p-5">
                  <h3 className="text-lg font-bold mb-3">{drink.name}</h3>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-primary text-xl">{drink.price} ₽</span>
                    <Button 
                      size="sm"
                      onClick={() => addToCart(drink)}
                    >
                      <Icon name="Plus" size={16} />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </main>

      <footer className="bg-card border-t border-border py-8 mt-16">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p className="font-bold text-lg text-foreground mb-2">🍕 Пицца Мчится</p>
          <p>Горячая доставка • Всегда вовремя</p>
        </div>
      </footer>
    </div>
  );
}