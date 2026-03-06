import React, { useState } from "react";

const ContrastToggle = () => {
  const [contrast, setContrast] = useState(false);

  return (
    <button onClick={() => setContrast(!contrast)}>
      Contrast Mode
    </button>
  );
};

export default ContrastToggle;
