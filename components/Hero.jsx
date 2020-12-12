import Button from './base/Button';

export default function Hero({ img, title, text, action, to }) {
  return (
    <div className="max-h-80v overflow-hidden relative">
      <div className="absolute w-full h-full flex items-center pt-20">
        <div className="container mx-auto text-white">
          <h1 className="text-9xl">{title}</h1>
          <h2 className="text-5xl mb-3">{text}</h2>
          <Button white>{action}</Button>
        </div>
      </div>
      <img src={img} alt={text} className="min-h-96 object-cover w-full" />
    </div>
  );
}
