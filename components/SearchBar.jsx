export default function SearchBar() {
  return (
    <div className="h-11 bg-white rounded-full border border-gray-200 text-sm pl-3 pr-1 py-1 min-w-full flex justify-between items-center hover:shadow-md transition duration-300 ease-in-out">
      <input
        className="py-1.5 ml-3 placeholder-black"
        type="text"
        name="Search"
        id="search"
        placeholder="Start your search"
      />
      <div className="bg-green-400 rounded-full p-2 w-8 h-8 inline-flex items-center cursor-pointer text-white">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="feather feather-search"
        >
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
      </div>
    </div>
  );
}
