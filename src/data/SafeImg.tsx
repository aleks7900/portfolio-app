import React from "react";
import { resolveImg } from "./resolveImg";

type Props = React.ImgHTMLAttributes<HTMLImageElement> & { src?: string | null };

export default function SafeImg({ src, ...rest }: Props) {
    const fixed = resolveImg(src || "");
    return <img src={fixed} {...rest} />;
}