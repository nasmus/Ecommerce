import {
    ArrowCircleDown,
    ChecklistRtlSharp,
    DashboardSharp,
    EmailRounded,
    FeedSharp,
    ForumSharp,
    HeadsetMicSharp,
    Inventory2Sharp,
    ListAltRounded,
    MenuRounded,
    Settings,
    WalletSharp,
} from '@mui/icons-material';
import Accordion from './Accordion';

export default function Sidebar() {
    return (
        <div className="w-2/5 md:w-1/6 border-2  h-full min-h-screen ">
            <section className="flex w-full p-1 border-b-2">
                <div className="flex justify-center items-center m-2">
                    <img
                        className="w-11 h-11 rounded-full border"
                        src="https://flowbite.com/docs/images/people/profile-picture-1.jpg"
                        alt=""
                    />
                </div>
                <div className="m-2">
                    <h3 className="font-bold">Alexe Jordar</h3>
                    <p className=" text-sm ">Sales Manager</p>
                </div>
            </section>
            <div className="p-3 ">
                <section className="border-b">
                    <Accordion
                        title="Dashboard"
                        icon={<DashboardSharp fontSize="small" className={`mt-1 `} />}
                    >
                        <ul className="pl-4 ">
                            <li>Product List</li>
                            <li>Product</li>
                            <li>Category</li>
                            <li>Shopping Cart</li>
                            <li>Checkout</li>
                        </ul>
                    </Accordion>
                    <Accordion
                        title="Orders"
                        icon={<ChecklistRtlSharp fontSize="small" className={`mt-1 `} />}
                    >
                        <ul className="pl-4">
                            <li>Product List</li>
                            <li>Product</li>
                            <li>Category</li>
                            <li>Shopping Cart</li>
                            <li>Checkout</li>
                        </ul>
                    </Accordion>
                    <Accordion
                        title="Products"
                        icon={<Inventory2Sharp fontSize="small" className={`mt-1 `} />}
                    >
                        <ul className="pl-4">
                            <li>Product List</li>
                            <li>Product</li>
                            <li>Category</li>
                            <li>Shopping Cart</li>
                            <li>Checkout</li>
                        </ul>
                    </Accordion>
                    <Accordion
                        title="Buyer"
                        icon={<WalletSharp fontSize="small" className={`mt-1`} />}
                    >
                        <ul className="pl-4">
                            <li>Product List</li>
                            <li>Product</li>
                            <li>Category</li>
                            <li>Shopping Cart</li>
                            <li>Checkout</li>
                        </ul>
                    </Accordion>
                    <Accordion
                        title="Customers"
                        icon={<HeadsetMicSharp fontSize="small" className={`mt-1`} />}
                    >
                        <ul className="pl-4">
                            <li>Product List</li>
                            <li>Product</li>
                            <li>Category</li>
                            <li>Shopping Cart</li>
                            <li>Checkout</li>
                        </ul>
                    </Accordion>
                    <Accordion
                        title="Invoices"
                        icon={<FeedSharp fontSize="small" className={`mt-1`} />}
                    >
                        <ul className="pl-4">
                            <li>Product List</li>
                            <li>Product</li>
                            <li>Category</li>
                            <li>Shopping Cart</li>
                            <li>Checkout</li>
                        </ul>
                    </Accordion>
                </section>
                <section className="py-2 text-slate-400   ">
                    <div className="flex ">
                        <ForumSharp fontSize="small" className={`mt-2 text-slate-400 `} />
                        <button className="w-full flex items-center justify-between p-2  rounded-md focus:outline-none">
                            <span className={`text-sm font-medium  `}>Chats</span>
                        </button>
                    </div>
                    <div className="flex ">
                        <EmailRounded fontSize="small" className={`mt-2 text-slate-400 `} />
                        <button className="w-full flex items-center justify-between p-2  rounded-md focus:outline-none">
                            <span className={`text-sm font-medium  `}>Email</span>
                        </button>
                    </div>
                    <div className="flex ">
                        <ListAltRounded fontSize="small" className={`mt-2 text-slate-400 `} />
                        <button className="w-full flex items-center justify-between p-2  rounded-md focus:outline-none">
                            <span className={`text-sm font-medium  `}>Todo App</span>
                        </button>
                    </div>
                </section>
                <section className="pt-40 text-slate-400">
                    <div className="flex ">
                        <Settings fontSize="small" className={`mt-2 text-slate-400 `} />
                        <button className="w-full flex items-center justify-between p-2  rounded-md focus:outline-none">
                            <span className={`text-sm font-medium  `}>Setting</span>
                        </button>
                    </div>
                    <div className="flex ">
                        <ArrowCircleDown fontSize="small" className={`mt-2 text-slate-400 `} />
                        <button className="w-full flex items-center justify-between p-2  rounded-md focus:outline-none">
                            <span className={`text-sm font-medium  `}>Logout</span>
                        </button>
                    </div>
                    <div className="flex ">
                        <MenuRounded fontSize="small" className={`mt-2 text-slate-400 `} />
                        <button className="w-full flex items-center justify-between p-2  rounded-md focus:outline-none">
                            <span className={`text-sm font-medium  `}>Menu</span>
                        </button>
                    </div>
                </section>
            </div>
        </div>
    );
}
