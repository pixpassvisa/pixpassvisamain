export type GuidelineExample = {
  id: string;
  src: string;
  isAcceptable: boolean;
  description: string;
  tip?: string;
  imageClassName?: string; // Tailwind classes for simulating failure cases (e.g. brightness, scale)
};

export type GuidelineCategory = {
  id: string;
  title: string;
  examples: GuidelineExample[];
};

export const photoGuidelinesData: GuidelineCategory[] = [
  {
    id: "shadows-lighting",
    title: "Shadows and Lighting",
    examples: [
      {
        id: "light-1",
        src: "/examples/base_man_1.png",
        isAcceptable: true,
        description: "Acceptable - The photo is clear and in color, reproduces skin tones accurately, and is properly exposed with no shadows.",
      },
      {
        id: "light-2",
        src: "/examples/base_woman_1.png",
        isAcceptable: false,
        description: "Unacceptable - The photo is overexposed (too bright).",
        imageClassName: "brightness-150 contrast-75",
      },
      {
        id: "light-3",
        src: "/examples/base_man_2.png",
        isAcceptable: false,
        description: "Unacceptable - The photo is underexposed (too dark) and shadows are visible on the face.",
        imageClassName: "brightness-50",
      },
    ],
  },
  {
    id: "size-position",
    title: "Size and Position",
    examples: [
      {
        id: "size-1",
        src: "/examples/base_woman_1.png",
        isAcceptable: true,
        description: "Acceptable - The head is centered and the correct size.",
      },
      {
        id: "size-2",
        src: "/examples/base_man_1.png",
        isAcceptable: false,
        description: "Unacceptable - The head is too large and too close to the camera.",
        imageClassName: "scale-125 origin-center",
      },
      {
        id: "size-3",
        src: "/examples/base_woman_2.png",
        isAcceptable: false,
        description: "Unacceptable - The head is too small and too far away.",
        imageClassName: "scale-75 origin-center",
      },
    ],
  },
  {
    id: "digital-changes",
    title: "Digital Changes",
    examples: [
      {
        id: "dig-1",
        src: "/examples/base_man_2.png",
        isAcceptable: true,
        description: "Acceptable - The image has not been digitally altered or retouched.",
      },
      {
        id: "dig-2",
        src: "/examples/base_man_1.png",
        isAcceptable: false,
        description: "Unacceptable - The background is cropped using a photo retouching tool, changing the outline of the head, face, and neck.",
        imageClassName: "mask-image-[radial-gradient(ellipse_at_center,_black_50%,_transparent_70%)]",
      },
      {
        id: "dig-3",
        src: "/examples/base_woman_1.png",
        isAcceptable: false,
        description: "Unacceptable - The photo has a digital filter applied, altering the natural skin tone.",
        imageClassName: "sepia hue-rotate-180",
      },
    ],
  },
  {
    id: "pose-expression",
    title: "Pose and Expression",
    examples: [
      {
        id: "pose-1",
        src: "/examples/base_woman_2.png",
        isAcceptable: true,
        description: "Acceptable - The customer is directly facing the camera with a neutral expression. Eyes are clearly visible.",
      },
      // Note: Truly bad poses require real image generation. We use slight rotation to simulate tilt.
      {
        id: "pose-2",
        src: "/examples/base_man_1.png",
        isAcceptable: false,
        description: "Unacceptable - Head is tilted downward.",
        imageClassName: "rotate-6 translate-y-2",
      },
    ],
  },
  {
    id: "attire-hats-glasses",
    title: "Attire, Hats, and Glasses",
    examples: [
      {
        id: "att-1",
        src: "/examples/base_woman_2.png",
        isAcceptable: true,
        description: "Acceptable - The customer's full face is visible, and no shadows or clothing block the face.",
        tip: "Photo tip: You may not wear hats or head coverings, except for religious or medical purposes. The hat or head covering should be one color with no patterns or small holes.",
      },
      {
        id: "att-2",
        src: "/examples/base_man_2.png",
        isAcceptable: true,
        description: "Acceptable - Everyday clothing is worn.",
      },
    ],
  },
  {
    id: "background",
    title: "Background",
    examples: [
      {
        id: "bg-1",
        src: "/examples/base_woman_1.png",
        isAcceptable: true,
        description: "Acceptable - The background is white or off-white, without shadows, and is plain without texture, objects, or lines.",
      },
      {
        id: "bg-2",
        src: "/examples/base_man_1.png",
        isAcceptable: false,
        description: "Unacceptable - The background is not white or off-white.",
        imageClassName: "mix-blend-multiply bg-blue-100", // Will simulate a tinted background if container has blue
      },
    ],
  },
];
