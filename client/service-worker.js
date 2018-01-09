/**
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
*/

// DO NOT EDIT THIS GENERATED OUTPUT DIRECTLY!
// This file should be overwritten as part of your build process.
// If you need to extend the behavior of the generated service worker, the best approach is to write
// additional code and include it using the importScripts option:
//   https://github.com/GoogleChrome/sw-precache#importscripts-arraystring
//
// Alternatively, it's possible to make changes to the underlying template file and then use that as the
// new base for generating output, via the templateFilePath option:
//   https://github.com/GoogleChrome/sw-precache#templatefilepath-string
//
// If you go that route, make sure that whenever you update your sw-precache dependency, you reconcile any
// changes made to this original template file with your modified copy.

// This generated service worker JavaScript will precache your site's resources.
// The code needs to be saved in a .js file at the top-level of your site, and registered
// from your pages in order to be used. See
// https://github.com/googlechrome/sw-precache/blob/master/demo/app/js/service-worker-registration.js
// for an example of how you can register this script and handle various service worker events.

/* eslint-env worker, serviceworker */
/* eslint-disable indent, no-unused-vars, no-multiple-empty-lines, max-nested-callbacks, space-before-function-paren, quotes, comma-spacing */
'use strict';

var precacheConfig = [["/api/0.d49ff0c8e4533ca96b27.hot-update.js","71bac84c7134348d02b79f8c90b8ef00"],["/api/api.bundle.js","af5048967d1bea7c179c5478cb9d772b"],["/api/d49ff0c8e4533ca96b27.hot-update.json","5a152800842837bdf9a1ac0b79f8c340"],["/client/css/style.d21d7463d30d012dcaca.css","fa3de1a46d0486b839fc5f82f9a76887"],["/client/humans.txt","a4625406e9ad08f6773053e402782c39"],["/client/icons-3fb01b761423830a6a22bddea95ca734/android-chrome-144x144.png","6766a6c9f2687676dde780dc7f294f49"],["/client/icons-3fb01b761423830a6a22bddea95ca734/android-chrome-192x192.png","d1790b90a8c61752c1b64f83bb226b2a"],["/client/icons-3fb01b761423830a6a22bddea95ca734/android-chrome-256x256.png","f314eaf6d77ad3e36e928e14f691d9ad"],["/client/icons-3fb01b761423830a6a22bddea95ca734/android-chrome-36x36.png","14a83cd91d3363d689b8ff67bf6bf8a7"],["/client/icons-3fb01b761423830a6a22bddea95ca734/android-chrome-384x384.png","63da3d94c6762ae7ddef2d369d0755b5"],["/client/icons-3fb01b761423830a6a22bddea95ca734/android-chrome-48x48.png","cc095955ea0c036b7670ed7f248093a9"],["/client/icons-3fb01b761423830a6a22bddea95ca734/android-chrome-512x512.png","621e35b6c80119757979a46b52d6d4f3"],["/client/icons-3fb01b761423830a6a22bddea95ca734/android-chrome-72x72.png","d807ca16bde6eac464fd941001d96961"],["/client/icons-3fb01b761423830a6a22bddea95ca734/android-chrome-96x96.png","fc261ad2bf6166f87ec9291a21d7bd1c"],["/client/icons-3fb01b761423830a6a22bddea95ca734/apple-touch-icon-114x114.png","9d872e0ef60f2069f3d88ffd077444c4"],["/client/icons-3fb01b761423830a6a22bddea95ca734/apple-touch-icon-120x120.png","d8781e49f3d1527e77fdea77bbd1bae9"],["/client/icons-3fb01b761423830a6a22bddea95ca734/apple-touch-icon-144x144.png","4a6fa60b04eca78f4565fb5901b14c33"],["/client/icons-3fb01b761423830a6a22bddea95ca734/apple-touch-icon-152x152.png","a004f782cb21956e7caede1932981b39"],["/client/icons-3fb01b761423830a6a22bddea95ca734/apple-touch-icon-167x167.png","6eefee698ae9a08975aef545ba52b453"],["/client/icons-3fb01b761423830a6a22bddea95ca734/apple-touch-icon-180x180.png","4875e8170eb5f72875c9c1a4ec5bb4d9"],["/client/icons-3fb01b761423830a6a22bddea95ca734/apple-touch-icon-57x57.png","0248ba6399ffc9c1bbc19b4f27c5c163"],["/client/icons-3fb01b761423830a6a22bddea95ca734/apple-touch-icon-60x60.png","0d87f2e4aa0c8389d8f35378b4f5a0b7"],["/client/icons-3fb01b761423830a6a22bddea95ca734/apple-touch-icon-72x72.png","d67240e5f3e5a74ee6070e1b8683af83"],["/client/icons-3fb01b761423830a6a22bddea95ca734/apple-touch-icon-76x76.png","72151180f8de18248a3851a9d1f61ef2"],["/client/icons-3fb01b761423830a6a22bddea95ca734/apple-touch-icon-precomposed.png","4875e8170eb5f72875c9c1a4ec5bb4d9"],["/client/icons-3fb01b761423830a6a22bddea95ca734/apple-touch-icon.png","4875e8170eb5f72875c9c1a4ec5bb4d9"],["/client/icons-3fb01b761423830a6a22bddea95ca734/apple-touch-startup-image-1182x2208.png","103fcf59ad1370cfc613692090de245b"],["/client/icons-3fb01b761423830a6a22bddea95ca734/apple-touch-startup-image-1242x2148.png","556528adb79322f23d87c9650035d700"],["/client/icons-3fb01b761423830a6a22bddea95ca734/apple-touch-startup-image-1496x2048.png","ecab5d005ce981bd8bed592258f5d060"],["/client/icons-3fb01b761423830a6a22bddea95ca734/apple-touch-startup-image-1536x2008.png","ef2b603ad77ec1a3aa8f6bb016202f76"],["/client/icons-3fb01b761423830a6a22bddea95ca734/apple-touch-startup-image-320x460.png","ab23755b6dcdd8fe9a64917dae07d9a3"],["/client/icons-3fb01b761423830a6a22bddea95ca734/apple-touch-startup-image-640x1096.png","c87003e8b0e9eb21c94ca2eea353faee"],["/client/icons-3fb01b761423830a6a22bddea95ca734/apple-touch-startup-image-640x920.png","ae5644baed528fc09b7737cac06ee344"],["/client/icons-3fb01b761423830a6a22bddea95ca734/apple-touch-startup-image-748x1024.png","b3dae039ec65e5e04f203da58af0601d"],["/client/icons-3fb01b761423830a6a22bddea95ca734/apple-touch-startup-image-750x1294.png","091443545b09deb2daef802f08834759"],["/client/icons-3fb01b761423830a6a22bddea95ca734/apple-touch-startup-image-768x1004.png","6c20dd35f9044b7a22c4db01aa0eab1d"],["/client/icons-3fb01b761423830a6a22bddea95ca734/browserconfig.xml","85acc91d59f4074246995f17e58a8600"],["/client/icons-3fb01b761423830a6a22bddea95ca734/favicon-16x16.png","c28e9bcf41516c7c0532af32ccb27891"],["/client/icons-3fb01b761423830a6a22bddea95ca734/favicon-32x32.png","7ea984a88736c495f13228b3eb126d72"],["/client/icons-3fb01b761423830a6a22bddea95ca734/firefox_app_128x128.png","4510b90a41883e9d22d557940ce56971"],["/client/icons-3fb01b761423830a6a22bddea95ca734/firefox_app_512x512.png","9c8168491ee4d9cab1221c92d2f8a651"],["/client/icons-3fb01b761423830a6a22bddea95ca734/firefox_app_60x60.png","b242a445e48c4f2cde61e9c988fb0993"],["/client/icons-3fb01b761423830a6a22bddea95ca734/manifest.json","99aafbce803b44a5649e538fab493a2f"],["/client/icons-3fb01b761423830a6a22bddea95ca734/mstile-144x144.png","6766a6c9f2687676dde780dc7f294f49"],["/client/icons-3fb01b761423830a6a22bddea95ca734/mstile-150x150.png","2cc1f978713f3c9f963bc79dfbbf80e1"],["/client/icons-3fb01b761423830a6a22bddea95ca734/mstile-310x150.png","47926aacba5cc52b24c7d1a1bfbbaf37"],["/client/icons-3fb01b761423830a6a22bddea95ca734/mstile-310x310.png","e2210e85df4b4ca55622e0ddd172655d"],["/client/icons-3fb01b761423830a6a22bddea95ca734/mstile-70x70.png","f6bb7781cb20ba9ff5e384f3cef5f3f8"],["/client/images/canvas-texture.jpg","aeafb2829f5766fa379846f81057580a"],["/client/images/computer-mouse.jpg","0b3c1925f03ab711a5c0269f717ef914"],["/client/images/loading-spinner.gif","312b827679a3123b27cc3372fbd4b30d"],["/client/images/react-logo.png","3fb01b761423830a6a22bddea95ca734"],["/client/images/select-arrows.png","6a800f2cc3b022640116723d17b9635e"],["/client/index.html","4bb5b4547c765e00a5f8356279fb79b8"],["/client/js/bundle.d21d7463d30d012dcaca.js","53ca9dbaa5308589cb4380026886e174"],["/client/js/manifest.adfbc38609d58b1aad6a.js","33a1f43f219426511259a055dfd00b62"],["/client/js/vendor.1eb4963f79a4e4027ffa.js","d9299d356109c2ead4bd0b08fa61c617"],["/client/robots.txt","00733c197e59662cf705a2ec6d881d44"],["/client/vendor/html5boilerplate.css","da1ae0a945252ea4cfbd806472110f0e"],["/client/vendor/normalize.min.css","db1aae18a50d64dc7d57cc30890fa4a9"],["/service-worker.js","839309a409f0ccf50d7718e21610d020"]];
var cacheName = 'sw-precache-v3-lift-tracker-' + (self.registration ? self.registration.scope : '');


