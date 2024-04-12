import { Helmet } from "react-helmet-async";
import { FC } from "react";

export const Head: FC<{
  title: string;
  slug: string;
}> = (props) => {
  return (
    <Helmet>
      <title>{props.title}</title>
      <meta
        name="description"
        content={`https://taskorial.com/${props.slug}`}
      />
    </Helmet>
  );
};
