"use client";

import Modal from "@/components/Modal";
import {useSessionContext, useSupabaseClient} from "@supabase/auth-helpers-react";
import {useRouter} from "next/navigation";
import {Auth} from "@supabase/auth-ui-react";
import {ThemeSupa} from "@supabase/auth-ui-shared";
import useAuthModal from "@/hooks/useAuthModel";
import {useEffect} from "react";

const AuthModal = () => {
    const supabaseClient = useSupabaseClient();
    const router = useRouter();
    const {session} = useSessionContext();
    const {onClose, isOpen} = useAuthModal();

    const onChange = (open: boolean) => {
        if(!open){
            onClose();
        }
    }

    useEffect(() => {
        if(session){
            router.refresh();
            onClose();
        }
    }, [session, router, onClose]);

    return (
    <Modal
        title="Welcome back"
        description="Log in to your account"
        isOpen={isOpen}
        onChange={onChange}
    >
        <Auth
            theme="dark"
            magicLink
            providers={['github', 'facebook']}
            supabaseClient={supabaseClient}
            appearance={{
                theme: ThemeSupa,
                variables: {
                    default: {
                        colors: {
                            brand: '#404040',
                            brandAccent: '#fe019a',
                        }
                    }
                }
            }}
        />
    </Modal>
    )
}

export default AuthModal;