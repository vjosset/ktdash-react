import Signup from "@/page/register";
import React from "react";

export async function generateMetadata({ params }) {
  return {
    title: 'Sign Up | KTDash.app',
    description: 'Create a KTDash account',
    openGraph: {
        title: 'Sign up | KTDash.app',
        url: 'https://ktdash.app/signup',
        description: 'Create a KTDash account',
        type: 'website'
    }
  }
}

export default async function SignupRoute() {
    return (
        <Signup />
    );
}
