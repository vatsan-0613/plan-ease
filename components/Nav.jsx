import React from 'react'
import Image from 'next/image'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { signOut } from 'next-auth/react';

const Nav =  ({ mail, name, image }) => {
    return (
        <nav className='w-full  py-3 px-10 flex justify-between items-center bg-[#393E46]'>
            <h1 className='text-2xl font-semibold text-[#00ADB5] '>
                PlanEase
                {/* {mail}
                {name} */}
            </h1>
            <div className='rounded-full flex items-center'>
                <DropdownMenu>
                    <DropdownMenuTrigger><Image src={image} width={35} height={35} alt='photo-logo' className='rounded-full'/></DropdownMenuTrigger>
                    <DropdownMenuContent className='me-10'>
                        <DropdownMenuLabel>{name}</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className='p-0'><button className='bg-[#9DB2BF] w-full py-2 px-3 rounded-md font-semibold' onClick={() => signOut()}>Sign out</button></DropdownMenuItem>
                        {/* <DropdownMenuItem>Billing</DropdownMenuItem>
                        <DropdownMenuItem>Team</DropdownMenuItem>
                        <DropdownMenuItem>Subscription</DropdownMenuItem> */}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </nav>
    )
};

export default Nav