"use client";

import { Protect } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { userService } from "@/services/user/user-service";

export default function PostAuth() {
  const router = useRouter();

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const workspaceId = await userService.getDefaultWorkspace(null);

        if (cancelled) return;

        router.replace(`/m/${workspaceId}/overview`);
      } catch (_) {
        router.replace("/sign-out");
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [router]);

  return (
    <Protect>
      <div className="h-screen flex items-center justify-center">
        <p className="text-sm text-gray-500">Signing you in…</p>
      </div>
    </Protect>
  );
}
