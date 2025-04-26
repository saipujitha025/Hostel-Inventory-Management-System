import React, { createContext, useState, useEffect } from "react";
import { auth, db } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, collection, getDocs } from "firebase/firestore";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(() => {
    const storedUser = localStorage.getItem("currentUser");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const [userProfile, setUserProfile] = useState(() => {
    const storedProfile = localStorage.getItem("userProfile");
    return storedProfile ? JSON.parse(storedProfile) : null;
  });

  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);

  // Fetch full profile from Firestore
  const fetchUserProfile = async (uid) => {
    if (!uid) return null;
    try {
      const userRef = doc(db, "users", uid);
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) {
        const profileData = userSnap.data();
        setUserProfile(profileData);
        localStorage.setItem("userProfile", JSON.stringify(profileData));
        return profileData;
      }
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
    return null;
  };

  // Fetch all users from Firestore
  const fetchUsers = async () => {
    try {
      const usersCollection = collection(db, "users");
      const snapshot = await getDocs(usersCollection);
      const usersList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUsers(usersList);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  // Monitor authentication state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setCurrentUser(user);
        localStorage.setItem("currentUser", JSON.stringify(user));

        // Fetch full user profile
        const profile = await fetchUserProfile(user.uid);
        setUserProfile(profile);
      } else {
        setCurrentUser(null);
        setUserProfile(null);
        localStorage.removeItem("currentUser");
        localStorage.removeItem("userProfile");
      }
    });

    return () => unsubscribe();
  }, []);
  console.log(currentUser, "currentUser");
  console.log(userProfile, "userProfile");
  return (
    <UserContext.Provider
      value={{
        currentUser,
        userProfile, // Full user profile
        loading,
        setLoading,
        fetchUsers,
        users,
        setUsers,
        refreshUserProfile: () => fetchUserProfile(currentUser?.uid), // Manual refresh
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
