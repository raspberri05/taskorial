import { Helmet } from "react-helmet-async";
import { FC } from "react";

export const Head: FC<{
  title: string;
  slug: string;
}> = (props) => {
  return (
    <Helmet>
      <title>{props.title}</title>
      <link rel="canonical" href={`https://taskorial.com/${props.slug}` />
    </Helmet>
  );
};
