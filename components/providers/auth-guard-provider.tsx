"use client"

import { useUser } from "@clerk/nextjs";
import { useRouter, usePathname } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";

// 定义不需要认证的路径前缀
const PUBLIC_PATHS = [
  // 营销页面和认证页面不需要登录
  "/",  // 主页（营销页面）
];

interface AuthGuardProviderProps {
  children: ReactNode;
}

export const AuthGuardProvider = ({ children }: AuthGuardProviderProps) => {
  const { isSignedIn, isLoaded } = useUser();
  const router = useRouter();
  const pathname = usePathname();
  const { toast } = useToast();
  const [prevSignedInState, setPrevSignedInState] = useState<boolean | null>(null);

  useEffect(() => {
    // 只有当Clerk加载完成后才进行检查
    if (!isLoaded) return;

    // 检查当前路径是否是公开路径
    const isPublicPath = PUBLIC_PATHS.some(path => pathname === path || pathname.startsWith(`${path}/`));

    // 如果用户未登录且当前路径不是公开路径，则重定向到主页
    if (!isSignedIn && !isPublicPath) {
      console.log("用户未登录或登录已过期，重定向到主页");
      
      // 显示友好的提示
      toast({
        title: "登录已过期",
        description: "您的登录状态已过期，请重新登录",
        variant: "destructive",
      });
      
      router.push("/");  // 重定向到主页
    }

    // 检测登录状态变化
    if (prevSignedInState !== null && prevSignedInState !== isSignedIn) {
      if (!isSignedIn) {
        // 用户从登录状态变为未登录状态
        console.log("登录状态已变更为未登录");
        
        // 显示友好的提示
        toast({
          title: "登录已过期",
          description: "您的登录状态已过期，请重新登录",
          variant: "destructive",
        });
        
        // 如果当前不在公开路径，则重定向到主页
        if (!isPublicPath) {
          router.push("/");  // 重定向到主页
        }
      }
    }

    // 更新上一次的登录状态
    setPrevSignedInState(isSignedIn);
  }, [isSignedIn, isLoaded, pathname, router, prevSignedInState, toast]);

  return <>{children}</>;
}; 