var ignoreUrlParametersMatching = [/^utm_/];



var addDirectoryIndex = function (originalUrl, index) {
    var url = new URL(originalUrl);
    if (url.pathname.slice(-1) === '/') {
      url.pathname += index;
    }
    return url.toString();
  };

var cleanResponse = function (originalResponse) {
    // If this is not a redirected response, then we don't have to do anything.
    if (!originalResponse.redirected) {
      return Promise.resolve(originalResponse);
    }

    // Firefox 50 and below doesn't support the Response.body stream, so we may
    // need to read the entire body to memory as a Blob.
    var bodyPromise = 'body' in originalResponse ?
      Promise.resolve(originalResponse.body) :
      originalResponse.blob();

    return bodyPromise.then(function(body) {
      // new Response() is happy when passed either a stream or a Blob.
      return new Response(body, {
        headers: originalResponse.headers,
        status: originalResponse.status,
        statusText: originalResponse.statusText
      });
    });
  };

var createCacheKey = function (originalUrl, paramName, paramValue,
                           dontCacheBustUrlsMatching) {
    // Create a new URL object to avoid modifying originalUrl.
    var url = new URL(originalUrl);

    // If dontCacheBustUrlsMatching is not set, or if we don't have a match,
    // then add in the extra cache-busting URL parameter.
    if (!dontCacheBustUrlsMatching ||
        !(url.pathname.match(dontCacheBustUrlsMatching))) {
      url.search += (url.search ? '&' : '') +
        encodeURIComponent(paramName) + '=' + encodeURIComponent(paramValue);
    }

    return url.toString();
  };

