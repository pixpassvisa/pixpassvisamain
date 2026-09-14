"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fakeSalesData, getRandomSale } from "@/lib/fakeSalesData";

export default function RecentSaleNotification() {
  const [isVisible, setIsVisible] = useState(false);
  const [notification, setNotification] = useState({
    name: "",
    location: "",
    product: "",
    timeAgo: "",
  });

  useEffect(() => {
    let showTimeoutId: NodeJS.Timeout;
    let hideTimeoutId: NodeJS.Timeout;

    const scheduleNext = (delay: number) => {
      showTimeoutId = setTimeout(() => {
        const sale = getRandomSale();
        
        setNotification(sale);
        setIsVisible(true);
        
        // Hide after 6 seconds, then schedule next after 10-30 seconds
        hideTimeoutId = setTimeout(() => {
          setIsVisible(false);
          const nextDelay = Math.floor(Math.random() * 20000) + 10000;
          scheduleNext(nextDelay);
        }, 6000);
      }, delay);
    };

    // Start first notification after 3 seconds
    scheduleNext(3000);

    return () => {
      clearTimeout(showTimeoutId);
      clearTimeout(hideTimeoutId);
    };
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
          <motion.div
            initial={{ opacity: 0, y: -10, x: 20 }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, y: -10, x: 20 }}
            className="fixed top-20 right-4 sm:top-28 sm:right-6 z-50 flex items-center bg-white rounded-lg shadow-[0_8px_30px_rgb(0,0,0,0.12)] p-2.5 pr-4 border border-gray-100/50 max-w-[calc(100vw-2rem)] sm:max-w-[300px] pointer-events-none"
          >
            <div className="flex-shrink-0 mr-3">
              <svg className="w-8 h-8" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 38C26.6274 38 32 32.6274 32 26C32 21 28 17 25 14C23.5 12.5 24 10 24 10C24 10 23 12 20 14C17 16 14 18.5 12 21.5C10.5 23.75 10 25.5 10 27C10 33.0751 14.4772 38 20 38Z" fill="#FF9500"/>
                <path d="M21 34C24 34 26 31 26 28C26 25 23 23 21 21C20.25 20.25 20 19 20 19C20 19 19 20.5 18 21.5C16.5 23 15 25 15 27C15 30.866 17.6863 34 21 34Z" fill="#FFCC00"/>
                <circle cx="12" cy="10" r="1.5" fill="#FF9500" />
                <circle cx="28" cy="14" r="1" fill="#FFCC00" />
                <circle cx="22" cy="6" r="1.5" fill="#FFCC00" />
              </svg>
            </div>
            <div className="flex flex-col text-[12px] leading-tight">
              <span className="font-semibold text-gray-800 mb-0.5">
                {notification.name} from {notification.location}
              </span>
              <span className="text-gray-500 mb-0.5 font-medium">
                {notification.product}
              </span>
              <span className="text-gray-400 text-[10px]">
                {notification.timeAgo}
              </span>
            </div>
          </motion.div>
      )}
    </AnimatePresence>
  );
}
