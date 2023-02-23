import React, { memo } from "react";

type GreetingsProps = {
  name?: string;
};

const Tabs3: React.FC<GreetingsProps> = ({ name }) => {
  return <div>{name}asdasdasdasd</div>;
};

export default React.memo(Tabs3);
