import React from "react";

const ProductSkeletons = () => {
  return (
    <React.Fragment>
      {
        [1, 2, 3, 4, 5, 6, 7, 8].map((skeleton, idx) => {
          return <div
            style={{
              width: "329px",
              height: "435px",
              background: "grey",
            }}
            key={idx}
          >Loading...</div>;
        })
      }
    </React.Fragment>
  )
};

export default ProductSkeletons;
