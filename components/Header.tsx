"use client";

import React from "react";
import {useRouter} from "next/navigation";
import {twMerge} from "tailwind-merge";
import {RxCaretLeft, RxCaretRight} from "react-icons/rx";
import {GrHomeRounded} from "react-icons/gr";
import {BiSearch} from "react-icons/bi";
import Button from "@/components/Button";
import useAuthModal from "@/hooks/useAuthModel";
import {useSupabaseClient} from "@supabase/auth-helpers-react";
import {useUser} from "@/hooks/useUser";
import {FaUserAlt} from "react-icons/fa";
import toast from "react-hot-toast";
import usePlayer from "@/hooks/usePlayer";

interface HeaderProps {
    children: React.ReactNode;
    className?: string;
}

const Header: React.FC<HeaderProps> = ({
    children,
    className
}) => {
    const authModal = useAuthModal();
    const router = useRouter()
    const supabaseClient = useSupabaseClient();
    const { user } = useUser();
    const player = usePlayer();

    const handleLogout = async () => {
        const { error } = await supabaseClient.auth.signOut();
        player.reset();
        router.refresh();

        if (error){
            toast.error(error.message);
        } else {
            toast.success('Logged out!');
        }
    }

    return (
        <div className={twMerge('h-fit bg-gradient-to-b from-neon-pink/60 p-6 text-white',
            className
        )}>
            <div className="w-full mb-4 flex items-center justify-between">
                <div className="hidden md:flex gap-x-2 items-center">
                    <button
                        onClick={() => router.back()}
                        className="rounded-full bg-white border-2 border-black flex items-center justify-center hover:opacity-75 transition">
                        <RxCaretLeft size={35} className="text-black"/>
                    </button>
                    <button
                        onClick={() => router.forward()}
                        className="rounded-full bg-white border-2 border-black flex items-center justify-center hover:opacity-75 transition">
                        <RxCaretRight size={35} className="text-black"/>
                    </button>
                </div>
                <div className="flex md:hidden gap-x-2 items-center">
                    <button
                        className="rounded-full p-2 bg-white border-2 border-black flex items-center justify-center hover:opacity-75 transition">
                        <GrHomeRounded className="text-black" size={20}/>
                    </button>
                    <button
                        className="rounded-full p-2 bg-white border-2 border-black flex items-center justify-center hover:opacity-75 transition">
                        <BiSearch className="text-black" size={20}/>
                    </button>
                </div>
                <div className="flex justify-between items-center gap-x-4">
                    {user ? (
                        <div className="flex gap-x-4 items-center">
                            <Button onClick={handleLogout} className="bg-white px-6 py-2">
                                Logout
                            </Button>
                            <Button onClick={() => router.push('/account')} className="bg-white">
                                <FaUserAlt />
                            </Button>
                        </div>
                    ) : (
                        <>
                            <div>
                                <Button
                                    onClick={authModal.onOpen}
                                    className="bg-transparent text-neutral-300 font-medium border-transparent"
                                >
                                    Sign up
                                </Button>
                            </div>
                            <div>
                                <Button
                                    onClick={authModal.onOpen}
                                    className="bg-white px-6 py-2"
                                >
                                    Log in
                                </Button>
                            </div>
                        </>
                    )}
                </div>
            </div>
            {children}
        </div>
    );
}

export default Header;