import axiosConfig from "@/lib/axios";
import { create } from "zustand";
interface AuthStore {
    isAdmin:boolean;
    error:string| null;
    isLoading:boolean;

    checkAdminStatus : ()=> Promise<void>;

    reset:()=>void;
}


export const useAuthStore =  create<AuthStore>((set)=>({
    isAdmin:false,
    isLoading:false,
    error:null,

    checkAdminStatus : async()=>{
        set({isAdmin:false,isLoading:true,error:null});
        try {
            const res  = await axiosConfig.get("/admin");
            set({isAdmin:res.data.isAdmin});
      
        } catch (error:any) {
            set({error:error.response.data.message});
        }finally{
            set({isLoading:false});
        }
    },

    reset:()=>{
        set({isAdmin:false,isLoading:false,error:null});
    },
}))