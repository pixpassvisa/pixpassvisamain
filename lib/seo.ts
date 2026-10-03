export const SITE_URL = "https://www.pixpassvisa.com";
export const SITE_NAME = "pixpassvisa.com";
export const privatePath = /^\/(?:api|admin|dashboard|login|signup|cloudinary-gallery|preview|expert-edit)(?:\/|$)|^\/(?:fr|de)\/preview(?:\/|$)/;
export const isPrivatePath = (pathname: string) => privatePath.test(pathname);
