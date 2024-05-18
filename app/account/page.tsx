import Header from "@/components/Header";
import AccountContent from "@/app/account/components/AccountContent";

const Account = () => {
    return (
        <div className="bg-neutral-900 rounded-lg h-full w-full overflow-hidden overflow-y-auto">
            <Header className="from-bg-neutral-900">
                <div className="mb-2 flex flex-co gap-y-6">
                    <h1 className="text-3xl font-bold text-neon-pink">
                        Account Settings
                    </h1>
                </div>
            </Header>
            <AccountContent />
        </div>
    )
}

export default Account;