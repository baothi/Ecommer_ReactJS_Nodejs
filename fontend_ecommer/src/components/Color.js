import React from "react";

const Color = (props) => {
  const { colorData, setColor } = props;
  return (
    <>
      <ul className="colors ps-0">
        {
          colorData && 
          colorData.map((item, index) =>{
            return (
              <li 
              key={index}
              style={{backgroundColor: item?.title}} 
              onClick={() => setColor(item?._id)}
              ></li>
            )
          })
        }
      </ul>
    </>
  );
};

export default Color;
