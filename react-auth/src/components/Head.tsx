import { Helmet } from "react-helmet-async";
import { FC } from "react";

/**
 * Functional component representing head section of webpage
 * @param props - properties of component (title, slug and description of webpage)
 * @returns JSX element containing head section
 */
export const Head: FC<{
  title: string;
  slug: string;
  desc: string;
}> = (props) => {
  return (
    <Helmet>
      <title>{`Taskorial | ${props.title}`}</title>
      <link rel="canonical" href={`https://taskorial.com/${props.slug}`} />
      <meta name="description" content={props.desc} />

      <meta property="og:title" content={`Taskorial | ${props.title}`} />
      <meta property="og:url" content={`https://taskorial.com/${props.slug}`} />
      <meta property="og:description" content={props.desc} />

      <meta name="twitter:title" content={`Taskorial | ${props.title}`} />
      <meta name="twitter:description" content={props.desc} />
    </Helmet>
  );
};
