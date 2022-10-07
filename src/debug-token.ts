import User from "./user";
import Config from './config';
import Util from './util';

const TESTING_HELIX_TOKEN_KEY = "testing_helix_token";

interface Token {
  access_token: string;
  expires_in: number;
  refresh_token: string;
}

declare global {
  interface Window {
    ObtainHelixToken: () => void;
    ClearHelixToken: () => void;
  }
}

export function allowTestingHelixToken (id: string, user: User) {
  if (user.helixToken) {
    return {
      async openHelixUrl() {
        return "";
      }
    };
  }

  const urls = Config.GetServerURLs(Util.currentEnvironment());

  const clientId = id;
  const useHelixToken = async () => {
    const localToken = localStorage.getItem(TESTING_HELIX_TOKEN_KEY);
    if (!localToken) {
      return false;
    }

    try {
      const sanityToken = JSON.parse(localToken) as Token;
      if (!sanityToken.access_token || !sanityToken.refresh_token || !sanityToken.expires_in) {
        return false;
      }
    } catch (e) {
      return false;
    }

    // Immediately refresh the token. Note that localToken is a string.
    const req = await fetch(`${urls.PortalURL}/api/tokenauth/${clientId}/refresh`, {
      method: "POST",
      body: localToken,
    });

    // Store and use the token.
    const newToken = (await req.json()) as Token;
    if (newToken.access_token) {
      localStorage.setItem(TESTING_HELIX_TOKEN_KEY, JSON.stringify(newToken));
      user.helixToken = newToken.access_token;

      console.log("Using testing helix token. Call window.ClearHelixToken() to stop this behavior");
      return true;
    } else {
      console.log("Failed to refresh helix token.");
      return false;
    }
  };

  const pollForHelixToken = async (rng: string) => {
    let interval = 0;
    let attempts = 0;
    interval = window.setInterval(async () => {
      const req = await fetch(`${urls.PortalURL}/api/tokenauth/${clientId}/${rng}`);
      const js = (await req.json()) as Token;

      if (js.access_token) {
        localStorage.setItem("testing_helix_token", JSON.stringify(js));
        clearInterval(interval);
        useHelixToken();
        return;
      }

      attempts++;

      if (attempts > 120) {
        console.log("Failed to obtain authentication, try again by calling ObtainHelixToken");
        clearInterval(interval);
        return;
      }
    }, 2000);
  };

  const obtainHelixToken = async () => {
    const rng = [...Array(8)].map(() => Math.random().toString(36)[2]).join("");

    console.log("To obtain a helix token, visit ");
    console.log(`  ${urls.PortalURL}/login/twitch/token/${clientId}/${rng}`);

    pollForHelixToken(rng);
    return "";
  };

  const openHelixUrl = async () => {
    const rng = [...Array(8)].map(() => Math.random().toString(36)[2]).join("");
    window.open(`${urls.PortalURL}/login/twitch/token/${clientId}/${rng}`, "_blank");
    pollForHelixToken(rng);
    return "";
  };

  const clearHelixToken = () => {
    localStorage.removeItem(TESTING_HELIX_TOKEN_KEY);
    user.helixToken = "";
  };

  window.ObtainHelixToken = obtainHelixToken;
  window.ClearHelixToken = clearHelixToken;

  const loadHelixToken = useHelixToken();

  loadHelixToken.then((result) => {
    if (!result) {
      console.log(" To use the debug helix token flow, call window.ObtainHelixToken() in the console");
    }
  });

  return {
    openHelixUrl
  };
}
