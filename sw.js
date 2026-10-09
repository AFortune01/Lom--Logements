/**
 * Copyright 2018 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *     http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// If the loader is already loaded, just stop.
if (!self.define) {
  let registry = {};

  // Used for `eval` and `importScripts` where we can't get script URL by other means.
  // In both cases, it's safe to use a global var because those functions are synchronous.
  let nextDefineUri;

  const singleRequire = (uri, parentUri) => {
    uri = new URL(uri + ".js", parentUri).href;
    return registry[uri] || (
      
        new Promise(resolve => {
          if ("document" in self) {
            const script = document.createElement("script");
            script.src = uri;
            script.onload = resolve;
            document.head.appendChild(script);
          } else {
            nextDefineUri = uri;
            importScripts(uri);
            resolve();
          }
        })
      
      .then(() => {
        let promise = registry[uri];
        if (!promise) {
          throw new Error(`Module ${uri} didn’t register its module`);
        }
        return promise;
      })
    );
  };

  self.define = (depsNames, factory) => {
    const uri = nextDefineUri || ("document" in self ? document.currentScript.src : "") || location.href;
    if (registry[uri]) {
      // Module is already loading or loaded.
      return;
    }
    let exports = {};
    const require = depUri => singleRequire(depUri, uri);
    const specialDeps = {
      module: { uri },
      exports,
      require
    };
    registry[uri] = Promise.all(depsNames.map(
      depName => specialDeps[depName] || require(depName)
    )).then(deps => {
      factory(...deps);
      return exports;
    });
  };
}
define(['./workbox-7e5eb42b'], (function (workbox) { 'use strict';

  self.skipWaiting();
  workbox.clientsClaim();
  /**
   * The precacheAndRoute() method efficiently caches and responds to
   * requests for URLs in the manifest.
   * See https://goo.gl/S9QRab
   */
  workbox.precacheAndRoute([{
    "url": "registerSW.js",
    "revision": "1872c500de691dce40960bb85481de07"
  }, {
    "url": "pwa-maskable-512x512.png",
    "revision": "0d53c506a745e700af7f6089f909a062"
  }, {
    "url": "pwa-512x512.png",
    "revision": "0d53c506a745e700af7f6089f909a062"
  }, {
    "url": "pwa-192x192.png",
    "revision": "d747694151dbadf6ef59b13e7a550a64"
  }, {
    "url": "index.html",
    "revision": "2a5ee93ccd826dcd9890e24a92fa6e7f"
  }, {
    "url": "icon.svg",
    "revision": "74d1f4e0dc2fc97f2dbd295abd61f60b"
  }, {
    "url": "apple-touch-icon.png",
    "revision": "12b7018c3e7d3ff28df909087ec0f7b3"
  }, {
    "url": "index-CkfoqvyM.css",
    "revision": null
  }, {
    "url": "index-BE260GEe.js",
    "revision": null
  }, {
    "url": "apple-touch-icon.png",
    "revision": "12b7018c3e7d3ff28df909087ec0f7b3"
  }, {
    "url": "icon.svg",
    "revision": "74d1f4e0dc2fc97f2dbd295abd61f60b"
  }, {
    "url": "pwa-192x192.png",
    "revision": "d747694151dbadf6ef59b13e7a550a64"
  }, {
    "url": "pwa-512x512.png",
    "revision": "0d53c506a745e700af7f6089f909a062"
  }, {
    "url": "pwa-maskable-512x512.png",
    "revision": "0d53c506a745e700af7f6089f909a062"
  }, {
    "url": "robots.txt",
    "revision": "6ed1a9879d57bbb6da66e77cbe21c130"
  }, {
    "url": "sitemap.xml",
    "revision": "028bf4952e0645e43d5b567a96579916"
  }, {
    "url": "manifest.webmanifest",
    "revision": "69a4c25f7579f620cff9ff29b8cf4ee1"
  }], {});
  workbox.cleanupOutdatedCaches();
  workbox.registerRoute(new workbox.NavigationRoute(workbox.createHandlerBoundToURL("index.html")));

}));
