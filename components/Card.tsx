import React from "react";
import Chip from "./Chip";

const Card = ({
  title,
  description,
  tags,
}: {
  title: string;
  description: string;
  tags: string[];
}) => {
  return (
    <>
      <div className="max-w-sm rounded overflow-hidden shadow-lg border">
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">{title}</div>
          <p className="text-gray-700 text-base">{description}</p>
        </div>
        <div className="px-6 pt-4 pb-2">
          {tags.map((tag, ind) => {
            return <Chip key={ind} tag={tag} />;
          })}
        </div>
      </div>
    </>
  );
};

export default Card;
