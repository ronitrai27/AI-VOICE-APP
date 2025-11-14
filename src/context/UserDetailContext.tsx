"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "@/services/supabaseClient";

interface DBUser {
  id: number;
  name: string;
  email: string;
  picture: string;
  credits: number;
  remainingCredits: number;
  organization: string;
  created_at: string;
}

interface DBCandidate {
  id: number;
  name: string;
  email: string;
  picture: string;
  current_occupation: string;
  referal_link: string;
  created_at: string;
}

interface UserDataContextType {
  users: DBUser[] | null;
  setUsers: React.Dispatch<React.SetStateAction<DBUser[] | null>>;
  loading: boolean;
  isNewUser: boolean;
  constCreateNewUser: () => Promise<void>;
  //  totalCredits: number;
  remainingCredits: number;
  setRemainingCredits: React.Dispatch<React.SetStateAction<number>>;
}

const UserDataContext = createContext<UserDataContextType | undefined>(
  undefined
);

export function UserDataProvider({ children }: { children: React.ReactNode }) {
  const [users, setUsers] = useState<DBUser[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [isNewUser, setIsNewUser] = useState<boolean>(false);
  const [remainingCredits, setRemainingCredits] = useState<number>(0);

  useEffect(() => {
    constCreateNewUser();
  }, []);
  const constCreateNewUser = async () => {
    setLoading(true);

    try {
      const { data: authData, error: authError } =
        await supabase.auth.getUser();
      const authUser = authData?.user;

      if (!authUser) {
        console.log("⚠️ No authenticated user");
        setLoading(false);
        return;
      }

      console.log("✅ Authenticated user:", authUser.email);

      // Detect provider
      const provider = authUser.app_metadata?.provider;
      const isEmailProvider = provider === "email";
      localStorage.setItem("emailProvider", isEmailProvider ? "true" : "false");

      // Detect role
      const role = authUser.user_metadata?.role;
      console.log("👤 User role:", role);

      // ----------------------------------------------------------
      //  CANDIDATE LOGIC 
      // ----------------------------------------------------------
      if (role === "candidate") {
        console.log("🎯 Candidate detected");

        //  Check if candidate already exists
        const { data: existingCandidate, error: candidateFetchError } =
          await supabase
            .from("candidates")
            .select("*")
            .eq("email", authUser.email)
            .maybeSingle();

        if (candidateFetchError) {
          console.error("❌ Error fetching candidate:", candidateFetchError);
          setLoading(false);
          return;
        }

        if (!existingCandidate) {
          console.log("No candidate found → inserting new candidate");

          const { data: insertedCandidate, error: insertError } = await supabase
            .from("candidates")
            .insert([
              {
                name: authUser.user_metadata?.name || "",
                email: authUser.email,
                picture: authUser.user_metadata?.picture || "",
                current_occupation: "",
                referal_link: "",
              },
            ])
            .select();

          if (insertError) {
            console.error("Error inserting candidate:", insertError);
          } else {
            console.log("Candidate inserted:", insertedCandidate);
          }
        } else {
          console.log("✔ Candidate already exists");
        }

        setLoading(false);
        return; 
      }

      // ----------------------------------------------------------
      //  Normal Users Logic (YOUR ORIGINAL LOGIC)
      // ----------------------------------------------------------

      const { data: usersDB, error: fetchError } = await supabase
        .from("users")
        .select("*")
        .eq("email", authUser.email);

      if (fetchError) {
        console.error("❌ Error fetching user:", fetchError.message);
        setLoading(false);
        return;
      }

      if (!usersDB || usersDB.length === 0) {
        console.log("No user found → inserting new user");

        const { data: insertedData, error: insertError } = await supabase
          .from("users")
          .insert([
            {
              name: authUser.user_metadata?.name,
              email: authUser.email,
              picture: authUser.user_metadata?.picture,
              organization: "no organization",
            },
          ])
          .select();

        if (insertError) {
          console.log("❌ Error inserting new user:", insertError.message);
        } else {
          console.log("✅ New user inserted:", insertedData);
          setUsers(insertedData);
          setIsNewUser(true);
        }
      } else {
        setUsers(usersDB);
        setIsNewUser(false);
      }

      setLoading(false);
    } catch (err) {
      console.error("❌ Error in constCreateNewUser:", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (users?.[0]) {
      setRemainingCredits(users[0].remainingCredits);
    }
  }, [users]);

  return (
    <UserDataContext.Provider
      value={{
        users,
        setUsers,
        loading,
        isNewUser,
        constCreateNewUser,
        remainingCredits,
        setRemainingCredits,
      }}
    >
      {children}
    </UserDataContext.Provider>
  );
}

export function useUserData() {
  const context = useContext(UserDataContext);
  if (context === undefined) {
    throw new Error("useUserData must be used within a UserDataProvider");
  }
  return context;
}
