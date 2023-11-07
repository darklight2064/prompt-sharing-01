"use client"
import Link from "next/link"
import { signIn, signOut, useSession } from "next-auth/react"

export default function Nav() {
    const { data: session } = useSession();

    return (
        <nav>
            user: {JSON.stringify(session)}
            <button onClick={() => signIn()}>sign in</button>
            <button onClick={() => signOut()}>sign out</button>
        </nav>
    )
}
