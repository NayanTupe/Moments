import { db } from "../firebase";
import { addDoc, collection } from "firebase/firestore";

// Helper to get or set a persistent visitor ID and visit count
const getVisitorStats = () => {
  let visitorId = localStorage.getItem("visitor_id");
  if (!visitorId) {
    visitorId = "user_" + Math.random().toString(36).substr(2, 9);
    localStorage.setItem("visitor_id", visitorId);
  }

  let visitCount = parseInt(localStorage.getItem("visit_count") || "0");
  return { visitorId, visitCount };
};

/**
 * Tracks a button click or interaction to the 'clicks' collection in Firestore.
 */
export const trackClick = async (action, e, metadata = {}) => {
  try {
    const { visitorId, visitCount } = getVisitorStats();
    
    await addDoc(collection(db, "clicks"), {
      action,
      visitorId,
      visitCount,
      buttonText: e?.target?.innerText || e?.currentTarget?.innerText || "",
      pageUrl: window.location.href,
      device: navigator.userAgent,
      screen: `${window.innerWidth}x${window.innerHeight}`,
      time: new Date(),
      ...metadata // Advance data (e.g., timeSpent, clickCount)
    });

    console.log("Tracked Click:", action);
  } catch (err) {
    console.error("Tracking Error:", err);
  }
};

/**
 * Tracks general user actions like page views to the 'users' collection.
 */
export const trackAction = async (action, metadata = {}) => {
  try {
    const { visitorId, visitCount } = getVisitorStats();

    await addDoc(collection(db, "users"), {
      action,
      visitorId,
      visitCount,
      time: new Date(),
      pageUrl: window.location.href,
      device: navigator.userAgent,
      ...metadata
    });
    console.log("User action tracked:", action);
  } catch (error) {
    console.error("Tracking Error:", error);
  }
};