var isPathWhitelisted = function (whitelist, absoluteUrlString) {
    // If the whitelist is empty, then consider all URLs to be whitelisted.
    if (whitelist.length === 0) {
      return true;
    }

    // Otherwise compare each path regex to the path of the URL passed in.
    var path = (new URL(absoluteUrlString)).pathname;
    return whitelist.some(function(whitelistedPathRegex) {
      return path.match(whitelistedPathRegex);
    });
  };

var stripIgnoredUrlParameters = function (originalUrl,
    ignoreUrlParametersMatching) {
    var url = new URL(originalUrl);
    // Remove the hash; see https://github.com/GoogleChrome/sw-precache/issues/290
    url.hash = '';

    url.search = url.search.slice(1) // Exclude initial '?'
      .split('&') // Split into an array of 'key=value' strings
      .map(function(kv) {
        return kv.split('='); // Split each 'key=value' string into a [key, value] array
      })
      .filter(function(kv) {
        return ignoreUrlParametersMatching.every(function(ignoredRegex) {
          return !ignoredRegex.test(kv[0]); // Return true iff the key doesn't match any of the regexes.
        });
      })
      .map(function(kv) {
        return kv.join('='); // Join each [key, value] array into a 'key=value' string
      })
      .join('&'); // Join the array of 'key=value' strings into a string with '&' in between each

    return url.toString();
  };


