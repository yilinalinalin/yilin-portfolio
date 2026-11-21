// Places on the dock's Map window. Add photos by putting files in /public/images/places/
// and listing them below. The first photo of each place is its pin thumbnail.

export type Place = {
  id: string;
  city: string;
  country: string;
  /** [latitude, longitude] */
  position: [number, number];
  /** Hang the pin below its point, so close neighbours (New York and Miami) don't overlap. */
  pinBelow?: boolean;
  photos: { src: string; caption?: string }[];
};

export const places: Place[] = [
  {
    id: "shanghai",
    city: "Shanghai",
    country: "China",
    position: [31.2304, 121.4737],
    photos: [
      { src: "/images/places/shanghai-seal-carving.jpg", caption: "Seal carving" },
      { src: "/images/places/shanghai-calligraphy-desk.jpg", caption: "Calligraphy" },
      { src: "/images/places/shanghai-calligraphy-brush.jpg", caption: "Calligraphy" },
      { src: "/images/places/shanghai-watercolor-dragon.jpg", caption: "Watercolor & ink" },
      { src: "/images/places/shanghai-watercolor-face.jpg", caption: "Watercolor & ink" },
      { src: "/images/places/shanghai-painting-in-progress.jpg", caption: "Work in progress" },
      { src: "/images/places/shanghai-watercolor-detail.jpg", caption: "Watercolor detail" },
    ],
  },
  {
    id: "new-york",
    city: "New York",
    country: "United States",
    position: [40.7128, -74.006],
    photos: [
      { src: "/images/places/new-york-waterfall.jpg", caption: "Waterfall rappelling" },
      { src: "/images/places/new-york-ballroom-dip.jpg", caption: "Ballroom dancing" },
      { src: "/images/places/new-york-ballroom-practice.jpg", caption: "Ballroom practice" },
      { src: "/images/places/new-york-squat.jpg", caption: "Squat day" },
    ],
  },
  {
    id: "miami",
    city: "Miami",
    country: "United States",
    position: [25.7617, -80.1918],
    pinBelow: true,
    photos: [
      { src: "/images/places/miami-skydive-freefall.jpg", caption: "Skydiving over the Florida Keys" },
      { src: "/images/places/miami-skydive-keys.jpg", caption: "Under canopy" },
    ],
  },
];

/** The photo shown expanded when the Map window opens. Set to null to open on the map itself. */
export const startPhoto: { placeId: string; src: string } | null = {
  placeId: "new-york",
  src: "/images/places/new-york-waterfall.jpg",
};

/** "You are here" on the map: a pulsing blue dot. Set to null to hide it. */
export const myLocation: { label: string; position: [number, number] } | null = {
  label: "Yilin is here",
  position: [40.6782, -73.9442], // Brooklyn, NY
};
