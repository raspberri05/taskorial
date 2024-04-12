import { Helmet } from "react-helmet-async";
import { FC } from "react";

export const Head: FC<{
  title: string;
  slug: string;
  desc: string;
}> = (props) => {
  return (
    <Helmet>
      <title>{"Taskorial | " + props.title}</title>
      <link rel="canonical" href={`https://taskorial.com/${props.slug}`} />
      <meta name="description" content={props.desc} />

      <meta property="og:title" content={"Taskorial | " + props.title} />
      <meta property="og:url" content={`https://taskorial.com/${props.slug}`} />
      <meta property="og:description" content={props.desc} />

      <meta name="twitter:title" content={"Taskorial | " + props.title} />
      <meta name="twitter:description" content={props.desc} />
    </Helmet>
  );
};
