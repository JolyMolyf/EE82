'use client'
import React from 'react'
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuIndicator,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
    NavigationMenuViewport,
  } from "@/components/ui/navigation-menu"
import Link from 'next/link';
  

export const NavBar = () => {

    return (
            <NavigationMenu className='rounded-xl px-5 my-5 mx-auto'>
                <NavigationMenuList className='flex flex-row justify-between items-center'>
                    <NavigationMenuItem className='mx-3 my-2'>
                        <p className='text-2xl font-bold'>Cars Let</p>
                    </NavigationMenuItem>
                        <Link href="/" >
                            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                Home
                            </NavigationMenuLink>
                        </Link>
                        <Link href="/auth/login" >
                            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                Log In
                        </NavigationMenuLink>
                        </Link>
                </NavigationMenuList>
            </NavigationMenu>
    )
}

export default NavBar;