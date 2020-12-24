import Button from './base/Button';

export default function Hero({ img = '', title = '', text = '', action, to }) {
  return (
    <div className="h-80v overflow-hidden relative">
      <div className="absolute w-full h-full flex pb-5 items-end px-3 md:items-center md:pt-20">
        <div className="container mx-auto text-white">
          <h1 className="text-9xl text-shadow">{title}</h1>
          <h2 className="text-5xl mb-3 text-shadow">{text}</h2>
          {action && (
            <Button link={to.toLowerCase()} white>
              {action}
            </Button>
          )}
        </div>
      </div>
      <img
        src={img}
        alt={text}
        className="h-full object-cover w-full bg-gray-300"
      />
    </div>
  );
}
