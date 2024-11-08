import React from "react";
import Login from "@/page/login";

export async function generateMetadata({ params }) {
  return {
    title: 'Log In | KTDash.app',
    description: 'Log in to view, edit, and manage your rosters and access the dashboard to run your games.',
    openGraph: {
        title: 'Log In | KTDash.app',
        url: 'https://ktdash.app/login',
        description: 'Log in to view, edit, and manage your rosters and access the dashboard to run your games.',
        type: 'website'
    }
  }
}

export default async function LoginRoute() {
    return (
        <Login />
    );
}
