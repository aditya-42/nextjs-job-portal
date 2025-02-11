import {User} from "@/types/User"

export interface AuthState {
    loading: boolean;
    user: User | null;
  }