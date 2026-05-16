export const locations = [
  {
    id: "rexine",
    name: "Ambica Rexine",
    lines: [
      "Opp. Vamdot Petrol Pump,",
      "Station Road,",
      "Sadar Baug,",
      "Bardoli - 394601",
      "Dist. Surat",
    ],
    phone: "+91 97370 22516",
    phoneHref: "tel:+919737022516",
    whatsappHref: "https://wa.me/919737022516",
    mapsQuery:
      "Ambica Rexine, Station Road, Sadar Baug, Bardoli, Surat, Gujarat 394601",
  },
  {
    id: "home-decor",
    name: "Ambica Home Decor",
    lines: [
      "Shop No. 1734,",
      "Near Dhru Motors,",
      "Kadodara–Bardoli Road,",
      "Ten, Bardoli",
    ],
    phone: "+91 90816 22516",
    phoneHref: "tel:+91908222516",
    whatsappHref: "https://wa.me/919081622516",
    mapsQuery:
      "Ambica Home Decor, Kadodara Bardoli Road, Ten, Bardoli, Surat, Gujarat",
  },
] as const;

export const inquiryEmail = "hello@ambikahomedecor.in";

export const footerLogos = [1, 2, 3, 4, 5, 6].map(
  (n) => `/images/footer logos/${n}.png`,
);

export const categories = [
  {
    slug: "wall-decor",
    title: "Wall Decor",
    image: "/images/products/mats/grass mats/artificial plants.png",
    description: "Artful accents that elevate every wall.",
  },
  {
    slug: "curtains",
    title: "Curtains",
    image: "/images/products/curtains & blinds/American Curtain.png",
    description: "Tailored drapes and refined window dressings.",
  },
  {
    slug: "mattresses",
    title: "Mattresses",
    image: "/images/products/Mettress/Mettresses.png",
    description: "Restorative comfort for serene bedrooms.",
  },
  {
    slug: "sectional-sofa",
    title: "Sectional Sofa",
    image: "/images/products/Sofas/Modern.png",
    description: "Sculptural seating for gracious living.",
  },
  {
    slug: "decor-chairs",
    title: "Decor Chairs",
    image: "/images/products/chairs/decorative chairs.png",
    description: "Statement chairs with timeless silhouette.",
  },
  {
    slug: "wallpaper",
    title: "Wallpaper",
    image: "/images/products/wallpapers/digital.png",
    description: "Textures and patterns with editorial depth.",
  },
  {
    slug: "carpets",
    title: "Carpets",
    image: "/images/products/carpet/center galicho.png",
    description: "Grounding layers of warmth and craft.",
  },
  {
    slug: "bath-accessories",
    title: "Bath Accessories",
    image: "/images/products/bath accesories/bath & hand towel.png",
    description: "Spa-inspired details for daily ritual.",
  },
] as const;

export const galleryItems = [
  {
    title: "Hybrid Mattress",
    category: "Mattresses",
    image: "/images/products/Mettress/Hybrid.png",
  },
  {
    title: "Roman Blinds",
    category: "Curtains",
    image: "/images/products/curtains & blinds/Roman Blinds.png",
  },
  {
    title: "Recliner Sofa",
    category: "Sectional Sofa",
    image: "/images/products/Sofas/Recliner.png",
  },
  {
    title: "Digital Wallpaper",
    category: "Wallpaper",
    image: "/images/products/wallpapers/digital.png",
  },
  {
    title: "Loop Pile Carpet",
    category: "Carpets",
    image: "/images/products/carpet/Loop pile.png",
  },
  {
    title: "Shower Curtain",
    category: "Bath Accessories",
    image: "/images/products/bath accesories/shower curtain.png",
  },
  {
    title: "Comforter Set",
    category: "Wall Decor",
    image: "/images/products/bedding/comforter set.png",
  },
  {
    title: "Tea Table",
    category: "Wall Decor",
    image: "/images/products/Tables/Tea table.png",
  },
  {
    title: "Roller Blinds",
    category: "Curtains",
    image: "/images/products/curtains & blinds/Roller Blinds.png",
  },
] as const;
