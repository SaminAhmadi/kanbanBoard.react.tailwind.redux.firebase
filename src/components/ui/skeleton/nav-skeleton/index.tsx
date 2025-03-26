// main
import { FC } from 'react';

const NavSkeleton: FC = () => {
  return (
    <nav className="w-[17%] pt-3 flex flex-col gap-2 bg-[var(--primary-bg)] animate-pulse">
      {/* Boards Section */}
      <div className="h-4 w-24 bg-gray-300 rounded ml-3 mb-2"></div>
      <div className="w-full h-full flex flex-col gap-2">
        <div className="flex flex-col gap-3">
          {/* Simulating multiple board buttons */}
          {[...Array(3)].map((_, index) => (
            <div
              key={index}
              className="w-[90%] h-10 bg-gray-300 rounded-tr-2xl rounded-br-2xl p-3"
            ></div>
          ))}
        </div>
        {/* Create New Board */}
        <div className="w-[90%] h-10 bg-gray-300 rounded-tr-2xl rounded-br-2xl p-3"></div>
      </div>
      {/* Toggle Button */}
      <div className="flex items-center justify-center gap-3 bg-[var(--button-secondary)] py-4 px-3 rounded-s shadow-[-1px_-2px_16px_0px_rgba(0,_0,_0,_0.1)]">
        <div className="h-6 w-6 bg-gray-300 rounded-full"></div>
        <div className="h-6 w-11 bg-gray-300 rounded-full"></div>
        <div className="h-6 w-6 bg-gray-300 rounded-full"></div>
      </div>
    </nav>
  );
};
export default NavSkeleton;
