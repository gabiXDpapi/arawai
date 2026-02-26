'use client';

import Image from 'next/image';
import favicon from '@/app/favicon.png';

interface LogoProps {
    width?: number;
    height?: number;
    className?: string;
}

export function Logo({ width = 40, height = 40, className = "" }: LogoProps) {
    return (
        <Image
            src={favicon}
            alt="ARAW.ai Logo"
            width={width}
            height={height}
            className={className}
            priority
        />
    );
}
