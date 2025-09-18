import React from "react";

export default function Container({children}: { children: React.ReactNode }) {
    return (
        <div className="mx-auto w-full max-w-[72rem] xl:max-w-[80rem] 2xl:max-w-[90rem] px-4 sm:px-6">
            {children}
        </div>
    );
}