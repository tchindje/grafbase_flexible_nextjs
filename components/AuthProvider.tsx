"use client";

import React, { useEffect, useState } from "react";
import { signIn, getProviders } from "next-auth/react";

type Provider = {
  id: string;
  name: string;
  type: string;
  signinUrl: string;
  callBackUrl?: string;
  signinUrlParameter?: Record<string, string> | null;
};

type Providers = Record<string, Provider>;

export const AuthProvider = () => {
  const [providers, setProviders] = useState<Providers | null>(null);

  useEffect(() => {
    const fecthProvider = async () => {
      const res = await getProviders();
      console.log("list of provider available in next-auth/react ", res);

      setProviders(res);
    };
    fecthProvider();
  }, []);

  if (providers) {
    return (
      <div>
        {Object.values(providers).map((provider: Provider, i) => (
          <button key={i} onClick={() => signIn(provider?.id)}>
            {provider.id}
          </button>
        ))}
      </div>
    );
  }
  return <div>Not AuthProvider</div>;
};
