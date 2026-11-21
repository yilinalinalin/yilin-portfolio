"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import type { Map as LeafletMap } from "leaflet";
import "leaflet/dist/leaflet.css";
import { AnimatePresence, motion } from "framer-motion";
import { myLocation, places, startPhoto, type Place } from "@/content/places";
import { MacWindow } from "./MacWindow";

/** The map pin: a photo thumbnail in a white frame with a pointer and a photo count, like Photos' map. */
function pinHtml(place: Place) {
  const below = place.pinBelow;
  return `
    <div class="photo-pin group relative flex ${below ? "flex-col-reverse" : "flex-col"} items-center" aria-label="${place.city}">
      <div class="size-[58px] overflow-hidden rounded-[10px] border-[3px] border-white bg-white shadow-[0_6px_16px_rgba(0,0,0,0.25)] transition-transform duration-200 group-hover:scale-110"><img src="${place.photos[0]?.src ?? ""}" alt="" class="h-full w-full object-cover" /></div>
      <div class="${below ? "-mb-[5px]" : "-mt-[5px]"} size-[10px] rotate-45 bg-white shadow-[2px_2px_3px_rgba(0,0,0,0.12)]"></div>
      <span class="absolute -right-2 ${below ? "top-[6px]" : "-top-2"} flex h-[20px] min-w-[20px] items-center justify-center rounded-full bg-[#0051ff] px-1 text-[11px] font-semibold text-white ring-2 ring-white">${place.photos.length}</span>
      <span class="${below ? "mb-1" : "mt-1"} whitespace-nowrap rounded-full bg-white/90 px-2 py-[1px] text-[11px] font-medium text-[#1c1c1c] shadow-sm">${place.city}</span>
    </div>`;
}

function MapView({ onSelect }: { onSelect: (p: Place) => void }) {
  const el = useRef<HTMLDivElement>(null);
  const map = useRef<LeafletMap | null>(null);

  // Leaflet touches `window`, so it loads in the browser only, once the window is open.
  useEffect(() => {
    let cancelled = false;
    import("leaflet").then((L) => {
      if (cancelled || !el.current || map.current) return;
      // Narrow windows (phones) need one more zoom level out to fit Shanghai and the US together.
      const narrow = el.current.offsetWidth < 600;
      const pad = narrow ? 30 : 70;
      const m = L.map(el.current, { zoomControl: false, worldCopyJump: true, minZoom: narrow ? 1 : 2 });
      L.control.zoom({ position: "topright" }).addTo(m);
      // OpenStreetMap's own tiles: free for light use with credit, no key. Softened in CSS (.map-soft).
      L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 18,
        className: "map-soft",
      }).addTo(m);
      m.fitBounds(places.map((p) => p.position), { padding: [pad, pad] });
      for (const place of places) {
        L.marker(place.position, {
          icon: L.divIcon({
            html: pinHtml(place),
            className: "",
            iconSize: [58, 90],
            // The pointer tip sits on the place: at the bottom of the pin, or the top when it hangs below.
            iconAnchor: place.pinBelow ? [29, 24] : [29, 66],
          }),
          title: place.city,
          keyboard: true,
        })
          .on("click", () => onSelect(place))
          .addTo(m);
      }
      // Current location: a blue dot with a soft pulse, like Maps' "you are here", drawn above the photo pins.
      if (myLocation) {
        L.marker(myLocation.position, {
          icon: L.divIcon({
            className: "",
            iconSize: [22, 22],
            iconAnchor: [11, 11],
            html: `
              <div class="relative flex size-[22px] items-center justify-center" aria-label="${myLocation.label}">
                <span class="absolute inset-0 animate-ping rounded-full bg-[#0a84ff]/40"></span>
                <span class="relative size-[16px] rounded-full border-[3px] border-white bg-[#0a84ff] shadow-[0_1px_4px_rgba(0,0,0,0.35)]"></span>
              </div>`,
          }),
          title: myLocation.label,
          interactive: false,
          zIndexOffset: 1000,
        }).addTo(m);
      }
      map.current = m;
      // The window springs open, so measure again once it has settled.
      setTimeout(() => m.invalidateSize(), 350);
    });
    return () => {
      cancelled = true;
      map.current?.remove();
      map.current = null;
    };
  }, [onSelect]);

  return <div ref={el} className="absolute inset-0 bg-[#eef0f2]" />;
}

/** One photo, large, over the map. Arrows step through the place's photos. */
function PhotoViewer({ place, index, onIndex, onClose }: { place: Place; index: number; onIndex: (i: number) => void; onClose: () => void }) {
  const photos = place.photos;
  const photo = photos[index];
  const step = (d: number) => onIndex((index + d + photos.length) % photos.length);
  if (!photo) return null;
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 z-[600] flex flex-col items-center justify-center gap-3 bg-black/85 p-6"
      onClick={onClose}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={photo.src} alt={photo.caption ?? place.city} className="min-h-0 max-w-full flex-1 rounded-[6px] object-contain" onClick={(e) => e.stopPropagation()} />
      <div className="flex items-center gap-4 text-[13px] text-white/85" onClick={(e) => e.stopPropagation()}>
        {photos.length > 1 && (
          <button type="button" aria-label="Previous photo" onClick={() => step(-1)} className="rounded-full bg-white/10 px-3 py-1 hover:bg-white/20">
            ←
          </button>
        )}
        <span>
          {photo.caption ?? place.city} · {index + 1}/{photos.length}
        </span>
        {photos.length > 1 && (
          <button type="button" aria-label="Next photo" onClick={() => step(1)} className="rounded-full bg-white/10 px-3 py-1 hover:bg-white/20">
            →
          </button>
        )}
      </div>
      <button type="button" aria-label="Close photo" onClick={onClose} className="absolute right-3 top-3 rounded-full bg-white/10 px-2.5 py-1 text-[13px] text-white hover:bg-white/20">
        ✕
      </button>
    </motion.div>
  );
}

/** The dock's Map: a macOS-style window with photo pins; clicking a pin expands that place's photos. */
export function MapWindow({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [viewing, setViewing] = useState<{ place: Place; index: number } | null>(null);

  // Each time the window opens, start on the chosen photo (or on the map if there isn't one).
  useEffect(() => {
    if (!open) return setViewing(null);
    const place = places.find((p) => p.id === startPhoto?.placeId);
    const index = place ? place.photos.findIndex((p) => p.src === startPhoto?.src) : -1;
    if (place && index >= 0) setViewing({ place, index });
  }, [open]);

  const openPlace = useCallback((place: Place) => setViewing({ place, index: 0 }), []);

  return (
    <MacWindow
      open={open}
      title={viewing ? `Map — ${viewing.place.city}` : "Map"}
      onClose={onClose}
      className="h-[min(600px,80vh)] w-[min(900px,100%)]"
      bodyClassName="overflow-hidden"
    >
      <MapView onSelect={openPlace} />
      <AnimatePresence>
        {viewing && (
          <PhotoViewer
            key="viewer"
            place={viewing.place}
            index={viewing.index}
            onIndex={(index) => setViewing({ place: viewing.place, index })}
            onClose={() => setViewing(null)}
          />
        )}
      </AnimatePresence>
    </MacWindow>
  );
}
