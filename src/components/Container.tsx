import React, { ReactNode } from "react";

interface ContainerProps {
  children?: ReactNode;
  className?: string;
}

export default function Container(props: ContainerProps) {
  return (
    <div className={"mx-auto container px-4 md:px-20 " + props.className}>
      {props.children}
    </div>
  );
}
