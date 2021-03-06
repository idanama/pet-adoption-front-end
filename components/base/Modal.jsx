import { RiCloseLine } from 'react-icons/ri';

export default function Modal({ children, title, close }) {
  return (
    <div
      className="w-screen h-screen fixed top-0 left-0 bg-opacity-50 bg-black flex items-center justify-center z-20"
      onClick={close}
    >
      <div
        className="absolute w-96 bg-white rounded-lg z-30"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-4 relative border-b">
          <div
            className="inline-block"
            onClick={close}
            onKeyDown={close}
            role="button"
            tabIndex={0}
          >
            <RiCloseLine className="text-2xl" />
          </div>
          <h2 className="absolute left-1/2 top-4 transform -translate-x-1/2">
            {title}
          </h2>
          <div />
        </div>
        <div className="px-4 py-6">{children}</div>
      </div>
    </div>
  );
}
