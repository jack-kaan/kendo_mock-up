import React from 'react';
import { Card } from '../../components/ui/Card';
import { shopItems } from '../../data/mockData';

export const ShopScreen: React.FC = () => (
    <div className="grid grid-cols-2 gap-4">
        {shopItems.map((item) => (
            <Card key={item.id}>
                <img src={item.imageUrl} alt={item.name} className="bg-slate-700 aspect-square rounded-lg mb-2 object-cover" />
                <p className="font-semibold text-sm truncate">{item.name}</p>
                <p className="text-xs text-blue-400">{item.price}</p>
            </Card>
        ))}
    </div>
);
