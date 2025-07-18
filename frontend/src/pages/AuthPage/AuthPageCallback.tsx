import axiosConfig from '@/lib/axios';
import { useUser } from '@clerk/clerk-react'
import {  useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card,CardContent } from '@/components/ui/card';
import { Loader } from 'lucide-react';


const AuthPageCallback = () => {



  const {isLoaded,user} =  useUser();
  const navigate =  useNavigate();

  useEffect(()=>{
    const syncUser = async () => {
      try {
        if (!isLoaded || !user) return;
        await axiosConfig.post("/auth/callback",{
          firstName:user.firstName,
          lastName:user.lastName,
          id:user.id,
          imageUrl:user.imageUrl
        })
       
      } catch (error) {
        console.log('====================================');
        console.log(error);
        console.log('====================================');
      }finally{
        navigate("/");
      }
    };
    syncUser();
  },[isLoaded,user,navigate]);

  return (
   <div className='h-screen w-full bg-black flex items-center justify-center'>
			<Card className='w-[90%] max-w-md bg-zinc-900 border-zinc-800'>
				<CardContent className='flex flex-col items-center gap-4 pt-6'>
					<Loader className='size-6 text-emerald-500 animate-spin' />
					<h3 className='text-zinc-400 text-xl font-bold'>Logging you in</h3>
					<p className='text-zinc-400 text-sm'>Redirecting...</p>
				</CardContent>
			</Card>
		</div>

  )
}

export default AuthPageCallback
