import React from "react";
export default function Loading(props) {
  React.useEffect(() => {
    if (!props.loadingOver) return;
    const loading = document.querySelector(".loading");

    function loadingOverTask(e) {
      if (e.propertyName === "opacity") {
        props.endLoading();
      }
    }
    loading.addEventListener("transitionend", (e) => loadingOverTask(e));

    return removeEventListener("transitionend", loadingOverTask);
  }, [props.loadingOver]);

  return (
    <div className={`loading ${props.loadingOver && "loading__hidden"}`}>
      <div className="loader"></div>
    </div>
  );
}
