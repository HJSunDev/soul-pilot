'use client';

import Link from 'next/link';
import { UserButton, SignInButton, SignUpButton, useUser } from "@clerk/nextjs";

// 导航栏组件
const Navbar = () => {
  const { isSignedIn } = useUser();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md shadow-xs">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-14">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-lg font-bold bg-linear-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Soul Pilot
            </span>
          </Link>

          {/* 用户操作区 */}
          <div className="flex items-center">
            {!isSignedIn ? (
              <div className="flex items-center space-x-2">
                <SignInButton mode="modal">
                  <button className="px-3 py-1.5 text-sm font-medium text-gray-600 hover:text-indigo-600 transition-all duration-300">
                    Sign in
                  </button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <button className="px-3 py-1.5 text-sm font-medium text-white bg-linear-to-r from-indigo-500 to-purple-600 rounded-full hover:shadow-lg hover:shadow-indigo-500/30 transition-all duration-300">
                    Sign up
                  </button>
                </SignUpButton>
              </div>
            ) : (
              <UserButton
                appearance={{
                  elements: {
                    avatarBox: "w-8 h-8",
                    userButtonPopoverCard: "shadow-lg",
                    userButtonPopoverFooter: "hidden"
                  }
                }}
              />
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 