var hashParamName = '_sw-precache';
var urlsToCacheKeys = new Map(
  precacheConfig.map(function(item) {
    var relativeUrl = item[0];
    var hash = item[1];
    var absoluteUrl = new URL(relativeUrl, self.location);
    var cacheKey = createCacheKey(absoluteUrl, hashParamName, hash, /\.(js|json|css)$/);
    return [absoluteUrl.toString(), cacheKey];
  })
);

function setOfCachedUrls(cache) {
  return cache.keys().then(function(requests) {
    return requests.map(function(request) {
      return request.url;
    });
  }).then(function(urls) {
    return new Set(urls);
  });
}

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return setOfCachedUrls(cache).then(function(cachedUrls) {
        return Promise.all(
          Array.from(urlsToCacheKeys.values()).map(function(cacheKey) {
            // If we don't have a key matching url in the cache already, add it.
            if (!cachedUrls.has(cacheKey)) {
              var request = new Request(cacheKey, {credentials: 'same-origin'});
              return fetch(request).then(function(response) {
                // Bail out of installation unless we get back a 200 OK for
                // every request.
                if (!response.ok) {
                  throw new Error('Request for ' + cacheKey + ' returned a ' +
                    'response with status ' + response.status);
                }

                return cleanResponse(response).then(function(responseToCache) {
                  return cache.put(cacheKey, responseToCache);
                });
              });
            }
          })
        );
      });
    }).then(function() {
      
      // Force the SW to transition from installing -> active state
      return self.skipWaiting();
      
    })
  );
});

self.addEventListener('activate', function(event) {
  var setOfExpectedUrls = new Set(urlsToCacheKeys.values());

  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.keys().then(function(existingRequests) {
        return Promise.all(
          existingRequests.map(function(existingRequest) {
            if (!setOfExpectedUrls.has(existingRequest.url)) {
              return cache.delete(existingRequest);
            }
          })
        );
      });
    }).then(function() {
      
      return self.clients.claim();
      
    })
  );
});


self.addEventListener('fetch', function(event) {
  if (event.request.method === 'GET') {
    // Should we call event.respondWith() inside this fetch event handler?
    // This needs to be determined synchronously, which will give other fetch
    // handlers a chance to handle the request if need be.
    var shouldRespond;

    // First, remove all the ignored parameters and hash fragment, and see if we
    // have that URL in our cache. If so, great! shouldRespond will be true.
    var url = stripIgnoredUrlParameters(event.request.url, ignoreUrlParametersMatching);
    shouldRespond = urlsToCacheKeys.has(url);

    // If shouldRespond is false, check again, this time with 'index.html'
    // (or whatever the directoryIndex option is set to) at the end.
    var directoryIndex = 'index.html';
    if (!shouldRespond && directoryIndex) {
      url = addDirectoryIndex(url, directoryIndex);
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond is still false, check to see if this is a navigation
    // request, and if so, whether the URL matches navigateFallbackWhitelist.
    var navigateFallback = '';
    if (!shouldRespond &&
        navigateFallback &&
        (event.request.mode === 'navigate') &&
        isPathWhitelisted([], event.request.url)) {
      url = new URL(navigateFallback, self.location).toString();
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond was set to true at any point, then call
    // event.respondWith(), using the appropriate cache key.
    if (shouldRespond) {
      event.respondWith(
        caches.open(cacheName).then(function(cache) {
          return cache.match(urlsToCacheKeys.get(url)).then(function(response) {
            if (response) {
              return response;
            }
            throw Error('The cached response that was expected is missing.');
          });
        }).catch(function(e) {
          // Fall back to just fetch()ing the request if some unexpected error
          // prevented the cached response from being valid.
          console.warn('Couldn\'t serve response for "%s" from cache: %O', event.request.url, e);
          return fetch(event.request);
        })
      );
    }
  }
});







