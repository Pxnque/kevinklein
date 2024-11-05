import React from 'react';
import ProductCard from '../ProductCard/ProductCard';

const products = [
  { id: 1, name: 'Camiseta Gris', price: '$200 MXN', image: 'https://s3-alpha-sig.figma.com/img/b3ec/5aa5/2c937aefa737ee332a635e1de2dc05a7?Expires=1731283200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=pR7ANwKZKug4fQQcdLUFdoXa8L4O6uSib0g5XePtwazBDIK5OfZkZ9v~UmlJL8R~zjHZZLru-cbGK6kCi9F44Nm1ZwlwR1chXcrcvpu3W4vSQP7GEYbO6Vn-BPBa87hAhh3hBuDccUhBhnvM5Wflb3A-s~U3T7Z~AM~Bvi8Bs3JTPta5QdT-fW1sfPpsNV~coRf7JqBwFojknJOCLQCyNPX1tfscvzimADmJ8rWdKo-DonuS2WMUAhVGOprFSlJDRHhA8dY2WaeUiCX0MVSYhCyq1FMQ~cw6aBdKV0GhuwuSL01ZRad06mMcx4dW-QSx7YBenDZv~G7PPBFXVCbpQQ__', rating: 5 },
  { id: 2, name: 'Suéter Largo Gris', price: '$200 MXN', image: 'https://s3-alpha-sig.figma.com/img/b3ec/5aa5/2c937aefa737ee332a635e1de2dc05a7?Expires=1731283200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=pR7ANwKZKug4fQQcdLUFdoXa8L4O6uSib0g5XePtwazBDIK5OfZkZ9v~UmlJL8R~zjHZZLru-cbGK6kCi9F44Nm1ZwlwR1chXcrcvpu3W4vSQP7GEYbO6Vn-BPBa87hAhh3hBuDccUhBhnvM5Wflb3A-s~U3T7Z~AM~Bvi8Bs3JTPta5QdT-fW1sfPpsNV~coRf7JqBwFojknJOCLQCyNPX1tfscvzimADmJ8rWdKo-DonuS2WMUAhVGOprFSlJDRHhA8dY2WaeUiCX0MVSYhCyq1FMQ~cw6aBdKV0GhuwuSL01ZRad06mMcx4dW-QSx7YBenDZv~G7PPBFXVCbpQQ__', rating: 5 },
  { id: 3, name: 'Pantalón Mezclilla', price: '$150', image: 'https://s3-alpha-sig.figma.com/img/b3ec/5aa5/2c937aefa737ee332a635e1de2dc05a7?Expires=1731283200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=pR7ANwKZKug4fQQcdLUFdoXa8L4O6uSib0g5XePtwazBDIK5OfZkZ9v~UmlJL8R~zjHZZLru-cbGK6kCi9F44Nm1ZwlwR1chXcrcvpu3W4vSQP7GEYbO6Vn-BPBa87hAhh3hBuDccUhBhnvM5Wflb3A-s~U3T7Z~AM~Bvi8Bs3JTPta5QdT-fW1sfPpsNV~coRf7JqBwFojknJOCLQCyNPX1tfscvzimADmJ8rWdKo-DonuS2WMUAhVGOprFSlJDRHhA8dY2WaeUiCX0MVSYhCyq1FMQ~cw6aBdKV0GhuwuSL01ZRad06mMcx4dW-QSx7YBenDZv~G7PPBFXVCbpQQ__', rating: 4 },
];

const ProductList: React.FC = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          imageUrl={product.image}
          name={product.name}
          price={product.price}
          rating={product.rating}
        />
      ))}
    </div>
  );
};

export default ProductList;
