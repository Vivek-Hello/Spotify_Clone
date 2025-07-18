
import { LayoutDashboardIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import SignInAuthButton from './SignInAuthButton';
import { SignedOut, UserButton } from '@clerk/clerk-react';
import { useAuthStore } from '@/store/useAuthStore';
import { cn } from "@/lib/utils";
import { buttonVariants } from "./ui/button";

const TopBar = () => {

    const {isAdmin} =  useAuthStore()
  return (
    <div className=' flex justify-between items-center p-5 bg-zinc-900/75 backdrop-blur-md top-0 z-10'> 
      <div className='flex gap-2 items-center'>
				<img src='/spotify.png' className='size-8' alt='Spotify logo' />
				Spotify
			</div>

      <div className='flex items-center gap-4'>
				{isAdmin && (
					<Link to={"/admin"} className={cn(buttonVariants({ variant: "outline" }))}>
						<LayoutDashboardIcon className='size-4  mr-2' />
						Admin Dashboard
					</Link>
				)}

				<SignedOut>
					<SignInAuthButton />
				</SignedOut>

				<UserButton />

      </div>
    </div>
  );
}

export default TopBar;